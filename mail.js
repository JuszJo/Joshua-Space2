var nodemailer = require('nodemailer');
var env = require('dotenv');

env.config();

function sendmail(user){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
        }
    });

    var mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: 'joshubaniwokoma@gmail.com',
        subject: user.email,
        text: user.message
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if(err) throw err;
        console.log(`Email sent to ${mailOptions.to}\n` + info.response);
    });
}
module.exports = sendmail;