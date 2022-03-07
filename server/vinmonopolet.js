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
    const x = 150;
    const y = 150;
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

async function mailImages(ids) {
    const baseUrl = 'https://bilder.vinmonopolet.no/cache/'

    const x = 150;
    const y = 150;
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

    for (let i = 0; i < ids.length; i++) {
        let url = `${baseUrl}${dimensions}${ids[i]}-${type}.jpg`
        html += `<p> ${ids[i]}: </p>
                <img src="${url}" alt="${url}"/>
                <br>`
        let img = {
            filename: `${ids[i]}.jpg`,
            path: url
        }
        attachments.push(img);
    }
    


    let message = {
        from: 'Vinskjema <joran@wigen.dev>',
        to: 'Jøran <joran.aasterud@gmail.com>',
        subject: `Registrert ${ids.length} nye viner`,
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