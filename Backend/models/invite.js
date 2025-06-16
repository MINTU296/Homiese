const mongoose = require('mongoose');

const inviteSchema = new mongoose.Schema({
  inviteId: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  workspaceId: { type: String, required: true },
  inviterId: { type: String, required: true }
});

const Invite = mongoose.model('Invite', inviteSchema);
module.exports = Invite;
