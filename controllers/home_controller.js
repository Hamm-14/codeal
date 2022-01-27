const Post = require('../models/post');

module.exports.home = function(req,res){
    if(req.isAuthenticated()){
        // Post.find({},function(err,posts){
        //     if(err){console.log("Error in finding post");return;}
        //     return res.render('home',{
        //         title: "Home",
        //         posts: posts
        //     });

        //populate the user for each post
        Post.find({}).populate('user').exec(function(err,posts){
            return res.render('home',{
                title: "Home",
                posts: posts
            });
        });
        return;
    }
    return res.redirect('/users/sign-in');
}