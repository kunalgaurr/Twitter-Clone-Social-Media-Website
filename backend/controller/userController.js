const AppError = require('../middleware/appError');
const User = require('../models/userModel');
const tryCatch = require('../utils/tryCatch');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateResetPasswordToken = require('../utils/generateToken');
const mongoose = require('mongoose');

exports.registerUser = tryCatch(async (req, res) => {
  const { name, username, email, password } = req.body;
  const checkUsername = User.find({ username: username });
  if (checkUsername === true) {
    throw new AppError('username is already taken', 400);
  }
  const checkEmail = User.find({ email: email });
  if (checkEmail === true) {
    throw new AppError('The email is already registered', 400);
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = await User.create({
    name,
    username,
    email,
    password: hashedPassword,
  });
  await newUser.save();
  return res.status(200).json({ success: true, user: newUser });
});

exports.loginUser = tryCatch(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new AppError('Please enter email address or password', 400);
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError('User does not exist', 404);
  }
  const comparePassword = await bcrypt.compare(password, user.password); //check for error later
  console.log(comparePassword);
  if (!comparePassword) {
    throw new AppError('Please enter correct Password', 400);
  }
  const token = await jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  return res.status(200).json({ success: true, token: token, user: user });
});

exports.getAllUser = tryCatch(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

exports.getSingleUser = tryCatch(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  return res.status(200).json(user);
});

exports.getProfileDetails = tryCatch(async (req, res) => {
  const user = await User.findOne({ username: req.query.username });
  if (!user) {
    throw new AppError('User not found', 404);
  }
  return res.status(200).json(user);
});

exports.updateUser = tryCatch(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  await user.updateOne({ $set: req.body });
  const savedUser = user.save();
  return res.status(200).json({ success: true, savedUser });
});

exports.deleteUser = tryCatch(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  return res
    .status(200)
    .json({ success: true, message: 'User deleted successfully' });
});

exports.followUser = tryCatch(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  const follower = await User.findById(req.body.followerId);
  if (!follower) {
    throw new AppError('Follower not found', 404);
  }
  mongoose.Types.ObjectId.isValid(follower._id);
  if (user._id === follower._id) {
    throw new AppError('User cannot follow themself', 403);
  }
  if (user.followers.includes(follower._id)) {
    user.followers.pull(follower._id);
    follower.following.pull(user._id);
    await user.save();
    await follower.save();
    return res
      .status(200)
      .json({ success: true, message: 'User unfollowed succesfully' });
  } else {
    user.followers.push(follower._id);
    follower.following.push(user._id);
    await user.save();
    await follower.save();
    return res
      .status(200)
      .json({ success: true, message: 'User followed succesfully' });
  }
});

exports.logoutUser = tryCatch(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  return res
    .status(200)
    .json({ success: true, message: 'User logged out succesfully' });
});

exports.resetPassword = tryCatch(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  const validatePassword = await bcrypt.compare(
    user.password,
    req.body.password
  );
  if (!validatePassword) {
    throw new AppError('Invalid password, please enter correct password', 403);
  }
  if (req.body.password !== req.body.confirmPassword) {
    throw new AppError('Invalid password, passwords do not match');
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  await user.updateOne({ $set: { $password: hashedPassword } });
  await user.save();
  return res
    .status(200)
    .json({ success: true, message: 'Password updated succesfully' });
});

// exports.forgotPassword = tryCatch(async (req, res) => {
//   const user = await User.findOne(req.body.email);
//   if (!user) {
//     throw new AppError('User not found', 404);
//   }
//   const resetToken = user.generateResetPasswordToken();
// });
