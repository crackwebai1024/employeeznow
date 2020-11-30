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
import Typography from '@material-ui/core/Typography';
import ProfilePhoto from '../../Employee/Dashboard/ProfilePhoto';
import { Card, CardContent } from '@material-ui/core';
import { successMessage, errorMessage } from '@helpers/utils';
import Profession from "../../Employee/Dashboard/Profession";
import BackgroundPhoto from "../../Employee/Dashboard/BackgroundPhoto";
import Portfolio from './Portfolio';
import _ from 'lodash';
import CallToAction from '@components/CallToAction';
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
  alert: {
    marginBottom: '1rem'
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: "white",
  },
  header: {
    background: "white",
    paddingBottom: "1rem",
    marginBottom: "10px",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  right: {
    float: "right",
  },
  avatar: {
    margin: theme.spacing(1),
    background: theme.palette.common.blue,
  },
  deploma: {
    textAlign: 'center',
    padding: '1rem'
  },
  profilePhoto: {
    width: 100,
    textAlign: "center",
    marginLeft: "3rem",
    marginTop: -100,
    padding: 0,
    cursor: "pointer",
  },
  name: {
    marginLeft: "1rem",
    width: "100%",
    color: "RGB(23,41, 64)",
    fontSize: "2rem",
    fontWeight: 600,
  },
  section: {
    color: "RGB(23,41, 64)",
    marginBottom: 10,
    paddingBottom: 0,
    borderRadius: "0px",
  },
  moreSkills: {
    fontSize: '16px'
  },
  jobtitle: {
    fontSize: 20,
    fontWeight: 600,
    color: "RGB(23,41, 64)",
  },
  company: {
    fontWeight: 450,
  },
  jobPeriod: {
    color: "gray",
    fontWeight: 300,
    marginBottom: 40,
  },
  title: {
    color: theme.palette.common.darkBlue,
    fontWeight: 400,
    fontSize: "0.9rem",
  },
  randomrole: {
    display: "flex",
  },
}));

const DashboardCandidate = ({ location, mployee, actions, askInterestStatus, isLimited, background, match, employeeData }) => {

  const { basic, experience, portfolio, preference, skill, purchased } = employeeData
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
    if (askInterestStatus == "SUCCESS") {
      successMessage("Message is sent successfully!")
    } else if (askInterestStatus == "FAILURE") {
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

  return !_.isEmpty(employeeData) ? (
    <Fragment>
      <Container className={classes.container} maxWidth="md">
        <Grid className={classes.header}>
          <BackgroundPhoto />
          <Grid className={classes.profilePhoto}>
            <ProfilePhoto />
          </Grid>
          <Grid className={classes.section}>
            <Grid className={classes.name}>
              {purchased && basic ?
                employeeData.basic.firstName +
                " " +
                employeeData.basic.lastName :
                basic && `ID - #${basic.employeezNowId}`
              }
            </Grid>
          </Grid>
        </Grid>

        <Grid className={classes.section}>
          <Card className={classes.section}>
            <Grid item container className={classes.callToAction}>
              <Grid item xs={12}>
                <CallToAction onAskInterest={onAskInterest} purchased={purchased} purchaseProfile={purchaseProfile} />
              </Grid>
            </Grid>
          </Card>
        </Grid>

        <Grid className={classes.section}>
          <Card className={classes.section}>
            <CardContent>
              <Grid container item xs={12}>
                <Grid item xs={12} sm={6} md={4}>
                  {preference && (
                    <Typography>{"" + preference.employmentStatus}</Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  {preference && (
                    <Typography>
                      <b className={classes.title}>Expected : </b> US${" "}
                      {preference.idealSalary.amount +
                        "/" +
                        preference.idealSalary.unit}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography></Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid className={classes.section}>
          <Card className={classes.section}>
            {skill && (
              <Fragment>
                <CardContent className={classes.moreSkills}>
                  <Profession profession={employeeData.skill} />
                </CardContent>
              </Fragment>
            )}
          </Card>
        </Grid>

        <Grid className={classes.section}>
          <Card className={classes.section}>
            <CardContent>
              <Grid item container xs={12}>
                <Grid item xs={12} md={6}>
                  <Typography className={classes.jobtitle}>
                    {experience && experience.primaryJob.title}
                  </Typography>
                  {experience && experience.primaryJob && (
                    <Fragment>
                      <Typography className={classes.company}>
                        {experience.primaryJob.company}
                      </Typography>
                      <Typography className={classes.jobPeriod}>
                        {experience.primaryJob.startDate}&nbsp;~ &nbsp;
                        {experience.primaryJob.current
                          ? "Present"
                          : experience.primaryJob.endDate}
                      </Typography>
                    </Fragment>
                  )}
                </Grid>
                {experience && experience.secondaryJob.title &&
                  <Grid item xs={12} md={6}>
                    <Typography className={classes.jobtitle}>
                      {experience && experience.secondaryJob.title}
                    </Typography>
                    {experience && experience.secondaryJob && (
                      <Fragment>
                        <Typography className={classes.company}>
                          {experience.secondaryJob.company}
                        </Typography>
                        <Typography className={classes.jobPeriod}>
                          {experience.secondaryJob.startDate}&nbsp;~ &nbsp;
                                      {experience.secondaryJob.current
                            ? "Present"
                            : experience.secondaryJob.endDate}
                        </Typography>
                      </Fragment>
                    )}
                  </Grid>
                }
                {experience &&
                  experience.otherJob.map((job, i) => (
                    job.title &&
                    <Grid item xs={12} md={6} key={i}>
                      <Typography className={classes.jobtitle}>
                        {job.title}
                      </Typography>
                      <Fragment>
                        <Typography className={classes.company}>
                          {job.company}
                        </Typography>
                        <Typography className={classes.jobPeriod}>
                          {job.startDate}&nbsp;~ &nbsp;
                          {job.endDate}
                        </Typography>
                      </Fragment>
                    </Grid>
                  ))}
              </Grid>

              {/* {employeeData.experience && employeeData.experience.employee} */}
            </CardContent>
          </Card>
        </Grid>

        <Grid className={classes.section}>
          <Portfolio portfolios={portfolio && portfolio.portfolios}/>
        </Grid>
        <Grid className={classes.deploma}>
          <Typography className={classes.center}>
            To upload any documents (diplomas, letter of recommentation, etc) please email to: Register@EmployeezNow.com
          </Typography>
        </Grid>
      </Container>
    </Fragment>
  ) : (
      <Fragment></Fragment>
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
