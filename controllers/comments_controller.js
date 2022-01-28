const Post = require("../models/post")
const Comment = require("../models/comment");


module.exports.create = function(req,res){
    Post.findById(req.body.post,function(err,post){
        if(err){console.log("Error in finding the post by id");return;}

        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            },function(err,comment){
                if(err){console.log("Error in creating the comment in db");return;}

                post.comments.push(comment);
                post.save();
            });
        }
        return res.redirect('back');
    });
}