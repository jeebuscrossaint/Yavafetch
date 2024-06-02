const { exec } = require('child_process');

function getGpuInfo() {
    const platform = process.platform;

    if (platform === 'win32') {
        getWindowsGpuInfo();
    } else if (platform === 'linux') {
        getLinuxGpuInfo();
    } else if (platform === 'darwin') {
        getMacGpuInfo();
    } else {
        console.error('Unsupported platform:', platform);
    }
}

function getWindowsGpuInfo() {
    exec('wmic path win32_videocontroller get caption,adapterram,description,videoarchitecture', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }

        const lines = stdout.trim().split('\n');
        const keys = lines[0].trim().split(/\s+/);
        const gpus = lines.slice(1).map(line => {
            const values = line.trim().split(/\s{2,}/);
            let gpuInfo = {};
            keys.forEach((key, index) => {
                gpuInfo[key] = values[index];
            });
            return gpuInfo;
        });

        gpus.forEach((gpu, index) => {
            const name = gpu.Caption;
            const memory = (parseInt(gpu.AdapterRAM) / (1024 * 1024)).toFixed(2) + ' MiB';
            const type = gpu.Description.includes('Integrated') ? 'Integrated' : 'Discrete';
            console.log(`\x1b[1mGPU ${index + 1}:\x1b[0m ${name} (${memory}) [${type}]`);
        });
    });
}

function getLinuxGpuInfo() {
    exec('lspci -mm | grep VGA', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }

        const lines = stdout.trim().split('\n');
        lines.forEach((line, index) => {
            const parts = line.split(' ');
            const name = parts.slice(2).join(' ');
            exec(`lspci -v -s ${parts[0]}`, (error, detailStdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }

                const memoryMatch = detailStdout.match(/ prefetchable memory \[(.+)\]/);
                const memory = memoryMatch ? (parseInt(memoryMatch[1], 16) / (1024 * 1024)).toFixed(2) + ' MiB' : 'Unknown';
                const type = detailStdout.includes('Kernel driver in use: i915') ? 'Integrated' : 'Discrete';
                console.log(`\x1b[1mGPU ${index + 1}:\x1b[0m ${name} (${memory}) [${type}]`);
            });
        });
    });
}

function getMacGpuInfo() {
    exec('system_profiler SPDisplaysDataType', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }

        const lines = stdout.trim().split('\n');
        let gpus = [];
        let currentGpu = null;

        lines.forEach(line => {
            if (line.includes('Chipset Model:')) {
                if (currentGpu) gpus.push(currentGpu);
                currentGpu = { name: line.split(': ')[1] };
            } else if (line.includes('VRAM (Total):')) {
                currentGpu.memory = line.split(': ')[1];
            } else if (line.includes('Metal:')) {
                currentGpu.type = line.includes('Supported, feature set') ? 'Discrete' : 'Integrated';
            }
        });

        if (currentGpu) gpus.push(currentGpu);

        gpus.forEach((gpu, index) => {
            console.log(`\x1b[1mGPU ${index + 1}:\x1b[0m ${gpu.name} (${gpu.memory}) [${gpu.type}]`);
        });
    });
}

module.exports = { getGpuInfo };