const superagent = require('superagent');
const setHeaders = require('./setHeaders');
// setHeaders(superagent.get('http://192.168.56.1:9999'))
setHeaders(superagent.get('https://kyfw.12306.cn/otn/leftTicket/queryZ'))
    .query({
        'leftTicketDTO.train_date': '2020-01-03',
        'leftTicketDTO.from_station': 'SZQ',
        'leftTicketDTO.to_station': 'LHA',
        purpose_codes: 'ADULT'
    }).end((err, res) => {
    if (err) throw err;
    console.log(typeof res.text);
});
