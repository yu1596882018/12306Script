const Koa = require('koa');
const path = require('path');
const serve = require('koa-static');
const logger = require('koa-logger');
const Router = require('koa-router');
const getCodeImage = require('./scripts/getCodeImage');
const config = require('./scripts/config');
const {redisDb} = config;
const authCookie = require('./scripts/authCookie');
const queryList = require('./scripts/queryList2');
// require('./scripts/loopCheckUser');
let querySample = queryList(config.queryOptions);

const App = new Koa();

//绑定中间件
App.use(logger())
    .use(serve(path.join(__dirname, './static')), {
        maxage: 10 * 60 * 1000
    });

// 路由注册
const router = new Router();


redisDb.on("subscribe", function (channel, count) {
    console.log(`${channel}订阅成功`);
});

redisDb.on("message", function (channel, message) {
    if (channel == 'app') {
        if (message == 'updateCookie') {
            redisDb.get('userCookie', function (err, v) {
                v && (config.userCookie = v);
                querySample.stop();
                querySample = queryList(config.queryOptions);
            });
        }
    }
});

redisDb.subscribe('app');


// 获取验证码
router.get('/getCode', async (ctx) => {
    // let image = config.codeImages[ctx.query.key];
    let image = await new Promise((resolve, reject) => {
        client.hget('codeImages', ctx.query.key, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
    ctx.body = image;
});

// 提交验证码
router.get('/submitCode', async (ctx) => {
    ctx.body = await authCookie(ctx.query.answer);
    if (ctx.body.result_code === 0) {
        redisDb.publish('app', 'updateCookie');
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
