const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  post_id: { type: String, required: true, unique: true },
  user_id: { type: String, required: true },
  text: { type: String, required: true },
  image: { type: String },
  likes: { type: Number, default: 0 }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
