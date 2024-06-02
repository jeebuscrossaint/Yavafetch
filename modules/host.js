const { execSync } = require('child_process');

function hostName() {
    try {
        const host = execSync('wmic computersystem get model', { encoding: 'utf8' });
        return host.split('\n')[1].trim();
    } catch (error) {
        try {
            const host = execSync('cat /sys/class/dmi/id/product_name 2>/dev/null', { encoding: 'utf8' });
            return host.trim();
        } catch (error) {
            try {
                const host = execSync('sysctl hw.model 2>/dev/null', { encoding: 'utf8' });
                return host.split(': ')[1].trim();
            } catch (error) {
                return 'Unknown';
            }
        }
    }
}

module.exports = { hostName };