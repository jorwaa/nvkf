const fs = require("fs");
const https = require("https");
const express = require("express");
const req = require("express/lib/request");
const app = express();

const PORT = process.env.PORT || 3001;

let tokensRaw = fs.readFileSync("res/auths.json");
const tokens = JSON.parse(tokensRaw);

// Vinmonopolet API:

app.get("/api", (req, response) => {
    console.log("Starter API-sak");
    const id = req.query.product;
    //Now create the request
    const options = {
        hostname: "apis.vinmonopolet.no",
        path: `/`,
        method: "GET",
        headers: {
            "Cache-Control": "no-cache",
            "Ocp-Apim-Subscription-Key": tokens.Vinmonopolet
        }
    }
    // And away it goes!
    console.log("Sender request til remote server");
    console.log("host: " + options.hostname);
    console.log("path: " + options.path);
    //res.json({a:"a"});
    https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)
        console.log("Request sendt!");
        res.on("data", d => {
            console.log("Data mottatt: " + JSON.parse(d));
            response.json({
                productNumber: id,
                data: d[0],
                error: ""
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
    console.log("Ute av requesten?");
/*
res.json({
    ID: id,
    token: tokens.Vinmonopolet,
    data: "Coming soon to a cinema near you!"
});
*/
});

app.listen(PORT, () => {
    console.log('listening to port ${PORT}');
});