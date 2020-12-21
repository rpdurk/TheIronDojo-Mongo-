import React from 'react';
import { Container, makeStyles, Button } from '@material-ui/core';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useUtils } from '../common';

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
  const { history } = useUtils();

  const remove = (state, action) => {
    state = {};
  };

  const handleDelete = async (req, res) => {
    try {
      await axios.delete('/api/account/details', {
        headers: { authorization: token },
      });
      localStorage.clear();
      remove();
      history.push('/');
    } catch (e) {
      console.log('handleDelete', e);
    }
  };

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
