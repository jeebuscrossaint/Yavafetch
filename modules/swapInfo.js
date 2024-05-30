const os = require('os');
const execSync = require('child_process').execSync;

function swapInfo() {
    try {
        const swap = execSync("Get-WmiObject Win32_PageFileUsage | ForEach-Object { '{0} MiB/{1} GiB ({2}%)' -f $_.CurrentUsage, [math]::Round($_.AllocatedBaseSize / 1024, 2), [math]::Round(($_.CurrentUsage / $_.AllocatedBaseSize) * 100, 2) }", { encoding: 'utf8', shell: 'powershell.exe' });
        return swap.trim();
    }
    catch (error) {
        try {
            const swap = execSync('free -m | grep Swap | awk \'{print $3"/"$2" ("$3/$2*100"%)"}\'', { encoding: 'utf8' });
            return swap.trim();
        }
        catch (error) {
            try {
                const swap = execSync('sysctl vm.swapusage | awk \'{print $5" "$6" ("$5/$2*100"%)"}\'', { encoding: 'utf8' });
            }
            catch (error) {
                return 'Unknown';
        }
    }
}
}

module.exports = { swapInfo };