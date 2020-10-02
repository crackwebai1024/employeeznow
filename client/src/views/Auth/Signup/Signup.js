import React from 'react';
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

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    marginTop: '5%',
    marginBottom: '5%',
  },
  titleContainer: {
    textAlign: 'center',
  },
  title: {
    color: theme.palette.primary.main,
  },
  signupCard: {
    textAlign: 'center',
    minWidth: 280,
    marginTop: '5%',
    padding: '1.2rem 2.5rem',
    [theme.breakpoints.down('sm')]: {
      paddingRight: 0,
      paddingLeft: 0,
    },
  },
  cardContent: {
    [theme.breakpoints.down('sm')]: {
      paddingRight: 0,
      paddingLeft: 0,
    },
  },
  employerCard: {
    marginRight: '2rem',
    [theme.breakpoints.down('sm')]: {
      marginRight: '.5rem',
    },
    [theme.breakpoints.down('xs')]: {
      marginRight: 0,
    },
  },
  employeeCard: {},
  icon: {
    width: '3rem',
    height: '3rem',
    color: theme.palette.secondary.main,
  },
  button: {
    margin: '0 auto',
  },
}));

const Signup = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid container direction="column" className={classes.mainContainer}>
      {/* column 1/2 */}
      <Grid item className={classes.titleContainer}>
        <Typography variant="h1" className={classes.title}>
          Welcome to EmployeezNow!
        </Typography>
      </Grid>

      {/* column 1/2 */}
      <Grid item>
        <Grid
          container
          item
          direction={matchesXS ? 'column' : 'row'}
          justify="center"
        >
          {/* row 1/2 */}
          <Card
            raised
            className={`${classes.signupCard} ${classes.employerCard}`}
          >
            <CardContent className={classes.cardContent}>
              <BusinessIcon className={classes.icon} />
              <Typography variant={matchesSM ? 'h5' : 'h4'}>
                I am an employer
              </Typography>
              <p>Search for ideal candidates</p>
            </CardContent>
            <CardActions>
              <Button
                component={Link}
                to="/signup/employer"
                variant="outlined"
                color="secondary"
                className={classes.button}
              >
                Register as company
              </Button>
            </CardActions>
          </Card>
          {/* row 1/2 */}
          <Card
            raised
            className={`${classes.signupCard} ${classes.employeeCard}`}
          >
            <CardContent>
              <EmojiPeopleIcon className={classes.icon} />
              <Typography variant={matchesSM ? 'h5' : 'h4'}>
                I am an employee
              </Typography>

              <p>Start your next chapter</p>
            </CardContent>
            <CardActions>
              <Button
                component={Link}
                to="/signup/employee"
                variant="outlined"
                color="secondary"
                className={classes.button}
              >
                Register as candidate
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Signup;
