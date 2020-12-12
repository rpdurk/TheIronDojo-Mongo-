const { Schema, model } =require('mongoose');

const WorkoutSchema = new Schema({
    workoutName: {
        type: String,
        required: [true, 'Workout name is required'],
    },
    exercise: {
        type: String,
        required: [true, 'Please add an exercise'],
    },
    date: {
        type: Date,
        required: true,
    },
    user_id: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
})

const Workout = model('Workout', WorkoutSchema);

module.exports = Workout;
