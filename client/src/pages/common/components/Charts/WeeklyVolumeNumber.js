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
  const [weeklyVolume, setWeeklyVolume] = useState([]);

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
    return singleExerciseArray;
  };

  const calculateWeeklyVolume = (volumePerExercise) => {
    let volumeTotal = 0;
    volumePerExercise.map((exercise) => {
      for (const key in exercise) {
        volumeTotal += exercise[key];
      }
    });
    setWeeklyVolume(volumeTotal);
  };

  useEffect(() => {
    // get last seven days of exercise
    try {
      axios
        .get(`/api/exercise/7`, {
          headers: { authorization: token },
        })
        .then(({ data }) => {
          // Save Full Object to state
          calculateWeeklyVolume(calculateVolumePerExercise(data));
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
