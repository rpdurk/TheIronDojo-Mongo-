const jwt = require('jsonwebtoken');
const User = require('../model/UserSchema');

const tokenForUser = (id) => {
  return jwt.sign(
    {
      sub: id,
      iat: new Date().getTime(),
    },
    process.env.MONGO_SECRET
  );
};

module.exports = {
  signInApi: (req, res) => {
    const user = User.findByEmail(req.body.email);
    res.json(tokenForUser(req.user.id));
  },

  // Get User details from DB
  getUserDetails: async (req, res) => {
    // Fetch from DB
    try {
      // Get ID and email only no password from DB
      const data = await User.findOne({ email: req.params.email }, '-password');

      res.json({
        id: data._id,
        email: data.email,
      });
    } catch (error) {
      console.log(error.message);
      error && res.status(500).json({ error: true, message: error.message });
    }
  },

  signUpApi: async (req, res) => {
    const { email, password } = req.body;

    try {
      // Check for duplicates
      const test = await User.findOne({ email: email });
      console.log(test);
      if (!test) {
        const user = await User.create({ email, password });
        res.json(tokenForUser(user._id));
      } else {
        res.json({ error: true, message: `User already exists` });
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
};
