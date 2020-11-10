import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { actions as employerActions } from '@store/employer';
import { bindActionCreators } from 'redux';
import { getUser, getFilterID } from '@helpers/auth-helpers';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CandidateDocuments from './CandidateDocuments'
import ProfilePhoto from '../../Employee/Dashboard/ProfilePhoto';
import BackgourndPhoto from '../../Employee/Dashboard/BackgroundPhoto';
import CallToAction from '@components/CallToAction';
import { successMessage, errorMessage} from '@helpers/utils';

// set styles - material-ui
const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '95vh',
  },
  header: {
    background: 'white',
    paddingBottom: '1rem',
    marginBottom: '1rem',
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
  },
  profilePhoto: {
    width: 166,
    display: 'flex',
    marginLeft: '3rem',
    marginTop: -100,
    padding: 0,
    cursor: "pointer",
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      margin: 'auto',
      // marginLeft: "0rem",
      marginTop: -100,
    },
  },
  callToAction: {

  },
  profileContainer: {
    [theme.breakpoints.down('sm')]: {
      marginTop: '-7rem',
    },
  },
  bgContainer: {
    maxHeight: 300,
    //border: '5px solid green', //just for debug
  },
  underPhotoContainer: {
    marginTop: '0.8rem',
  },
  professionContainer: {
    [theme.breakpoints.down('xs')]: {
      marginTop: '2rem',
    },
  },
  professionDetailsContainer: {
    [theme.breakpoints.down('xs')]: {
      marginTop: '2rem',
    },
  },
  button: {
    color: theme.palette.common.blue,
    borderColor: theme.palette.common.blue,
  },
  nameText: {
    ...theme.typography.h6,
    color: theme.palette.common.darkBlue,
    marginTop: '1.5rem',
    marginBottom: '0.8rem',
  },
  noInfotext: {
    color: theme.palette.common.blue,
  },
  basicTitle: {
    fontSize: 20,
    fontWeight: 900,
    [theme.breakpoints.down('xs')]: {
      fontSize: 16
    }
  },
  basicInfo: {
    maxWidth: "600px",
    marginTop: -60,
    marginLeft: 220,
    marginBottom: '2rem',
    [theme.breakpoints.down('xs')]: {
      marginTop: 0,
      marginLeft: '0rem',
      textAlign: 'center'
    },
  },
  content: {
    maxWidth: 700,
    paddingLeft: '1rem',
    paddingRight: '1rem',
    paddingBottom: '0rem',
    margin: 'auto',
    [theme.breakpoints.down('xs')]: {
      paddingTop: '0rem'
    }
  },
  contentItem: {
    padding: '0 1rem 0 1rem'
  },
  alert: {
    marginBottom: '1rem'
  }
}));

const DashboardCandidate = ({ location, mployee, actions, askInterestStatus, isLimited, background, match, employeeData }) => {

  const { basic, document, experience, portfolio, preference, skill, purchased } = employeeData
  const classes = useStyles();
  const history = useHistory()
  const theme = useTheme();
  const { slug } = match.params;
  const user = JSON.parse(getUser())
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  const [value, setValue] = React.useState(0);
  const currentFilterID = getFilterID()
  /* eslint-disable react/jsx-one-expression-per-line */

  useEffect(() => {
    const data = {
      employeeID: slug,
      id: user._id
    }
    actions.getSearchEmployee(data)
  }, [])

  useEffect(() => {
    if(askInterestStatus == "SUCCESS") {
      successMessage("Message is sent successfully!")
    } else if(askInterestStatus == "FAILURE") {
      errorMessage("Sending message is failed!")
    }
    actions.askInterestStatusHidden()
  }, [askInterestStatus])

  // ask about interested request
  const onAskInterest = () => {
    const data = {
      employeeID: slug,
      id: user._id,
      filterID: currentFilterID
    }
    actions.askInterestRequest(data)
  }

  const purchaseProfile = () => {
    const data = {
      id: user._id,
      employeeID: slug
    }
    actions.purchaseRequest(data)
  }

  if (isLimited) {
    history.push(`/payment/${slug}`)
  }

  console.log(employeeData, "employeeData")
  return (
    <Container className={classes.container} maxWidth="md">
      {/* Dashboard whole page column root */}

      <Grid className={classes.header}>
        <BackgourndPhoto />
        <Grid className={classes.profilePhoto}>
          <Grid>
            <ProfilePhoto />
          </Grid>
        </Grid>
        <Grid item container className={classes.basicInfo}>
          <Grid item xs={12} md={6}>
            <Typography className={classes.basicTitle}>
              {
                purchased ? `Name : ${basic.firstName} ${basic.lastName}` :
                  `CandidateID : ${basic && basic.employeezNowId}`
              }
            </Typography>
            <Typography className={classes.basicTitle}>
              {basic && `${basic.address.city} ${basic.address.state} ${basic.address.street1}`}
            </Typography>
            <Typography className={classes.basicTitle}>
              {preference && preference.employmentStatus}
            </Typography>
            <Typography className={classes.basicTitle}>
              {purchased && `Email : ${basic.email}`}
            </Typography>
            <Typography className={classes.basicTitle}>
              {purchased && `Phone : ${basic.cell}`}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Rating name="half-rating-read" defaultValue={value} precision={0.5} readOnly size="large" />
            </Box>
          </Grid>
        </Grid>
        {skill &&
          <Fragment>
            <Grid container item sm={12} className={classes.content}>
              <Grid container item xs={12} sm={6} className={classes.contentItem}>
                <Grid item xs={6}>
                  <Typography> {skill.primaryJob.title} </Typography>
                </Grid>
                <Grid item xs={6} style={{ textAlign: 'right' }}>
                  <Typography>{skill.primaryJob.years} years</Typography>
                </Grid>
              </Grid>
              <Grid container item xs={12} sm={6} className={classes.contentItem}>
                <Grid item xs={6}>
                  <Typography> {skill.secondaryJob.title} </Typography>
                </Grid>
                <Grid item xs={6} style={{ textAlign: 'right' }}>
                  <Typography>{skill.secondaryJob.years} {skill.secondaryJob ? "years" : ""}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid container item sm={12} className={classes.content}>
              {skill.cuisine.map((cu, i) => {
                return <Grid container key={i} item xs={12} sm={6} className={classes.contentItem}>
                  <Grid item xs={6}>
                    <Typography> {cu.type} </Typography>
                  </Grid>
                  <Grid item xs={6} style={{ textAlign: 'right' }}>
                    <Typography>{cu.years} years</Typography>
                  </Grid>
                </Grid>
              })}
            </Grid>
            <Grid container item sm={12} className={classes.content}>
              <Grid container item xs={12} sm={6} className={classes.contentItem}>

              </Grid>
              <Grid container item xs={12} sm={6} className={classes.contentItem}>
                <Typography>Desired Salary : {`${preference.idealSalary.amount} / ${preference.idealSalary.unit}`}</Typography>
              </Grid>
            </Grid>
          </Fragment>
        }
        <hr />
        <CandidateDocuments />
        <Grid item container className={classes.callToAction}>
          <Grid item xs={12}>
            <CallToAction onAskInterest={onAskInterest} purchased={purchased} purchaseProfile={purchaseProfile} />
          </Grid>
        </Grid>
        <Grid className={classes.section}>
          <Grid className={classes.name}>
            {/* {basic &&
              employeeData.basic.lastName + " " + employeeData.basic.firstName
            } */}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = ({
  employer: {
    askInterestStatus, employeeData, isLimited
  }
}) => ({
  employeeData, askInterestStatus, isLimited
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...employerActions
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardCandidate);
