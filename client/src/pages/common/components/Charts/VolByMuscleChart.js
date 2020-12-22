import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { PieChart, Pie, Tooltip } from 'recharts';
import axios from 'axios';
import { CircularProgress, makeStyles } from '@material-ui/core/';

const circles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '400px',
    height: '400px',
  },
});

const VolByMuscleChart = () => {
  const classes = circles();

  const [lastSevenDaysOfExercise, setLastSevenDays] = useState(null);

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
      let exerciseObj = { name: exerciseName, value: totalPerVolumeExercise };
      singleExerciseArray.push(exerciseObj);
    });
    setLastSevenDays(singleExerciseArray);
  };

  useEffect(() => {
    try {
      axios
        .get(`/api/exercise/7`, {
          headers: { authorization: token },
        })
        .then(({ data }) => {
          calculateVolumePerExercise(data);
        });
    } catch (error) {
      console.log(`err`, error);
    }
  }, []);

  return (
    <>
      {lastSevenDaysOfExercise === null ? (
        <div className={classes.root}>
          <CircularProgress />
        </div>
      ) : (
        <PieChart width={400} height={400}>
          <Pie
            dataKey='value'
            isAnimationActive={true}
            data={lastSevenDaysOfExercise}
            cx={200}
            cy={200}
            outerRadius={80}
            fill='#FF5722'
            label
          />
          <Tooltip />
        </PieChart>
      )}
    </>
  );
};

export default VolByMuscleChart;
