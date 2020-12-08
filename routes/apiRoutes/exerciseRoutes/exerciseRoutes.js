const router = require('express').Router();

const workoutController = require('../../controllers/exerciseController');

// const authMiddleware = require('../../../middlewares/authorizationMiddleware');
// router.use(authMiddleware);

// at api/users/exercise/:id
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

// /api/exercise ->
// GET Routes
// GET -> /:userId          -> Returns All by User
// GET -> /:exerciseId      -> Returns Individual exercise
// GET -> /:workoutId       -> Returns All by Workout
// GET -> /:exerciseName    -> Returns All by Name
// Checks if exercises exist for user.

// router.use(authMiddleware)
router.get('/check/:userId', checkExercises);

// Get exercises by User ID
router.get('/user/:userId', returnAllExerciseByUserId);

// Get exercises by Exercise ID
router.get('/exercise/:exerciseId', returnAnExerciseById);

// Get exercises by Workout ID
router.get('/workout/:workoutId', returnAllExerciseByWorkoutId);

// Get exercises by Exercise Name
router.get('/exerciseName/:exerciseName', returnAllExercisesByName);

// Add an Exercise
router.post('/add/:userId', addExercise);

// Delete an Exercise
router.delete('/delete/:exerciseId', deleteExercise);

module.exports = router;
