//init of dotenv
require("dotenv").config();

const fs = require('fs');
const Verisure = require('verisure');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

let verisure;

main()

async function main() {
    verisure = new Verisure(process.env.VERISURE_USERNAME, process.env.VERISURE_PWD);
    await verisure.getToken();
    console.log('One-time code sent.');
    await readline.question('token please', async token => {
        await verisure.getToken(token);
        getVerisure()
        readline.close();
    });
}

async function getVerisure() {
    try {
        verisure
            .getInstallations()
            .then(installations => {
                return installations[0].getOverview();
            })
            .then(overview => {
                fs.writeFile("data.json", JSON.stringify(overview), function (err) {
                    if (err) return console.log(err);
                  });
                console.log('OVERVIEW:', overview);
            })
            .catch(error => {
                console.error('Error 1: ', error);
            });
    } catch (err) {
        console.log('Error 2: ', err.message);
    }
}