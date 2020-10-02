import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import RestaurantOutlinedIcon from '@material-ui/icons/RestaurantOutlined';
import wave from '@assets/wave.svg';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    height: '1000px', //we change later
    width: 'auto',
    marginTop: '10%',

    [theme.breakpoints.down('md')]: {},
  },
  textLgContainer: {
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  textContainer: {
    maxWidth: '40rem',
    minWidth: '25rem',
    marginRight: '5%',
    [theme.breakpoints.down('md')]: {
      width: '33%',
      marginRight: 0,
    },
  },
  heading1: {
    color: theme.palette.primary.main,
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.5rem',
      letterSpacing: '0.08rem',
    },
  },
  heading2: {
    marginTop: '2rem',
    marginBottom: '0.5rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
      letterSpacing: '0.05rem',
    },
  },
  heading5: {
    color: theme.palette.secondary.main,
    fontWeight: 700,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.8rem',
    },
  },
  imageContainer: {
    maxWidth: '35rem',
    paddingLeft: '2rem',
    [theme.breakpoints.down('sm')]: {
      width: '33%',
    },
  },
  icon: {
    width: '100%',
    height: '100%',
    color: 'forestgreen',
  },
  button: {
    borderRadius: '50px',
    padding: '0.8rem 2rem',
    marginTop: '1rem',

    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    // * main column 1/2 * /
    <Grid container direction="column" className={classes.mainContainer}>
      <Grid item>
        {/* row 1/2 */}
        <Grid
          container
          direction="row"
          justify="space-evenly"
          className={classes.textLgContainer}
        >
          <Grid item className={classes.textContainer}>
            {/* nested column 1/2 text*/}
            <Grid container direction="column">
              <Grid item>
                <Typography variant="h1" className={classes.heading1}>
                  A HOSPITALITY
                  <br />
                  EMPLOYMENT PLATFORM
                </Typography>
                <Typography variant="h2" className={classes.heading2}>
                  Get EmpoyeezNow
                  <br />
                  in Just a few minutes!
                </Typography>
                <Typography variant="h5" className={classes.heading5}>
                  Free to register
                </Typography>
              </Grid>

              {/* nested column 1/2 button */}
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/signup"
                  className={classes.button}
                >
                  Get started
                </Button>
              </Grid>
            </Grid>
          </Grid>

          {/* row 2/2 */}
          <Hidden smDown>
            <Grid item className={classes.imageContainer}>
              {/* <RestaurantOutlinedIcon className={classes.icon} /> */}
              {/* test hero picture */}
              <img
                src={`${process.env.PUBLIC_URL}/img/test-hero.jpg`}
                alt="chef"
                style={{
                  width: '80%',
                }}
              />
            </Grid>
          </Hidden>
        </Grid>
      </Grid>
      {/* main column 2/2 */}
      <Grid item>
        <img src={wave} alt="wave" />
      </Grid>
      {/* We can continue to create main column .... */}
    </Grid>
  );
};

export default Home;
