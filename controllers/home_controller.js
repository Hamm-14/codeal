const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');
const Friendship = require('../models/friendship');

//code using asynch await
module.exports.home = async function(req,res){

    try{
        
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            },
        });

        let users = await User.find({});

        let friends = new Array();
        
        for(friend of req.user.friendships){
            let populatedFriend = await Friendship.findById(friend).populate('from_user').populate('to_user');
            if(populatedFriend.from_user._id == req.user._id){
                friends.push(populatedFriend.from_user);
            }
            else{
                friends.push(populatedFriend.to_user);
            }
        }
        
        return res.render('home',{
            title: 'Codeial | Home',
            posts: posts,
            all_users: users,
            all_friends: friends
        });
    }
    catch(err){
        console.log("Error",err);
        return;
    }  

}

        // Post.find({},function(err,posts){
        //     if(err){console.log("Error in finding post");return;}
        //     return res.render('home',{
        //         title: "Home",
        //         posts: posts
        //     });

       //populate the user for each post and all comments of each post and the user who comment
//        Post.find({})
//        .populate('user')
//        .populate({
//            path: 'comments',
//            populate: {
//                path: 'user'
//            }
//        }).exec(function(err,posts){
//            if(err){console.log("Error in fetching the posts from db",err);return;}
//            User.find({},function(err,users){
//             if(err){console.log("Error in fetching the users from db",err);return;}

//             return res.render('home',{
//                 title: "Codeial | Home",
//                 posts: posts,
//                 all_users: users
//             });
//            });
//        });
// }

    //populate only the user for each post
        // Post.find({}).populate('user').exec(function(err,posts){
        //     return res.render('home',{
        //         title: "Home",
        //         posts: posts
        //     });
        // });