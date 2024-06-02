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

            if (chargeRemaining >= 0 && batteryStatus !== 0) {
                const status = batteryStatus === 2 ? 'Connected' : 'Disconnected';
                resolve(`${chargeRemaining}% [${status}]`);
            } else {
                resolve('Battery information not available');
            }
        });
    });
}

module.exports = { getBatteryInfo };