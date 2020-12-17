import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  users: [],
  selectedUser: {
    id: '',
    email: '',
  },
  curEmail: null,
  curUserId: null,
  moreState: false,
  credentialError: false,
  userDetails: JSON.parse(localStorage.getItem('userDetails')),
};

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    getUsers: (state, action) => ({
      ...state,
      users: action.payload,
    }),
    getUser: (state, action) => ({ ...state, selectedUser: action.payload }),
    setCurrentUser: (state, action) => {
      console.log();
      return {
        ...state,
        curUserId: action.payload.id,
        curEmail: action.payload.email,
      };
    },
    setUserId: (state, action) => ({ ...state, curUserId: action.payload }),
    invalidCredentials: (state, action) => ({
      ...state,
      credentialError: true,
    }),
    validCredentials: (state, action) => ({
      ...state,
      credentialError: false,
    }),
    signOutUser: (state, action) => ({
      users: [],
      selectedUser: {
        id: '',
        email: '',
      },
      curEmail: null,
      curUserId: null,
      moreState: false,
      credentialError: false,
    }),
    setUserDetails: (state, action) => ({
      ...state,
      userDetails: action.payload,
    }),
  },
});

export const {
  setUserId,
  getUsers,
  getUser,
  setCurrentUser,
  invalidCredentials,
  validCredentials,
  signOutUser,
  setUserDetails,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
