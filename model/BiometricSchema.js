const { Schema, model } =require('mongoose');

const BiometricSchema = new Schema({
    weight: {
        type: Number,
        required: [true, 'Weight is required'],
    },
    height: {
        type: Number,
    },
    // BMI: {
    //     type: Number,
    // },
    date: {
        type: Date,
        required: true,
    },
    user_id: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
}, { timestamps: true });

const Biometric = model('Biometric', BiometricSchema);

module.exports = Biometric;