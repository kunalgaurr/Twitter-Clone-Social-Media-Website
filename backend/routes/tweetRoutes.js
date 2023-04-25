const express = require('express');
const {
  createTweet,
  getAllTweet,
  getSingleUserTweet,
  getFriendsTweets,
  likeTweet,
} = require('../controller/tweetController');
const router = express.Router();

router.route('/post').post(createTweet);
router.route('/all').get(getAllTweet);
router.route('/:userId').get(getSingleUserTweet);
router.route('/:userId/home').get(getFriendsTweets);
router.route('/:id/like').put(likeTweet);

module.exports = router;
