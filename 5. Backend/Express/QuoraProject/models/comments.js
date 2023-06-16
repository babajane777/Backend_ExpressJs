const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "userdetails"
    },

    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "posts"
    },

    comment:{
        type:String,
        required:true
    }

})

const Comment  = mongoose.model('comments',commentSchema);
module.exports = Comment;