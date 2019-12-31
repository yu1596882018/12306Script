/**
 * 设置请求头
 * @param xhr
 * @returns {*}
 */
module.exports = (xhr) => {
    xhr.set('Accept', 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01');
    xhr.set('Accept-Encoding', 'gzip, deflate, br');
    xhr.set('Accept-Language', 'zh-CN,zh;q=0.9,en;q=0.8');
    xhr.set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    // xhr.set('Cookie', 'JSESSIONID=976F358D2D95CE6C2BFFF9FCDFE4DC55; BIGipServerpassport=1005060362.50215.0000; route=c5c62a339e7744272a54643b3be5bf64; BIGipServerotn=1490616586.24610.0000; RAIL_EXPIRATION=1577786430782; RAIL_DEVICEID=Vz1cns7-qnApMswSTwMqqX1Z9iQteFsJpiIaLcU1H7zD4NYy3C_HCvJ62wJMj13uC_28eC2GdFZT5Z4wehsLTJIpeYvzP9a9NI2juRUlXsgmbOEUYskPyOFf9STgHZtzCyuEBHCvxQIWTCVNnlMTptx2q0sBM16n; _jc_save_fromStation=%u6DF1%u5733%2CSZQ; _jc_save_toStation=%u9686%u56DE%2CLHA; _jc_save_fromDate=2020-01-03; _jc_save_toDate=2019-12-27; _jc_save_wfdc_flag=dc');
    xhr.set('Cookie', 'uamtk=1-jcgrexvDTV8LYF_Qc-jPThiUoUo4bKop5ngjV9_W4fsy1y0; _passport_session=288a3a9ebf5a4852b37716f5d995ddf37978; _passport_ct=22012c7bb21a47cc908f20e12436b19at2952; _jc_save_wfdc_flag=dc; BIGipServerpassport=937951498.50215.0000; route=6f50b51faa11b987e576cdb301e545c4; BIGipServerotn=3738632458.64545.0000; RAIL_EXPIRATION=1577983473125; RAIL_DEVICEID=UmsI66wHulu674ohat1sJIArUtJxGxjwDKqCz3DOBVGq5NydAk7AVD5tDuwugyQXkGuW3Wm6l3JHCNr4e4JZ6mFA4y-ZFt7OfZ48hBtA5nm7ttraFJRGPYBt7lH1McJt6PkCeYdCHiiu2MJUo0S9-5X3CFA4csBa; _jc_save_toDate=2019-12-30; _jc_save_fromStation=%u6DF1%u5733%u5317%2CIOQ; _jc_save_fromDate=2020-01-20; _jc_save_toStation=%u957F%u6C99%u5357%2CCWQ; BIGipServerportal=3151233290.16671.0000');
    xhr.set('Host', 'kyfw.12306.cn');
    xhr.set('Origin', 'https://kyfw.12306.cn');
    // xhr.set('Referer', 'https://kyfw.12306.cn/otn/confirmPassenger/initDc');
    xhr.set('Referer', 'https://kyfw.12306.cn/otn/leftTicket/init?linktypeid=dc&fs=%E6%B7%B1%E5%9C%B3,SZQ&ts=%E9%9A%86%E5%9B%9E,LHA&date=2020-01-03&flag=N,N,Y');
    xhr.set('Sec-Fetch-Mode', 'cors');
    xhr.set('Sec-Fetch-Site', 'same-origin');
    xhr.set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');
    xhr.set('X-Requested-With', 'XMLHttpRequest');
    return xhr;
}
