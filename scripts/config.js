const redis = require('redis');
const redisDb = redis.createClient(6379, 'localhost');
// const redisDb = redis.createClient(6379, '39.108.161.237');
let userCookie = 'JSESSIONID=9032181F66FBA8B98C78B038B2FFC61D; tk=bzUFTKw-tnQ12SxSSH7z4i6qdlecMqE9AA6tVxjekk0xhy1y0; _jc_save_wfdc_flag=dc; BIGipServerotn=535298314.50210.0000; RAIL_EXPIRATION=1578413544697; RAIL_DEVICEID=IpwYVKNMh6Tizi15NP58IE-ZKG7UzuFqxsvybQG0VQ5h3ni6cPbjVWjQk2o2wuTWDhgbPx0-DgveztEB7XX1X0NY6sYbUBNy9bSddRWJbBfYzRUAsVmdXyS-UGJcaFdmdCWHwieKKQqJ3VEiSMTPpj7hNXBM_CP3; BIGipServerpassport=921174282.50215.0000; route=c5c62a339e7744272a54643b3be5bf64; _jc_save_toDate=2020-01-04; _jc_save_fromStation=%u90B5%u9633%2CSYQ; _jc_save_toStation=%u6DF1%u5733%u5317%2CIOQ; _jc_save_fromDate=2020-01-04';

redisDb.get('userCookie', function (err, v) {
    v && (userCookie = v);
});

module.exports = {
    redisDb,
    queryCookie: 'JSESSIONID=9A14BCDDEEBAA3F8C1523E93030752E6; route=6f50b51faa11b987e576cdb301e545c4; BIGipServerotn=3772186890.24610.0000; _jc_save_fromStation=%u5317%u4EAC%2CBJP; _jc_save_toStation=%u957F%u6C99%2CCSQ; _jc_save_fromDate=2020-01-02; _jc_save_toDate=2020-01-02; _jc_save_wfdc_flag=dc; RAIL_EXPIRATION=1578230858671; RAIL_DEVICEID=ofBYBSqCHFoBVY_ziHto3hT-TeGAyC1zz_Ltx9YSh_n70MEAipVDgiH5jetjjbBZiHqdrRNwfuTDqbXdE9c1fQMS4615qcWtyksnluou3wtHEr0_JaOPxUybxIBeUgjXEATxDU9HEAkom0R-SoTYnIRMIxlMuu5G',
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
        intervalTime: 1000,
        queryListParams: [
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
                userIndex: 3,
                isEnd: false,
                queryDates: [
                    '2020-01-20'
                ],
                citeCodes: [
                    {
                        fromCode: 'SZQ',
                        fromCiteText: '深圳',
                        toCode: 'PXG',
                        toCiteText: '萍乡北'
                    }/*,
                    {
                        fromCode: 'SZQ',
                        fromCiteText: '深圳',
                        toCode: 'CSQ',
                        toCiteText: '长沙'
                    }*/
                ]
            },
            {
                userIndex: 0,
                isEnd: false,
                queryDates: [
                    '2020-01-17',
                    '2020-01-18',
                    '2020-01-19',
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
                    },
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
                    }
                ]
            }/*,
            {
                userIndex: 0,
                isEnd: false,
                queryDates: [
                    '2020-01-31',
                    '2020-02-01',
                    '2020-02-02',
                ],
                citeCodes: [
                    {
                        fromCode: 'KAQ',
                        fromCiteText: '怀化南',
                        toCode: 'IOQ',
                        toCiteText: '深圳北',
                        checi: [
                            'G6173',
                            'G6141'
                        ]
                    },
                    {
                        fromCode: 'LHA',
                        fromCiteText: '隆回',
                        toCode: 'IOQ',
                        toCiteText: '深圳北'
                    },
                    {
                        fromCode: 'SYQ',
                        fromCiteText: '邵阳',
                        toCode: 'IOQ',
                        toCiteText: '深圳北',
                        checi: [
                            'G6173',
                            'G6141'
                        ]
                    },
                    {
                        fromCode: 'LHA',
                        fromCiteText: '隆回',
                        toCode: 'IZQ',
                        toCiteText: '广州南'
                    }
                ]
            }*/
        ]
    }
}
