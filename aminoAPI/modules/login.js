//Libary Imports
const fetch = require('isomorphic-fetch');
const path = require('path');
const endpoints = require('../helpers/endpoints.js');
const { setConfig } = require('../Amino');
const fs = require('fs');

module.exports = async function login(email, password) {

    let headers = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../')+'/headers.json'));
    let user_agent = headers.userAgent;
    let deviceID = headers.deviceID;
    let sid;
    try {
        const response = await fetch(endpoints.login, {
            method: 'POST',
            headers: {
                'NDCDEVICEID': deviceID,
                "user_agent": user_agent,
                
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
        if (!body.sid) return {completed: false, response: body};
        if (!body.account.uid) return {completed: false, response: 'Login Error: ProfileID is not defined.' + body}
        
        sid = body.sid;
        account_id = body.account.uid;


        setConfig('sid', sid);
        setConfig('profileId', account_id);
        setConfig('deviceId', deviceID);
        setConfig('user_agent', user_agent);


    } catch (err) {
        console.log('OH NO!! THE SH*TTY CODE FAILED!! ' + err);
        return {
            completed: false
        }
    }
    return {
        completed: true,
        sid: sid,
        myuid: account_id,
        deviceID: deviceID,
        user_agent: user_agent
    }

};