const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
        // ref: 'User',
        // required: true
    },
    likeable: {
        type: mongoose.Schema.ObjectId,
        refPath: 'onModel',
        required: true
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Post','Comment']
    }
},{
    timestamps: true
});

const Like = mongoose.model('Like',likeSchema);
module.exports = Like;
