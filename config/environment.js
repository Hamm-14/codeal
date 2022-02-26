const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

//create a directory where logs would be saved
const logDirectory = path.join(__dirname,'../production_logs');

//check whether directory exist or not
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log',{
  interval: '1d',
  path: logDirectory
});

const development= {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'codeialnodejs@gmail.com', // generated ethereal user 
          pass: 'exploreNode@N' // generated ethereal password
        },
      },
    google_client_id: '813714437385-ukvgek7qe39hq0hg8cgrceolu22ffmet.apps.googleusercontent.com',
    google_client_secret: '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',
    google_callback_url: 'http://localhost:8000/users/auth/google/callback',
    jwt_secret: 'codeial',
    morgan: {
      mode: 'dev',
      options: {stream: accessLogStream}
    }
}


const production = {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.CODEIAL_GMAIL_USERNAME, // generated ethereal user 
          pass: process.env.CODEIAL_GMAIL_PASSWORD // generated ethereal password
        },
      },
    google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_callback_url: process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.CODEIAL_JWT_SECRET,
    morgan: {
      mode: 'combined',
      options: {stream: accessLogStream}
    }
}

module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);