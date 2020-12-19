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
  makeStyles,
} from '@material-ui/core';
import { TextField } from 'mui-rff';
import { useSelector } from 'react-redux';
import { setUserDetails } from '../User/UserReducer';
import { Form } from 'react-final-form';
import { useUtils } from '../common';

const ProfileDetails = ({ className, ...rest }) => {
  const user = useSelector(state => state.user.userDetails);
  const { dispatch } = useUtils();

  // State
  const [firstName, setFirstName] = useState(
    user.firstName ? user.firstName : ''
  );
  const [lastName, setLastName] = useState(user.lastName ? user.lastName : '');
  const [email, setEmail] = useState(user.email ? user.email : '');

  // Styles
  const useStyles = makeStyles(() => ({
    title: { textAlign: 'center' },
    btn: { margin: '1rem' },
  }));
  const classes = useStyles();

  const formFields = [
    {
      size: 12,
      field: (
        <TextField
          name="firstName"
          initialValue={firstName ? firstName : ''}
          placeholder={firstName ? firstName : 'John'}
          variant="outlined"
          fullWidth
          label="First Name"
          InputLabelProps={{
            shrink: true,
          }}
        />
      ),
    },
    {
      size: 12,
      field: (
        <TextField
          name="lastName"
          initialValue={lastName ? lastName : ''}
          placeholder={lastName ? lastName : 'Smith'}
          variant="outlined"
          fullWidth
          label="Last Name"
          InputLabelProps={{
            shrink: true,
          }}
        />
      ),
    },
    {
      size: 12,
      field: (
        <TextField
          name="email"
          initialValue={email ? email : ''}
          placeholder={email ? email : 'JohnSmith@example.com'}
          variant="outlined"
          fullWidth
          label="Email Address"
          InputLabelProps={{
            shrink: true,
          }}
        />
      ),
    },
  ];

  const onSubmit = values => {
    console.log(values);
    let userDetails = JSON.parse(localStorage.getItem('userDetails'));
    userDetails.firstName = values.firstName;
    userDetails.lastName = values.lastName;
    userDetails.email = values.email;
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
    dispatch(setUserDetails(values));
  };

  return (
    <Form
      onSubmit={onSubmit}
      // validate={validate}
      render={({ handleSubmit, form, values }) => (
        // Profile form
        <form
          onSubmit={handleSubmit}
          autoComplete="on"
          noValidate
          className={clsx(classes.root, className)}
          {...rest}
        >
          <Card>
            <CardHeader title="Account Profile" className={classes.title} />
            <Divider />
            <CardContent>
              <Grid container alignItems="flex-start" spacing={2}>
                {formFields.map((item, idx) => (
                  <Grid item xs={item.size} key={idx}>
                    {item.field}
                  </Grid>
                ))}
              </Grid>
            </CardContent>
            <Divider />
            {/* Submit */}
            <Box display="flex" justifyContent="center" p={2}>
              <Button
                className={classes.btn}
                type="submit"
                color="primary"
                variant="contained"
              >
                Submit
              </Button>
              <Button
                className={classes.btn}
                onClick={form.reset}
                color="primary"
                variant="contained"
              >
                Reset
              </Button>
            </Box>
          </Card>
        </form>
      )}
    />
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string,
};

export default ProfileDetails;
