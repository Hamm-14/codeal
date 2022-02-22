const Friendship = require('../models/friendship');
const User = require('../models/user');

module.exports.addFriend = function(req,res){
    
    Friendship.create({
        from_user: req.user._id,
        to_user: req.query.friendId
    },function(err,friendship){
        if(err){console.log("Error in creating friendship",err);return;}

        req.user.friendships.push(friendship);
        req.user.save();
        User.findById(req.query.friendId,function(err,user){
            if(err){console.log("Error in finding the user",err);return;}

            if(user){
                user.friendships.push(friendship);
                user.save();
            }
            return;
        });
    });
    return res.status(200).json({
        data: {
            profile_user: req.query.friendId.toString()
        },
        message: 'Friend Added'
    });
}

module.exports.removeFriend = async function(req,res){
    try{
        let friend = await User.findById(req.query.friendId);

        let friendship = await Friendship.findOne({to_user:req.user._id, from_user: req.query.friendId});

        if(friendship){
            let index = req.user.friendships.indexOf(friendship);
    
            if (index > -1) {
                req.user.friendships.splice(index, 1);
                req.user.save();
            }
            let friendIndex = friend.friendships.indexOf(friendship);
            if (index > -1) {
                friend.friendships.splice(index, 1);
                friend.save();
            }
            Friendship.findByIdAndDelete(friendship._id,function(err){
                if(err){
                    console.log("Error in deleting friedship",err);
                    return;
                }
            });
        }
        else{
            let friendship = await Friendship.findOne({from_user:req.user._id, to_user: req.query.friendId});
            let index = req.user.friendships.indexOf(friendship._id);
            if (index > -1) {
                req.user.friendships.splice(index, 1);
                req.user.save();
            }
            let friendIndex = friend.friendships.indexOf(friendship);
            if (index > -1) {
                friend.friendships.splice(index, 1);
                friend.save();
            }
            Friendship.findByIdAndDelete(friendship._id,function(err){
                if(err){
                    console.log("Error in deleting friedship",err);
                    return;
                }
            });
        }

        return res.status(200).json({
            data: {
                profile_user: req.query.friendId.toString()
            },
            message: 'Friend Removed'
        });
    }catch(err){
        console.log("Error in removing friend",err);
        return;
    }
}