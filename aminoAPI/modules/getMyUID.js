const { getConfig } = require('../Amino');

module.exports = () => {
    return getConfig('botId');
}