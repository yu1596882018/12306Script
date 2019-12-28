// 入口
const placeOrder = require('./placeOrder');
let queryCookie = 'JSESSIONID=976F358D2D95CE6C2BFFF9FCDFE4DC55; BIGipServerpassport=1005060362.50215.0000; route=c5c62a339e7744272a54643b3be5bf64; BIGipServerotn=1490616586.24610.0000; RAIL_EXPIRATION=1577786430782; RAIL_DEVICEID=Vz1cns7-qnApMswSTwMqqX1Z9iQteFsJpiIaLcU1H7zD4NYy3C_HCvJ62wJMj13uC_28eC2GdFZT5Z4wehsLTJIpeYvzP9a9NI2juRUlXsgmbOEUYskPyOFf9STgHZtzCyuEBHCvxQIWTCVNnlMTptx2q0sBM16n; _jc_save_fromStation=%u6DF1%u5733%2CSZQ; _jc_save_toStation=%u9686%u56DE%2CLHA; _jc_save_fromDate=2020-01-03; _jc_save_toDate=2019-12-27; _jc_save_wfdc_flag=dc';

(async function () {
    const toCiteCodes = [
        {
            code: 'LHA'
        },
        {
            code: 'SYQ',
            checi: ['G6142', 'G6174']
        },
        {
            code: 'KAQ',
            checi: ['G6142', 'G6174']
        }
    ];

    const queryDates = [
        '2020-01-18',
        '2020-01-19',
        '2020-01-20',
        '2020-01-21',
        '2020-01-22',
        '2020-01-23'
    ];

    let flag = false;

    const superagent = require('superagent');
    const setHeaders = require('./setHeaders');

    startFunc();

    function startFunc () {
        var pros = [];
        queryDates.forEach(queryDate => {
            toCiteCodes.forEach(async code => {
                pros.push(new Promise(async (resolve, reject) => {
                    try {
                        if (!flag) {
                            const queryParams = {
                                fromCiteCode: 'SZQ',
                                toCiteCode: code.code,
                                queryDate: queryDate
                            };

                            // 查询
                            let queryZResult = await setHeaders(superagent.get('https://kyfw.12306.cn/otn/leftTicket/queryZ'), queryCookie)
                                .query({
                                    'leftTicketDTO.train_date': queryParams.queryDate,
                                    'leftTicketDTO.from_station': queryParams.fromCiteCode,
                                    'leftTicketDTO.to_station': queryParams.toCiteCode,
                                    purpose_codes: 'ADULT'
                                });
                            // console.log('queryZResult', queryZResult.text);
                            let queryZData = JSON.parse(queryZResult.text);
                            let queryItem = queryZData.data.result.find(item => {
                                let arr = item.split('|');
                                return (code.checi ? code.checi.includes(arr[3]) : true) && arr[11] === 'Y' && arr[30] !== '无' && arr[31] !== '无';
                            });
                            if (!queryItem) {
                                console.log('无票', queryParams.queryDate + code.code);
                            } else {
                                setTimeout(() => {
                                    console.log(queryItem, queryParams.queryDate + code.code + '有票');
                                }, 2000)
                                if (!flag) {
                                    // 下单占位
                                    placeOrder({
                                        queryDate: queryParams.queryDate,
                                        fromCiteCode: queryParams.fromCiteCode,
                                        toCiteCode: queryParams.toCiteCode,
                                        fromCiteText: '深圳',
                                        toCiteText: queryZData.data.map[queryParams.toCiteCode],
                                        secretStr: queryItem.split('|')[0]
                                    });
                                }
                                flag = true;
                            }
                            resolve();
                        } else {
                            console.log('结束');
                            reject();
                        }
                    } catch (e) {
                        reject();
                        throw e;
                    }

                }));
            });
        });

        Promise.all(pros).then(res => {
            setTimeout(() => {
                startFunc();
            }, 3000);
        });
    }
})();

