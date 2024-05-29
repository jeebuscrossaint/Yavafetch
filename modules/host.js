const { execSync } = require('child_process');

function hostName() {
    try {
        const host = execSync('wmic computersystem get model', { encoding: 'utf8' });
        return host.split('\n')[1].trim();
    } catch (error) {
        console.error('Failed to get host name using WMIC:', error);
        try {
            const host = execSync('cat /sys/class/dmi/id/product_name', { encoding: 'utf8' });
            return host.trim();
        } catch (error) {
            console.error('Failed to get host name using cat:', error);
            try {
                const host = execSync('sysctl hw.model', { encoding: 'utf8' });
                return host.split(': ')[1].trim();
            } catch (error) {
                console.error('Failed to get host name using sysctl:', error);
                return 'Unknown';
            }
        }
    }
}

module.exports = { hostName };