const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const postImagesPath = path.join('/uploads/post/images')

const postschema = new mongoose.Schema({
    post:{
        type: String,
        required: true
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userdetails'
    },
    comments: [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'comments'
        }
    ],

    image:{
        type:String
    }
}, {timestamps: true})


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..' , postImagesPath));
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + Date.now())
    }
})

  
postschema.statics.uploadedposts = multer({storage:storage}).single('image');
postschema.statics.postImagesPath = postImagesPath;

const Post = mongoose.model('posts',postschema);

module.exports = Post;