const router = require('express').Router();
const workoutController = require('../../../controllers/workoutController');
const authMiddleware = require('../../../middlewares/authorizationMiddleware');

// Public Routes
// Gets a all workouts
// @ api/workout
router.get('/', workoutController.getAllWorkouts);

// Authorization Middleware
router.use(authMiddleware);

// Private Routes
// @ api/workout/:id
router
  .route('/:id')
  // creates a workout
  .post(workoutController.createWorkouts)
  // Gets all workouts by user Id
  .get(workoutController.getAllWorkoutsByUserId)
  // Updates a workout by workout Id
  .patch(workoutController.updateWorkoutById)
  // Deletes a workout by workout Id
  .delete(workoutController.deleteWorkout);

module.exports = router;
