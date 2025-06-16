const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  mentor_id: { type: String, required: true },
  bio: { type: String, required: true },
  mentees: { type: Number, default: 0 }
});

const Mentor = mongoose.model('Mentor', mentorSchema);
module.exports = Mentor;
