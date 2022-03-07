const config = require("./config")
const fs = require("fs");
const https = require("https");
const path = require("path");
const express = require("express");
const req = require("express/lib/request");
const { json } = require("express/lib/response");
const {google} = require('googleapis');
//const sheets = google.sheets('v4');
const sheets = require('./sheets');
const { mailImages } = require("./vinmonopolet");
const app = express();

const PORT = config.port || 3001;

try {
    sheets.createKeyFile(config.google.auth)
}catch (err) {
    console.log(err);
}

const auth = sheets.authenticate('keys.json');


// Display front-end:
app.use(express.static(path.resolve(__dirname, '../client/build')));

/**
 * Used to consume the Vinmonopolet API.
 * Returns product data assoiciated with a given product number
 */
app.get("/api/vp", (req, response) => {
    console.log("Starter API-sak");
    const id = req.query.product;
    //Now create the request
    const options = {
        hostname: "apis.vinmonopolet.no",
        path: `/press-products/v0/details-normal?productId=${id}`,
        method: "GET",
        accept: "application/json",
        headers: {
            "Cache-Control": "no-cache",
            "Ocp-Apim-Subscription-Key": config.vinmonopolet.key,
        }
    }
    // And away it goes!
    console.log("Sender request til remote server");
    console.log("host: " + options.hostname);
    console.log("path: " + options.path);
    console.log("GET request: ", (options.hostname).concat(options.path));
    console.log("headers: ", options.headers);
    https.get(options, (res) => {
        console.log(`statusCode: ${res.statusCode}`)
        console.log("Request sendt!");
        res.on("data", d => {
            response.json({
                productNumber: id,
                data: JSON.parse(d.toString())[0],
                error: "false"
            });
        })
        
        res.on("error", err => {
            console.log("Error mottatt: " + err);
            response.json({
                productNumber: id,
                data: [],
                error: err
            })
        })
    });
});

/**
 * Consumes the Google Spreadsheets API.
 * When the form is submitted, its content are
 * appended to an existing spreadsheet as new rows
 */
app.post("/api/google", express.json(), (req, res) => {
    console.log("POST request => '/api/google");
    var body = req.body;
    console.log(body);
    const importerArr = body[0];
    const numProducts = body.length;
    var data = []
    var ids = []
    for (let i = 1; i < numProducts; i++)
    {
        let tmpArr = importerArr.concat(body[i]);
        console.log("Tmp arr:\n" + tmpArr);
        data.push(tmpArr);
        ids.push(tmpArr[4]);
    }

    sheets.appendSheet(data, auth)
    .then((data) => {
        mailImages(ids)
        res.json({response: data})
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
});
