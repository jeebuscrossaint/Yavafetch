const { execSync } = require('child_process');

function getShellInfo() {
    const platform = process.platform;

    if (platform === 'win32') {
        // Windows
        try {
            execSync('powershell -Command "exit 0"', { stdio: 'ignore' });
            return 'PowerShell';
        } catch (error) {
            const shellPath = process.env.COMSPEC;
            const shellName = shellPath.split('\\').pop();
            return shellName;
        }
    } else {
        // Linux/Mac
        const shellPath = process.env.SHELL;
        const shellName = shellPath.split('/').pop();
        return shellName;
    }
}

module.exports = { getShellInfo };