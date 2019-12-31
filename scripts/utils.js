const config = require('./config');

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
    }
}
