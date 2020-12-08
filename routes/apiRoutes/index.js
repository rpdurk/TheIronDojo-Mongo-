const router = require('express').Router();
const workoutRoutes = require('./workoutRoutes');
const exerciseRoutes = require('./exerciseRoutes');
const biometricRoutes = require('./biometricRoutes');
const wgerRoutes = require('./wgerRoutes');

// Everyting in this router already has /api prepended to it
router.use('/workout', workoutRoutes);
router.use('/exercise', exerciseRoutes);
router.use('/biometric', biometricRoutes);
router.use('/wger', wgerRoutes);

module.exports = router;