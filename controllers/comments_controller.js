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

module.exports.destroy = function(req,res){
    Comment.findById(req.query.cid,function(err,comment){
        if(err){console.log("Error in fetching the comment from db");return;}
        
        if(comment.user == req.user.id){
            comment.remove();

            Post.findById(req.query.pid,function(err,post){
                if(err){console.log("Error in finding the post in db");return;}

                let index = post.comments.indexOf(req.query.cid);
                post.comments.splice(index,1);
                post.save();
            });
        }
        return res.redirect('back');
    });
}