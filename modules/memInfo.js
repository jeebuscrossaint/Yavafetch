const os = require('os');

function memInfo() {
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const memPercentage = Math.round((usedMem / totalMem) * 100);

    // the one reason high level langauges are good is because some jit who is used to assembly wrote the low level implementation for you
    const totalMemGiB = (totalMem / Math.pow(1024, 3)).toFixed(2);
    const usedMemGiB = (usedMem / Math.pow(1024, 3)).toFixed(2);

    return `${usedMemGiB} GiB / ${totalMemGiB} GiB (${memPercentage}%)`;
}

module.exports = { memInfo };