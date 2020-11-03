import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import BusinessIcon from '@material-ui/icons/Business';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    paddingTop: '5%',
    marginBottom: '5%',
    maxWidth: '800px'
  },
  titleContainer: {
    textAlign: 'center',
  },
  title: {
    color: theme.palette.primary.main,
  },
  signupCard: {
    textAlign: 'center',
    maxWidth: 400,
    margin: 'auto',
    borderRadius: '0px',
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.16)",
    marginTop: '5%',
    padding: '1.2rem 2.5rem',
    [theme.breakpoints.down('sm')]: {
      paddingRight: "1rem",
      paddingLeft: "1rem",
    },
  },
  cardContent: {
    [theme.breakpoints.down('sm')]: {
      paddingRight: "0.5rem",
      paddingLeft: "0.5rem",
    },
  },
  icon: {
    width: '3rem',
    height: '3rem',
    color: theme.palette.secondary.main,
  },
  button: {
    width: "100%"
  },
}));

const Signup = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container width="md" container direction="column" className={classes.mainContainer}>
      <Grid item className={classes.titleContainer} xs={12}>
        <Typography variant="h2" className={classes.title}>
          Welcome to EmployeezNow!
        </Typography>
      </Grid>

      <Grid item container xs={12} spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card className={`${classes.signupCard}`} >
            <CardContent className={classes.cardContent}>
              <BusinessIcon className={classes.icon} />
              <Typography variant='h5'>
                I am an employer
              </Typography>
              <p>Search for ideal candidates</p>
            </CardContent>
            <Button
              component={Link}
              to="/signup/employer"
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              Register as company
              </Button>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card
            className={`${classes.signupCard}`}
          >
            <CardContent>
              <EmojiPeopleIcon className={classes.icon} />
              <Typography variant='h5'>
                I am an employee
              </Typography>

              <p>Start your next chapter</p>
            </CardContent>
              <Button
                component={Link}
                to="/signup/employee"
                variant="outlined"
                color="secondary"
                className={classes.button}
              >
                Register as candidate
              </Button>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Signup;
