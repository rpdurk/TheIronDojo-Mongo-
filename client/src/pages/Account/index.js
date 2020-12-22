import React, { useEffect } from 'react';
import { Container, makeStyles, Button } from '@material-ui/core';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import { createDispatchHook, useSelector } from 'react-redux';
import axios from 'axios';
import { useUtils } from '../common';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { setUserDetails, signOutUser } from '../User/UserReducer';
import { setViewerToken } from '../Viewer';

const useStyles = makeStyles(theme => ({
  root: {
    // backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  profile: {
    margin: '2rem',
    display: 'flex',
    justifyContent: 'center',
  },
  btn: { margin: '1rem', backgroundColor: 'red', color: 'white' },
}));

const Account = () => {
  const classes = useStyles();
  const user = useSelector(state => state.user.userDetails);
  const token = useSelector(state => state.viewer.token);
  const { history, dispatch } = useUtils();

  const handleSignOut = () => {
    localStorage.clear();
    dispatch(setViewerToken(null));
    dispatch(signOutUser());
    history.push('/');
  };

  const handleDelete = (req, res) => {
    confirmAlert({
      title: 'DELETE ACCOUNT',
      message: 'Are you sure to delete this Account?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await axios.delete('/api/account/details', {
                headers: { authorization: token },
              });
              handleSignOut();
            } catch (e) {
              console.log('handleDelete', e);
            }
          },
        },
        {
          label: 'No',
          onClick: () => {
            return;
          },
        },
      ],
    });
  };

  useEffect(() => {
    axios
      .get(`/api/account/details`, {
        headers: { authorization: token },
      })
      .then(res => {
        localStorage.setItem('userDetails', JSON.stringify(res.data));
        createDispatchHook(setUserDetails(res.data));
      });
  });

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Container className={classes.profile}>
        {user.profile ? <Profile /> : <ProfileDetails />}
      </Container>
      <Container maxWidth="lg" className={classes.root}>
        <Button
          onClick={handleDelete}
          className={classes.btn}
          type="button"
          variant="contained"
        >
          Delete Account
        </Button>
      </Container>
    </Container>
  );
};

export default Account;
