var mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    }
},{
    timestamps: true
});

const Comment = mongoose.model('Comment',commentSchema);
module.exports = Comment;