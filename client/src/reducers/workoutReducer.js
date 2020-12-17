import { createSlice } from '@reduxjs/toolkit';

//  Action types, Action creators, another file for your reducer
const INITIAL_STATE = {
  workouts: [],
};

const workoutSlice = createSlice({
  name: 'workout',
  initialState: INITIAL_STATE,

  reducers: {
    getWorkouts: (state, action) => {
      return { ...state, workouts: action.payload };
    },
  },
});

export const { getWorkouts } = workoutSlice.actions;

export const workoutsReducer = workoutSlice.reducer;