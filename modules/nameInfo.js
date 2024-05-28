const os = require('os');

function nameInfo() {
    const username = os.userInfo().username;
    const hostname = os.hostname();
    return `${username}@${hostname}`;
}

module.exports = { nameInfo };