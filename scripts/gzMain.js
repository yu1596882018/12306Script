// 广州-邵阳入口
const queryList = require('./queryList');
const toCiteCodes = [
    {
        code: 'SYQ',
        fromCode: 'GZQ',
        fromCiteText: '广州',
        toCiteText: '邵阳'
    }
];

const queryDates = [
    '2020-01-21',
    '2020-01-22',
    '2020-01-23'
];
queryList(toCiteCodes, queryDates);
