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
import RegisterSection from '../Home/RegisterSection';
import SelfInterviewSection from '../Home/SelfInterviewSection';
import ContestSection from '../Home/ContestSection';
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

const LearnMore = () => {
  const classes = useStyles();
  return (
    <Container width="sm" className={classes.mainContainer}>
      <Grid container ustify="center" spacing={0} style={{ marginTop: '100px' }}>
        <Grid item xs={12} md={12}>
          <i>WHY SPEND A FEW DAYS WHEN YOU CAN GET
          EMPLOYEEZNOW IN JUST A FEW MINUTES!
          </i>
        </Grid>
      </Grid>

      <Grid container ustify="center" spacing={0} style={{ marginTop: '100px' }}>
        <Grid item xs={12} md={12}>
          The process is quick and easy
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          It is free for anyone to sign up and create their employee profile.
          It is not just about up loading a resume, personal preferences are
          included to complete your overall profile.
        </Grid>
        <Grid item xs={12} md={3} sm={6}>
          It is free for any employer to search the EmployeezNow database.
          Simply upload specific details required for the open position, such as zip-code,
          job titles, years of experience and keywords.
        </Grid>
        <Grid item xs={12} md={3} sm={6}>
          EmployeezNow will instantly provide employers a list of candidates that best match the details of the
          search. The results will yield partial profiles only.
        </Grid>
        <Grid item xs={12} md={3} sm={6}>
          All information such as work history and personal preferences are
          free to be viewed by the employer. The only thing missing is any relevant contact information.
        </Grid>
      </Grid>

      <Grid container ustify="center" spacing={0} style={{ marginTop: '100px' }}>
        <Grid item xs={12} md={12}>
          Profiles are reviewed and decisions are made
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography>
            INVEST REQUEST
          </Typography>
          <Typography>
            Employers can send a request through EmployeezNow to inquire
            if the candidate would be interested in their specific job opportunity
          </Typography>
        </Grid>
        <Grid item xs={12} md={3} sm={6}>
          <Typography>
            COMPLETE PROFILE
          </Typography>
          <Typography>
            Profiles that contain all of the candidate's contact information can be purchased by the
            employer to continue with the hiring process.
          </Typography>
        </Grid>
        <Grid item xs={12} md={3} sm={6}>
          <Typography>
            ONE TIME FEE
          </Typography>
          <Typography>
            Complete profiles are just $8.00 and that employer will have access to their
            purchased profiles indefinitely.
          </Typography>
        </Grid>
        <Grid item xs={12} md={3} sm={6}>
          <Typography>
            AUTOMATION
          </Typography>
          <Typography>
            EmployeezNow will keep all profiles current so employers know the information is accurate.
            Because EmployeezNow does the work for you the candidates, registering once until you are ready to retire!
          </Typography>
        </Grid>
      </Grid>

      <Grid container ustify="center" spacing={3} style={{ marginTop: '100px' }}>
        <ContestSection />
      </Grid>

      <Grid container ustify="center" spacing={3} style={{ marginTop: '100px' }}>
        <Grid item xs={12}>
          <Typography>
            Thank you for your service!
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            US MILITARY VETERAS ARE COMPLETELY FREE TO HIRE
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            All registered U.S Millitary Veteran's profiles will be FREE to purchased
            EmployeezNow is the ony site that can offer a completely FREE process to hire a Veteran.
            Some sites claim the same, but they charge employers to post jobs or to view resumes.
          </Typography>
          <Typography>
            EmployeezNow wants to thank veterans for their service,
            as we know none of this would be possible without them!
          </Typography>
        </Grid>
      </Grid>

      <Grid container ustify="center" spacing={0} style={{ marginTop: '100px' }}>
        <RegisterSection />
      </Grid>
    </Container >

  );
};

export default LearnMore;
