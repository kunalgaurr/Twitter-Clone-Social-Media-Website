const AppError = require('../middleware/appError');
const Comment = require('../models/commentModel');
const Tweet = require('../models/tweetModel');
const User = require('../models/userModel');
const tryCatch = require('../utils/tryCatch');

exports.postComment = tryCatch(async (req, res) => {
  const { userId, tweetId, comment } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  const tweet = await Tweet.findById(tweetId);
  if (!tweet) {
    throw new AppError('Tweet not found', 404);
  }
  const newComment = await Comment.create({
    userId,
    tweetId,
    comment,
  });
  await newComment.save();
  tweet.comments.push(newComment._id);
  tweet.save();
  return res.status(200).json({ success: true, newComment });
});

exports.deleteComment = tryCatch(async (req, res) => {
  const user = await User.findById(req.body.userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  const tweet = await Tweet.findById(req.body.tweetId);
  if (!tweet) {
    throw new AppError('Tweet not found', 404);
  }
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    throw new AppError('Comment not found', 404);
  }
  if (comment.userId !== req.body.userId) {
    throw new AppError('You cannot update this comment', 403);
  }
  await comment.deleteOne();
  return res.status(200).json('Comment deleted succesfully');
});

exports.likeComment = tryCatch(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    throw new AppError('Comment not found', 404);
  }
  const likerId = await User.findById(req.body.likerId);
  if (!likerId) {
    throw new AppError('User not found', 404);
  }
  if (comment.likes.includes(likerId)) {
    await comment.likes.pull(likerId);
    await comment.save();
    res.status(200).json('Comment liked successfully', 404);
  } else {
    await comment.likes.pull(likerId);
    await comment.save();
    res.status(200).json('Comment disliked succesfully');
  }
});
