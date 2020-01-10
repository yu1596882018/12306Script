const uuidv1 = require('uuid/v1');
const config = require('./config');
const superagent = require('superagent');
const setHeaders = require('./setHeaders');
const utils = require('./utils');
const sendmail = require('./sendmail');
const redis = require('redis');
module.exports = async (opt) => {
    let captchaResult = await setHeaders(superagent.get('https://kyfw.12306.cn/passport/captcha/captcha-image64'))
        .query({
            login_site: 'E',
            module: 'login',
            rand: 'sjrand'
        });

    utils.setCookies(captchaResult.res.headers['set-cookie']);
    if (captchaResult.body.result_code !== '0') {
        return console.log(captchaResult.body.result_message);
    }
    let key = uuidv1();
    // config.codeImages[key] = captchaResult.body.image;
    config.redisDb.hset('codeImages', key, captchaResult.body.image, redis);
    if (opt && opt.sendmail) {
        sendmail(key, opt);
    }
    return key;
}
