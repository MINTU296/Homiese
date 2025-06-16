const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  post_id: { type: String, required: true }
});

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;
