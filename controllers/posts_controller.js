const Post = require("../models/post");
const Comment = require('../models/comment');
const passport = require('passport');

module.exports.create = async function(req,res){

    try{
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
    
        return res.redirect('back');
    }catch(err){
        console.log("Error in creating the post");
        return;
    }


    //  Post.create({
    //      content: req.body.content,
    //      user: req.user._id
    //  },function(err,post){
    //     if(err){console.log("Error in creating the post");return;}
    //     return res.redirect('back');
    //  });
}

module.exports.destroy = async function(req,res){

    try{
        let post = await Post.findById(req.params.id);

        if(post.user == req.user.id){
        post.remove();

        await Comment.deleteMany({post: req.params.id});

        return res.redirect('back');
    }
    else{
        return res.redirect('back');
    }
    }catch(err){
        console.log("Error",err);
        return;
    }
}
    


    // Post.findById(req.params.id,function(err,post){
    //     if(err){console.log("Error in finding the post");return;}

    //     // .id means converting object_id into string
    //     if(post.user == req.user.id){
    //         post.remove();
    //         // delete comments associated with this post
    //         Comment.deleteMany({post: req.params.id},function(err){
    //             return res.redirect('back');
    //         });
    //     }else{
    //         return res.redirect('back');
    //     }
    // });
