import React from 'react';
import { Container, makeStyles, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { CSVLink, CSVDownload } from "react-csv";

const useStyles = makeStyles(theme => ({
    btn: { 
        margin: '1rem', 
        backgroundColor: 'red', 
        color: 'white' },
}));

const ExportToCSV = () => {
  const classes = useStyles();
  const token = useSelector(state => state.viewer.token);

  const handleExport = (req, res) => {
    confirmAlert({
      title: 'Confirm to Export Data to CSV',
      message: 'Are you sure you want to export your data from our database?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
                axios
                // gets all exercises by their userID
                .get(`/api/exercise`, {
                  headers: { authorization: token },
                })
                .then(({ data }) => {
                    // add information to push to a csv
                    console.log(data);
                    
                });
            } catch (error) {
              console.log(`err`, error);
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

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Container maxWidth="lg" className={classes.root}>
        <Button
          onClick={handleExport}
          className={classes.btn}
          type="button"
          variant="contained"
        >
          Export Exercise Data
        </Button>
        < br /> 
        <CSVLink
          data={data}
          filename="data.csv"
          onClick={event => {handleExport
            console.log("You click the link");
            console.log(data);
          }}
        >
          Download Exercise Data
      </CSVLink>;
      </Container>
    </Container>
  );
};

export default ExportToCSV;
