import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 500,
  },
  avatar: {
    height: 150,
    width: 150,
    margin: '15px',
  },
  name: {
    fontSize: '1.5rem',
  },
}));

const Profile = ({ className, ...rest }) => {
  const classes = useStyles();
  const user = useSelector(state => state.user.userDetails);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
          maxWidth="300"
        >
          <Avatar className={classes.avatar} src={user.profile.picture} />
          <Typography
            className={classes.name}
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {user.profile.displayName}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {`${user.profile.email}`}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;
