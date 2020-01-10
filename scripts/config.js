const redis = require('redis');
const localConfig = require('./localConfig');
const redisDb = redis.createClient(6379, localConfig.redisHost);
const redisPub = redis.createClient(6379, localConfig.redisHost);
const redisSub = redis.createClient(6379, localConfig.redisHost);
let userCookie = 'JSESSIONID=260BD9D8E264F05EE498620C6EF7AF8F; tk=dKcwH3nDvWQ3Jfup-FXQarwpUpqStruwAWBhu43_xtAziy1y0; RAIL_EXPIRATION=1578937366769; RAIL_DEVICEID=itFEIr2jhzf7m8hZPc4Il6S9wlQLop2BAcGr6MTeiFob_7k5V2xLjcOfnA1TYoGjZ7D-8CZZvL86_g6BPIY6HdVzu1ZRHlWu5LJ16lLuZ0a5LOzmr-88cGaQlWumoRvQ4RRN2bvnCLfareY8WC6NRZssLOcbsF7V; _jc_save_toDate=2020-01-10; _jc_save_wfdc_flag=dc; BIGipServerpassport=803733770.50215.0000; route=495c805987d0f5c8c84b14f60212447d; BIGipServerotn=552075530.64545.0000; _jc_save_fromStation=%u5E7F%u5DDE%u5357%2CIZQ; _jc_save_toStation=%u6000%u5316%u5357%2CKAQ; _jc_save_fromDate=2020-02-07';

redisDb.get('userCookie', function (err, v) {
    // v && (userCookie = v);
});

module.exports = {
    redisPub,
    redisSub,
    redisDb,
    queryCookie: 'JSESSIONID=ABE6498DE5F9EE78BAF7330722EFF48D; BIGipServerpassport=803733770.50215.0000; BIGipServerotn=1658388746.64545.0000; RAIL_EXPIRATION=1578937366769; RAIL_DEVICEID=itFEIr2jhzf7m8hZPc4Il6S9wlQLop2BAcGr6MTeiFob_7k5V2xLjcOfnA1TYoGjZ7D-8CZZvL86_g6BPIY6HdVzu1ZRHlWu5LJ16lLuZ0a5LOzmr-88cGaQlWumoRvQ4RRN2bvnCLfareY8WC6NRZssLOcbsF7V; route=6f50b51faa11b987e576cdb301e545c4; _jc_save_fromStation=%u6DF1%u5733%2CSZQ; _jc_save_toStation=%u957F%u6C99%2CCSQ; _jc_save_fromDate=2020-01-20; _jc_save_toDate=2020-01-10; _jc_save_wfdc_flag=dc',
    set userCookie (value) {
        redisDb.set('userCookie', value);
        userCookie = value;
    },
    get userCookie () {
        return userCookie;
    },
    userIndex: 3,
    userList: [
        {
            passengerTicketStr: ',0,1,王鑫宇,1,4305***********07X,,N,e271857d7ae6ac3eb9bf28977ba10d922046fe2ff813868c510734672c2af342',
            oldPassengerStr: '王鑫宇,1,4305***********07X,1_'
        },
        {
            passengerTicketStr: ',0,1,王小康,1,4305***********061,18620340280,N,f8902b6d4122c7c6d692858ec080717a29b7c37717eacca08b54cbc20bbeb1c3bbb71e668c295e2e3fb430bb3ee0b00b',
            oldPassengerStr: '王小康,1,4305***********061,1_'
        },
        {
            passengerTicketStr: ',0,1,张志,1,4211***********618,,N,0f7e1f7e9b2f96c2d388be88577331cad64339173279d33b6a2aeaeef8dd30c0',
            oldPassengerStr: '张志,1,4211***********618,1_'
        },
        {
            passengerTicketStr: ',0,1,曾洪,1,3603***********067,,N,480a7ac44c891a57deaa0e81620cc8d0616ea8119f7444367185d55994d695b6',
            oldPassengerStr: '曾洪,1,3603***********067,1_'
        },
        {
            passengerTicketStr: ',0,1,梅俊涛,1,5303***********216,,N,741370a86e54a6822104c78c9510d588e9282b975fa46c0fafab52d31fa6ef84',
            oldPassengerStr: '梅俊涛,1,5303***********216,1_'
        },
        {
            passengerTicketStr: ',0,1,李俊,1,4310***********415,,N,ded9fe206d7fce7a8fdb4a4a1410c524f237ed8bd15f2d8708e8fecc11e6c297',
            oldPassengerStr: '李俊,1,4310***********415,1_'
        }
    ],
    codeImages: {},
    queryOptions: {
        intervalTime: 500,
        queryListParams: [
            {
                userIndex: 4,
                isEnd: false,
                queryDates: [
                    '2020-02-02',
                    '2020-01-22',
                    '2020-02-03',
                ],
                citeCodes: [
                    {
                        fromCode: 'KMM',
                        fromCiteText: '昆明',
                        toCode: 'SZQ',
                        toCiteText: '深圳',
                        seatType: ['O']
                    }
                ]
            },
            {
                userIndex: 0,
                isEnd: false,
                queryDates: [
                    '2020-02-01',
                ],
                citeCodes: [
                    {
                        fromCode: 'KAQ',
                        fromCiteText: '怀化南',
                        toCode: 'IOQ',
                        toCiteText: '深圳北',
                        checi: [
                            'G6173'
                        ]
                    }
                ]
            },
            {
                userIndex: 3,
                isEnd: false,
                queryDates: [
                    '2020-01-20',
                    '2020-01-21'
                ],
                citeCodes: [
                    {
                        fromCode: 'SZQ',
                        fromCiteText: '深圳',
                        toCode: 'PXG',
                        toCiteText: '萍乡北'
                    },
                    {
                        fromCode: 'SZQ',
                        fromCiteText: '深圳',
                        toCode: 'CSQ',
                        toCiteText: '长沙',
                        // refuseCheci: ['G6024'],
                        scheduleTime: {
                            startTime: '07:30',
                            endTime: '21:00'
                        }
                    }
                ]
            },
            {
                userIndex: 5,
                isEnd: false,
                queryDates: [
                    '2020-01-20'
                ],
                citeCodes: [
                    {
                        fromCode: 'BJP',
                        fromCiteText: '北京西',
                        toCode: 'CSQ',
                        toCiteText: '长沙南',
                        checi: [
                            'G403',
                            'G79'
                        ]
                    }
                ]
            },
            {
                userIndex: 0,
                isEnd: true,
                queryDates: [
                    '2020-01-17',
                ],
                citeCodes: [
                    {
                        fromCode: 'SZQ',
                        fromCiteText: '深圳',
                        toCode: 'GZQ',
                        toCiteText: '广州',
                        scheduleToSiteCode: 'IZQ',
                        scheduleTime: {
                            startTime: '18:00',
                            endTime: ''
                        }
                    }
                ]
            },
            {
                userIndex: 4,
                isEnd: false,
                queryDates: [
                    '2020-01-17',
                    '2020-01-18'
                ],
                citeCodes: [
                    {
                        fromCode: 'IOQ',
                        fromCiteText: '深圳北',
                        toCode: 'KAQ',
                        toCiteText: '怀化南',
                        checi: [
                            'G6174',
                            'G6142'
                        ]
                    }/*,
                    {
                        fromCode: 'IOQ',
                        fromCiteText: '深圳北',
                        toCode: 'LHA',
                        toCiteText: '隆回'
                    },
                    {
                        fromCode: 'IOQ',
                        fromCiteText: '深圳北',
                        toCode: 'SYQ',
                        toCiteText: '邵阳',
                        checi: [
                            'G6174',
                            'G6142'
                        ]
                    },
                    {
                        fromCode: 'IZQ',
                        fromCiteText: '广州南',
                        toCode: 'LHA',
                        toCiteText: '隆回'
                    }*/
                ]
            },
            {
                userIndex: 0,
                isEnd: true,
                queryDates: [
                    '2020-01-17',
                    '2020-01-18',
                ],
                citeCodes: [
                    {
                        fromCode: 'SZQ',
                        fromCiteText: '深圳',
                        toCode: 'SYQ',
                        toCiteText: '邵阳'
                    },
                    {
                        fromCode: 'GZQ',
                        fromCiteText: '广州',
                        toCode: 'SYQ',
                        toCiteText: '邵阳'
                    },
                    {
                        fromCode: 'SZQ',
                        fromCiteText: '深圳',
                        toCode: 'KAQ',
                        toCiteText: '怀化南',
                        checi: [
                            'G6174',
                            'G6142',
                        ]
                    },
                    {
                        fromCode: 'GZQ',
                        fromCiteText: '广州',
                        toCode: 'KAQ',
                        toCiteText: '怀化南',
                        checi: [
                            "G9630", "G6170", "G6142", "G6174", "G6172", "G9624", "G2956", "G9632", "G6152", "G9622"
                        ]
                    },
                ]
            }
        ]
    }
}
