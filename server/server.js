const fs = require("fs");
const https = require("https");
const path = require("path");
const express = require("express");
const req = require("express/lib/request");
const { json } = require("express/lib/response");
const {google} = require('googleapis');
const sheets = google.sheets('v4');
const app = express();

const PORT = process.env.PORT || 3001;;

if (process.env.GOOGLE_AUTH_JSON) {
    const file = 'keys.json';
    fs.writeFile(file, process.env.GOOGLE_AUTH_JSON, function(err) {
        if (err) {
            console.log(`Error writing to file ${file}.`)
        }
    })
}else {
    console.log("No google authentication environmental variable set");
}

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

//TEST-SHEET id: 1ZhJOGRU7OpXpYzDTDuhVdQUfCEca_6v0N8dbO6vo_3s
//          gid: 0

const auth = new google.auth.GoogleAuth({
    keyFile: "keys.json",
    scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/spreadsheets',
      ],
});

app.post("/api/google", express.json(), (req, res) => {
    console.log("POST request => '/api/google");
    var body = req.body;
    console.log(body);
    const importerArr = body[0];
    //const importerStr = importerArr.join(";");
    const numProducts = body.length;
    var data = []
    for (let i = 1; i < numProducts; i++)
    {
        let tmpArr = importerArr.concat(body[i]);
        console.log("Tmp arr:\n" + tmpArr);
        data.push(tmpArr);
    }

    appendSheet(data)
    res.json({fasit: "Mwuahahaha!"});
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
});

async function appendSheet(data) {
    console.log("Data:");
    console.log(data);
    console.log("data[0]: " + data[0]);
    const authClient = await auth.getClient();
    google.options({auth: authClient});

    //const googleSheetsInstance = google.sheets({ version: "v4", auth: authClient });

    const request = {
        auth,
        spreadsheetId: '1ZhJOGRU7OpXpYzDTDuhVdQUfCEca_6v0N8dbO6vo_3s',
        range: 'Sheet1!A:M',
        values: data,
        //auth: authClient,
    };

    const res = await sheets.spreadsheets.values.append({
            auth,
            spreadsheetId: '1ZhJOGRU7OpXpYzDTDuhVdQUfCEca_6v0N8dbO6vo_3s',
            range: 'Sheet1!A:M',
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: data
            }
        })

        console.log(res.data);
/*
    try {
        const response = (await googleSheetsInstance.spreadsheets.values.append(request)).data;
        // TODO: Change code below to process the `response` object:
        console.log(JSON.stringify(response, null, 2));
      } catch (err) {
        console.error(err);
        return;
      }
      */
      //console.log(`${response.updates.updatedCells} cells appended.`);
}

/*
async function authorize() {
    let authClient = null;
    if (authClient == null) {
        
    }
}
*/