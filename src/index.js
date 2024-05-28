const hasFlags = require('./flagHandler');

function printAsciiArt() {
    console.log(`
    _____.___.                    _____       __         .__     
    \\__  |   |____ ___  _______ _/ ____\\_____/  |_  ____ |  |__  
     /   |   \\__  \\\\  \\/ /\\__  \\\\   __\\/ __ \\   __\\/ ___\\|  |  \\ 
     \\____   |/ __ \\\\   /  / __ \\|  | \\  ___/|  | \\  \\___|   Y  \\
     / ______(____  /\\_/  (____  /__|  \\___  >__|  \\___  >___|  /
     \\/           \\/  
    `);
}

function printHelp() {
    console.log(`
    Usage: ascii-art [options]

    Options:
        --help      Print this help message
        --ascii     Print ascii art
    `);
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

    }
}

main();