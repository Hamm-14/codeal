const passport = require('passport');
const User = require('../models/user');

const LocalStrategy = require('passport-local').Strategy;

//authentication using passport
//we need to tell the passport to use this LocalStrategy that we have created
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
},
function(req,email,password,done){
    User.findOne({email: email},function(err,user){
        if(err){
            req.flash('error',"Invalid Username or Password");
            return done(err);
        }

        if(!user || user.password != password){
            req.flash('error',"Invalid Username or Password");
            return done(null,false);
        }

        req.flash('success',"Logged in Succefully");
        return done(null,user);
    });
}));

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserializing the user from the key in cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("Error in finding user --> passport");
            return done(err);
        }

        return done(null,user);
    });
});

//check if the user is authenticated ans i'm going to use it as a middleware as it contains next as argument
passport.checkAuthentication = function(req,res,next){
    //if the user is signed-in the pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    //req.user contains current signed-in from the session cookie and we just want to send this req.user to the
    //locals for views.
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}