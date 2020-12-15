const mongoose = require('mongoose');
const { Schema } = mongoose;

const GoogleUserSchema = new Schema({
  googleId: String,
  email: String,
  firstName: String,
  lastName: String,
  avatar: String,
  profile: Object,
  biometrics: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Biometric',
    },
  ],
  workouts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workout',
    },
  ],
  exercises: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise',
    },
  ],
});

const GoogleUsers = mongoose.model('GoogleUsers', GoogleUserSchema);

module.exports = GoogleUsers;
