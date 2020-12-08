  const db = require('../model');

  // biometric params = weight, height, date, user_Id
  
  module.exports = {
  
    createBiometric: async (req, res) => {
      const { weight, height, date } = req.body;
      try {
        const newWorkout = await db.Workout.create({
          weight,
          height,
          date,
          user_Id : req.user._Id,
        });
        req.user.Biometric.push(newBiometric._id);
        await req.user.save();
        res.json(newBiometric);
      } catch (e) {
        console.log('L:20 biometricController', e);
        res.status(401).json(e)
      }
    },
    getAllBiometricByUserId: async (req, res) => {
      const id = req.params.id;
      try {
        res.json(await db.Biometric.find({id}));
      }catch (e) {
        console.log('L:29 BiometricController', e);
        res.status(401).json(e);
      }
    },
    updateBiometricById: async (req, res) => {
      try {
        const { weight, height, date } = req.body;
        res.json(await db.Biometric.findByIdAndUpdate(req.params.id, {
          weight,
          height,
          date,
          user_Id: req.user._id,
        },{
          new: true,
        }));
      } catch (e) {
        console.log('L:45 biometricController', e);
        res.status(401).json(e);
      }
    },
    deleteBiometric: async (req, res) => {
      try {
        console.log('User Biometrics Deleted Successfully');
        res.json(await db.Biometric.findByIdAndDelete(req.params.id));
      } catch (e) {
        console.log('L: 54 biometricController', e);
        res.status(401).json(e);
      }
    }
    
  };

  