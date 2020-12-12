const mongoose = require('mongoose');
const { Schema } = mongoose;

const GoogleUserSchema = new Schema({
  googleId: String,
  email: String,
  firstName: String,
  lastName: String,
  avatar: String,
  profile: Object,
});

const GoogleUsers = mongoose.model('GoogleUsers', GoogleUserSchema);

module.exports = GoogleUsers;
