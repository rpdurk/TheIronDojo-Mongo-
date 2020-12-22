import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Grid, CircularProgress } from '@material-ui/core/';
import List from '@material-ui/core/List';

const useStyles = makeStyles({
  root: {
    // minWidth: 275,
    maxWidth: 250,
    maxHeight: 350,
    margin: '10px 0',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    // transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
  },
  pos: {
    marginBottom: 12,
  },
  paper: {
    height: 160,
    width: 220,
    padding: 20,
    display: 'inline-block',
  },
  media: {
    height: 140,
  },
});

const PublicWorkoutCard = () => {
  const classes = useStyles();
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    // Get workouts on component loading
    try {
      axios.get(`/api/workout`).then(({ data }) => {
        let max = 5;

        axios
          .get('https://randomuser.me/api/?results=5')
          .then(({ data: { results } }) => {
            if (typeof results === 'undefined') {
              setProfiles(null);
            } else {
              let exercises = [];

              for (let i = 0; i < max; i++) {
                if (i < data.length && i < results.length) {
                  const name = results[i].name.first;
                  const image = results[i].picture.large;
                  const exerciseList = data[i].exercise;
                  exercises.push({ exerciseList, name, image });
                }
              }

              setProfiles(exercises);
            }
          });
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Grid>
      {profiles !== null && typeof profiles !== 'undefined' ? (
        profiles.map((person, index) => {
          return (
            <Card key={index} className={classes.root}>
              <CardMedia
                className={classes.media}
                image={person.image}
                title={person.name}
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  {person.name}
                </Typography>

                <List className={classes.root} subheader={<li />}>
                  {person.exerciseList.map((exercise) => (
                    <li
                      key={`section-${exercise}`}
                      className={classes.listSection}
                    >
                      {exercise}
                    </li>
                  ))}
                </List>
              </CardContent>
            </Card>
          );
        })
      ) : (
        <CircularProgress />
      )}
    </Grid>
  );
};

export default PublicWorkoutCard;
