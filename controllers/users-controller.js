const User = require('../models/users');

module.exports.profile = function(req,res){
   if(req.cookies.user_id){
       User.findById(req.cookies.user_id,function(err,user){
           if(err){console.log("Error in fetching the user");return;}

           if(user){
            return res.render('profile',{
                title: "User's Profile",
                user: user.name,
                email: user.email
            });
           }
           return res.redirect('back');  
       });
   }
   else{
       return res.redirect('/users/sign-in');
   }
}

module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title: "Codeial | Sign-In"
    });
}

module.exports.signOut = function(req,res){
    res.clearCookie("user_id");
    return res.redirect('/users/sign-in');
}

module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title: "Codeial | Sign-Up"
    });
}

module.exports.createUser = function(req,res){
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
    User.findOne({email : req.body.email},function(err,user){
        if(err){console.log("Error in finding user");return;}

        if(user){
            if(user.password != req.body.password){
                return res.redirect('back');
            }
            //handle create session
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');
        }
        else{
            return res.redirect('back');
        }
    });
}