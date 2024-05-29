const { execSync } = require('child_process');
const os = require('os');

function hostName() {
    try {
        let host;
        if (os.type() === 'Windows_NT') {
            host = execSync('wmic computersystem get model', { encoding: 'utf8' });
        } else {
            host = execSync('uname -a', { encoding: 'utf8' });
        }
        return host.split('\n')[1].trim();
    } catch (error) {
        console.error('Failed to get host name:', error);
        return 'Unknown';
    }
}

module.exports = { hostName };