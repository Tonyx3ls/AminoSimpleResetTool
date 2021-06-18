const fetch = require('isomorphic-fetch');
const endpoints = require('../helpers/endpoints.js');
const { getConfig } = require('../Amino');


module.exports = async function leaveCommunity(comId) {

    const sid = getConfig('sid');
    const deviceID = getConfig('deviceId');
    const sig = getConfig('sig');
    const user_agent = getConfig('user_agent');

    if (typeof comId != 'string') {
        throw new Error('All Arguments are not satisfied.');
    }
    try {
        const response = await fetch(endpoints.leaveCommunity(comId), {
            method: 'POST',
            headers: {
                'NDCDEVICEID': deviceID,
                "user_agent": user_agent,
                "device_id_sig": sig,
                'NDCAUTH': `sid=${sid}`
            },
        });
        body = await response.json();
    } catch (err) {
        throw 'Error while calling JoinChat: ' + err;
    }

    return body;
};