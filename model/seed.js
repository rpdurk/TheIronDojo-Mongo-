require('dotenv').config();
const mongoose = require('mongoose');
let db = require("../model");
// const {connectDB} = require('../config/connection');
// connectDB();

const conn = mongoose.connect('mongodb+srv://admin:1234567890@cluster0.heaam.mongodb.net/ironDojo?retryWrites=true&w=majority', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
})
.then(()=>{console.log('yee')})
.catch((err) => {console.log(err)})




let workoutSeed = [{
    workoutName: "Monday Lift",
    exercise: "Bench",
    date: "12/05/2020",
  },
  {
    workoutName: "Tuesday Lift",
    exercise: "PushUp",
    date: "12/05/2020",
  }

];

let exerciseSeed = [{
  exerciseName: "Bench",
  sets: 6,
  repetitions: 8,
  weight:135,
  date: "12/09/2020",
  // user_Id:

},
{
  exerciseName: "PushUp",
  sets: 6,
  repetitions: 8,
  weight:45,
  date: "12/09/2020",
  // user_Id:
}

];

let biometricSeed = [{
  weight: 120,
  height: 70,
  date: "12/10/2020",
  // user_Id:

},
{
  weight: 150,
  height: 70,
  date: "12/15/2020",
  // user_Id:
}

];

let userSeed = [
  {
    username:"test",
    password:"123",
    firstName:"one",
    lastName:"two",
  }
];

db.Workout.deleteMany({})
  .then(() => db.Workout.collection.insertMany(workoutSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

db.Exercise.deleteMany({})
  .then(() => db.Exercise.collection.insertMany(exerciseSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

  db.Biometric.deleteMany({})
  .then(() => db.Biometric.collection.insertMany(biometricSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

  db.User.deleteMany({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });