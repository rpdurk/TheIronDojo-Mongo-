import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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
      <div>
        {topFiveWorkouts.map(workout => {
          return (
              <Card className={classes.root} variant="outlined">
                <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    Workout:
                    <div>{workout.workoutName}</div>
                    <div>{workout.date}</div>

                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>



          )


        })}
      </div>

      // eslint-disable-next-line react/react-in-jsx-scope

  );
}
