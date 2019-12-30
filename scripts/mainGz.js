// 广州-隆回入口
const queryList = require('./queryList');
const toCiteCodes = [
    {
        code: 'LHA',
        fromCode: 'GZQ',
        fromCiteText: '广州',
        toCiteText: '隆回'
    }
];

const queryDates = [
    '2020-01-22'
];

queryList(toCiteCodes, queryDates);
