const userCookie = 'JSESSIONID=D9330C1DDF8F473995537EC55A4047B3; tk=6Xd5ImjejMMFLsr7-UV2vw0KojFVobcJSG1WUk5yods09y1y0; BIGipServerpassport=921174282.50215.0000; BIGipServerotn=2095579402.50210.0000; RAIL_EXPIRATION=1579486604906; RAIL_DEVICEID=c-roWgpRx85qs1M9GkEgJnpv3p4KqKzmPTr97Eviy6iScdZQhei-7M0aaoW1Rgxwj8zp_v50EssITjtiLquEpJPDx3N1xfIVzdMtXNYaZGHkFM_oGSza30Mz2ZPY5-C4kc_Yq6YhwzPz2FCIZoUFV48i3X6epH9d; route=c5c62a339e7744272a54643b3be5bf64; _jc_save_fromStation=%u5317%u4EAC%2CBJP; _jc_save_toStation=%u6B66%u6C49%2CWHN; _jc_save_fromDate=2020-01-20; _jc_save_toDate=2020-01-16; _jc_save_wfdc_flag=dc';

const redis = require('redis');
const localConfig = require('./../scripts/localConfig');
const redisDb = redis.createClient(6379, localConfig.redisHost);
redisDb.set('userCookie', userCookie, redis.print);
