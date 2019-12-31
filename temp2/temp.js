const superagent = require('superagent');
const request = require('request');
const setHeaders = require('./setHeaders');

(async () => {
    /*let dateNow = Date.now();
    request('https://kyfw.12306.cn/passport/captcha/captcha-image64', {
        data: {
            login_site: 'E',
            module: 'login',
            rand: 'sjrand',
            callback: 'jQuery191041087753391346116_' + dateNow,
            _json_att: '',
            _: dateNow + 113
        }
    }, (err, res, body) => {
        if (err) throw err;
        let data = JSON.parse(body);
        console.log(res.headers['set-cookie']);
    });*/

    let dateNow = Date.now();
    /*request('https://kyfw.12306.cn/passport/captcha/captcha-check', {
        headers: {
            'cookie': 'JSESSIONID=3F7463D04E4E6D40E350B2851172D378; _jc_save_toDate=2019-12-30; _jc_save_wfdc_flag=dc; route=6f50b51faa11b987e576cdb301e545c4; BIGipServerotn=1926824202.64545.0000; BIGipServerpassport=803733770.50215.0000; RAIL_EXPIRATION=1577964151966; RAIL_DEVICEID=F-kbOvPVq7zWN6siyReXrCgJlKRtNarGnI9t1cadzrXZw6_wdoRJpx_JNF92_sQf1cUdAtVC4Ki13Ift4GokrqbJBcgBuc2kiuBEOi4HOjZ2Nc4wtz4cgv2w43umnV5sLcCE-HRkslumK8h95A26oG-O_dGr1A02; _jc_save_fromStation=%u6DF1%u5733%2CSZQ; _jc_save_toStation=%u5E7F%u5DDE%u5357%2CIZQ; _jc_save_fromDate=2020-01-21',
            'Host': 'kyfw.12306.cn',
            'Referer': 'https://kyfw.12306.cn/otn/leftTicket/init?linktypeid=dc&fs=%E6%B7%B1%E5%9C%B3,SZQ&ts=%E5%B9%BF%E5%B7%9E%E5%8D%97,IZQ&date=2020-01-21&flag=N,N,Y',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
        },
        data: {
            callback: 'jQuery19108779143999622891_1577695458287',
            answer: '273,52,190,128',
            rand: 'sjrand',
            login_site: 'E',
            _json_att: '',
            _: '1577695458294'
        }
    }, (err, res, body) => {
        if (err) throw err;
        console.log(body);
    });*/

    superagent.get('https://kyfw.12306.cn/passport/captcha/captcha-check')
        .set('Cookie', '_passport_session=e9804f518cac40baa7b1e42bf7042e654059; _passport_ct=005c65ffb1b14911bd0c21e76221f65at8885; _jc_save_toDate=2019-12-30; _jc_save_wfdc_flag=dc; route=6f50b51faa11b987e576cdb301e545c4; BIGipServerpassport=803733770.50215.0000; RAIL_EXPIRATION=1577964151966; RAIL_DEVICEID=F-kbOvPVq7zWN6siyReXrCgJlKRtNarGnI9t1cadzrXZw6_wdoRJpx_JNF92_sQf1cUdAtVC4Ki13Ift4GokrqbJBcgBuc2kiuBEOi4HOjZ2Nc4wtz4cgv2w43umnV5sLcCE-HRkslumK8h95A26oG-O_dGr1A02; _jc_save_fromStation=%u6DF1%u5733%2CSZQ; BIGipServerpool_passport=351076874.50215.0000; BIGipServerotn=535298314.24610.0000; _jc_save_toStation=%u9686%u56DE%2CLHA; _jc_save_fromDate=2020-01-22')
        .set('Host', 'kyfw.12306.cn')
        .set('Referer', 'https://kyfw.12306.cn/otn/leftTicket/init?linktypeid=dc&fs=%E6%B7%B1%E5%9C%B3,SZQ&ts=%E5%B9%BF%E5%B7%9E%E5%8D%97,IZQ&date=2020-01-21&flag=N,N,Y')
        .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36')
        .query({
            answer: '109,68',
            rand: 'sjrand',
            login_site: 'E',
            _json_att: ''
        })
        .end((err, res) => {
            if (err) throw err;
            console.log(res.text);
        });

    /*let result = await setHeaders(superagent.post('https://kyfw.12306.cn/passport/web/login'))
        .send({
            username: 'yu1596882018',
            password: 'xingyun2014',
            appid: 'otn',
            answer: '',
            _json_att: '',
        });

    console.log(result);*/
})();
