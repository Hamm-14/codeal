const ResetToken = require('../models/resetPasswordToken');
const User = require('../models/user');
const crypto = require('crypto');
const resetPassMailer = require('../mailers/reset_pass_mailer');


module.exports.createResetLink = function(req,res){
    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log('Error in finding user in reset pass',err);return;
        }
        if(!user){
            req.flash('error','User not found');
            return res.redirect('back');
        }
        let token = crypto.randomBytes(20).toString('hex');
        let link = 'http://localhost:8000/users/reset_password/?accessToken=' + token;
        ResetToken.create({
            user: user,
            accessToken: token,
            isValid: true
        });
        resetPassMailer.resetPassword(link,user);
        req.flash('success','Verification link has been sent on your email');
        return res.redirect('back');
    });
}


module.exports.resetPassword = function(req,res){
    let accessToken = req.query.accessToken;
    console.log(accessToken);
    ResetToken.findOne({accessToken: accessToken},function(err,token){
        if(err){
            console.log('Error in finding the token',err);return;
        }
        console.log(token);
        return res.render('reset_password',{
            title: "Reset Password",
            token: token
        });
    });
}

module.exports.changePassword = function(req,res){
    if(req.body.password == req.body.confirmPassword){
        let accessToken = req.query.accessToken;
        ResetToken.findOne({accessToken:accessToken},function(err,token){
        if(err){
            console.log("Error in finding the token",err);return;
        }

        if(!token || !token.isValid){
            req.flash('error','Your Verification link is incorrect');
            return res.redirect('/users/sign-in');
        }
        User.findById(token.user,function(err,user){
            if(err){
                console.log("Error in finding the user in reset pass",err);return;
            }
            user.password = req.body.password;
            user.save();
            token.remove();
            req.flash('success',"Password Successfully Changed");
            return res.redirect('/users/sign-in');
        });
    });
    }else{
        req.flash('error',"Password doesn't match");
        return res.redirect('back');
    }
}