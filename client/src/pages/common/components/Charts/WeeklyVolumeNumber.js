import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Grid, Paper, LinearProgress } from '@material-ui/core/';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  paper: {
    height: 160,
    width: 220,
    padding: 20,
  },
});

const WeeklyVolumeNumber = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // eslint-disable-next-line react/react-in-jsx-scope
  const [weeklyVolume, setWeeklyVolume] = useState([]);
  const [lastSevenDaysOfExercise, setLastSevenDays] = useState([]);
  // Redux ⚛ Get userId
  const userId = useSelector((state) => state.user.curUserId);
  // Redux ⚛ Get token
  const token = useSelector((state) => state.viewer.token);

  const calculateVolumePerExercise = (exercises) => {
    let singleExerciseArray = [];
    exercises.map((exercise) => {
      const totalPerVolumeExercise =
        exercise.setTotal *
        exercise.repetitionsCompletedPerSet *
        exercise.weightUsedPerSet;
      let exerciseName = exercise.exerciseName;
      let exerciseObj = { [exerciseName]: totalPerVolumeExercise };
      singleExerciseArray.push(exerciseObj);
    });
    console.log(singleExerciseArray);
    return singleExerciseArray;
  };

  const calculateWeeklyVolume = (volumePerExercise) => {
    let totalWeeklyVolume = [];
    let volumeTotal = 0;
    volumePerExercise.map((exercise) => {
      for (const key in exercise) {
        // console.log(`${key}: ${exercise[key]}`);
        volumeTotal += exercise[key];
        console.log(volumeTotal);
      }
    });
    setWeeklyVolume(volumeTotal);
    // console.log(volumeTotal);
    // return volumeTotal;
  };

  // The useEffect hook is very similar to componentDidMount,
  // this will run when the component is mounted
  useEffect(() => {
    console.log('This is the Weekly Volume Component');
    // get userID from account details
    // axios
    //   .get(`/api/account/details`, {
    //     headers: { authorization: localStorage.getItem('token') },
    //   })
    //   .then((res) => {
    //     // console.log(res);
    //   });
    // console.log(`this is the userId ${userId}`);
    // Get workouts on component loading
    // try {
    //   axios.get(`/api/workout/${userId}`, {
    //     headers: { authorization: token }
    //   })
    //     .then((res) => {
    //       console.log('this is res.data', res.data);
    //     });
    // } catch (error) {
    //   console.log(error);
    // }
    // get last seven days of exercise
    try {
      axios
        .get(`/api/exercise/7`, {
          headers: { authorization: token },
        })
        .then(({ data }) => {
          // Save Full Object to state
          console.log(`hi hello `, data);
          calculateWeeklyVolume(calculateVolumePerExercise(data));
          setLastSevenDays(data);
        });
    } catch (error) {
      console.log(`err`, error);
    }
  }, []);

  return (
    <Grid item xs={4}>
      <Paper className={classes.paper}>
        <h4>Weekly Volume</h4>
        {weeklyVolume === null ? (
          <LinearProgress />
        ) : (
          <h1>{weeklyVolume} lbs</h1>
        )}
      </Paper>
    </Grid>
  );
};

export default WeeklyVolumeNumber;
