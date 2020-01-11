const superagent = require('superagent');
const setHeaders = require('./setHeaders');
const utils = require('./utils');
const localConfig = require('./localConfig');
const config = require('./config');

module.exports = async (answer) => {
    await new Promise((resolve, reject) => {
        config.redisDb.get('userCookie', function (err, v) {
            if (err) {
                reject(err);
            } else {
                v && (config.userCookie = v);
                resolve(v);
            }
        });
    });

    /*let captchaResult = await setHeaders(superagent.get('https://kyfw.12306.cn/passport/captcha/captcha-image64'))
        .query({
            login_site: 'E',
            module: 'login',
            rand: 'sjrand'
        });

    utils.setCookies(captchaResult.res.headers['set-cookie']);
    if (captchaResult.body.result_code !== '0') {
        return console.log(captchaResult.body.result_message);
    }

    return console.log(captchaResult.body);*/

    let checkResult = await setHeaders(superagent.get('https://kyfw.12306.cn/passport/captcha/captcha-check'))
        .query({
            answer: answer,
            rand: 'sjrand',
            login_site: 'E'
        });

    utils.setCookies(checkResult.res.headers['set-cookie']);
    if (checkResult.body.result_code !== '4') {
        return console.log(checkResult.body.result_message);
    }

    let loginResult = await setHeaders(superagent.post('https://kyfw.12306.cn/passport/web/login'))
        .send({
            answer: answer,
            username: localConfig.username,
            password: localConfig.password,
            appid: 'otn',
            _json_att: '',
        });

    utils.setCookies(loginResult.res.headers['set-cookie']);
    if (loginResult.body.result_code !== 0) {
        return console.log(loginResult.body.result_message);
    }

    let uamtkResult = await setHeaders(superagent.post('https://kyfw.12306.cn/passport/web/auth/uamtk'))
        .send({
            appid: 'otn',
            _json_att: ''
        });

    utils.setCookies(uamtkResult.res.headers['set-cookie']);
    if (uamtkResult.body.result_code !== 0) {
        return console.log(uamtkResult.body.result_message);
    }

    let uamauthclientResult = await setHeaders(superagent.post('https://kyfw.12306.cn/otn/uamauthclient'))
        .send({
            tk: uamtkResult.body.newapptk,
            _json_att: ''
        });

    utils.setCookies(uamauthclientResult.res.headers['set-cookie']);
    if (uamauthclientResult.body.result_code !== 0) {
        return console.log(uamauthclientResult.body.result_message);
    }
    console.log(uamauthclientResult.body);
    return uamauthclientResult.body;
}
