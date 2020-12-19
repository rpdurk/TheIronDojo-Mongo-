const router = require('express').Router();

const exerciseController = require('../../../controllers/exerciseController');

const authMiddleware = require('../../../middlewares/authorizationMiddleware');
router.use(authMiddleware);

// at api/exercise
router
  .route('/')
  // creates an exercise
  .post(exerciseController.createExercises)
  // Gets all exercises by user Id
  .get(exerciseController.getAllExercisesByUserId)
  // Updates a exercise by exercise Id
  .patch(exerciseController.updateExercisesByExerciseId);
// Deletes a exercise by exercise Id
// .delete(exerciseController.deleteExercise);

module.exports = router;
