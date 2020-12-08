const db = require("../model");

// Exercise = exerciseName 'string', sets 'Number', repetitions Number, Weight, Number, Data Data, user_Id

module.exports = {
  createExercises: async (req, res) => {
    const { exerciseName, sets, repetitions, weight, date } = req.body;
    try {
      const newExercise = await db.Exercise.create({
        exerciseName,
        sets,
        repetitions,
        weight,
        date,
        user_Id: req.user._id,
      });
      req.user.Exercise.push(newExercise._id);
      await req.user.save();
      res.json(newExercise);
    } catch (e) {
      console.log("L:22 exerciseController", e);
      res.status(401).json(e);
    }
  },
  getAllExercisesByUserId: async (req, res) => {
    const id = req.params.id;
    try {
      res.json(await db.Exercise.find({id}));
    }catch (e) {
      console.log('L: 30 exerciseController', e);
      res.status(401).json(e);
    }
  },
  updateExercisesByExerciseId: async (req, res) => {
    try {
      const { exerciseName, sets, repetitions, weight, date } = req.body;
      res.json(await db.Exercise.findByIdAndUpdate(req.params.id, {
        exerciseName,
        sets,
        repetitions,
        weight,
        date,
        user_Id: req.user._id,
      }, {
        new: true,
      }));
    }catch (e) {
      console.log('L: 48 exerciseController', e);
      res.status(401).json(e);
    }
  },
  deleteExercise: async (req, res) => {
    try {
      console.log('Exercise Deleted Successfully');
      res.json(await db.Exercise.findByIdAndDelete(req.params.id));
    } catch (e) {
      console.log('L: 60 exerciseController', e);
      res.status(401).json(e);
    }
  }
};
