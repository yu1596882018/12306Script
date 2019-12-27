(async () => {
    const superagent = require('superagent');
    const setHeaders = require('./setHeaders');

    // 提交订单
    let checkOrderInfoResult = await setHeaders(superagent.post('https://kyfw.12306.cn/otn/confirmPassenger/checkOrderInfo'))
        .send({
            cancel_flag: '2',
            bed_level_order_num: '000000000000000000000000000000',
            passengerTicketStr:
                'O,0,1,王鑫宇,1,4305***********07X,,N,e271857d7ae6ac3eb9bf28977ba10d922046fe2ff813868c510734672c2af342',
            oldPassengerStr: '王鑫宇,1,4305***********07X,1_',
            tour_flag: 'dc',
            randCode: '',
            whatsSelect: '1',
            sessionId: '',
            sig: '',
            scene: 'nc_login',
            _json_att: '',
            REPEAT_SUBMIT_TOKEN: '002cfdcb04eef42834add6a85ebe8b6d'
        });

    console.log('checkOrderInfoResult', checkOrderInfoResult.text);

    // 查询余票
    let getQueueCountResult = await setHeaders(superagent.post('https://kyfw.12306.cn/otn/confirmPassenger/getQueueCount'))
        .send({
            train_date: new Date().toString(),
            train_no: '6j000G616500',
            stationTrainCode: 'G6164',
            seatType: 'O',
            fromStationTelecode: 'IOQ',
            toStationTelecode: 'KAQ',
            leftTicket: 'uUjl4re%2BCfcrsTPZJkDtVjJQnNclJP9W4bc87IV0Nx6Al5Os',
            purpose_codes: '00',
            train_location: 'Q6',
            _json_att: '',
            REPEAT_SUBMIT_TOKEN: '002cfdcb04eef42834add6a85ebe8b6d'
        });
    console.log('getQueueCountResult', getQueueCountResult.text);
})();
