const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      max: 20,
    },
    username: {
      type: String,
      unique: true,
      require: true,
      max: 20,
    },
    email: {
      type: String,
      unique: true,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    desc: {
      type: String,
      max: 1000,
    },
    image: {
      profile: {
        type: String,
        default: '',
      },
      cover: {
        type: String,
        default: '',
      },
    },
    DOB: Date,
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    tweets: {
      type: Array,
      default: [],
    },
    shares: {
      type: Array,
      default: [],
    },
    bookmarks: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
