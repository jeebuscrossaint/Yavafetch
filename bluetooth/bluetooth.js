// New LINENNENE

const readline = require('readline');
const path = require('path');
const fs = require('fs');

function main() {
    prompt();
}

// PROMPTTTTTTT

function prompt() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("Are you sure you want to run this script? This script may break laws in your area. Especially if you are in an airport. (y/n)", function(inputDecision) {
        if (inputDecision.toLowerCase() === 'y') {
            rl.question("Are you really sure? (y/n)", function(secondInputDecision) {
                if (secondInputDecision.toLowerCase() === 'y') {
                    console.log("Damn, you really wanna break the law.");
                    argParser();
                } else {
                    console.log("Good choice. Stay safe!");
                }
                rl.close();
            });
        } else {
            console.log("Good choice. Stay safe!");
            rl.close();
        }
    });
}

// CHAR ARGC CHAR ARGV IS BETTER

function argParser() {
    const filePath = process.argv[2];
    if (!filePath) {
        console.log("Give me a file/path!")
        return;
    }

    if (!fs.existsSync(filePath)) {
        console.log("File does not exist!");
        return;
    }

    const fileExtension = path.extname(filePath);
    switch (fileExtension) {
        case '.json':
            console.log("I assume you formatted your json file as `name: 'devicename', address: 'deviceaddress', uuid: 'deviceuuid'`");
            readBluetoothDevicesJson(filePath);
            break;
        
        case '.txt':
            console.log("I assume you formatted your text file as 'devicename uuid'...");
            readBluetoothDevicesTxt(filePath);
            break;
        
        case '.csv':
            console.log("I assume you formatted your csv file as 'devicename,uuid'...");
            readBluetoothDevicesCsv(filePath);
            break;
        
        default:
            console.log("Unsupported file type! Try a .json, .txt, or .csv file. Or just leave I guess. I'm not your mom.");
    }
}

// FILE PARSERS

let devices = [];

function parseJson(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
}

function parseTxt(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    const lines = data.split('\n');
    const parsedDevices = [];

    for (let i = 0; i < lines.length; i++) {
        const [name, addr, uuid] = lines[i].split(' ');
        parsedDevices.push({ name, addr, uuid });
    }

    return parsedDevices;
}

function parseCsv(filePath) {
    return new Promise((resolve, reject) => {
        const readInterface = readline.createInterface({
            input: fs.createReadStream(filePath),
            output: process.stdout,
            console: false
        });

        const parsedDevices = [];

        readInterface.on('line', function(line) {
            const [name, addr, uuid] = line.split(',');
            parsedDevices.push({ name, addr, uuid });
        });

        readInterface.on('close', function() {
            resolve(parsedDevices);
        });

        readInterface.on('error', function(err) {
            reject(err);
        });
    });
}

function readBluetoothDevicesJson(filePath) {
    devices = parseJson(filePath);
    console.log("hello json");
}

async function readBluetoothDevicesTxt(filePath) {
    devices = parseTxt(filePath);
    console.log("hello txt");
}

async function readBluetoothDevicesCsv(filePath) {
    devices = await parseCsv(filePath);
    console.log("hello csv");
}

// MAIN

main();