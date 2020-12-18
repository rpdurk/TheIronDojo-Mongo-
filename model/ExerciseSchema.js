const { Schema, model } = require('mongoose');

const ExerciseSchema = new Schema({
  exerciseName: {
    type: String,
    required: [true, 'Exercise name is required'],
  },
  setTotal: {
    type: Number,
    required: true,
  },
  repetitionsCompletedPerSet: {
    type: Number,
    required: true,
  },
  weightUsedPerSet: {
    type: Number,
  },
  exerciseDate: {
    type: Date,
    required: true,
  },
  // if time, add rest, time, or other options.
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Exercise = model('Exercise', ExerciseSchema);

module.exports = Exercise;
