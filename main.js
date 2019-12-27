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

    const timer = setInterval(async function () {
        queryDates.forEach(queryDate => {
            toCiteCodes.forEach(async code => {
                try {
                    if (!flag) {
                        const queryParams = {
                            fromCiteCode: 'SZQ',
                            toCiteCode: code.code,
                            queryDate: queryDate
                        };

                        // 查询
                        let queryZResult = await setHeaders(superagent.get('https://kyfw.12306.cn/otn/leftTicket/queryZ'))
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
                            flag = true;
                        }
                    } else {
                        console.log('结束');
                        clearInterval(timer);
                    }
                } catch (e) {
                    clearInterval(timer);
                    throw e;
                }
            });
        });
    }, 1000);
})();
