const User = require('../models/user');

module.exports.profile = function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('profile',{
            title: "Profile",
            profile_user: user
        });
    });
}

module.exports.update = function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            if(err){console.log("Error in finding the user");return;}

            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized');
    }
}

module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title: "Codeial | Sign-In"
    });
}

module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title: "Codeial | Sign-Up"
    });
}

module.exports.createUser = function(req,res){

    if(req.body.password != req.body.confirm_password){
        req.flash('error','Password does not match');
        return res.redirect('back');
    }

    User.findOne({email: req.body.email},function(err,user){
        if(err){console.log("error in finding the user");return;}

        if(!user){
            User.create(req.body,function(err,user){
                if(err){console.log("Error in creating the user on signup");return;}
                return res.redirect('/users/sign-in');
            });
        }else{
            return res.redirect('back');
        }
    });
}

module.exports.createSession = function(req,res){
    return res.redirect('/');        //redirecting to homepage after successful logged-in
}

module.exports.destroySession = function(req,res){
    req.logout();
    req.flash('success','You have successfully logged out');
    return res.redirect('/users/sign-in');
}