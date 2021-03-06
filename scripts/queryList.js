// 查询有票车次
// 入口
const placeOrder = require('./placeOrder');
const {queryCookie} = require('./config');

module.exports = function ({QLP: queryListPrams, intervalTime}) {
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
                                fromCiteCode: code.fromCode,
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
                                return (code.checi ? code.checi.includes(arr[3]) : true) && arr[11] === 'Y' && ((arr[30] && arr[30] !== '无') || (arr[31] && arr[31] !== '无'));
                            });
                            if (!queryItem) {
                                console.log('无票', queryParams.queryDate + '-' + code.fromCode + '-' + code.code);
                            } else {
                                setTimeout(() => {
                                    console.log(queryParams.queryDate + '-' + code.fromCode + '-' + code.code + '有票', queryItem);
                                }, 2000)
                                if (!flag) {
                                    // 下单占位
                                    placeOrder({
                                        queryDate: queryParams.queryDate,
                                        fromCiteCode: queryParams.fromCiteCode,
                                        toCiteCode: queryParams.toCiteCode,
                                        fromCiteText: queryZData.data.map[queryParams.fromCiteCode] ||
                                            code.fromCiteText,
                                        toCiteText: queryZData.data.map[queryParams.toCiteCode] || code.toCiteText,
                                        secretStr: queryItem.split('|')[0],
                                        userIndex: userIndex
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
            }, intervalTime || 3000);
        }, err => {
            console.log(err);
        });
    }

    return {
        stop () {
            flag = true;
        }
    }
}
