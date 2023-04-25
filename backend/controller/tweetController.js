const tryCatch = require('../utils/tryCatch');
const User = require('../models/userModel');
const Tweet = require('../models/tweetModel');
const AppError = require('../middleware/appError');

exports.createTweet = tryCatch(async (req, res) => {
  const { userId, desc, img } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  if (desc.lenght && img.length === 0) {
    throw new AppError('Cannot post an empty tweet', 403);
  }
  const newTweet = await Tweet.create({ userId, desc, img });
  await newTweet.save();
  await user.tweets.push(newTweet._id);
  await user.save();
  return res.status(200).json({ success: true, newTweet });
});

exports.getAllTweet = tryCatch(async (req, res) => {
  const tweets = await Tweet.find();
  return res.status(200).json(tweets);
});

exports.getSingleUserTweet = tryCatch(async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  const tweets = await Tweet.find({ userId: userId });
});

exports.getFriendsTweets = tryCatch(async (req, res) => {
  const currentUser = await User.findById(req.params.userId);
  if (!currentUser) {
    throw new AppError('User not found', 404);
  }
  const userTweet = await Tweet.find({ userId: currentUser._id });
  const friendTweet = await Promise.all(
    currentUser.following.map((friendId) => {
      return Tweet.find({ userId: friendId });
    })
  );
  res.status(200).json(userTweet.concat(...friendTweet));
});

exports.updateTweet = tryCatch(async (req, res) => {
  const tweet = await Tweet.findById(req.params.id);
  if (!tweet) {
    throw new AppError('Tweet not found', 404);
  }
  if (req.body.userId !== tweet.userId) {
    throw new AppError('Access denied', 402);
  }
  await tweet.updateOne({ $set: req.body });
  await tweet.save();
  return res.status(200).json({ success: true, tweet });
});

exports.deleteTweet = tryCatch(async (req, res) => {
  const tweet = await Tweet.findById(req.params.id);
  if (!tweet) {
    throw new AppError('Tweet not found', 404);
  }
  if (req.body.userId !== tweet.userId) {
    throw new AppError('Access denied', 402);
  }
  await tweet.deleteOne();
  res.status(200).json({ success: true, message: 'Tweet deleted succesfully' });
});

exports.likeTweet = tryCatch(async (req, res) => {
  const tweet = await Tweet.findById(req.params.id);
  if (!tweet) {
    throw new AppError('Tweet not found', 404);
  }
  const user = User.findById(req.body.userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  if (tweet.likes.includes(user._id)) {
    await tweet.likes.pull(user._id);
    await tweet.save();
    return res.status(200).json({ success: true, message: 'Tweet disliked' });
  } else {
    await tweet.likes.push(user._id);
    await tweet.save();
    return res.status(200).json({ success: true, message: 'Tweet liked' });
  }
});

exports.saveTweet = tryCatch(async (req, res) => {
  const tweet = await Tweet.findById(req.params.id);
  if (!tweet) {
    throw new AppError('Tweet not found', 404);
  }
  const user = await User.findById(req.body.userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  if (user.bookmarks.includes(tweet._id)) {
    await user.bookmarks.pull(tweet._id);
    await tweet.shares.pull(req.body.userId);
    return res
      .status(200)
      .json({ success: true, message: 'Saved to bookmarks' });
  } else {
    await user.bookmarks.push(tweet._id);
    await tweet.shares.push(req.body.userId);
    return res
      .status(200)
      .json({ success: true, message: 'Saved to bookmarks' });
  }
});
