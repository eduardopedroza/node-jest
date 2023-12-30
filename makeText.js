/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const { MarkovMachine } = require('./markov');

async function generateURLMarkov(url) {
    try {
        const response = await axios.get(url);
        let mm = new MarkovMachine(response.data);
        console.log(`generated text from url ${url}:\n${mm.makeText()}`);
    } catch (err) {
        console.error(`Error fetching ${url}:\n${err.message}`);
        process.exit(1);
    }
}

function generateFileMarkov(file) {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(`Problem reading ${file}:\n${err.message}`);
            process.exit(1);
        }
        let mm = new MarkovMachine(data);
        console.log(`generated text from file ${file}:\n${mm.makeText()}`);
    });
}



let args = process.argv.slice(2);


if (args.length === 2) {
    if (args[0] === 'file') {
        generateFileMarkov(args[1]);
    } else if (args[0] === 'url') {
        generateURLMarkov(args[1]);
    } else {
        console.error("Invalid command. Use 'file' or 'url' followed by the path or URL.");
        process.exit(1);
    }
} else {
    console.error("Incorrect number of arguments. Usage: node makeText.js [file|url] [path|URL]");
    process.exit(1);
}