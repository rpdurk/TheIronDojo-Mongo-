import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Grid,
  Paper,
  // LinearProgress,
  TextField,
  Box,
  FormControl,
  Typography,
} from '@material-ui/core/';
import { setUserId, setUserDetails } from '../User/UserReducer';
import { setViewerToken } from '../Viewer/ViewerReducer';
import { useUtils } from '../common';
import ProgressChart from '../common/components/Charts/ProgressChart';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PublicWorkout from '../common/components/PublicWorkout';
import WeeklyVolumeNumber from '../common/components/Charts/WeeklyVolumeNumber';
import VolByMuscleChart from '../common/components/Charts/VolByMuscleChart';
import MostCompletedExercise from '../common/components/Charts/MostCompletedExercise';
import TotalWorkoutsPerWeek from '../common/components/Charts/TotalWorkoutsPerWeek';
import RadialChartCauseRyanAsked from '../common/components/Charts/RadialChartCauseRyanAsked';

// import { current } from '@reduxjs/toolkit';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(5),
    paddingLeft: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(4),
    display: 'flex',
    margin: '0 auto',
    overflow: 'auto',
    flexDirection: 'column',
    textAlign: 'center',
  },
  fixedHeight: {
    height: 450,
  },

  header: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginBottom: theme.spacing(6),
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  headerPadding: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  input: {
    padding: theme.spacing(2),
  },
  bigNumbers: {
    margin: '0 3rem',
  },
}));

const data = [
  {
    date: 'Monday',
    weight: 2400,
  },
  {
    date: 'Tuesday',
    weight: 1398,
  },
  {
    date: 'Wednesday',
    weight: 9800,
  },
  {
    date: 'Thursday',
    weight: 3908,
  },
  {
    date: 'Friday',
    weight: 4800,
  },
  {
    date: 'Saturday',
    weight: 3800,
  },
  {
    date: 'Sunday',
    weight: 4300,
  },
];

const Dashboard = () => {
  const classes = useStyles(); // -> Material UI Styles
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight); // -> Material UI
  const { dispatch } = useUtils();
  const location = useLocation();
  const incomingUserId = location.pathname.split('/')[2];
  const incomingUserToken = location.pathname.split('/')[3];

  // Redux ⚛ Get userId
  const userId = useSelector((state) => state.user.curUserId);
  // Redux ⚛ Get token
  const token = useSelector((state) => state.viewer.token);

  const [allExercises, setAllExercises] = useState([]); // Stores exercises
  const [selectedExercise, setSelectedExercise] = useState('');
  const [reRender, setReRender] = useState(true); // Boolean For useEffect -> To Prevent Re Renders
  const [allExercisesByName, setAllExercisesByName] = useState([]); // Stores names
  const [tableData, setTableData] = useState([]);
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [weeklyVolume, setWeeklyVolume] = useState([]);
  const [mostCompleted, setMostCompleted] = useState(0);

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

  const calculateVolume = (volumePerExercise) => {
    let volumeTotal = 0;
    volumePerExercise.map((exercise) => {
      for (const key in exercise) {
        volumeTotal += exercise[key];
      }
    });

    return volumeTotal;
  };

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

  const makeChartData = () => {
    let currentExerciseArrayObj = {};

    allExercises.forEach((exercise, index) => {
      // Compare for currently selected exercise
      if (exercise.exerciseName === selectedExercise) {
        // Check if Exercise Date exists in object
        if (
          `${exercise.exerciseDate.split('T')[0]}` in currentExerciseArrayObj
        ) {
          let tempVal =
            currentExerciseArrayObj[`${exercise.exerciseDate.split('T')[0]}`]; // Store temporary value to be added
          let addVal = tempVal + parseInt(exercise.weightUsedPerSet, 10); // Add the old and new values together
          currentExerciseArrayObj[
            `${exercise.exerciseDate.split('T')[0]}`
          ] = addVal; // Push values to object
        } else {
          // If it doesn't exist add it to object
          currentExerciseArrayObj[
            `${exercise.exerciseDate.split('T')[0]}`
          ] = parseInt(exercise.weightUsedPerSet);
        }
      }
    });

    // Sort Object
    let sorted = [];
    for (const date in currentExerciseArrayObj) {
      sorted.push([date, currentExerciseArrayObj[date]]);
    }

    // Sort Array
    sorted.sort((a, b) => {
      let aDate = new Date(a[0]);
      let bDate = new Date(b[0]);
      return aDate - bDate;
    });

    let tempArray = [];
    sorted.forEach((el) => {
      tempArray.push({ date: el[0], weight: el[1] });
    });
    setTableData(tempArray);
  };

  useEffect(() => {
    console.log(`DASHBOARD USEFFECT`);

    if (reRender) {
      // Checks for Google 0Auth -------------------- 0Auth
      if (incomingUserId) {
        dispatch(setUserId(incomingUserId));
        localStorage.setItem('userId', incomingUserId);
      }

      setTimeout(() => {
        if (incomingUserToken) {
          dispatch(setViewerToken(incomingUserToken));
          localStorage.setItem('token', incomingUserToken);
          axios
            .get(`/api/account/details`, {
              headers: { authorization: localStorage.getItem('token') },
            })
            .then(res => {
              localStorage.setItem('userDetails', JSON.stringify(res.data));
              dispatch(setUserDetails(res.data));
            });
        } else if (token) {
          axios
            .get(`/api/account/details`, {
              headers: { authorization: token },
            })
            .then(res => {
              localStorage.setItem('userDetails', JSON.stringify(res.data));
              dispatch(setUserDetails(res.data));
            });
        }
      }, 300);

      // TODO: Fix Refresh issue   --------------------------------
      axios
        .get(`/api/account/details`, {
          headers: { authorization: token },
        })
        .then((res) => {
          localStorage.setItem('userDetails', JSON.stringify(res.data));
          dispatch(setUserDetails(res.data));
        });

      // Get Workout List from Backend -------------------- Axios Call

      axios
        .get(`/api/exercise`, {
          headers: { authorization: token },
        })
        .then(({ data }) => {
          // Save Full Object to state
          let tempVariable = calculateVolume(calculateVolumePerExercise(data));
          console.log(tempVariable);
          setTotalCompleted(tempVariable);

          setAllExercises(data);

          // Get Names and IDs from workouts
          const temp = data.map((exercise) => exercise.exerciseName);

          let resExerciseNames = [...new Set(temp)]; // Remove Duplicates

          setAllExercisesByName(resExerciseNames);
          setReRender(false);
        }); // Axios Get

      // ----------------------------------------------------------------
      try {
        axios
          .get(`/api/exercise/7`, {
            headers: { authorization: token },
          })
          .then(({ data }) => {
            // Save Full Object to state
            setMostCompleted(calculateMostExercised(data));
            setWeeklyVolume(calculateVolume(calculateVolumePerExercise(data)));
          });
      } catch (error) {
        console.log(`err`, error);
      }
    }

    makeChartData();
  }, [reRender, selectedExercise]);

  return (
    <Container maxWidth='xl' className={classes.container}>
      <Typography component='h2' variant='h6' color='primary' gutterBottom>
        Dashboard
      </Typography>

      <Grid container>
        <Grid className={classes.bigNumbers} item xs={1}>
          <WeeklyVolumeNumber weeklyVolume={weeklyVolume} />
        </Grid>
        <Grid className={classes.bigNumbers} item xs={1}>
          <MostCompletedExercise mostCompleted={mostCompleted} />
        </Grid>
        <Grid className={classes.bigNumbers} item xs={1}>
          <TotalWorkoutsPerWeek totalCompleted={totalCompleted} />

        </Grid>
      </Grid>

      <Grid spacing={2} container>
        <Grid item xs={8}>
          <Paper className={fixedHeightPaper}>
            <h3 align='left'>Weekly Analysis</h3>

            <FormControl
              style={{ margin: '0 auto 0.3rem auto' }}
              className={classes.centerInput}
            >
              <Autocomplete
                id='exerciseChart'
                options={allExercisesByName}
                getOptionLabel={(option) => option}
                onChange={(event, newValue) => setSelectedExercise(newValue)}
                style={{ width: 400 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Choose your Exercise'
                    variant='outlined'
                  />
                )}
              />
            </FormControl>
            <ProgressChart
              spacing={0}
              data={tableData.length !== 0 ? tableData : data}
            />
          </Paper>
          <Grid className={classes.bigNumbers} item xs={2}>
            <VolByMuscleChart />
            {/* <RadialChartCauseRyanAsked /> */}
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <PublicWorkout />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
