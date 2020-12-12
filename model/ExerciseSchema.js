const { Schema, model } =require('mongoose');

const ExerciseSchema = new Schema({
    exerciseName: {
        type:String,
        required: [true, 'Exercise name is required'],
    },
    sets: {
        type: Number,
        required: true,
    },
    repetitions: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
    },
    date: {
        type: Date,
        required: true,
    },
    // if time, add rest, time, or other options.
    user_id: 
        {type: Schema.Types.ObjectId, 
        ref: 'User'},
})

const Exercise = model('Exercise', ExerciseSchema);

module.exports = Exercise;