const fetch = require('isomorphic-fetch');
const endpoints = require('../helpers/endpoints.js');
const { getConfig } = require('../Amino');

module.exports = async function getJoinedChats(com,start, size) {

    const sid = getConfig('sid');
    const deviceID = getConfig('deviceId');
    const user_agent = getConfig('user_agent');
    if (typeof sid != 'string' || typeof com !== 'string') {
        throw new Error('All Arguments are not satisfied.');
    }
    let body;
    try {
        const response = await fetch(endpoints.getJoinedChats(com, start,size), {
            headers: {
                'Accept-Encoding': 'gzip',
                "Accept-Language": "en-US",
                'NDCDEVICEID': deviceID,
                "user_agent": user_agent,
                'NDCAUTH': `sid=${sid}`
            },
        });
        //Parsing the Response.
        body = await response.json();
        //console.log(body);
        // }115 para se ha unido
        /* body.threadList.forEach((element) => {
             //Sorting the Elements and pushing them into the Array.
             threadList.threads.push(sorter.threadSort(element));
         });*/


    } catch (err) {

        throw 'Error while calling getJoinedChats: ' + err;
    }
    //console.log(body.threadList)
    return body.threadList;
};