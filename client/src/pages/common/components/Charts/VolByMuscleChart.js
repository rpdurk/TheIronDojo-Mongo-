import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import axios from 'axios';
import { Box } from '@material-ui/core/';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const VolByMuscleChart = () => {

  const [weeklyVolumeByMuscle, setWeeklyVolumeByMuscle] = useState([]);
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
    setWeeklyVolumeByMuscle(singleExerciseArray);
    // return singleExerciseArray;
  };

  // const calculateWeeklyVolume = (volumePerExercise) => {
  //   let totalWeeklyVolume = [];
  //   let volumeTotal = 0;
  //   volumePerExercise.map((exercise) => {
  //     for (const key in exercise) {
  //       // console.log(`${key}: ${exercise[key]}`);
  //       volumeTotal += exercise[key];
  //       console.log(volumeTotal);
  //     }
  //   });
  //   setWeeklyVolume(volumeTotal);
  //   // console.log(volumeTotal);
  //   // return volumeTotal;
  // };

  useEffect(() => {
    console.log('This is the VolByMuscleChart');
    try {
    axios
      .get(`/api/exercise/7`, {
        headers: { authorization: token },
      })
      .then(({ data }) => {
        // Save Full Object to state
        console.log(`hi hello `, data);
        calculateVolumePerExercise(data);
        setLastSevenDays(data);
      });
  } catch (error) {
    console.log(`err`, error);
  }
}, []);

    return (
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
      </PieChart>
    );
  }

  export default VolByMuscleChart;