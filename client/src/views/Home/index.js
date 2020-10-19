import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import logo from '@assets/logo.svg';
import RegisterSection from './RegisterSection';
import SelfInterviewSection from './SelfInterviewSection';
import ContestSection from './ContestSection';
import RestaurantOutlinedIcon from '@material-ui/icons/RestaurantOutlined';
import wave from '@assets/wave.svg';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    width: 'auto',
    [theme.breakpoints.down('md')]: {

    },
  },
  textLgContainer: {
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  heading1: {
    maxWidth: "750px",
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
  logo: {
    width: '100%',
  },
  ContainerLeft: {
    maxWidth: '500px',
    float: 'right',
    [theme.breakpoints.down('sm')]: {
      float: "none",
      margin: 'auto',
    },
  },
  containerRight: {
    [theme.breakpoints.down('sm')]: {
      textAlign: "center"
    },
  },
  heading4: {
    textAlign: 'center',
    fontSize: '28px',
    fontFamily: 'Calibri'
  },
  heading5: {
    color: theme.palette.secondary.main,
    fontWeight: 700,
    fontFamily: 'Calibri',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.8rem',
    },
  },
  headingBatang: {
    fontFamily: 'Arno Pro Smbd Subhead',
    textAlign: 'center',
    fontSize: '30px',
    fontWeight: 900
  },
  heading3: {
    fontWeight: 700,
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.8rem',
    },
  },
  text: {
    font: 'Calibri',
    fontWeight: 800
  },
  paper1: {
    padding: '10px',
    borderRadius: '10px',
    font: 'Calibri',
    fontWeight: 800,
    fontSize: '16px'
  },
  paper2: {
    background: "#eaeff8",
    display: 'flex',
    borderRadius: '30px',
    marginTop: "30px",
    paddingBottom: "50px",
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      textAlign: 'center'
    },
  },
  button1: {
    borderRadius: '15px',
    backgroundColor: '#C00000',
    padding: '0.8rem 2rem',
    marginTop: '-30px',
    width: '300px',
    fontSize: '20px',
    margin: 'auto',
    '&:hover': {
      backgroundColor: '#A00000'
    },
  },
  button2: {
    borderRadius: '15px',
    backgroundColor: '#002060',
    padding: '1.5rem 2rem',
    width: '300px',
    margin: 'auto',
    color: 'white',
    fontSize: '20px',
    '&:hover': {
      backgroundColor: '#003070',
      margin: 'auto'
    },
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
    <Container width="sm" className={classes.mainContainer}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
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
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
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
        </Grid>
      </Grid>

      <Grid container ustify="center" spacing={3} style={{ marginTop: '100px' }}>
        <Grid item xs={12} md={6}>
          <Grid className={classes.ContainerLeft}>
            <Typography variant="h4" className={classes.headingBatang}>
              HOSPITALITY EMPLOYEES
            </Typography>
            <Paper elevation={0} className={classes.paper1}>
              <Typography className={classes.text}>
                Register your FREE employment profile and when you want, we
                will show it to hundreds of employers that are hiring in your area.
                The profile can be so much more than just a resume…
              </Typography>
              <ul>
                <li> Select the miles you’re willing to travel from home for work </li>
                <li> Upload ‘At work’ videos showing off your skills </li>
                <li> Create a Self-Interview to explain who you are </li>
                <li> Include your salary expectations </li>
                <li>  List yourself eligible for multiple job titles </li>
                <li>  Much, much more! </li>
              </ul>
              <Typography className={classes.text}>
                Once you are registered, we will help you keep your profile
                current and always up to date.  When you are ready, we will bring
                the job opportunities to you and only the ones that fit your
                needs! We’re like a personal staffing agency that works for FREE.
                </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid className={classes.containerRight}>
            <img
              src={`${process.env.PUBLIC_URL}/img/img1.png`}
              alt="chef"
              style={{
                width: '80%',
                maxWidth: '500px'
              }}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={3} style={{ marginTop: '100px' }}>
        <ContestSection />
      </Grid>

      <Grid container spacing={3} style={{ marginTop: '50px' }}>
        <Grid item xs={12} md={6}>
          <Grid className={classes.ContainerLeft}>
            <img
              src={`${process.env.PUBLIC_URL}/img/img3.png`}
              alt="chef"
              style={{
                width: '100%',
                maxWidth: '500px'
              }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid className={classes.ContainerRight} style={{ marginTop: '50px' }}>
            <Typography variant="h4" className={classes.headingBatang}>
              HOSPITALITY EMPLOYEES
            </Typography>
            <Paper elevation={0} className={classes.paper1}>
              <Typography className={classes.text}>
                The next time you have a job opening, don’t spend days with
                multiple sites just to get a list of qualified candidates.  Register your
                company profile & get your candidates in just a few minutes!
              </Typography>
              <ul>
                <li> Select the miles you’re willing to travel from home for work </li>
                <li> Upload ‘At work’ videos showing off your skills </li>
                <li> Create a Self-Interview to explain who you are </li>
                <li> Include your salary expectations </li>
                <li>  List yourself eligible for multiple job titles </li>
                <li>  Much, much more! </li>
              </ul>
              <Typography className={classes.text}>
                We want to reduce the time and cost it takes to hire by 50% or more!
                </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={3} style={{ marginTop: '100px' }}>
        <Grid item xs={12} md={6}>
          <Typography>
            <img src={logo} alt="company logo" className={classes.logo} />
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} style={{ display: "flex" }}>
          <Button
            component={Link}
            to="/about"
            className={classes.button2}
          >
            Learn More
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={3} style={{ marginTop: '50px' }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" className={classes.heading3}>
            is absolutely FREE to hire a
          </Typography>
          <Typography variant="h4" className={classes.heading3}>
            US Military Veteran!
          </Typography>
          <Typography className={classes.heading4}>
            <i>No cost for the employee and the employer</i>
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={0} style={{ marginTop: '50px' }}>
        <RegisterSection />
      </Grid>
      <Grid container spacing={0} style={{ marginTop: '50px' }}>
        <SelfInterviewSection />
      </Grid>
    </Container>
  );
};

export default Home;
