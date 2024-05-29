const os = require('os');

function arch() {
    return os.arch();
}

module.exports = { arch };