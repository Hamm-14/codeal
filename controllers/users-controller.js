const crypto = require('crypto');
const User = require('../models/user');
const fs = require('fs');
const path = require('path');
const resetPassMailer = require('../mailers/reset_pass_mailer');
const ResetToken = require('../models/resetPasswordToken');


module.exports.profile = function(req,res){
    User.findById(req.params.id,function(err,user){
        const isFriend = user.friendships.some(element => {
            return req.user.friendships.includes(element);
        });
        return res.render('profile',{
            title: "Profile",
            profile_user: user,
            isFriend : isFriend
        });
    });
}

module.exports.update = async function(req,res){

    try{
        if(req.user.id == req.params.id){
            let user = await User.findById(req.params.id);
            //form consist of multipart/form-data that's why it will take the data through multer(uploaded avatar)
            User.uploadedAvatar(req,res,function(err){ 
                if(err){
                    console.log("****Multer Error: ",err);
                    return;
                }
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){
                    //checking whether the file is already present or not, if present then we will delete already existed file
                     if(user.avatar && fs.existsSync(path.join(__dirname,'..',user.avatar))){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar)); //deleting file
                    }
                    //saving the path of uploaded file in 'avatar' field of 'userSchema'
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
        }
            else{
                 return res.status(401).send('Unauthorized');
            }
    }
    catch(err){
        console.log("Error in updating the post",err);
        return;
    }
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
    //         if(err){console.log("Error in finding the user");return;}

    //         return res.redirect('back');
    //     });
    // }else{
    //     return res.status(401).send('Unauthorized');
    // } 
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

