const config = require('./config');
const localConfig = require('./localConfig');
const nodemailer = require("nodemailer");

module.exports = {
    setCookies (params) {
        if (!Array.isArray(params)) return false;
        let cookieObj = {};
        config.userCookie.split(';').forEach(item => {
            let itemArr = item.split('=');
            cookieObj[itemArr[0].trim()] = itemArr[1];
        });
        params.forEach(item => {
            let arr = item.split(';');
            let arr2 = arr[0].split('=');
            cookieObj[arr2[0]] = arr2[1];
        });


        config.userCookie = Object.keys(cookieObj).map(key => {
            return `${key}=${cookieObj[key]}`;
        }).join('; ');
    },
    sendMail (opts) {
        async function main () {
            let testAccount = await nodemailer.createTestAccount();
            let transporter = nodemailer.createTransport({
                host: "smtp.qq.com",
                port: 465,
                secure: true,
                auth: {
                    user: localConfig.emailUser,
                    pass: localConfig.emailPass
                }
            });

            let info = await transporter.sendMail(Object.assign({
                from: '"烟竹" <1596882018@qq.com>',
                to: "1596882018@qq.com"
            }, opts));

            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        }

        main().catch(console.error);
    }
}
