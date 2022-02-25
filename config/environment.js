
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
    jwt_secret: 'codeial'
}


const production = {
    name: 'production'
}

module.exports = development;