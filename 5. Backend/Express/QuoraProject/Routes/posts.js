const express = require('express');
const app = express();
const multer =require('multer');
const router = express.Router();
const passport = require('passport');
const Post = require('../models/post');
const postscontroller = require('../controllers/postController');
// const uploads = Post.uploadedposts;

