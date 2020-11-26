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
    user_Id: [{type: Schema.Types.ObjectId, ref: 'User._Id'}],
})

const Biometric = model('Biometric', BiometricSchema);

module.exports = Biometric;