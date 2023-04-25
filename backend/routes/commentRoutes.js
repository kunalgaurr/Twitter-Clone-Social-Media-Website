const express = require('express');
const { postComment } = require('../controller/commentController');
const router = express.Router();

router.route('/new').post(postComment);

module.exports = router;
