const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController')

router.get('/firstpost',postController.posts);

router.get('/secondpost',postController.secondpost);


module.exports = router;