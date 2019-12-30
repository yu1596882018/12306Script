// 深圳-广州入口
const queryList = require('./queryList');
const toCiteCodes = [
    {
        fromCode: 'SZQ',
        fromCiteText: '深圳',
        code: 'IZQ',
        toCiteText: '广州南',
        checi: [
            'G6216',
            'G6310',
            'G6510'
        ]
    }
];

const queryDates = [
    '2020-01-21'
];

queryList(toCiteCodes, queryDates);
