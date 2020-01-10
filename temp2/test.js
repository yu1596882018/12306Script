/*
const Koa = require('koa');

const app = new Koa();

app.use((res) => {
    console.log(res.url)
});
app.listen(5151, () => {
    console.log('开启成功');
});
*/
const request = require('superagent');
const setHeaders = require('./setHeaders');

setHeaders(request.get('http://127.0.0.1:5050/otn/leftTicket/queryZ?leftTicketDTO.train_date=2020-01-10&leftTicketDTO.from_station=SHH&leftTicketDTO.to_station=HYQ&purpose_codes=ADULT')).end((err, res) => {
    if (err) throw err;
    console.log(res);
});
