const fs = require("fs");
const https = require("https");
const path = require("path");
const express = require("express");
const req = require("express/lib/request");
const app = express();

const PORT = process.env.PORT || 3001;;

let tokensRaw = fs.readFileSync("res/auths.json");
const tokens = JSON.parse(tokensRaw);

// Display front-end:
app.use(express.static(path.resolve(__dirname, '../client/build')));

// API calls:
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
            "Ocp-Apim-Subscription-Key": process.env.VP_AUTH
        }
    }
    // And away it goes!
    console.log("Sender request til remote server");
    console.log("host: " + options.hostname);
    console.log("path: " + options.path);
    console.log("GET request: ", (options.hostname).concat(options.path));
    console.log("headers: ", options.headers);
    //res.json({a:"a"});
    https.get(options, (res) => {
        console.log(`statusCode: ${res.statusCode}`)
        console.log("Request sendt!");
        res.on("data", d => {
            response.json({
                productNumber: id,
                //data: (d.toString()).replaceAll('"',"'"),
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

app.post("/api/google", (req, res) => {
    console.log("POST request => '/api/google");
    const importer = Array(req.body.data[0]);
    const numProducts = req.body.data.length;
    for (let i = 1; i < numProducts; i++)
    {
        let dataConcat = importer.concat(req.body.data[i]);
        console.log("product ARR: " + dataConcat);
        let dataStr = (dataConcat.join()).replace(", ", ";")
        console.log("product STR: " + dataStr);
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
});