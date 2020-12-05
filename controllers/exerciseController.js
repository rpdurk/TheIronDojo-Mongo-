const db = require('../model');

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
        user_Id : req.user._id,
      });
      req.user.Exercise.push(newExercise._id);
      await req.user.save();
      res.json(newExercise);
    } catch (e) {
      console.log('L:22 exerciseController', e);
      res.status(401).json(e);
    }
  },
  getAllExerciseByWorkoutId: async (req, res) => {
    try {
      res.json(await db.Exercise.findById(req.params.id))
    }
  }

  // returnAllExerciseByUserId,
  // returnAllExerciseByWorkoutId,
  // returnAnExerciseById,
  // returnAllExercisesByName,
  // addExercise,
  // deleteExercise,
  // checkExercises,
};
