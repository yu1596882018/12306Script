// 深圳-萍乡
const queryList = require('./queryList');
const toCiteCodes = [
    {
        fromCode: 'IOQ',
        fromCiteText: '深圳北',
        code: 'PXG',
        toCiteText: '萍乡北'
    },
    {
        fromCode: 'IZQ',
        fromCiteText: '广州南',
        code: 'PXG',
        toCiteText: '萍乡北'
    },
    {
        fromCode: 'IOQ',
        fromCiteText: '深圳北',
        code: 'CWQ',
        toCiteText: '长沙南'
    }
];

const queryDates = [
    '2020-01-20'
];

module.exports = function () {
    return queryList(toCiteCodes, queryDates, 3000);
}
