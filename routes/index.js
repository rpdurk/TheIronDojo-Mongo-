const router = require("express").Router();
// const exerciseRoutes = require('./apiRoutes/exerciseRoutes');
// const workoutRoutes = require('./apiRoutes/workoutRoutes');
const authRoutes = require("./authRoutes");
const signInMiddleware = require("../middlewares/signInMiddleware");
// const userSignUp = require();
const apiRoutes = require("./apiRoutes");

// /api/users
router.use('/api', apiRoutes);

// ignore singInMiddleware for now

// router.use('/signup', express.static('client/build'));

// -> /api/exercise
// router.use('/api/exercise', exerciseRoutes);

// -> /api/workout
// router.use('/api/workout', workoutRoutes);
router.use("/auth", authRoutes);

module.exports = router;
