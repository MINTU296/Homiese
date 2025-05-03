const mongoose = require('mongoose');

const collegeProfileSchema = new mongoose.Schema({
  college_id: { type: String, required: true },
  college_info: [{ type: String, required: true }]
});

const CollegeProfile = mongoose.model('CollegeProfile', collegeProfileSchema);
module.exports = CollegeProfile;
