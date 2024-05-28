const { printAsciiArt } = require('../modules/ascii');
const { printHelp } = require('../modules/help');
const { nameInfo } = require('../modules/nameInfo');

function defaultInfo() {
    const name = nameInfo();
    console.log(`${name}`);
}

function main() {
    const flags = process.argv.slice(2);
    switch (true) {
        case flags.includes('--help'):
            printHelp();
            break;
        
        case flags.includes('--ascii'):
            printAsciiArt();
            break;
        default:
            defaultInfo();

    }
}

main();