const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    desc: {
      type: String,
      default: '',
    },
    img: {
      type: String,
      default: '',
    },
    likes: {
      type: Array,
      default: [],
    },
    comments: {
      type: Array,
      default: [],
    },
    shares: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Tweet', tweetSchema);
