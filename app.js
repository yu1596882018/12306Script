const Koa = require('koa');
const path = require('path');
const serve = require('koa-static');
const logger = require('koa-logger');
const Router = require('koa-router');
const getCodeImage = require('./scripts/getCodeImage');
const config = require('./scripts/config');
const authCookie = require('./scripts/authCookie');
const queryList = require('./scripts/queryList');
require('./scripts/loopCheckUser');
let querySample = queryList(config.queryOptions.toCiteCodes, config.queryOptions.queryDates, 1000, 0);

const App = new Koa();

//绑定中间件
App.use(logger())
    .use(serve(path.join(__dirname, './static')), {
        maxage: 10 * 60 * 1000
    });

// 路由注册
const router = new Router();

// 获取验证码
router.get('/getCode', async (ctx) => {
    let image = config.codeImages[ctx.query.key];
    ctx.body = image;
});

// 提交验证码
router.get('/submitCode', async (ctx) => {
    ctx.body = await authCookie(ctx.query.answer);
    if (ctx.body.result_code === 0) {
        querySample.stop();
        querySample = queryList(config.queryOptions.toCiteCodes, config.queryOptions.queryDates, 1000, 0);
    }
});

// 更新
router.get('/refreshCode', async (ctx) => {
    ctx.body = await getCodeImage();
});

App.use(router.routes()).use(router.allowedMethods());

App.listen(8899, function (res) {
    console.log('启动');
});
