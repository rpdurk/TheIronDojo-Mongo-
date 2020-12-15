const passport = require('passport');

const authMiddleware = passport.authenticate('jwt');

module.exports = authMiddleware;
