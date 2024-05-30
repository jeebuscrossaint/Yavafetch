const os = require('os');

function cpuInfo() {
    const cpus = os.cpus();
    const cpuModel = cpus[0].model.replace(/\s+/g, ' ').trim();
    const cpuSpeed = cpus[0].speed;
    const cpuCores = cpus.length;
    return `CPU:${cpuModel} @ ${cpuSpeed} MHz (${cpuCores} cores)`;
}

module.exports = { cpuInfo };