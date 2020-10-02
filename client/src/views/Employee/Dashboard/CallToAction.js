import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    textAlign: 'center',
    marginTop: '2rem',
  },
  button: {
    padding: '0.5rem 2.5rem',
    '&:hover': {
      transform: 'translateY(-3px)',
      boxShadow: theme.shadows[1],
      backgroundColor: 'transparent',
      color: theme.palette.secondary.main,
      border: `1px solid ${theme.palette.secondary.main}`,

      '&::after': {
        transform: 'scaleX(1.4) scaleY(1.6)',
        opacity: 0,
      },

      //focus for button
      '&:focus': {
        outline: 'none', //for button element
        transform: 'translateY(-1px)',
        boxShadow: '0 .5rem 1rem rgba(black,.2)',
      },
    },
  },

  button1: {
    border: `1px solid ${theme.palette.secondary.main}`,
    color: theme.palette.secondary.main,
  },
  button2: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
  },
}));

// Only employer can access
const CallToAction = () => {
  const classes = useStyles();
  return (
    <Grid container justify="space-evenly">
      <Grid item className={classes.buttonContainer}>
        <Button className={`${classes.button} ${classes.button1}`}>
          PURCHASE THIS PROFILE
        </Button>
      </Grid>

      <Grid item className={classes.buttonContainer}>
        <Button className={`${classes.button} ${classes.button2}`}>
          ASK ABOUT INTEREST
        </Button>
      </Grid>
    </Grid>
  );
};

export default CallToAction;
