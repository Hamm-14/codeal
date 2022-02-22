const Post = require("../models/post")
const Comment = require("../models/comment");
const commentMailer = require('../mailers/comments_mailer');
const commentEmailWorker = require('../workers/comment_email_worker');
const queue = require('../config/kue');
const Like = require("../models/like");


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
        req.flash("success",'Comment Added');
        let commentWithUser = await Comment.findById(comment.id).populate('user');
        // commentMailer.newComment(commentWithUser);
        // let job = queue.create('emails',commentWithUser).save(function(err){
        //     if(err){
        //         console.log('Error in creating the queue',err);return;
        //     }
        //     console.log('Job Enqueued',job.id);
        // });

        if(req.xhr){
            
            return res.status(200).json({
                data:{
                    comment : commentWithUser,
                },
                message: 'Comment Created'
            });
        }
    }
    return res.redirect('back');
    }catch(err){
        req.flash('error','Error in adding comment');
        return;
    }
}

module.exports.destroy = async function(req,res){

    try{
        let comment = await Comment.findById(req.query.cid);

        if(comment.user == req.user.id){

            await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});
            comment.remove();

            let post = await Post.findById(req.query.pid);
            let index = post.comments.indexOf(req.query.cid);
            post.comments.splice(index,1);
            post.save();
            req.flash('success','Comment Deleted');
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        comment: comment
                    },
                message: "comment deleted"
            });
        }
    }
    return res.redirect('back');
    }catch(err){
        console.log("Error in fetching the comment from db");return;
    }
}
