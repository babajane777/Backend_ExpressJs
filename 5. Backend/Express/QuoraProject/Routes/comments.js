const express = require('express');
const app = express();
const router = express.Router();
const commentcontroller = require('../controllers/commentController');

router.post('/createcomment', commentcontroller.createcomment );

module.exports = router;