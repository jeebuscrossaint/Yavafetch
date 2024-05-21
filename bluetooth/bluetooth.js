const noble = require('@abandonware/noble');
const readline = require('readline');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const promptUser = (query) => {
    return new Promise(resolve => rl.question(query, resolve));
};

const loadDeviceNamesFromFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) reject(err);
            else resolve(data.split('\n').filter(name => name.trim() !== ''));
        });
    });
};

const generateFakeDevices = (numDevices, names) => {
    const devices = [];
    for (let i = 0; i < numDevices; i++) {
        const name = names[i % names.length];
        const uuid = uuidv4().slice(0, 4); // Generate a short UUID for simplicity
        devices.push({ name, uuid });
    }
    return devices;
};

const advertiseFakeDevice = (device) => {
    console.log(`Advertising fake device: ${device.name} (UUID: ${device.uuid})`);
    // Normally, you'd use a Bluetooth library to advertise. Here we simulate it.
};

const main = async () => {
    const numDevices = parseInt(await promptUser('Enter the number of fake devices to generate: '), 10);
    const filePath = await promptUser('Enter the path to the file with device names (or leave empty to use default names): ');

    let deviceNames;
    if (filePath.trim()) {
        try {
            deviceNames = await loadDeviceNamesFromFile(filePath.trim());
        } catch (err) {
            console.error(`Error reading file: ${err.message}`);
            process.exit(1);
        }
    } else {
        deviceNames = ['DefaultDevice1', 'DefaultDevice2', 'DefaultDevice3'];
    }

    const fakeDevices = generateFakeDevices(numDevices, deviceNames);

    noble.on('stateChange', async (state) => {
        if (state === 'poweredOn') {
            console.log('Bluetooth is powered on.');
            while (true) {
                for (let device of fakeDevices) {
                    advertiseFakeDevice(device);
                    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
                }
            }
        } else {
            console.log('Bluetooth is not powered on.');
            noble.stopScanning();
        }
    });

    noble.on('discover', (peripheral) => {
        console.log(`Discovered peripheral: ${peripheral.advertisement.localName} (UUID: ${peripheral.uuid})`);
        if (fakeDevices.some(device => device.uuid === peripheral.uuid)) {
            console.log(`Connecting to fake device: ${peripheral.advertisement.localName}`);
            peripheral.connect((error) => {
                if (error) {
                    console.error(`Failed to connect: ${error}`);
                } else {
                    console.log(`Connected to: ${peripheral.advertisement.localName}`);
                }
            });
        }
    });

    noble.startScanning();

    rl.close();
};

main();
