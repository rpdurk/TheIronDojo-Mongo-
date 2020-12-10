const router = require('express').Router();

const biometricController = require('../../../controllers/biometricController');

const authMiddleware = require('../../../middlewares/authorizationMiddleware');
router.use(authMiddleware);

// at api/biometric/:id
router.route('/:id')
  // creates an exercise
  .post(biometricController.createBiometric)
  // Gets all biometrics by user Id
  .get(biometricController.getAllBiometricByUserId)
  // Updates a biometric by biometric Id
  .patch(biometricController.updateBiometricById)
  // Deletes a biometric by biometric Id
  .delete(biometricController.deleteBiometric)

module.exports = router;
