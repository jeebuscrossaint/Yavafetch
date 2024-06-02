const { exec } = require('child_process');

function getBatteryInfo() {
    return new Promise((resolve, reject) => {
        exec('wmic path Win32_Battery get EstimatedChargeRemaining, BatteryStatus', (error, stdout) => {
            if (error) {
                reject(`Error: ${error.message}`);
                return;
            }

            const lines = stdout.trim().split('\n');
            const batteryInfo = lines[1].trim().split(/\s{2,}/);

            const chargeRemaining = parseInt(batteryInfo[1]);
            const batteryStatus = parseInt(batteryInfo[0]);

            let result;
            if (chargeRemaining >= 0 && batteryStatus !== 0) {
                const status = batteryStatus === 2 ? 'Connected' : 'Disconnected';
                result = `${chargeRemaining}% [${status}]`;
            } else {
                result = 'Battery information not available';
            }

            // Check if result is undefined before resolving
            resolve(result ? result : 'Battery information not available');
        });
    });
}

module.exports = { getBatteryInfo };