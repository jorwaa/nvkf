const config = require('./config');
const fs = require('fs');
const fetch = require('node-fetch');

const nodemailer = require('nodemailer');
const Mail = require('nodemailer/lib/mailer');

const scalingMethod = {
    NO_SCALING: 0,
    STRETCH: 1,
    ZOOM: 2
}

const imageType = {
    STANDARD: 1
}


function download_image(id) {
    const url = 'https://bilder.vinmonopolet.no/cache/'
    const x = 1200;
    const y = 1200;
    const scaling = scalingMethod.NO_SCALING;
    const type = imageType.STANDARD;

    fetch(`https://bilder.vinmonopolet.no/cache/${x}x${y}-${scaling}/${id}-${type}.jpg`)
        .then(res => {
            res.body.pipe(fs.createWriteStream(`./tmp/${id}.jpg`))
                .on('finish', function () {
                    console.log("Image successfully downloaded");
                })
        })
}

async function mailImages(data) {
    const baseUrl = 'https://bilder.vinmonopolet.no/cache/'

    const x = 1200;
    const y = 1200;
    const scaling = scalingMethod.NO_SCALING;
    const dimensions = `${x}x${y}-${scaling}/`

    const type = imageType.STANDARD;

    const transporter = nodemailer.createTransport({
        //pool: true,
        host: config.mail.host,
        port: config.mail.port,
        secure: true,
        auth: {
            user: config.mail.user,
            pass: config.mail.pass,
        },
    });

    var attachments = [];
    var html = "";

    for (let i = 0; i < data.length; i++) {
        let url = `${baseUrl}${dimensions}${data[i][4]}-${type}.jpg`
        html += `<h3> ${data[i][9]} - ${data[i][4]}: </h3>
                <a href="${url}" alt="${data[i][4]}"> <b>Bilde</b> </a>
                <hr>`
        let img = {
            filename: `${data[i][4]}.jpg`,
            path: url
        }
        attachments.push(img);
    }
    


    let message = {
        from: `${config.mail.sender.name} <${config.mail.sender.address}>`,
        to: `${config.mail.recipient.name} <${config.mail.recipient.address}>`,
        subject: `Registrert ${data.length} nye viner`,
        text: 'Bilder er lagt ved som vedlegg.',
        html: html,
        attachments: attachments
    }

    transporter.sendMail(message, (err, info) => {
        console.log(info.accepted);
    })

}

module.exports = {
    mailImages
}