const Post = require("../models/post")
const Comment = require("../models/comment");


module.exports.create = async function(req,res){

    try{
        let post = await Post.findById(req.body.post);

        if(post){
        let comment = await Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        });

        post.comments.push(comment);
        post.save();
    }
    return res.redirect('back');
    }catch(err){
        console.log("Error",err);
        return;
    }
}

module.exports.destroy = async function(req,res){

    try{
        let comment = await Comment.findById(req.query.cid);

        if(comment.user == req.user.id){
        comment.remove();

        let post = await Post.findById(req.query.pid);
        let index = post.comments.indexOf(req.query.cid);
        post.comments.splice(index,1);
        post.save();
    }
    return res.redirect('back');
    }catch(err){
        console.log("Error in fetching the comment from db");return;
    }
}
