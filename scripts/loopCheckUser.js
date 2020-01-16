// 校验是否登录状态
const superagent = require('superagent');
const setHeaders = require('./setHeaders');
const getCodeImage = require('./getCodeImage');
const config = require('./config');
const {queryCookie} = require('./config');
const moment = require('moment');
/*
const start = async () => {
    let checkUserResult = await setHeaders(superagent.post('https://kyfw.12306.cn/otn/login/checkUser'))
        .send({
            _json_att: ''
        });
    console.log('checkUserResult', checkUserResult.text);
    let checkUserData = JSON.parse(checkUserResult.text);
    if (!checkUserData.data.flag) {
        console.log('cookie失效');
        getCodeImage({
            sendmail: true
        });
    }
}*/

/*const start = async () => {
    await new Promise((resolve, reject) => {
        config.redisDb.get('userCookie', function (err, v) {
            if (err) {
                reject(err);
            } else {
                v && (config.userCookie = v);
                resolve(v);
            }
        });
    });

    let chechFaceResult = await setHeaders(superagent.post('https://kyfw.12306.cn/otn/afterNate/chechFace'))
        .send({
            secretList: `q0ayjkIIX64yKjLwF6K7dCIDp25C4iVs5L3m2ybXBNNyxW%2FFjsLU29yawLt2XGdqYZQv%2F9G7R1fA%0AbPUUb1BOHw7PZgJ87sUI3PLmKIRLhXkAoaWejL4IF45A%2Be7TrF4pQOZaUB4Bu5Xvm4Bnr6%2BZz95M%0A7%2FHKPaViGh0Jm1J5Nkzq0mwRgKAAMwfweEmLuHlanN2JsGMahUqEkFJcXB5MNhYwuTV95WNdNXjx%0ASIS2do31TfB2CKDBVAzgNF6%2FzIwyuYIY06LzNKPvnRgEt%2BFTdMhYfsleQDOZI2Hw64YWwhyhoV2p%0A#9|`,
            _json_att: ''
        });
    // console.log('checkUserResult', checkUserResult.text);
    // let checkUserData = JSON.parse(checkUserResult.text);
    let checkUserData = chechFaceResult.body;
    console.log(chechFaceResult.body)
    if (checkUserData.status && !checkUserData.data.login_flag) {
        console.log('cookie失效');
        getCodeImage({
            sendmail: true
        });
    }
}*/

const start = async () => {
    try {
        if (new Date().getHours() < 6 || new Date().getHours() >= 23) {
            return console.log('不再抢票时间！');
        }
        await new Promise((resolve, reject) => {
            config.redisDb.get('userCookie', function (err, v) {
                if (err) {
                    reject(err);
                } else {
                    v && (config.userCookie = v);
                    resolve(v);
                }
            });
        });

        const queryParams = {
            secretStr: '',
            queryDate: '2020-02-02',
            fromCiteCode: 'SZQ',
            fromCiteText: '深圳',
            toCiteCode: 'KAQ',
            toCiteText: '怀化南'
        }

        // 查询
        let queryZResult = await setHeaders(superagent.get('https://kyfw.12306.cn/otn/leftTicket/queryZ'), queryCookie)
            .query({
                'leftTicketDTO.train_date': queryParams.queryDate,
                'leftTicketDTO.from_station': queryParams.fromCiteCode,
                'leftTicketDTO.to_station': queryParams.toCiteCode,
                purpose_codes: 'ADULT'
            });
        let queryItem = queryZResult.body.data.result.find(item => {
            let arr = item.split('|');
            return arr[11] === 'Y' && ((arr[30] && arr[30] !== '无') || (arr[31] && arr[31] !== '无'));
        });

        if (!queryItem) {
            throw new Error('无票');
            return false;
        }

        queryParams.secretStr = queryItem.split('|')[0]

        // 校验登录
        let checkUserResult = await setHeaders(superagent.post('https://kyfw.12306.cn/otn/login/checkUser'))
            .send({
                _json_att: ''
            });
        console.log('checkUserResult', checkUserResult.text);
        let checkUserData = JSON.parse(checkUserResult.text);
        if (!checkUserData.data.flag) {
            throw new Error('cookie失效');
            return false;
        }

        // 预订
        let submitOrderRequestResult = await setHeaders(superagent.post('https://kyfw.12306.cn/otn/leftTicket/submitOrderRequest'))
            .send({
                secretStr: decodeURIComponent(queryParams.secretStr),
                train_date: queryParams.queryDate,
                back_train_date: moment().format("YYYY-MM-DD"),
                tour_flag: 'dc',
                purpose_codes: 'ADULT',
                query_from_station_name: queryParams.fromCiteText,
                query_to_station_name: queryParams.toCiteText,
                undefined: ''
            });
        console.log('submitOrderRequestResult', submitOrderRequestResult.text);
        let checkUserrData = JSON.parse(submitOrderRequestResult.text);
    } catch (e) {
        console.log('异常', e);
        getCodeImage({
            sendmail: true
        });
    }
}

setTimeout(start, 3000);
setInterval(start, 1 * 60 * 1000);
