import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { setUserId } from '../../User/UserReducer';

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
const PublicWorkoutCard = ({ history }) => {
  // let userId = useSelector((state) => state.user.curUserId);
  const classes = useStyles();
  const dispatch = useDispatch();
  // eslint-disable-next-line react/react-in-jsx-scope
  const bull = <span className={classes.bullet}>•</span>;
  // const [workoutName, setWorkoutName] = useState([])
  // const [exerciseName, setExerciseName] = useState([])
  const [topFiveWorkouts, setTopFiveWorkouts] = useState([]);

  // The useEffect hook is very similar to componentDidMount,
  // this will run when the component is mounted
  useEffect(() => {
    console.log('This is the PublicWorkout Component');

    // Get workouts on component loading
    try {
      axios.get(`/api/workout`).then((res) => {
        console.log('this is res.data', res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Grid>
      <Grid
        container
        direction='row'
        justify='space-evenly'
        alignItems='center'
        spacing={3}
      >
        {topFiveWorkouts.length !== 0
          ? topFiveWorkouts.map((workout) => {
              console.log(workout);
              return (
                <Grid item xs={2}>
                  <Paper className={classes.paper}>
                    Workout:<div>{workout.workoutName}</div>
                    Date: <div>{workout.date}</div>
                  </Paper>
                </Grid>
              );
            })
          : ''}
      </Grid>
    </Grid>
  );
};

export default PublicWorkoutCard;
