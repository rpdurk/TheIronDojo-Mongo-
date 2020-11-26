const UserSchema = new Schema({
    username: {
      type: String,
      required: [true, 'Username is required'],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, 'Password is required'],
    },
    firstName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
        required: [true, 'You must select a role'],
    },
  }, {
    timestamps: true,
  });

const User = model('User', UserSchema);

module.exports = User;