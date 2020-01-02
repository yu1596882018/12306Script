// 北京-长沙
const queryList = require('./queryList');
const toCiteCodes = [
    {
        fromCode: 'BJP',
        fromCiteText: '北京西',
        code: 'CSQ',
        toCiteText: '长沙南'
    }
];

const queryDates = [
    '2020-01-20'
];

module.exports = function () {
    return queryList(toCiteCodes, queryDates, 3000, 0);
}
