/**
 * 设置请求头
 * @param xhr
 * @returns {*}
 */
module.exports = (xhr) => {
    xhr.set('Accept', '*/*');
    xhr.set('Accept-Encoding', 'gzip, deflate, br');
    xhr.set('Accept-Language', 'zh-CN,zh;q=0.9,en;q=0.8');
    xhr.set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xhr.set('Cookie', '_uab_collina=157717117851764065697928; JSESSIONID=1362A0501E06FE77DF25AF93B8E7A065; tk=z5WsdAfzV-HzXmgn1xNFBFh56uQSIErvw6kEdQbTVCMply1y0; _jc_save_wfdc_flag=dc; BIGipServerpassport=937951498.50215.0000; route=6f50b51faa11b987e576cdb301e545c4; BIGipServerotn=3738632458.64545.0000; RAIL_EXPIRATION=1577618303363; RAIL_DEVICEID=FicAhuDEwwhL21A4hoWd4sAMOB8vBgQRBz3HIfiqVlAPtEXS3bdoz7v3FnEoZ_3q5i5rzxul2phh4vYRL-wuYa8mvA4C15xYlGFkrbCSb97OxAn7sz5GSaQLs9OIvsm-o7TiKk3ue5mBnFpb8AElm_LogwxQ-bdO; _jc_save_toDate=2019-12-27; _jc_save_fromStation=%u6DF1%u5733%2CSZQ; _jc_save_toStation=%u9686%u56DE%2CLHA; _jc_save_fromDate=2020-01-03');
    xhr.set('Host', 'kyfw.12306.cn');
    xhr.set('Origin', 'https://kyfw.12306.cn');
    xhr.set('Referer', 'https://kyfw.12306.cn/otn/confirmPassenger/initDc');
    xhr.set('Sec-Fetch-Mode', 'cors');
    xhr.set('Sec-Fetch-Site', 'same-origin');
    xhr.set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');
    xhr.set('X-Requested-With', 'XMLHttpRequest');
    return xhr;
}
