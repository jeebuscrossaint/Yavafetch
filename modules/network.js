const os = require('os');

function getLocalIP() {
    const networkInterfaces = os.networkInterfaces();
    const addresses = {
        WiFi: [],
        Ethernet: []
    };

    for (const name of Object.keys(networkInterfaces)) {
        for (const net of networkInterfaces[name]) {
            // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
            if (net.family === 'IPv4' && !net.internal) {
                if (name.match(/Wi-Fi|Wireless/i)) {
                    addresses.WiFi.push(net.address);
                } else if (name.match(/Ethernet/i)) {
                    addresses.Ethernet.push(net.address);
                }
            }
        }
    }

    return addresses.WiFi[0] || addresses.Ethernet[0];
}

module.exports = { getLocalIP };