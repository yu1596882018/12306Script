const nodemailer = require("nodemailer");

module.exports = (key, opt = {}) => {
// async..await is not allowed in global scope, must use a wrapper
    async function main () {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.qq.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: '1596882018@qq.com', // generated ethereal user
                pass: 'frlogvlerobwfhfe' // generated ethereal password
            }
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"烟竹" <1596882018@qq.com>', // sender address
            to: "1596882018@qq.com", // list of receivers
            subject: "校验验证码", // Subject line
            // html: `<a href="http://localhost:8899/autoCode.html?key=${key}">${opt.flag ? opt.flag : '登录状态失效，'}前往验证</a>` // html body
            html: `<a href="http://www.xinyu8.wang/autoCode.html?key=${key}">${opt.flag ? opt.flag : '登录状态失效，'}前往验证</a>` // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }

    main().catch(console.error);
}
