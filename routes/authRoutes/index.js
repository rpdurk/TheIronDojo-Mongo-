const router = require('express').Router();

const {
  signInApi,
  signUpApi,
  getUserDetails,
} = require('../../controllers/authController');

// /auth prepended to everything
const signInMiddleware = require('../../middlewares/signInMiddleware');

// /auth/userid/:email
router.get('/userid/:email', getUserDetails);

// /auth/signin
router.post('/signin', signInMiddleware, signInApi);
// /auth/signin
router.post('/signup', signUpApi);

module.exports = router;
