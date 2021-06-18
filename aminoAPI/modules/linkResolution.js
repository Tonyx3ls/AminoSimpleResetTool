const fetch = require('isomorphic-fetch');
const endpoints = require('../helpers/endpoints.js');
const { getConfig } = require('../Amino.js');

module.exports = async function linkResolution(link) {

    const sid = getConfig('sid');
    const deviceID = getConfig('deviceId');
    const sig = getConfig('sig');
    const user_agent = getConfig('user_agent');
    let linkInfo;

    if (typeof link !== 'string') {
        return 'No se ha ingresado un parámetro correcto';
    }

    let chatLinkData = link.split('/');
    let body = "a";

    try {
        const response = await fetch(endpoints.linkResolution(chatLinkData[4]), {
            method: 'GET',
            headers: {
                'NDCDEVICEID': deviceID,
                "user_agent": user_agent,
                "device_id_sig": sig,
                'NDCAUTH': `sid=${sid}`
            },
        });
        body = await response.json();
        if (body.linkInfoV2 == undefined) {
            linkInfo = null;
        } else {
            linkInfo = body.linkInfoV2.extensions.linkInfo;
        }

    } catch (err) {
        throw 'Error while calling link resolution: ' + err;
    }

    return linkInfo;
}