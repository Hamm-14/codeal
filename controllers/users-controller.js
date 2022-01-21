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