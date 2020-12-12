  const db = require('../model/index');

  // biometric params = weight, height, date, user_Id
  
  module.exports = {
  
    createBiometric: async (req, res) => {
      console.log(req.user);
      // console.log(req.user._id);
      console.log(req.body);
      const { weight, height, date } = req.body;
      try {
        const newBiometric = await db.Biometric.create({
          weight,
          height,
          date,
          user_id: req.user._id,
        });
        console.log(newBiometric);
        req.user.biometrics.push(newBiometric._id);
        await req.user.save();
        res.json(newBiometric);
      } catch (e) {
        console.log('L:20 biometricController', e);
        res.status(401).json(e)
      }
    },
    getAllBiometricByUserId: async (req, res) => {
      // req.params.id takes the id from the middleware and passes it into the const id
      // req.params.id should not be ._id.
      const id = req.params.id;
      // console.log(id);
      // console.log(req.params.id);
      try {
        res.json(await db.Biometric.find({user_id: id}));
      }catch (e) {
        console.log('L:29 BiometricController', e);
        res.status(401).json(e);
      }
    },
    updateBiometricById: async (req, res) => {
      const id = req.params.id;
      console.log(id);
      console.log(req.params.id);
      // typeof(id);
      // typeof(req.params.id);
      try {
        const { weight, height, date } = req.body;
        res.json(await db.Biometric.findOneAndUpdate({user_id: req.params.id}, {
          weight,
          height,
          date,
          user_id: req.user._id,
        },{
          new: true,
        }, () => {
          console.log("This worked");
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

  