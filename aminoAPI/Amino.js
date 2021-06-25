const config = {};
const newConfig = {};

exports.setNewConfig = (key, value) => {
    newConfig[key] = value;
}

exports.setConfig = (key, value) => {
    config[key] = value;
};

exports.getConfig = (key) => {
    return config[key];
};

//Global Error-Messages.
const errorMessages = {
    missingSid: 'SID is not specified, please use the login() method to authenticate',
};

module.exports.errorMessages = errorMessages;

module.exports = {
    login: require('./modules/login'),
    getMyProfile: require('./modules/getMyProfile'),
    getJoinedComs: require('./modules/getJoinedComs'),
    getJoinedChats: require('./modules/getJoinedChats'),
    getUserBlogs: require('./modules/getUserBlogs'),
    linkResolution: require('./modules/linkResolution'),
    getUserProfile: require('./modules/getUserProfile'),
    getMyUID: require('./modules/getMyUID'),
    leaveChat: require('./modules/leaveChat')

};