// 深圳-昆明
const queryList = require('./queryList');
const toCiteCodes = [
    {
        fromCode: 'IOQ',
        fromCiteText: '深圳北',
        code: 'KOM',
        toCiteText: '昆明南'
    }
];

const queryDates = [
    '2020-01-22'
];

module.exports = function () {
    return queryList(toCiteCodes, queryDates, 1000, 4);
}
