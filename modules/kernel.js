const os = require('os');

function kernelVersion() {
    return os.release();
}

module.exports = { kernelVersion };