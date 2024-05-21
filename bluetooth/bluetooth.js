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
            console.log("I assume you formatted your json file as '{devicename: uuid}'...");
            parseJson(filePath);
            break;
        
        case '.txt':
            console.log("I assume you formatted your text file as 'devicename uuid'...");
            parseTxt(filePath);
            break;
        
        case '.csv':
            console.log("I assume you formatted your csv file as 'devicename,uuid'...");
            parseCsv(filePath);
            break;
        
        default:
            console.log("Unsupported file type! Try a .json, .txt, or .csv file. Or just leave I guess. I'm not your mom.");
    }
}

// FILE PARSERS
function parseJson(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    const devices = JSON.parse(data);
    console.log(devices);
}

function parseTxt(filePath) {
    console.log("will impl txt l8r");
}

function parseCsv(filePath) {
    console.log("will impl csv l8r");
}


// READ IN BLUETOOTH DEVICES AND UUIDS

function readBluetoothDevicesJson(filePath) {}

function readBluetoothDevicesTxt(filePath) {}

function readBluetoothDevicesCsv(filePath) {}



// MAIN

main();