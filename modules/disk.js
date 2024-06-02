const { exec } = require('child_process');
const os = require('os');

function formatBytes(bytes) {
    const units = ['B', 'KiB', 'MiB', 'GiB', 'TiB'];
    let unit = 0;
    while (bytes >= 1024 && unit < units.length - 1) {
        bytes /= 1024;
        unit++;
    }
    return `${bytes.toFixed(2)} ${units[unit]}`;
}

function parseWindowsOutput(output) {
    const lines = output.trim().split('\n').slice(1); // Skip the header line
    const drives = [];

    for (const line of lines) {
        const parts = line.trim().split(/\s+/);
        if (parts.length === 3) {
            const [drive, free, total] = parts;
            const used = total - free;
            const percentage = ((used / total) * 100).toFixed(0);
            drives.push({
                drive,
                total: parseInt(total, 10),
                used: parseInt(used, 10),
                free: parseInt(free, 10),
                percentage: parseInt(percentage, 10)
            });
        }
    }

    return drives;
}

function parseUnixOutput(output) {
    const lines = output.trim().split('\n').slice(1); // Skip the header line
    const drives = [];

    for (const line of lines) {
        const parts = line.trim().split(/\s+/);
        if (parts.length >= 6) {
            const [filesystem, total, used, available, percentage, mounted] = parts;
            drives.push({
                drive: mounted,
                total: parseInt(total, 10) * 1024,
                used: parseInt(used, 10) * 1024,
                free: parseInt(available, 10) * 1024,
                percentage: parseInt(percentage.replace('%', ''), 10)
            });
        }
    }

    return drives;
}

function listDisks() {
    const platform = os.platform();

    let command;
    if (platform === 'win32') {
        command = 'wmic logicaldisk get size,freespace,caption';
    } else {
        command = 'df -k';
    }

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${stderr}`);
            return;
        }

        // Uncomment the next line to see raw output for debugging
        // console.log(`Raw command output:\n${stdout}`);

        let drives;
        if (platform === 'win32') {
            drives = parseWindowsOutput(stdout);
        } else {
            drives = parseUnixOutput(stdout);
        }

        drives.forEach(drive => {
            const total = formatBytes(drive.total);
            const used = formatBytes(drive.used);
            const free = formatBytes(drive.free);
            const percentage = drive.percentage;
            console.log(`\x1b[1mDisk ${drive.drive}\x1b[0m ${used} / ${total} (${percentage}%)`);
        });
    });
}

module.exports = { listDisks }
