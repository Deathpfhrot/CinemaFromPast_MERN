const nodemailer = require("nodemailer");
const dotenv = require("dotenv")

dotenv.config()

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
})

function sendMail(options) {
    return new Promise((resolve, reject) => {
        const to = options.to;
        const subject = options.subject;
        const message = options.message;

        const messageHtml = options.html || message.replaceAll("\n", "<br/>");

        transporter.sendMail({
            from: '"Movieworld Treuchtlingen" <markus.schiller2929@gmail.com',
            to,
            subject,
            text: message,
            html: messageHtml,
        }).then((sendMessageInfo) => {
            const sendSuccess = sendMessageInfo.accepted.includes(to);
            if (sendSuccess) {
                resolve();
            } else {
                reject();
            }
        }).catch((err) => {
            console.log("Error send fail: ", err);
            reject()
        })
    })
}

module.exports = { sendMail }