import React, { Fragment } from 'react';
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
import ProfileDescription from './ProfileDescription';
import MainButton from '@components/Element/Button/MainButton';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import MovieFilterOutlinedIcon from '@material-ui/icons/MovieFilterOutlined';
import DirectionsCarOutlinedIcon from '@material-ui/icons/DirectionsCarOutlined';
import FormatListBulletedOutlinedIcon from '@material-ui/icons/FormatListBulletedOutlined';
import AutorenewOutlinedIcon from '@material-ui/icons/AutorenewOutlined';
import RestaurantOutlinedIcon from '@material-ui/icons/RestaurantOutlined';
import wave from '@assets/wave.svg';

const useStyles = makeStyles((theme) => ({
  contestContainer: {
    background: "#FAFAFA",
    textAlign: 'center',
    width: '100%'
  },
  mainContainer: {
    width: 'auto',
    maxWidth: '1024',
    [theme.breakpoints.down('md')]: {

    },
  },
  textLgContainer: {
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  sectionIcon: {
    width: '42px',
    height: '42px',
    color: theme.palette.common.lightBlack
  },
  heading1: {
    color: theme.palette.primary.main,
    fontFamily: 'Nunito Sans',
    fontWeight: 600,
    fontSize: '2.5rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.5rem',
      letterSpacing: '0.08rem',
    },
  },
  heading2: {
    marginTop: '2rem',
    marginBottom: '0.5rem',
    fontFamily: 'Nunito Sans',
    fontSize: '2rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
      letterSpacing: '0.05rem',
    },
  },
  logo: {
    width: '100%',
  },
  heading4: {
    textAlign: 'center',
    fontSize: '28px',
  },
  heading5: {
    color: theme.palette.secondary.main,
    fontWeight: 700,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.8rem',
    },
  },
  headingBatang: {
    textAlign: 'center',
    fontSize: '30px',
    fontWeight: 900
  },
  heading3: {
    fontWeight: 600,
    fontSize: '30px',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.8rem',
    },
  },
  text: {
    fontWeight: 500,
    textAlign: 'center',
    fontSize: '16px',
  },
  paper1: {
    padding: '10px',
    borderRadius: '10px',
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
  center: {
    textAlign: "center"
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
  getStartedSection: {
    textAlign: "center"
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
  font14: {
    fontSize: '14px',
    textAlign: 'center'
  }
}));

const Home = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <Container width="sm" className={classes.mainContainer}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Grid
              container
              direction="row"
              justify="space-evenly"
              className={classes.textLgContainer}
            >
              <Grid item>
                {/* nested column 1/2 text*/}
                <Grid container direction="column">
                  <Grid item className={classes.getStartedSection}>
                    <Typography variant="h1" className={classes.heading1}>
                      A HOSPITALITY EMPLOYMENT PLATFORM
                </Typography>
                    <Typography variant="h2" className={classes.heading2}>
                      Get EmpoyeezNow in Just a few minutes!
                </Typography>
                    <MainButton
                      background="green" 
                      pd={30} fontSize={20} 
                      label="Get Started" 
                      to="/signup" 
                      width="200px" 
                      border="green" 
                      color="white"
                      hoverColor="green"
                    >
                    </MainButton>
                    <Typography className={classes.heading3}>
                      Free to register
                  </Typography>
                  </Grid>

                  {/* nested column 1/2 button */}


                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container style={{ marginTop: '100px' }}>
          <Grid item xs={12} md={12}>
            <Grid>
              <Typography variant="h4" className={classes.headingBatang}>
                HOSPITALITY EMPLOYEES
            </Typography>
              <Paper elevation={0} className={classes.paper1}>
                <Typography className={classes.text}>
                  You never profile like this.<br />
                Register your FREE employment profile and when you want, we will show it to dosens of employers that are hiring in your area.
              </Typography>
                <Typography className={classes.text}>
                  THE PROFILE CAN BE SO MUCH MORE THAN JUST A RESUME
              </Typography>
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography className={classes.center}>
              <InsertDriveFileOutlinedIcon className={classes.sectionIcon} />
            </Typography>
            <Typography className={classes.font14}>
              Upload <b>"At-Work" videos</b> showing off your skills
          </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography className={classes.center}>
              <MonetizationOnOutlinedIcon className={classes.sectionIcon} />
            </Typography>
            <Typography className={classes.font14}>
              Create a <b>Self-Interview</b> to explain who you are
          </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography className={classes.center}>
              <MovieFilterOutlinedIcon className={classes.sectionIcon} />
            </Typography>
            <Typography className={classes.font14}>
              Select the miles you're willing to travel from home for work
          </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography className={classes.center}>
              <DirectionsCarOutlinedIcon className={classes.sectionIcon} />
            </Typography>
            <Typography className={classes.font14}>
              Include your salary expectations
          </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography className={classes.center}>
              <FormatListBulletedOutlinedIcon className={classes.sectionIcon} />
            </Typography>
            <Typography className={classes.font14}>
              List yourself eligible for multiple job titles
          </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography className={classes.center}>
              <AutorenewOutlinedIcon className={classes.sectionIcon} />
            </Typography>
            <Typography className={classes.font14}>
              Our automation will help you keep it up to date
          </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={3} style={{ marginTop: '100px' }}>
          <Grid item xs={12} className={classes.center}>
            <Typography>
              Much, Much More!
          </Typography>
            <Typography className={classes.center}>
              Once you are registered, we will help you keep your profile current and always up to date.
          </Typography>
            <Typography className={classes.center}>
              When you are ready, we will bring the job opportunites to you and only the ones that fit your needs!
          </Typography>
            <Typography className={classes.center}>
              We're like a personal staffing agency that works for FREE.
          </Typography>
            <Typography className={classes.center}>
              Until you're ready for something new, just keep building your profile to be the best it can be!
          </Typography>
          </Grid>
        </Grid>
      </Container >
      <Grid container className={classes.contestContainer}>
        <ContestSection />
      </Grid>
      <Container width="sm" className={classes.mainContainer}>
        <Grid container spacing={3} style={{ marginTop: '50px' }}>
          <ProfileDescription />
        </Grid>
      </Container>
      <Grid container style={{ background: '#FFD101', marginTop: "100px" }}>
        <Container width="sm">
          <Grid container item xs={12}>
            <Grid item xs={12} md={6}>
              <Typography>
                REGISTER YOUR PROFILE
          </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <MainButton
                background="#FFD101" 
                pd={30} fontSize={20} 
                label="SIGN UP USER" 
                to="/signup" 
                width="200px" 
                border="black" 
                color="black"
              >
              </MainButton>
            </Grid>
          </Grid>
        </Container>
      </Grid>
      <Container width="sm" className={classes.mainContainer}>
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
      </Container >
    </Fragment>
  );
};

export default Home;
