// 深圳-隆回入口
const queryList = require('./queryList');
const toCiteCodes = [
    {
        code: 'LHA',
        fromCode: 'SZQ',
        fromCiteText: '深圳',
        toCiteText: '隆回'
    },
    {
        code: 'SYQ',
        fromCode: 'SZQ',
        fromCiteText: '深圳',
        toCiteText: '邵阳',
        checi: ['G6142', 'G6174']
    },
    {
        code: 'KAQ',
        fromCode: 'SZQ',
        fromCiteText: '深圳',
        toCiteText: '怀化南',
        checi: ['G6142', 'G6174']
    }
];

const queryDates = [
    '2020-01-22'
];
queryList(toCiteCodes, queryDates);
