const fetch = require('isomorphic-fetch');
const endpoints = require('../helpers/endpoints.js');
const sorter = require('../helpers/sorter.js');
const objs = require('../helpers/objects.js');
const { getConfig, errorMessages } = require('../Amino');



module.exports = async function getJoinedComs() {

    let communityList = objs.communityList;
    communityList.coms = [];

    const sid = getConfig('sid');
    const deviceID = getConfig('deviceId');
    const user_agent = getConfig('user_agent');

    if (typeof sid != 'string') {
        throw new Error(errorMessages.missingSid);
    }
    try {
        const response = await fetch(endpoints.getComs, {
            headers: {
                'NDCDEVICEID': deviceID,
                "user_agent": user_agent,
                'NDCAUTH': `sid=${sid}`
            }
        });
        const body = await response.json();
        
        body.communityList.forEach((element) => {
            communityList.coms.push(sorter.comSort(element));
        });
        communityList.status = 'ok';
        communityList.error = null;
    } catch (err) {
        communityList.error = err;
        throw 'Error while calling getJoinedComs: ' + err;
    }
    return communityList;
};