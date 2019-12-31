// 校验是否登录状态
const superagent = require('superagent');
const setHeaders = require('./setHeaders');
const getCodeImage = require('./getCodeImage');

const start = async () => {
    let checkUserResult = await setHeaders(superagent.post('https://kyfw.12306.cn/otn/login/checkUser'))
        .send({
            _json_att: ''
        });
    console.log('checkUserResult', checkUserResult.text);
    let checkUserData = JSON.parse(checkUserResult.text);
    if (!checkUserData.data.flag) {
        console.log('cookie失效');
        getCodeImage({
            sendmail: true
        });
    }
}
start();
setTimeout(start, 10 * 60 * 1000);
