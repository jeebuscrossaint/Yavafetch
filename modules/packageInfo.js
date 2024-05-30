const os = require('os');
const { execSync } = require('child_process');

function determineManager() {
    let systemType = os.type();
    let output = '';
    let hasPackage = false;

    if (systemType === 'Windows_NT') {
        try {
            execSync('where choco 2> nul');
            const chocoPackages = execSync('choco list --local-only', { encoding: 'utf8' });
            const chocoCount = (chocoPackages.match(/\n/g) || []).length - 1;
            output += `Chocolatey (${chocoCount}) `;
            hasPackage = true;
        } catch (error) {}
        
        try {
            execSync('where scoop 2> nul');
            const scoopPackages = execSync('scoop list', { encoding: 'utf8' });
            const scoopCount = (scoopPackages.match(/\n/g) || []).length - 1;
            output += `Scoop (${scoopCount}) `;
            hasPackage = true;
        } catch (error) {}
        
        try {
            execSync('where winget 2> nul');
            const wingetPackages = execSync('winget list', { encoding: 'utf8' });
            const wingetCount = (wingetPackages.match(/\n/g) || []).length - 1;
            output += `Winget (${wingetCount}) `;
            hasPackage = true;
        } catch (error) {}
    }

    if (systemType === 'Linux') {} // Work on Unix like system package managers

    return hasPackage ? output : 'No package managers found.';
}

module.exports = { determineManager };