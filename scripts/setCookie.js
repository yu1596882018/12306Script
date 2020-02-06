const redis = require('redis');
const localConfig = require('./localConfig');
const redisDb = redis.createClient(6379, localConfig.redisHost);
redisDb.set('userCookie', 'JSESSIONID=4A462CAF808B962E214BE5D966472AB3; tk=67oKDcGoKW2dBPX2_tc3WsEx_QuPsA0YQhLx2bc0erEgay1y0; route=9036359bb8a8a461c164a04f8f50b252; BIGipServerotn=1156055306.50210.0000; _jc_save_fromStation=%u6DF1%u5733%u5317%2CIOQ; _jc_save_toStation=%u9686%u56DE%2CLHA; _jc_save_toDate=2020-02-06; _jc_save_wfdc_flag=dc; RAIL_EXPIRATION=1581315940103; RAIL_DEVICEID=nWxI6bdTX3uD9q_rVvegqxogtVBfUHYDKwSAtpZuSRdm4avENLF4FmsB3MAe7nM-xgePLg2uVyzlIER1qe3Ohbd5SZGjvZZSsDTYtWR4RPSW3_VqHxQicWK45gZt5jQQmmpmSUW40E8-SxuYgVu58N1jQG9QE4Nv; BIGipServerpassport=786956554.50215.0000; _jc_save_fromDate=2020-02-06', redis.print);
