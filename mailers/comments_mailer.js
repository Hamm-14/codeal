
const nodeMailer = require('../config/nodemailer');


exports.newComment = (comment) => {
    nodeMailer.transporter.sendMail({
        from: 'codeialnodejs@gmail.com',
        to: comment.user.email,
        subject: 'New Comment Published',
        html: '<h1>Yup, New comment added Sucessfully</h1>'
    },(err,info) => {
        if(err){console.log("Error in sending mail",err);return;}

        console.log('Message Sent',info);
        return;
    });
}