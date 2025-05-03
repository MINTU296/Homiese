const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  follower_id: { type: String, required: true },
  following_id: { type: String, required: true },
  followed_at: { type: Date, default: Date.now }
});

const Follow = mongoose.model('Follow', followSchema);
module.exports = Follow;
