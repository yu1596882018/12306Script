const redis = require('redis');
const localConfig = require('./localConfig');
const redisDb = redis.createClient(6379, localConfig.redisHost);
const redisPub = redis.createClient(6379, localConfig.redisHost);
const redisSub = redis.createClient(6379, localConfig.redisHost);
let userCookie = 'JSESSIONID=68DE645B3FC048D4E9346D8EB10546D7; tk=rkXOL2t0qTOB8b_S5_N21f95MlvNwh6TFT9U30FJJssnxy1y0; _jc_save_wfdc_flag=dc; _jc_save_fromStation=%u6DF1%u5733%u5317%2CIOQ; _jc_save_toStation=%u9686%u56DE%2CLHA; BIGipServerotn=1978138890.50210.0000; BIGipServerpassport=837288202.50215.0000; RAIL_EXPIRATION=1579043915275; RAIL_DEVICEID=GSTWBXJRfxXI-pQb4HBLATGmYDPxbQ5lWEOO3WAle9DuKOJlMw06KPwfZxJWebSmfa5U8i-gk-TQ_yOw6_Zop_KRY7JcOWEn2EUaew0mn22F6JKiTizDyjkEneF3EBOn9YsvXtzvNInXy-kSjLFU7CyDL0rFMNqI; route=9036359bb8a8a461c164a04f8f50b252; _jc_save_toDate=2020-01-11; _jc_save_fromDate=2020-02-03';

redisDb.get('userCookie', function (err, v) {
    v && (userCookie = v);
});

module.exports = {
    redisPub,
    redisSub,
    redisDb,
    queryCookie: 'JSESSIONID=553F0776B0BF844198CE61C7AA7C53B8; BIGipServerpassport=837288202.50215.0000; BIGipServerotn=4074176778.24610.0000; RAIL_EXPIRATION=1579177283490; RAIL_DEVICEID=K0WBD1Ahww1yJe394XZr9L4AMiUev5hYfJdj5zVA3l5LFK5YAgi3mcsmSgFI-TY3jM9f6PNScxVVjGBzM6fsyqF9qgw4cQaTgxoII4xv-iRNekWz_zeZoqcVL0SQSgVwoIQJZzH4CcoFN8d67L_oNBPqYFHloNFI; route=c5c62a339e7744272a54643b3be5bf64; _jc_save_fromStation=%u6DF1%u5733%2CSZQ; _jc_save_toStation=%u957F%u6C99%2CCSQ; _jc_save_fromDate=2020-01-20; _jc_save_toDate=2020-01-13; _jc_save_wfdc_flag=dc',
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
                userIndex: 3,
                isEnd: false,
                queryDates: [
                    '2020-02-01',
                    '2020-02-02',
                ],
                citeCodes: [
                    {
                        toCode: 'SZQ',
                        toCiteText: '深圳',
                        fromCode: 'PXG',
                        fromCiteText: '萍乡北'
                    },
                    {
                        toCode: 'SZQ',
                        toCiteText: '深圳',
                        fromCode: 'CSQ',
                        fromCiteText: '长沙'
                    }
                ]
            },
            {
                userIndex: 5,
                isEnd: false,
                queryDates: [
                    '2020-01-20',
                    '2020-01-21',
                ],
                citeCodes: [
                    {
                        fromCode: 'BJP',
                        fromCiteText: '北京西',
                        toCode: 'CSQ',
                        toCiteText: '长沙南',
                        /*checi: [
                            'G403',
                            'G79'
                        ]*/
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
