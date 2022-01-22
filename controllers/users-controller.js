const User = require('../models/users');

module.exports.profile = function(req,res){
    return res.render('profile',{
        title: "Profile"
    });
}

module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title: "Codeial | Sign-In"
    });
}

module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title: "Codeial | Sign-Up"
    });
}

module.exports.createUser = function(req,res){
    // console.log(req.body.confirm_password);
    // return res.redirect('back');
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email},function(err,user){
        if(err){console.log("Error in finding the user on signup");return;}

        if(!user){
            User.create(req.body,function(err,user){
                if(err){console.log("Error in craeting the user on signup");return;}
                return res.redirect('/users/sign-in');
            });
        }else{
            return res.redirect('back');
        }
    });
}

module.exports.createSession = function(req,res){
    //TODO Later
}