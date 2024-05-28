const { execSync } = require('child_process');

function hostName() {
    try {
        const host = execSync('wmic computersystem get model', { encoding: 'utf8' });
        return host.split('\n')[1].trim();
    } catch (error) {
        console.error('Failed to get host name:', error);
        return 'Unknown';
    }
}

module.exports = { hostName };