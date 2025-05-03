const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  message_id: { type: String, required: true, unique: true },
  sender_id: { type: String, required: true },
  receiver_id: { type: String, required: true },
  message_text: { type: String, required: true },
  media_url: { type: String },
  created_at: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
