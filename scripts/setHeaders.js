/**
 * 设置请求头
 * @param xhr
 * @returns {*}
 */
module.exports = (xhr, queryCookie) => {
    xhr.set('Accept', '*/*');
    xhr.set('Accept-Encoding', 'gzip, deflate, br');
    xhr.set('Accept-Language', 'zh-CN,zh;q=0.9,en;q=0.8');
    xhr.set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xhr.set('Cookie', queryCookie || '_uab_collina=157745159966575018197823; JSESSIONID=F3B863577C66337D68D614B85DC50D06; tk=Abqp2PuJJFdI1RDl-2sJXT6Mro_zFgnqkGgON09oqqscgy1y0; RAIL_EXPIRATION=1577786430782; RAIL_DEVICEID=Vz1cns7-qnApMswSTwMqqX1Z9iQteFsJpiIaLcU1H7zD4NYy3C_HCvJ62wJMj13uC_28eC2GdFZT5Z4wehsLTJIpeYvzP9a9NI2juRUlXsgmbOEUYskPyOFf9STgHZtzCyuEBHCvxQIWTCVNnlMTptx2q0sBM16n; _jc_save_wfdc_flag=dc; _jc_save_fromStation=%u6DF1%u5733%2CSZQ; _jc_save_toDate=2019-12-28; _jc_save_toStation=%u9686%u56DE%2CLHA; BIGipServerpassport=971505930.50215.0000; route=9036359bb8a8a461c164a04f8f50b252; BIGipServerotn=1457062154.24610.0000; _jc_save_fromDate=2020-01-07');
    xhr.set('Host', 'kyfw.12306.cn');
    xhr.set('Origin', 'https://kyfw.12306.cn');
    xhr.set('Referer', 'https://kyfw.12306.cn/otn/confirmPassenger/initDc');
    xhr.set('Sec-Fetch-Mode', 'cors');
    xhr.set('Sec-Fetch-Site', 'same-origin');
    xhr.set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');
    xhr.set('X-Requested-With', 'XMLHttpRequest');
    return xhr;
}
