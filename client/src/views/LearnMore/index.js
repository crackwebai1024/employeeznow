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
  title: {
    fontSize: '40px',
    textAlign: 'center',
    color: 'red'
  },
  veteranSectionTitle: {
    fontSize: "56px",
    fontWeight: 600,
    [theme.breakpoints.down('sm')]: {
      fontSize: '46px'
    }
  },
  veteranSectionSubTitle: {
    fontSize: '40px',
    fontWeight: 400,
    [theme.breakpoints.down('sm')]: {
      fontSize: '30px'
    }
  },
  partImg: {
    maxHeight: '150px',
  },
  veteranImg: {
    maxWidth: '500px'
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
  veteranSectionBottom: {
    fontSize: '20px'
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
  description: {
    textAlign: 'center',
    fontSize: '20px'
  },
  button: {
    borderRadius: '50px',
    padding: '0.8rem 2rem',
    marginTop: '1rem',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  iconTitle: {
    fontSize: '30px',
    textAlign: 'center',
    fontWeight: 200
  },
  bigTitle: {
    fontSize: '60px',
    fontWeight: 200,
    textAlign: 'center',
    marginBottom : '30px'
  }
}));

const LearnMore = () => {
  const classes = useStyles();
  return (
    <Container width="sm" className={classes.mainContainer}>
      <Grid container ustify="center" spacing={0} style={{ marginTop: '100px' }}>
        <Grid item xs={12} md={12} className={classes.title}>
          <i>WHY SPEND A FEW DAYS WHEN YOU CAN GET <br />
          EMPLOYEEZNOW IN JUST A FEW MINUTES!
          </i>
        </Grid>
      </Grid>

      <Grid container ustify="center" spacing={0} style={{ marginTop: '100px' }}>
        <Grid item xs={12} md={12}>
          <Typography className={classes.bigTitle}>
            The process is quick and easy
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3} style={{ textAlign: 'center' }}>
          <img
            className={classes.partImg}
            src={`${process.env.PUBLIC_URL}/img/desktop.svg`}
            alt="chef"
            style={{
              width: '90%',
            }}
          />
          <Typography className={classes.iconTitle}>
            EMPLOYEE REGISTRATION
          </Typography>
          <Typography className={classes.description}>
            It is free for anyone to sign up and create their employee profile.
            It is not just about up loading a resume, personal preferences are
            included to complete your overall profile.
          </Typography>
        </Grid>
        <Grid item xs={12} md={3} sm={6} style={{ textAlign: 'center' }}>
          <img
            className={classes.partImg}
            src={`${process.env.PUBLIC_URL}/img/binoculars.svg`}
            alt="chef"
            style={{
              width: '90%',
            }}
          />
          <Typography className={classes.iconTitle}>
            EMPLOYER SEARCH
          </Typography>
          <Typography className={classes.description}>
            It is free for any employer to search the <b>EmployeezNow</b> database.
          Simply upload specific details required for the open position, such as zip-code,
          job titles, years of experience and keywords.
          </Typography>
        </Grid>
        <Grid item xs={12} md={3} sm={6} style={{ textAlign: 'center' }}>
          <img
            className={classes.partImg}
            src={`${process.env.PUBLIC_URL}/img/memo.svg`}
            alt="chef"
            style={{
              width: '90%',
            }}
          />
          <Typography className={classes.iconTitle}>
            THE RESULTS
          </Typography>
          <Typography className={classes.description}>
            EmployeezNow will instantly provide employers a list of candidates that best match the details of the
            search. The results will yield partial profiles only.
          </Typography>
        </Grid>
        <Grid item xs={12} md={3} sm={6} style={{ textAlign: 'center' }}>
          <img
            className={classes.partImg}
            src={`${process.env.PUBLIC_URL}/img/profile.svg`}
            alt="chef"
            style={{
              width: '90%',
            }}
          />
          <Typography className={classes.iconTitle}>
            PARTIAL PROFILES
          </Typography>
          <Typography className={classes.description}>
            All information such as work history and personal preferences are
            free to be viewed by the employer. The only thing missing is any relevant contact information.
          </Typography>
        </Grid>
      </Grid>

      <Grid container ustify="center" spacing={0} style={{ marginTop: '100px' }}>
        <Grid item xs={12} md={12} style={{ textAlign: 'center' }}>
          <Typography className={classes.bigTitle}>
            Profiles are reviewed and decisions are made
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3} style={{ textAlign: 'center' }}>
          <img
            className={classes.partImg}
            src={`${process.env.PUBLIC_URL}/img/question.svg`}
            alt="chef"
            style={{
              width: '90%',
            }}
          />
          <Typography className={classes.iconTitle}>
            INVEST REQUEST
          </Typography>
          <Typography>
            Employers can send a request through <b>EmployeezNow</b> to inquire
            if the candidate would be interested in their specific job opportunity
          </Typography>
        </Grid>
        <Grid item xs={12} md={3} sm={6} style={{ textAlign: 'center' }}>
          <img
            className={classes.partImg}
            src={`${process.env.PUBLIC_URL}/img/podium.svg`}
            alt="chef"
            style={{
              width: '90%',
            }}
          />
          <Typography className={classes.iconTitle}>
            COMPLETE PROFILE
          </Typography>
          <Typography className={classes.description}>
            Profiles that contain all of the candidate's contact information can be purchased by the
            employer to continue with the hiring process.
          </Typography>
        </Grid>
        <Grid item xs={12} md={3} sm={6} style={{ textAlign: 'center' }}>
          <img
            className={classes.partImg}
            src={`${process.env.PUBLIC_URL}/img/finger.svg`}
            alt="chef"
            style={{
              width: '90%',
            }}
          />
          <Typography className={classes.iconTitle}>
            ONE TIME FEE
          </Typography>
          <Typography>
            Complete profiles are just $8.00 and that employer will have access to their
            purchased profiles indefinitely.
          </Typography>
        </Grid>
        <Grid item xs={12} md={3} sm={6} style={{ textAlign: 'center' }}>
          <img
            className={classes.partImg}
            src={`${process.env.PUBLIC_URL}/img/calendar.svg`}
            alt="chef"
            style={{
              width: '90%',
            }}
          />
          <Typography style={{ textAlign: 'center' }}>
            AUTOMATION
          </Typography>
          <Typography>
            <b>EmployeezNow</b> will keep all profiles current so employers know the information is accurate.
            Because <b>EmployeezNow</b> does the work for you the candidates, registering once until you are ready to retire!
          </Typography>
        </Grid>
      </Grid>

      <Grid container ustify="center" spacing={3} style={{ marginTop: '100px' }}>
        <ContestSection />
      </Grid>

      <Grid container ustify="center" spacing={3} style={{ marginTop: '100px', textAlign: 'center' }}>
        <Grid item xs={12}>
          <Typography className={classes.veteranSectionTitle}>
            Thank you for your service!
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.veteranSectionSubTitle}>
            US MILITARY VETERAS ARE COMPLETELY FREE TO HIRE
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <img
            className={classes.veteranImg}
            src={`${process.env.PUBLIC_URL}/img/veteran.jpg`}
            alt="chef"
            style={{
              width: '90%',
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.veteranSectionBottom}>
            All registered U.S Millitary Veteran's profiles will be FREE to purchased
            <b> EmployeezNow</b> is the ony site that can offer a completely FREE process to hire a Veteran.
            Some sites claim the same, but they charge employers to post jobs or to view resumes.
          </Typography>
          <Typography className={classes.veteranSectionBottom}>
            <b>EmployeezNow</b> wants to thank veterans for their service,
            as we know none of this would be possible without them!
          </Typography>
        </Grid>
      </Grid>

      <Grid container ustify="center" spacing={0} style={{ marginTop: '100px' }}>
        <RegisterSection />
      </Grid>
      <Grid container ustify="center" spacing={0} style={{ marginTop: '100px' }}>
        <Grid xs={12}>
          <Typography className={classes.title}>
            <i>THE FIRST AUTOMATED SEARCH ENGINE FOR<br />
            EMPLOYEES OF HOSPITALITY</i>
          </Typography>
        </Grid>
        <Grid item xs={12} md={5}>
          <div style={{ padding: "100% 0 0 0", position: "relative" }}>
            <iframe src="https://player.vimeo.com/video/455932248" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} frameborder="0" allow="autoplay; fullscreen" allowfullscreen>
            </iframe>
          </div>
          <script src="https://player.vimeo.com/api/player.js"></script>
        </Grid>
        <Grid item xs={12} md={7}>
          <Typography style={{ textAlign: 'center' }}>
            <img
              className={classes.veteranImg}
              src={logo}
              alt="logo"
              style={{
                width: '70%',
              }}
            >
            </img>
          </Typography>
          <Typography style={{margin: 'auto', maxWidth : '500px'}}>
            <i>Serving out Employer & Employee Clients Nationwide!</i>
            <ul>
              <li>THE FASTEST WAY TO EMPLOYEE SEARCH</li>
              <li>WHY SPEND A FEW DAYS WHEN YOU CAN GET <b>EMPLOYEEZNOW</b> IN JUST A FEW MINUTES?</li>
              <li>LET YOUR JOB DO THE WORK OF FINDING YOU</li>
              <li>NEVER POST ANOTHER JOB BUT STILL GET THE BEST CANDIDATES</li>
              <li>EMPLOYEES WILL REGISTER MORE THAN JUST A RESUME!</li>
            </ul>
          </Typography>
        </Grid>
      </Grid>
    </Container >

  );
};

export default LearnMore;
