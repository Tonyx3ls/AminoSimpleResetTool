const config = {};


module.exports.setConfig = (key, value) => {
    config[key] = value;
};

module.exports.getConfig = (key) => {
    return config[key];
};