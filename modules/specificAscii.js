const os = require('os');

function printOsSpecificAsciiArt() {
    if (os.type() === 'Linux') {
        console.log(`
        .--.
       |o_o |
       |:_/ |
      //   \\ \\
     (|     | )
    /'\\_   _/\`\\ 
    \\___)=(___/
        `);
    }

    if (os.type() === 'Windows_NT') {
        console.log(`
    ////////  ////////
    ////////  ////////
    ////////  ////////
    ////////  ////////

    ////////  ////////
    ////////  ////////
    ////////  ////////
    ////////  ////////
        `);
    }

    if (os.type() === 'Darwin') {
        console.log(`
        
        `);
    }
}

module.exports = { printOsSpecificAsciiArt };