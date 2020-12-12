const mongoose = require('mongoose');
const { Schema } = mongoose;

const GoogleUserSchema = new Schema({
  googleId: String,
});

const GoogleUsers = mongoose.model('GoogleUsers', GoogleUserSchema);

module.exports = GoogleUsers;
