const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

module.exports.home = function(req,res){
        // Post.find({},function(err,posts){
        //     if(err){console.log("Error in finding post");return;}
        //     return res.render('home',{
        //         title: "Home",
        //         posts: posts
        //     });

       //populate the user for each post and all comments of each post and the user who comment
       Post.find({})
       .populate('user')
       .populate({
           path: 'comments',
           populate: {
               path: 'user'
           }
       }).exec(function(err,posts){
           if(err){console.log("Error in fetching the posts from db",err);return;}
           return res.render('home',{
               title: "Codeial | Home",
               posts: posts
           });
       });
}

       //populate only the user for each post
        // Post.find({}).populate('user').exec(function(err,posts){
        //     return res.render('home',{
        //         title: "Home",
        //         posts: posts
        //     });
        // });