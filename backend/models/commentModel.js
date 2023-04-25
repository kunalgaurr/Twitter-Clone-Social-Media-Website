const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    tweetId: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      default: '',
    },
    likes: Array,
    default: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);
