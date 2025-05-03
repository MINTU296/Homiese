const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  comment_id: { type: String, required: true, unique: true },
  user_id: { type: String, required: true },
  text: { type: String, required: true },
  post_id: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
