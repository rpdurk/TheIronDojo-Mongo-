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

const calculateMostExercised = (array) => {
  let leaderBoardObj = {};

  array.forEach((el) => {
    if (leaderBoardObj[el.exerciseName]) {
      leaderBoardObj[el.exerciseName]++;
    } else {
      leaderBoardObj[el.exerciseName] = 1;
    }
  });

  let sortable = [];
  for (const exercise in leaderBoardObj) {
    sortable.push([exercise, leaderBoardObj[exercise]]);
  }

  sortable.sort(function (a, b) {
    return b[1] - a[1];
  });
  return sortable[0][0];
};

const MostCompletedExercise = () => {
  const classes = useStyles();
  // Redux ⚛ Get token
  const token = useSelector((state) => state.viewer.token);
  const [mostCompleted, setMostCompleted] = useState(0);

  useEffect(() => {
    // get last seven days of exercise
    try {
      axios
        .get(`/api/exercise/7`, {
          headers: { authorization: token },
        })
        .then(({ data }) => {
          setMostCompleted(calculateMostExercised(data));
        });
    } catch (error) {
      console.log(`err`, error);
    }
  }, []);

  return (
    <Grid item xs={4}>
      <Paper className={classes.paper}>
        <h4>Weekly Favorite</h4>
        {typeof mostCompleted === 'undefined' ? (
          <LinearProgress />
        ) : (
          <h3>{mostCompleted}</h3>
        )}
      </Paper>
    </Grid>
  );
};

export default MostCompletedExercise;
