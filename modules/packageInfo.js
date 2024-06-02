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

    if (systemType === 'Linux') {
        try {
            const dpkgCount = execSync('dpkg -l 2> /dev/null | wc -l', { encoding: 'utf8' }).trim();
            output += `dpkg/apt (${dpkgCount}) `;
            hasPackage = true;
        } catch (error) {}
    
        try {
            const flatpakCount = execSync('flatpak list 2> /dev/null | wc -l', { encoding: 'utf8' }).trim();
            output += `flatpak (${flatpakCount}) `;
            hasPackage = true;
        } catch (error) {}
    
        try {
            const brewCount = execSync('brew list --formula 2> /dev/null | wc -l', { encoding: 'utf8' }).trim();
            output += `homebrew (${brewCount}) `;
            hasPackage = true;
        } catch (error) {}
    
        try {
            const nixCount = execSync('nix-env -q 2> /dev/null | wc -l', { encoding: 'utf8' }).trim();
            output += `nix (${nixCount}) `;
            hasPackage = true;
        } catch (error) {}
    
        try {
            const pacmanCount = execSync('pacman -Qq 2> /dev/null | wc -l', { encoding: 'utf8' }).trim();
            output += `pacman (${pacmanCount}) `;
            hasPackage = true;
        } catch (error) {}
    
        try {
            const emergeCount = execSync('equery list "*" 2> /dev/null | wc -l', { encoding: 'utf8' }).trim();
            output += `portage/emerge (${emergeCount}) `;
            hasPackage = true;
        } catch (error) {}
    
        try {
            const snapCount = execSync('snap list 2> /dev/null | wc -l', { encoding: 'utf8' }).trim();
            output += `snap (${snapCount}) `;
            hasPackage = true;
        } catch (error) {}
    
        try {
            const rpmCount = execSync('rpm -qa 2> /dev/null | wc -l', { encoding: 'utf8' }).trim();
            output += `rpm (${rpmCount}) `;
            hasPackage = true;
        } catch (error) {}
    
        try {
            const slackpkgCount = execSync('ls /var/log/packages/ 2> /dev/null | wc -l', { encoding: 'utf8' }).trim();
            output += `slackpkg (${slackpkgCount}) `;
            hasPackage = true;
        } catch (error) {}
    
        try {
            const xbpsCount = execSync('xbps-query -l 2> /dev/null | wc -l', { encoding: 'utf8' }).trim();
            output += `xbps (${xbpsCount}) `;
            hasPackage = true;
        } catch (error) {}
    
        try {
            const apkCount = execSync('apk info 2> /dev/null | wc -l', { encoding: 'utf8' }).trim();
            output += `apk-tools (${apkCount}) `;
            hasPackage = true;
        } catch (error) {}
    
        try {
            const freebsdpkgCount = execSync('pkg info 2> /dev/null | wc -l', { encoding: 'utf8' }).trim();
            output += `freebsdpkg (${freebsdpkgCount}) `;
            hasPackage = true;
        } catch (error) {}
    
        try {
            const openbsdportsCount = execSync('pkg_info 2> /dev/null | wc -l', { encoding: 'utf8' }).trim();
            output += `openbsdports (${openbsdportsCount}) `;
            hasPackage = true;
        } catch (error) {}
    
        try {
            const pkgsrcCount = execSync('pkg_info 2> /dev/null | wc -l', { encoding: 'utf8' }).trim();
            output += `pkgsrc-netbsd (${pkgsrcCount}) `;
            hasPackage = true;
        } catch (error) {}
    }
}

module.exports = { determineManager };