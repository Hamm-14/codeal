
const nodeMailer = require('../config/nodemailer');


exports.resetPassword = (link,user) => {
    let htmlString = nodeMailer.renderTemplate({link:link},'./resetPassword/reset_pass.ejs');

    nodeMailer.transporter.sendMail({
        from: 'codeialnodejs@gmail.com',
        to: user.email,
        subject: 'Reset Password Link',
        html: htmlString
    },(err,info) => {
        if(err){console.log("Error in sending reset pass mail",err);return;}

        console.log('Message Sent',info);
        return;
    });
}