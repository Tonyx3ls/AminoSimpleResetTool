//https://service.narvii.com/api/v1/x244304829/s/user-profile/d1a64817-01ad-47bd-99c8-15e13201d702

//Libary Imports
const fetch = require('isomorphic-fetch');
const endpoints = require('../helpers/endpoints.js'); //For Creating shorter URL's in this Module
const objs = require('../helpers/objects.js'); //For Storing the Objects that the Framework returns. 
const { errorMessages, getConfig } = require('../Amino');

/**
 * Load your own User Data.
 * @param {SecurityString} sid For authenticating with the Narvii-API.
 * @returns {Profile} A Profile containing the Userdata.
 */

module.exports = async function getMyProfile(com, uid) {
    let profile = objs.profile;
    const sid = getConfig('sid');
    const deviceID = getConfig('deviceId');
    const sig = getConfig('sig');
    const user_agent = getConfig('user_agent');

    if (typeof sid != 'string') {
        throw new Error(errorMessages.missingSid);
    }
    let result;
    try {
        const response = await fetch(endpoints.getDataProfile(com, uid), {
            headers: {
                "Accept-Language": "en-US",
                'NDCDEVICEID': deviceID,
                "user_agent": user_agent,
                "device_id_sig": sig,
                'NDCAUTH': `sid=${sid}`
            },
        });
        const body = await response.json();
        result = body;
    } catch (err) {
        profile.error = err;
        throw 'Error while calling getMyProfile: ' + err;
    }
    return result;
};