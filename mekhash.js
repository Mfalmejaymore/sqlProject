const { log } = require('console');

let output = {};

// this creates a hash like that hashing function in php
output['customhash'] = (pw) => {
    let hash = 0;

    // no idea what this does all i know is that it works 
    for (let i = 0; i < pw.length; i++) {
        let char = pw.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32-bit integer
    }

    let thehash = hash.toString(16);
    // log(`turned [${pw}] to [${thehash}]`);
    return thehash;
}

module.exports = output;