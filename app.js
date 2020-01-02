const Koa = require('koa');
const path = require('path');
const serve = require('koa-static');
const logger = require('koa-logger');
const Router = require('koa-router');
const getCodeImage = require('./scripts/getCodeImage');
const config = require('./scripts/config');
const authCookie = require('./scripts/authCookie');
const mainPx = require('./scripts/mainPx');
const mainKm = require('./scripts/mainBj');
let main = mainPx();
let main2 = mainKm();
require('./scripts/loopCheckUser');

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
        main.stop();
        main2.stop();
        main = mainPx();
        main2 = mainKm();
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
