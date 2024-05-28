const os = require('os');

function osName() {
    return os.type();
}

module.exports = { osName };