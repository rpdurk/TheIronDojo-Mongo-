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
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';

const ProfileDetails = ({ className, ...rest }) => {
  const user = useSelector(state => state.user.userDetails);
  const { dispatch } = useUtils();
  // Redux ⚛ Get userId
  const userId = useSelector(state => state.user.curUserId);
  // Redux ⚛ Get token
  const token = useSelector(state => state.viewer.token);

  // State
  const [firstName, setFirstName] = useState(
    user.firstName ? user.firstName : ''
  );
  const [lastName, setLastName] = useState(user.lastName ? user.lastName : '');
  const [email, setEmail] = useState(user.email ? user.email : '');
  const [pushSuccess, setPushSuccess] = useState(false);

  // Styles
  const useStyles = makeStyles(() => ({
    title: { textAlign: 'center' },
    btn: { margin: '1rem' },
    alert: {
      color: '#FF5722',
      maxWidth: '25%',
      margin: '0.4rem auto',
    },
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
    try {
      let userDetails = JSON.parse(localStorage.getItem('userDetails'));
      userDetails.firstName = values.firstName;
      userDetails.lastName = values.lastName;
      userDetails.email = values.email;
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
      dispatch(setUserDetails(values));
      const data = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
      };
      console.log(data);
      axios.patch('/api/account/details', data, {
        headers: { authorization: token },
      });
      setPushSuccess(true);
      setTimeout(() => {
        setPushSuccess(false);
      }, 2000);
    } catch (e) {
      console.log(e);
    }
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
            {pushSuccess ? (
              <Alert className={classes.alert} severity="success">
                Account Details Saved!
              </Alert>
            ) : null}
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
