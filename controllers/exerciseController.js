const Exercise = require('../model/ExerciseSchema.js');

module.exports = {
  createExercises: async (req, res) => {
    const {
      exerciseName,
      setTotal,
      repetitionsCompletedPerSet,
      weightUsedPerSet,
      exerciseDate,
    } = req.body;

    try {
      let newExercise = new Exercise({
        exerciseName,
        setTotal,
        repetitionsCompletedPerSet,
        weightUsedPerSet,
        exerciseDate,
        user_id: req.user._id,
      });

      res.json(await newExercise.save());
    } catch (e) {
      console.log('L:22 exerciseController', e.message);

      res.status(500).json(e);
    }
  },
  getAllExercisesByUserId: async (req, res) => {
    const id = req.user._id;

    try {
      res.json(await Exercise.find({ user_id: id }));
    } catch (e) {
      console.log('L: 30 exerciseController', e);
      res.status(500).json(e);
    }
  },
  getAllExercisesInLastSevenDaysByUserId: async (req, res) => {
    const id = req.user._id;
    console.log(id);
    try {
      res.json(await Exercise.find({ 
        user_id: id,
        createdAt:
          { '$lte': new Date(), '$gte': new Date(new Date() - 7 * 60 * 60 * 24 * 1000) }
      }));
      // console.log(res);
      // console.log(new Date());
      // console.log(new Date(new Date() - 7 * 60 * 60 * 24 * 1000));
      // res.json(await Exercise.find({ user_id: id }));
    } catch (e) {
      console.log('L: 40 exerciseController', e);
      res.status(500).json(e);
    }
  },
  updateExercisesByExerciseId: async (req, res) => {
    try {
      const {
        exerciseName,
        setTotal,
        repetitionsCompletedPerSet,
        weightUsedPerSet,
        exerciseDate,
      } = req.body;

      res.json(
        await Exercise.findByIdAndUpdate(
          req.user._id,
          {
            exerciseName,
            setTotal,
            repetitionsCompletedPerSet,
            weightUsedPerSet,
            exerciseDate,
            user_id: req.user._id,
          },
          {
            new: true,
          }
        )
      );
    } catch (e) {
      console.log('L: 48 exerciseController', e);
      res.status(500).json(e);
    }
  },
  // TODO: -> Fix Delete Logic
  // deleteExercise: async (req, res) => {
  //   try {
  //     console.log('Exercise Deleted Successfully');
  //     res.json(await Exercise.findByIdAndDelete(req.params.id));
  //   } catch (e) {
  //     console.log('L: 60 exerciseController', e);
  //     res.status(500).json(e);
  //   }
  // },
};
