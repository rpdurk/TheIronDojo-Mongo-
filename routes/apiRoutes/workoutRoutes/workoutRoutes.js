const router = require('express').Router();

const workoutController = require('../../../controllers/workoutController');

const authMiddleware = require('../../../middlewares/authorizationMiddleware');
router.use(authMiddleware);

// at api/workout/:id
router.route('/:id')
  // creates a workout 
  .post(workoutController.createWorkouts)
  // Gets a all workouts
  .get(workoutController.getAllWorkouts)
  // Gets all workouts by user Id
  .get(workoutController.getAllWorkoutsByUserId)
  // Updates a workout by workout Id
  .patch(workoutController.updateWorkoutById)
  // Deletes a workout by workout Id
  .delete(workoutController.deleteWorkout)
  
module.exports = router;
