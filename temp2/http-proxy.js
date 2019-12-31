const Koa2 = require('koa2');
const logger = require('koa-logger');
const k2c = require('koa2-connect');
var httpProxy = require('http-proxy-middleware');

const app = new Koa2();

app.use(logger())

app.use(async (ctx, next) => {
    ctx.respond = false;
    await k2c(httpProxy({
            target: 'http://192.168.56.1:9999',
            // target: 'https://kyfw.12306.cn/otn/leftTicket/queryZ',
            changeOrigin: true,
            secure: false
        }
    ))(ctx, next);
    await next()
})

app.listen(8888, () => {
    console.log('启动成功', 'http://' + getIPAdress() + ':8888');
});

function getIPAdress () { // 获取本机主机名和ip
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}
