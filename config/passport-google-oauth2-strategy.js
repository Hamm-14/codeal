const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const User = require('../models/user');

passport.use(new googleStrategy({
    clientID: '813714437385-ukvgek7qe39hq0hg8cgrceolu22ffmet.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:8000/users/auth/google/callback'
}, 
    function(accessToken,refreshToken,profile,done){
        //google generates access token and give it to us and refreshToken is used to generate accessToken again if accessToken is expired
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log('error in passport google strategy',err);return;
            }
            if(user){
                return done(null,user);
            }
            else{
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){
                    console.log('error in creating user',err);return;}

                    return done(null,user);
                });
            }
        });
    }
));

module.exports = passport;