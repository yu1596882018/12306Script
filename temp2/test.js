var redis = require("redis");
var client = redis.createClient(6379, '39.108.161.237');/*, pub = redis.createClient(6379, '39.108.161.237');
var msg_count = 0;

sub.on("subscribe", function (channel, count) {
    pub.publish("a nice channel", "I am sending a message.");
    pub.publish("a nice channel", "I am sending a second message.");
    pub.publish("a nice channel", "I am sending my last message.");
});

sub.on("message", function (channel, message) {
    console.log("sub channel " + channel + ": " + message);
    msg_count += 1;
    if (msg_count === 3) {
        sub.unsubscribe();
        sub.quit();
        pub.quit();
    }
});

sub.subscribe("a nice channel");
*/

client.hset('codeImages', '62cd0e10-3374-11ea-a8ac-634c71af5e44', 'value', redis.print);


(async () => {
    let result = await new Promise((resolve, reject) => {
        client.hget('codeImages', '62cd0e10-3374-11ea-a8ac-634c71af5e44', (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
    console.log(result)
})()
