const nodemailer = require('nodemailer')

const smtpConfig = {
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
}

const transporter = nodemailer.createTransport(smtpConfig)

class Email {
    constructor() {

    }
    async create(message, params) {
        console.log(message, 'this is the message to be sent')
        return "Hello this is working"
    }
}

module.exports = {
    transporter,
    Email
}
// console.log('here')
// transporter.verify()
//     .then(res => {
//         console.log("success")
//         console.log(res)
//     })
//     .catch(e => {
//         console.log(e)
//     })
// const message = {
//     from: 'info@somosvoxfm.com',
//     to: 'info@somosvoxfm.com',
//     subject: 'Application'
//     text: "This is some plain text",
//     html: '<h1>Hopefully this worked!!</h1>'
// }
// transporter.sendMail(message)
//     .then(res => {
//         console.log('sent')
//         console.log(res)
//     })
//     .catch(e => {
//         console.log(e)
//     })
