const { printAsciiArt } = require('../modules/ascii');
const { printHelp } = require('../modules/help');
const { nameInfo } = require('../modules/nameInfo');
const { osName } = require('../modules/osName');
const { hostName } = require('../modules/host');
const { printOsSpecificAsciiArt } = require('../modules/specificAscii');
const { arch } = require('../modules/arch');
const { kernelVersion } = require('../modules/kernel');
const { getUptime } = require('../modules/uptime');
const { determineManager } = require('../modules/packageInfo');
const { cpuInfo } = require('../modules/cpuInfo');
const { memInfo } = require('../modules/memInfo');
const { swapInfo } = require('../modules/swapInfo');
const { getLocalIP } = require('../modules/network');

function defaultInfo() {
    printOsSpecificAsciiArt();
    const name = nameInfo();
    console.log(`\x1b[1m${name}\x1b[0m`);
    const os = osName();
    console.log(`\x1b[1mOS:\x1b[0m ${os}`);
    const host = hostName();
    console.log(`\x1b[1mHost:\x1b[0m ${host}`); // note that this right now ABSOLUTELY DOES NOT WORK ON ANY UNIX LIKE SYSTEM LOL gotta fix that soon
    const architecture = arch();
    console.log(`\x1b[1mArchitecture:\x1b[0m ${architecture}`);
    const version = kernelVersion();
    console.log(`\x1b[1mKernel Version:\x1b[0m ${version}`);
    const up = getUptime();
    console.log(`\x1b[1mUptime:\x1b[0m ${up}`);
    const manager = determineManager();
    console.log(`\x1b[1mPackage Manager:\x1b[0m ${manager}`); // this only works on windows right now lol gotta as well do UNIX like.
    const cpu = cpuInfo();
    console.log(`\x1b[1mCPU:\x1b[0m ${cpu.slice(4)}`);
    const mem = memInfo();
    console.log(`\x1b[1mMemory:\x1b[0m ${mem}`);
    const swap = swapInfo();
    console.log(`\x1b[1mSwap:\x1b[0m ${swap}`);
    const ip = getLocalIP();
    console.log(`\x1b[1mLocal IP:\x1b[0m ${ip}`);
    
}

function main() {
    const flags = process.argv.slice(2);
    switch (true) {
        case flags.includes('--help'):
            printHelp();
            break;
        
        case flags.includes('--ascii'):
            printAsciiArt();
            defaultInfo();
            break;
        default:
            defaultInfo();

    }
}

main();