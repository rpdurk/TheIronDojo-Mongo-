import React from 'react';
import { Container, Grid, makeStyles, Box } from '@material-ui/core';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    // backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(5),
  },
  profile: {
    margin: '2rem',
    display: 'flex',
    justifyContent: 'center',
  },
}));

const Account = () => {
  const classes = useStyles();
  const user = useSelector(state => state.user.userDetails);

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Container className={classes.profile}>
        {user.profile ? <Profile /> : <ProfileDetails />}
      </Container>
    </Container>
  );
};

export default Account;
