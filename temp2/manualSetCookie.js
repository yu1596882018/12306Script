const userCookie = 'JSESSIONID=B993E04E136F90696A1F7F290196151B; tk=dQOcIaKyo0xNXMBO5H6YkRfQ3rSjHlDP4UTuxpojdRg51y1y0; RAIL_EXPIRATION=1579486604906; RAIL_DEVICEID=c-roWgpRx85qs1M9GkEgJnpv3p4KqKzmPTr97Eviy6iScdZQhei-7M0aaoW1Rgxwj8zp_v50EssITjtiLquEpJPDx3N1xfIVzdMtXNYaZGHkFM_oGSza30Mz2ZPY5-C4kc_Yq6YhwzPz2FCIZoUFV48i3X6epH9d; _jc_save_wfdc_flag=dc; BIGipServerpassport=770179338.50215.0000; route=6f50b51faa11b987e576cdb301e545c4; BIGipServerotn=4141285642.64545.0000; _jc_save_fromStation=%u5317%u4EAC%2CBJP; _jc_save_toStation=%u6B66%u6C49%2CWHN; _jc_save_fromDate=2020-01-20; _jc_save_toDate=2020-01-17';

const redis = require('redis');
const localConfig = require('./../scripts/localConfig');
const redisDb = redis.createClient(6379, localConfig.redisHost);
redisDb.set('userCookie', userCookie, redis.print);
