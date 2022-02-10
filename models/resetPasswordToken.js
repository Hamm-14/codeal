var mongoose = require('mongoose');

const resetSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    accessToken: {
        type: String,
        required: true
    },
    isValid: {
        type: Boolean,
        required: true
    }
},{
    timestamps: true
});

const ResetToken = mongoose.model('ResetToken',resetSchema);
module.exports = ResetToken;