// 校验是否登录状态
const superagent = require('superagent');
const setHeaders = require('./setHeaders');
const getCodeImage = require('./getCodeImage');
/*
const start = async () => {
    let checkUserResult = await setHeaders(superagent.post('https://kyfw.12306.cn/otn/login/checkUser'))
        .send({
            _json_att: ''
        });
    console.log('checkUserResult', checkUserResult.text);
    let checkUserData = JSON.parse(checkUserResult.text);
    if (!checkUserData.data.flag) {
        console.log('cookie失效');
        getCodeImage({
            sendmail: true
        });
    }
}*/

const start = async () => {
    let chechFaceResult = await setHeaders(superagent.post('https://kyfw.12306.cn/otn/afterNate/chechFace'))
        .send({
            secretList: `q0ayjkIIX64yKjLwF6K7dCIDp25C4iVs5L3m2ybXBNNyxW%2FFjsLU29yawLt2XGdqYZQv%2F9G7R1fA%0AbPUUb1BOHw7PZgJ87sUI3PLmKIRLhXkAoaWejL4IF45A%2Be7TrF4pQOZaUB4Bu5Xvm4Bnr6%2BZz95M%0A7%2FHKPaViGh0Jm1J5Nkzq0mwRgKAAMwfweEmLuHlanN2JsGMahUqEkFJcXB5MNhYwuTV95WNdNXjx%0ASIS2do31TfB2CKDBVAzgNF6%2FzIwyuYIY06LzNKPvnRgEt%2BFTdMhYfsleQDOZI2Hw64YWwhyhoV2p%0A#9|`,
            _json_att: ''
        });
    // console.log('checkUserResult', checkUserResult.text);
    // let checkUserData = JSON.parse(checkUserResult.text);
    let checkUserData = chechFaceResult.body;
    console.log(chechFaceResult.body)
    if (checkUserData.status && !checkUserData.data.login_flag) {
        console.log('cookie失效');
        getCodeImage({
            sendmail: true
        });
    }
}

setTimeout(start, 3000);
setInterval(start, 30 * 60 * 1000);
