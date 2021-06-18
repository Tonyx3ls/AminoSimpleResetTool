//Libary Imports
const fetch = require('isomorphic-fetch');
const endpoints = require('../helpers/endpoints.js'); //For Creating shorter URL's in this Module
const { setConfig } = require('../Amino');

module.exports = async function login(email, password) {
    let user_agent = process.env.USERAGENT;
    let device_id_sig = process.env.SIG;
    let deviceID = process.env.DEVICE;
    let sid;
    let bot_id;
    if (typeof email != 'string' || typeof password !== 'string') {
        throw new Error('All Arguments are not satisfied.');

    }

    try {
        const response = await fetch(endpoints.login, {
            method: 'POST',
            headers: {
                'NDCDEVICEID': deviceID,
                "user_agent": user_agent,
                "device_id_sig": device_id_sig
            },
            body: JSON.stringify({
                "clientType": 100,
                'email': email,
                'secret': '0 ' + password,
                'deviceID': deviceID,
                'action': 'normal',
                'timestamp': new Date().getUTCMilliseconds()
            }),
        });
        const body = await response.json();
        //console.log('body amino: ', body);
        //let stringy = JSON.stringify(body);
        //console.log(stringy);
        /*console.log(body);
        if(stringy.includes("216")){
          console.log("No hay ninguna cuenta asociada a este correo o numero");
        }else if(stringy.includes("200")){
          console.log("Contraseña incorrecta");
        }---poner "*/
        if (!body.sid) throw 'Login Error: SID is not defined.' + body;
        if (!body.account.uid) throw 'Login Error: ProfileID is not defined.' + body;
        sid = body.sid;
        bot_id = body.account.uid;


        setConfig('sid', sid);
        setConfig('profileId', bot_id);
        setConfig('deviceId', deviceID);
        setConfig('sig', device_id_sig);
        setConfig('user_agent', user_agent);
        setConfig('botId', bot_id);


    } catch (err) {
        throw 'Error while calling Login: ' + err;
    }
    return {
        sid: sid,
        myuid: bot_id,
        deviceID: deviceID,
        sig: device_id_sig,
        user_agent: user_agent
    }
};