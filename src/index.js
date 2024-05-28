const { printAsciiArt } = require('../modules/ascii');
const { printHelp } = require('../modules/help');
const { nameInfo } = require('../modules/nameInfo');
const  { osName } = require('../modules/osName');

function defaultInfo() {
    const name = nameInfo();
    console.log(`\x1b[1m${name}\x1b[0m`);
    const os = osName();
    console.log(`\x1b[1mOS:\x1b[0m ${os}`);
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