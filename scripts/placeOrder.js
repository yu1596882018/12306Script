const superagent = require('superagent');
const moment = require('moment');
const setHeaders = require('./setHeaders');
const config = require('./config');
const getCodeImage = require('./getCodeImage');

// 下单占位
module.exports = async (options) => {
    const queryDate = options.queryDate;
    const queryParams = {
        fromCiteCode: options.fromCiteCode,
        toCiteCode: options.toCiteCode,
        fromCiteText: options.fromCiteText,
        toCiteText: options.toCiteText,
        seatType: '', // M一等座 O二等座
    };

    // 校验登录
    let checkUserResult = await setHeaders(superagent.post('https://kyfw.12306.cn/otn/login/checkUser'))
        .send({
            _json_att: ''
        });
    console.log('checkUserResult', checkUserResult.text);
    let checkUserData = JSON.parse(checkUserResult.text);
    if (!checkUserData.data.flag) {
        console.log('cookie失效');
        getCodeImage({
            sendmail: true,
            flag: `${options.fromCiteText}-${options.toCiteText}查询到余票，`
        });
        return false;
    }

    // 预订
    let submitOrderRequestResult = await setHeaders(superagent.post('https://kyfw.12306.cn/otn/leftTicket/submitOrderRequest'))
        .send({
            secretStr: decodeURIComponent(options.secretStr),
            train_date: queryDate,
            back_train_date: moment().format("YYYY-MM-DD"),
            tour_flag: 'dc',
            purpose_codes: 'ADULT',
            query_from_station_name: queryParams.fromCiteText,
            query_to_station_name: queryParams.toCiteText,
            undefined: ''
        });
    console.log('submitOrderRequestResult', submitOrderRequestResult.text);

    // 获取需要参数
    let initDcResult = await setHeaders(superagent.post('https://kyfw.12306.cn/otn/confirmPassenger/initDc'))
        .send({
            _json_att: ''
        });

    const globalRepeatSubmitToken = /var globalRepeatSubmitToken = '(.*)';/.exec(initDcResult.text)[1];
    const leftTicketStr = /'leftTicketStr':'([^']*)'/.exec(initDcResult.text)[1];
    const key_check_isChange = /'key_check_isChange':'([^']*)'/.exec(initDcResult.text)[1];
    const train_no = /'train_no':'([^']*)'/.exec(initDcResult.text)[1];
    const station_train_code = /'station_train_code':'([^']*)'/.exec(initDcResult.text)[1];
    const purpose_codes = /'purpose_codes':'([^']*)'/.exec(initDcResult.text)[1];
    const train_location = /'train_location':'([^']*)'/.exec(initDcResult.text)[1];
    const leftDetails = eval(`[${/'leftDetails':\[([^\]]*)\]/.exec(initDcResult.text)[1]}]`);
    console.log(globalRepeatSubmitToken, leftTicketStr, key_check_isChange, train_no, station_train_code, leftDetails);
    leftDetails.forEach(item => {
        if (/二等座/.test(item)) {
            if (/无票/.test(item)) {
                console.log('O无票');
            } else {
                console.log('O有票');
                queryParams.seatType = 'O'
            }
        } else if (/一等座/.test(item)) {
            if (/无票/.test(item)) {
                console.log('M无票');
            } else {
                console.log('M有票');
                queryParams.seatType !== 'O' && (queryParams.seatType = 'M');
            }
        }
    });
    console.log(queryParams.seatType);
    if (!queryParams.seatType) {
        return console.log('一等座，二等座无票');
    }

    let currentUser = config.userList[options.userIndex === undefined ? config.userIndex : options.userIndex];

    // 提交订单
    let checkOrderInfoResult = await setHeaders(superagent.post('https://kyfw.12306.cn/otn/confirmPassenger/checkOrderInfo'))
        .send({
            cancel_flag: '2',
            bed_level_order_num: '000000000000000000000000000000',
            passengerTicketStr: queryParams.seatType + currentUser.passengerTicketStr,
            oldPassengerStr: currentUser.oldPassengerStr,
            tour_flag: 'dc',
            randCode: '',
            whatsSelect: '1',
            sessionId: '',
            sig: '',
            scene: 'nc_login',
            _json_att: '',
            REPEAT_SUBMIT_TOKEN: globalRepeatSubmitToken
        });

    console.log('checkOrderInfoResult', checkOrderInfoResult.text);
    let checkOrderInfoData = JSON.parse(checkOrderInfoResult.text);
    if (checkOrderInfoData.data.submitStatus === false) {
        return false;
    }

    // 查询余票
    let getQueueCountResult = await setHeaders(superagent.post('https://kyfw.12306.cn/otn/confirmPassenger/getQueueCount'))
        .send({
            train_date: new Date(queryDate).toString(),
            train_no: train_no,
            stationTrainCode: station_train_code,
            seatType: queryParams.seatType,
            fromStationTelecode: queryParams.fromCiteCode,
            toStationTelecode: queryParams.toCiteCode,
            leftTicket: leftTicketStr,
            purpose_codes: purpose_codes,
            train_location: train_location,
            _json_att: '',
            REPEAT_SUBMIT_TOKEN: globalRepeatSubmitToken
        });
    console.log('getQueueCountResult', getQueueCountResult.text);
    let getQueueCountData = JSON.parse(getQueueCountResult.text);
    if (!getQueueCountData.status || +getQueueCountData.data.ticket <= 0) {
        return false;
    }

    // 确认座位
    let confirmSingleForQueueResult = await setHeaders(superagent.post('https://kyfw.12306.cn/otn/confirmPassenger/confirmSingleForQueue'))
        .send({
            passengerTicketStr: queryParams.seatType + currentUser.passengerTicketStr,
            oldPassengerStr: currentUser.oldPassengerStr,
            randCode: '',
            purpose_codes: purpose_codes,
            key_check_isChange: key_check_isChange,
            leftTicketStr: leftTicketStr,
            train_location: train_location,
            choose_seats: '1F',
            seatDetailType: '000',
            whatsSelect: '1',
            roomType: '00',
            dwAll: 'N',
            _json_att: '',
            REPEAT_SUBMIT_TOKEN: globalRepeatSubmitToken
        });
    console.log('confirmSingleForQueueResult', confirmSingleForQueueResult.text);
    if (!confirmSingleForQueueResult.body.data.submitStatus) {
        return console.log(confirmSingleForQueueResult.body.data.errMsg);
    }

    // 轮询获取订单
    let orderId = null;
    await (async function () {
        await new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });

        let queryOrderWaitTimeResult = await setHeaders(superagent.get('https://kyfw.12306.cn/otn/confirmPassenger/queryOrderWaitTime'))
            .query({
                random: Date.now(),
                tourFlag: 'dc',
                _json_att: '',
                REPEAT_SUBMIT_TOKEN: globalRepeatSubmitToken
            });
        console.log('queryOrderWaitTimeResult', queryOrderWaitTimeResult.text);
        let queryOrderWaitTimeData = JSON.parse(queryOrderWaitTimeResult.text);
        if (queryOrderWaitTimeData.data.orderId) {
            console.log('orderId', orderId = queryOrderWaitTimeData.data.orderId);
        } else {
            if (queryOrderWaitTimeData.data.queryOrderWaitTimeStatus) {
                if (queryOrderWaitTimeData.data.errorcode === '0') {
                    return console.log(queryOrderWaitTimeData.data.msg);
                }
                await arguments.callee();
            }
        }
    })();

    if (!orderId) {
        return console.log('结束，无成功订单');
    }

    // 下单结果查询
    let resultOrderForDcQueueResult = await setHeaders(superagent.post('https://kyfw.12306.cn/otn/confirmPassenger/resultOrderForDcQueue'))
        .send({
            orderSequence_no: orderId,
            _json_att: '',
            REPEAT_SUBMIT_TOKEN: globalRepeatSubmitToken
        });
    console.log('resultOrderForDcQueueResult', resultOrderForDcQueueResult.text);
    let resultOrderForDcQueueData = JSON.parse(resultOrderForDcQueueResult.text);
    if (resultOrderForDcQueueData.data.submitStatus) {
        console.log('抢票成功');
    }
}
