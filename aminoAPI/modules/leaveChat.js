const fetch = require('isomorphic-fetch');
const endpoints = require('../helpers/endpoints.js');
const { getConfig } = require('../Amino');


module.exports = async function leaveChat(com, chatId, userId) {

    const sid = getConfig('sid');
    const deviceID = getConfig('deviceId');
    const sig = getConfig('sig');
    const user_agent = getConfig('user_agent');
    let body;

    if (typeof sid != 'string' || typeof com !== 'string' || typeof chatId !== 'string') {
        throw new Error('All Arguments are not satisfied.');
    }
    try {
        const response = await fetch(endpoints.leaveChat(com, chatId, userId), {
            method: 'DELETE',
            headers: {
                'NDCDEVICEID': deviceID,
                "user_agent": user_agent,
                "device_id_sig": sig,
                'NDCAUTH': `sid=${sid}`
            },
        });
        body = await response.json();
    } catch (err) {
        throw 'Error while calling leaveChat: ' + err;
    }

    return body;
};