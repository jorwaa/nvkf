const config = require('./config')
const fs = require('fs');
const {google} = require('googleapis');
const { Stream } = require('stream');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']; // OR '.../auth/drive.${filename}'

//User access & refresh tokens:
const KEY_PATH = './keys.json';

/**
 * writes a JSON object to the path 'KEY_PATH'
 * @param {JSON} json: Json repr. of a google auth key
 * 
 * throws an error if 'json' is undefined
 */

function createKeyFile(json) {

    const data = JSON.stringify(json);

    fs.writeFile(KEY_PATH, data, function(err) {
        if (err) {
            console.log(`Error writing to file ${KEY_PATH}.`)
            throw err;
        }else {
            console.log(`Google credentials written to file ${KEY_PATH}`);
        }
    })
}

/**
 * Authenticates within the scopes defined in 'SCOPES'
 * @param {String} keyFile: path to file with credentials 
 * @returns {GoogleAuth}: an instance of the authentication(?)
 */
function authenticate(keyFile) {
    return new google.auth.GoogleAuth({
        keyFile,
        scopes: SCOPES,
    });
}

/**
 * Appends 1-n rows of data in a Google spreadsheet
 * @param {String[][]} data: a 2D array containing the rows to be appended
 * @param {*} auth: an instance of GoogleAuth used for authentication
 * @returns {Json}: the response given by the Google Sheets API
 */
async function appendSheet(data, auth) {
    const authClient = await auth.getClient();
    google.options({auth: authClient});
    
    const res = await google.sheets('v4').spreadsheets.values.append({
        auth,
        spreadsheetId: config.google.sheetId,
        range: config.google.range,
        valueInputOption: 'RAW',
        resource: {
            values: data
        }
    });
    console.log(res);
    if (res.status == 200) {
        return res.data;
    }else {
        return {
            'status': res.status,
            'error': 'true',
        }
    }
}

module.exports = {
    authenticate,
    appendSheet,
    createKeyFile,
};