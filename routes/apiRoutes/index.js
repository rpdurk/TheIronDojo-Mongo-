const router = require('express').Router();
const workoutRoutes = require('./workoutRoutes/workoutRoutes');
const exerciseRoutes = require('./exerciseRoutes/exerciseRoutes');
const biometricRoutes = require('./biometricRoutes/biometricRoutes');


// Everyting in this router already has /api prepended to it
router.use('/workout', workoutRoutes);
router.use('/exercise', exerciseRoutes);
router.use('/biometric', biometricRoutes);


module.exports = router;