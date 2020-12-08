const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
  );

  app.get("/auth/google/callback", passport.authenticate("google"), {
    successRedirect: "/",
    failureRedirect: "/fail",
  });
};

// (req, res) => {
//   const token = req.user.token;
//   res.redirect("http://localhost:3000?token=" + token);
// }
