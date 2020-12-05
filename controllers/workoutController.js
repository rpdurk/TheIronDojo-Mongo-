const db = require('../model');

// workout params = name, exercise, data, user_Id

module.exports = {

  createWorkouts: async (req, res) => {
    const { workoutName, exercise, date } = req.body;
    try {
      const newWorkout = await db.Workout.create({
        workoutName,
        exercise,
        date,
        user_Id : req.user._Id,
      });
      req.user.workouts.push(newWorkout._id);
      await req.user.save();
      res.json(newWorkout);
    } catch (e) {
      console.log('L:20 workoutController', e);
      res.status(401).json(e)
    }
  },
  getAllWorkouts: async (req, res) => {
    try {
      res.json(await db.Workout.find());
    }catch (e) {
      console.log('L: 28 workoutController', e);
      res.status(401).json(e);
    }
  },
  getAllWorkoutsByUserId: async (req, res) => {
    const id = req.params.id;
    try {
      res.json(await db.Workout.find({id}));
    }catch (e) {
      console.log('L:36 workoutController', e);
      res.status(401).json(e);
    }
  },
  updateWorkoutById: async (req, res) => {
    try {
      const { workoutId, workoutName, exercise, date } = req.body;
      res.json(await db.Workout.findByIdAndUpdate(req.params.id, {
        workoutName,
        exercise,
        date,
        user_Id: req.user._id,
      },{
        new: true,
      }));
    } catch (e) {
      console.log('L:52 workoutController', e);
      res.status(401).json(e);
    }
  },
  deleteWorkout: async (req, res) => {
    try {
      console.log('Workout Deleted Successfully');
      res.json(await db.Workout.findByIdAndDelete(req.params.id));
    } catch (e) {
      console.log('L: 60 workoutController', e);
      res.status(401).json(e);
    }
  }
  
};