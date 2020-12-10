const passport = require("passport");
const jwt = require("jsonwebtoken");

const generateUserToken = (user) => {
  return jwt.sign(
    {
      sub: user._id,
      iat: new Date().getTime(),
    },
    process.env.MONGO_SECRET
  );
};

module.exports = (app) => {
  // app.get(
  //   "/auth/google",
  //   passport.authenticate("google", {
  //     session: false,
  //     scope: ["email", "profile"],
  //   })
  // );

  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["https://www.googleapis.com/auth/plus.login"],
      session: false,
    })
  );

  // app.get(
  //   "/auth/google/callback",
  //   passport.authenticate("google", {
  //     scope: ["email", "profile"],
  //     successRedirect: "/auth/google/redirect",
  //     failureRedirect: "/fail",
  //   })
  // );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/login",
      session: false,
    }),
    function (req, res) {
      // res.json({ token: generateUserToken(req.user) });
      res.redirect(`/dashboard/${req.user._id}/${generateUserToken(req.user)}`);
    }
  );
};
