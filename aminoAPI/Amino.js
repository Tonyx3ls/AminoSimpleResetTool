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
    getChat: require('./modules/getChat'),
    sendChat: require('./modules/sendChat'),
    postBlog: require('./modules/postBlog'),
    deleteBlog: require('./modules/deleteBlog'),
    getCommentsPost: require('./modules/commentsPost'),
    commentPost: require('./modules/commentPost'),
    getComBlogFeed: require('./modules/getCommunityBlogFeed'),
    createWikiEntry: require('./modules/createWikiEntry'),
    deleteWikiEntry: require('./modules/deleteWikiEntry'),
    commentWikiEntry: require('./modules/commentWikiEntry'),
    joinChat: require('./modules/joinChat'),
    leaveChat: require('./modules/leaveChat'),
    commentUser: require('./modules/commentUser'),
    sendImg: require('./modules/sendImage'),
    sendAlertMsg: require('./modules/sendAlertMessage'),
    linkResolution: require('./modules/linkResolution'),
    sendEmbedImage: require('./modules/sendEmbedImage'),
    getUserProfile: require('./modules/getUserProfile'),
    getMyUID: require('./modules/getMyUID'),
    searchCommunity: require('./modules/searchCommunity'),
    joinCommunity: require('./modules/joinCommunity'),
    leaveCommunity: require('./modules/leaveCommunity')
};