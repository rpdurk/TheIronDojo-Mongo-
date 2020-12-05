const jwt = require("jsonwebtoken");
const User = require("../model/UserSchema");

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
    console.log(user);
    res.json(tokenForUser(req.user.id));
  },

  // getUserDetails: async (req, res) => {
  //   console.log(`Params :username ${req.params.username}`);
  //   const { id, username } = await fetchUserByUsernameFromDb(
  //     req.params.username
  //   );
  //   res.json({ id, username });
  // },

  signUpApi: async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    try {
      const user = await User.create({ username, password });
      console.log("I AM THE ID", user.id);
      res.json(tokenForUser(user._id));
    } catch (e) {
      console.log(e);
      res.status(400).json(e);
    }
  },
};
