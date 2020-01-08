// 查询有票车次
const superagent = require('superagent');
const setHeaders = require('./setHeaders');
const placeOrder = require('./placeOrder');
const {queryCookie} = require('./config');

module.exports = function ({queryListParams: QLP, intervalTime}) {
    let isStopFlog = false;
    QLP.forEach(item => {
        if (!item.isEnd) {
            queryFunc();

            function queryFunc () {
                if (new Date().getHours() < 6 || new Date().getHours() >= 23) {
                    return setTimeout(queryFunc, 60 * 60 * 1000);
                }
                let pros = [];
                let flog = false;

                item.queryDates.forEach(queryDate => {
                    item.citeCodes.forEach(queryOpt => {
                        pros.push(new Promise(async (resolve, reject) => {
                            try {
                                // 查询
                                let queryZResult = await setHeaders(superagent.get('https://kyfw.12306.cn/otn/leftTicket/queryZ'), queryCookie)
                                    .query({
                                        'leftTicketDTO.train_date': queryDate,
                                        'leftTicketDTO.from_station': queryOpt.fromCode,
                                        'leftTicketDTO.to_station': queryOpt.toCode,
                                        purpose_codes: 'ADULT'
                                    });
                                // console.log(queryZResult.body);
                                // 筛选最优车次
                                let resultItem = filterItem(queryZResult.body.data.result, queryOpt);
                                if (resultItem) {
                                    console.log('有票', `${queryDate}-${queryOpt.fromCiteText}-${queryOpt.toCiteText}`);
                                    if (!item.isEnd && !flog) {
                                        let citeMap = queryZResult.body.data.map;
                                        placeOrder({
                                            queryDate: queryDate,
                                            fromCiteCode: queryOpt.fromCode,
                                            toCiteCode: queryOpt.toCode,
                                            fromCiteText: citeMap[queryOpt.fromCode] || queryOpt.fromCiteText,
                                            toCiteText: citeMap[queryOpt.toCode] || queryOpt.toCiteText,
                                            secretStr: resultItem.data[0],
                                            userIndex: item.userIndex
                                        }, item);
                                        flog = true;
                                    }
                                    reject(new Error('有'));
                                } else {
                                    console.log('无票', `${queryDate}-${queryOpt.fromCiteText}-${queryOpt.toCiteText}`);
                                    resolve('无');
                                }
                            } catch (e) {
                                reject(e);
                                throw e;
                            }

                        }));
                    });
                });

                Promise.all(pros).then(res => {
                    if (!isStopFlog) {
                        setTimeout(queryFunc, intervalTime || 5000);
                    }
                }, err => {
                    if (err.message !== '有') {
                        setTimeout(queryFunc, 10 * 60 * 1000);
                    }
                    throw err;
                });
            }
        }
    });

    return {
        stop () {
            isStopFlog = true;
        }
    }
}

// 筛选最优车次
function filterItem (data, queryOpt = {}) {
    let items = data
    if (queryOpt.scheduleTime) {
        items = items.filter(item => {
            let arr = item.split('|')
            let currentTime = +arr[8].replace(':', '')
            if (queryOpt.scheduleTime.startTime) {
                if (currentTime < +queryOpt.scheduleTime.startTime.replace(':', '')) {
                    return false
                }
            }

            if (queryOpt.scheduleTime.endTime) {
                if (currentTime > +queryOpt.scheduleTime.endTime.replace(':', '')) {
                    return false
                }
            }

            if (queryOpt.scheduleToSiteCode && arr[7] !== queryOpt.scheduleToSiteCode) {
                return false
            }

            return true
        })
    }

    items = items.filter(item => {
        let arr = item.split('|');
        return (queryOpt.checi ? queryOpt.checi.includes(arr[3]) : true) && arr[11] === 'Y' && ((arr[30] && arr[30] !== '无') || (arr[31] && arr[31] !== '无'))
    }).map(item => {
        let arr = item.split('|')
        let O, M;
        if (!arr[30] || arr[30] === '无') {
            O = 0;
        } else {
            O = arr[30];
        }

        if (!arr[31] || arr[31] === '无') {
            M = 0;
        } else {
            M = arr[31];
        }

        return {
            data: arr,
            O,
            M
        }
    });

    // 按所选车次排序
    if (queryOpt.checi) {
        items = queryOpt.checi.map(item => {
            return items.find(item2 => {
                return item === item2.data[3];
            });
        }).filter(item => item);
    }

    let item = items.find(item => {
        return item.O;
    });

    if (!item) {
        item = items.find(item => {
            return item.M;
        });
    }

    return item;
}
