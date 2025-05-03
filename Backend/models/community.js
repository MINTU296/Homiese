const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  admin_id: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

const Community = mongoose.model('Community', communitySchema);
module.exports = Community;
