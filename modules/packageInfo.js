const os = require('os');
const fs = require('fs');

function determineManager() {
    let systemType = os.type();
    if (systemType === 'Linux') {
        let packageManagers = ['apt', 'dnf', 'yum', 'zypper', 'pacman', 'emerge', 'nix', 'apk', 'pkg'];
        for (let manager of packageManagers) {
            if (fs.existsSync(`/usr/bin/${manager}`)) {
                return manager;
            }
        }
    }
}

module.exports = { determineManager };