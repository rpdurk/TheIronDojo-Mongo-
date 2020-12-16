import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import axios from "axios";
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
    padding:20,
  },
});
export default function PublicWorkoutCard() {
  // let userId = useSelector((state) => state.user.curUserId);
  const classes = useStyles();
  // eslint-disable-next-line react/react-in-jsx-scope
  const bull = <span className={classes.bullet}>•</span>;
  // const [workoutName, setWorkoutName] = useState([])
  // const [exerciseName, setExerciseName] = useState([])
  const [topFiveWorkouts, setTopFiveWorkouts] = useState([])
  useEffect(() => {
    // IIFE Immediately Invoked Function
    (async () => {
      const res = await axios.get(`/api/workout/${localStorage.getItem('userId')}`, {
        headers: { authorization: localStorage.getItem('token')}
      });
      const wNames = [];
      for (let i = 0; i < 5; i ++) {
        wNames.push(res.data[i]);
      }
      console.log(wNames);
      setTopFiveWorkouts(wNames);
      console.log(res.data);



      // const resWorkoutNames = res.data.map(workout => workout.workoutName);
      // setWorkoutName(resWorkoutNames);
      // // const exerciseName = res.data[7].exercise;
      // const resExerciseNames = res.data.map(workout => workout.exercise);
      // setExerciseName(resExerciseNames);
    })()
  }, [])



  return (
      
      <Grid>
        <Grid container  direction="row" justify="space-evenly"
          alignItems="center" spacing={3}>
            {topFiveWorkouts.map(workout => {
                return (
                    <Grid item xs={2} >
                        <Paper className={classes.paper} >
                        Workout:<div>{workout.workoutName}</div>
                        Date: <div>{workout.date}</div>
                        </Paper>
                    </Grid>
                )
            })}
        </Grid>
      </Grid>
      // eslint-disable-next-line react/react-in-jsx-scope

  );
}
