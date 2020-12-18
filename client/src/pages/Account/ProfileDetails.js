import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
  OutlinedInput,
  InputAdornment,
  MenuItem,
} from '@material-ui/core';
import { useSelector } from 'react-redux';

const ProfileDetails = ({ className, ...rest }) => {
  const user = useSelector(state => state.user.userDetails);

  const [values, setValues] = useState({
    firstName: user.firstName ? user.firstName : '',
    lastName: user.lastName ? user.lastName : '',
    email: user.email ? user.email : '',
  });

  const useStyles = makeStyles(() => ({
    title: { textAlign: 'center' },
  }));
  const classes = useStyles();

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    // Profile form
    <form
      autoComplete="on"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader title="Profile" className={classes.title} />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            {/* First Name */}
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="First name"
                id="firstName"
                name="firstName"
                onChange={handleChange}
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            {/* Last Name */}
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                id="lastName"
                name="lastName"
                onChange={handleChange}
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            {/* Email */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                id="email"
                name="email"
                onChange={handleChange}
                value={values.email}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        {/* Submit */}
        <Box display="flex" justifyContent="center" p={2}>
          <Button color="primary" variant="contained">
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string,
};

export default ProfileDetails;
