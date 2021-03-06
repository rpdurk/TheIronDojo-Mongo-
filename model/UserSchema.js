const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserSchema = mongoose.Schema(
  {
    // email: {
    //   type: String,
    //   // required: [true, 'Username is required'],
    //   trim: true,
    //   unique: true,
    // },
    email: {
      type: String,
      // required: [true, 'Username is required'],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      // required: [true, 'Password is required'],
    },
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
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
    googleId: String,
    profile: Object,

    // role: {
    //     type: String,
    //     required: [true, 'You must select a role'],
    // },
  },
  {
    timestamps: true,
  }
);

// Static belongs to the full ORM

UserSchema.static({
  findByEmail: function (email) {
    try {
      return this.find({ email });
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  },
  findOneByEmail: function (email) {
    try {
      return this.findOne({ email });
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  },
});

// Methods belongs to an INSTANCE of the collection
UserSchema.method({
  confirmUser: function () {
    console.log(`I AM ${this.email}`);
  },
  comparePassword: async function (candidatePassword) {
    try {
      return await bcrypt.compare(candidatePassword, this.password);
    } catch (e) {
      throw new Error(e);
    }
  },
});

UserSchema.pre('save', async function (next) {
  console.log('I am the this in pre hook', this);
  const user = this;
  if (user.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    } catch (e) {
      next(e);
    }
  }
  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
