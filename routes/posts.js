const express = require('express');
const router = express.Router();

const postController = require('../controllers/posts_controller');

router.get('/users_posts',postController.posts);

module.exports = router;