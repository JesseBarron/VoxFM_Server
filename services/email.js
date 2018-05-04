const nodemailer = require('nodemailer')

const emailContacts = {
    General: process.env.EMAIL_USER,
    Programación: process.env.EMAIL_PROG,
    Ventas: process.env.EMAIL_VENT,
}

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

    async create(messageDetails, params) {
        try{
            const { message, firstName, lastName, subject, email, topic } = messageDetails
            const emailDraft = {
                from: 'info@somosvoxfm.com',
                to: emailContacts[topic],
                subject: `${firstName} ${lastName} ${email} - ${subject}`,
                text: message,
                html: `
                <div>
                    <h4>${firstName} ${lastName} ${email} - ${subject}</h4>
                    <p>${message}</p>
                </div>
                `
            }
            const result = await transporter.sendMail(emailDraft)
            return result
        } catch(e) {
            console.log(e)
        }
    }
}

module.exports = {
    transporter,
    Email
}
