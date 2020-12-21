import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import axios from 'axios';
import { setUserId } from '../../User/UserReducer';
import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { FixedSizeList } from 'react-window';

const fixedList = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 400,
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
  },
}));
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

const cardListStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },
  listSection: {
    backgroundColor: 'inherit',
    lineHeight: '0px',
    padding: 0,
    margin: 0,
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
    margin: 0,
    lineHeight: '0px',
  },
}));

const PublicWorkoutCard = () => {
  const classes = useStyles();
  const listStyles = cardListStyles();
  const fixedStyles = fixedList();

  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    // Get workouts on component loading
    try {
      axios.get(`/api/workout`).then(({ data }) => {
        let max = 5;

        axios
          .get('https://randomuser.me/api/?results=5')
          .then(({ data: { results } }) => {
            const exercises = data.map((exercise, index) => {
              const name = results[index].name.first;
              const image = results[index].picture.large;
              const exerciseList = exercise.exercise;

              return index < max ? { exerciseList, name, image } : false;
            });

            setProfiles(exercises);
          });
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Grid>
      {profiles !== null && typeof profiles !== 'undefined'
        ? profiles.map((person, index) => {
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
        : 'huh'}
    </Grid>
  );
};

export default PublicWorkoutCard;
