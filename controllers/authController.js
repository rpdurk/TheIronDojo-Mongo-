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
    const user = User.findByUsername(req.body.username);
    res.json(tokenForUser(req.user.id));
  },

  // Get User details from DB
  getUserDetails: async (req, res) => {
    console.log(`Getting user ddetails`);
    console.log(`Params ->  Username: ${req.params.username}`);

    // Fetch from DB

    const data = await User.findOne(
      { username: req.params.username },
      '-password'
    );

    console.log('huh', data);

    res.json({
      id: data._id,
      username: data.username,
    });
  },

  signUpApi: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.create({ username, password });
      res.json(tokenForUser(user._id));
    } catch (e) {
      console.log(e);
      res.status(400).json(e);
    }
  },
};
