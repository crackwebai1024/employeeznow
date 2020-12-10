import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Box } from "@material-ui/core";
import moment from 'moment';
import Collapse from "@material-ui/core/Collapse";
import { getUser } from "@helpers/auth-helpers";
import { connect } from "react-redux";
import { actions as employeeActions } from "@store/employee";
import { bindActionCreators } from "redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import CardHeader from "@material-ui/core/CardHeader";
import _ from "lodash";
import Typography from "@material-ui/core/Typography";
import ProfilePhoto from "./ProfilePhoto";
import BackgroundPhoto from "./BackgroundPhoto";
import Portfolio from "./Portfolio";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Profession from "./Profession";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: "white",
  },
  subheader: {
    // fontFamily: "Arial, Helvetica, sans-serif"
    color: '#cc0000',
    fontWeight: 600
  },
  container: {
  },
  description: {
    maxHeight: '50px',
    paddingBottom: '1rem',
    overflowY: 'hidden',
    overflowX: 'hidden',
    marginBottom: '1rem',
    whiteSpace: "nowrap"
  },
  header: {
    background: "white",
    paddingBottom: "1rem",
    marginBottom: "10px",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
  },
  red: {
    color: '#cc0000'
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
  accountButton: {
    color: theme.palette.common.blue,
    borderColor: theme.palette.common.blue,
    marginLeft: 50,
  },
  button: {
    color: theme.palette.common.blue,
    borderColor: theme.palette.common.blue,
  },
  moreSkills: {
    fontSize: '16px',
    marginTop: '-2rem'
  },
  card: {
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
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
    marginBottom: 10,
  },
  input: {
    display: "none",
  },
  dialogContent: {
    height: "65vh",
    width: "80vw",
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

function Dashboard(props) {
  const {
    actions,
    employeeData,
  } = props;
  const user = JSON.parse(getUser());
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(true);
  const [document, setDocument] = useState([]);

  useEffect(() => {
    let data = {
      id: user._id,
    };
    actions.getUserDataRequest(data);
  }, []);

  const uploadDocument = (e, type) => {
    setDocument({
      ...document,
      [type]: e.target.files[0].name,
    });
    const formData = new FormData();
    formData.append("id", user._id);
    formData.append("type", type);
    formData.append("content", e.target.files[0]);
    formData.append("fname", e.target.files[0].name);
    actions.uploadDocumentRequest(formData);
  };

  const { basic, skill, experience, preference } = employeeData;

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
              {basic &&
                employeeData.basic.firstName +
                " " +
                employeeData.basic.lastName}
              <Button
                component={Link}
                variant="outlined"
                size="small"
                to={`/employee/${user && user.slug}/account`}
                className={classes.accountButton}
              >
                Account
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid className={classes.section}>
          <Card className={classes.section}>
            <CardHeader
              action={
                <Button
                  component={Link}
                  variant="outlined"
                  size="small"
                  to={`/${user && user.slug}/professiondetails-form`}
                  className={classes.button}
                >
                  {employeeData.preference
                    ? "Update Personal Preference"
                    : "Add Personal Preference"}
                </Button>
              }
              title={
                <Box className={classes.red}>
                  Personal Preferences
                </Box>
              }
              subheader={
                <Box className={classes.subheader}>
                  <i>this section must be filled in for you to be seen by employers</i>
                </Box>
              }
            />
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
                      <b className={classes.title}>Expected : </b>
                      {preference.idealSalary.amount && <span>US${" "}
                        {preference.idealSalary.amount +
                          "/" +
                          preference.idealSalary.unit}
                      </span>
                      }
                    </Typography>
                  )}
                </Grid>
                {/* <Grid item xs={12} sm={6} md={4}>
                  {preference && (
                    <Typography>
                      <b className={classes.title}>Planing to Move : </b>
                      {preference.planningToMove.location}{" "}
                      {preference.planningToMove.dateToMove}
                    </Typography>
                  )}
                </Grid> */}
                {/* <Grid item xs={12} sm={12} md={12}>
                  {preference && (
                    <Box className={classes.randomrole}>
                      <span>
                        <b className={classes.title}>Shift Availablity : </b>
                      </span>
                      <div>
                        {preference.randomShiftRole.map((shift, key) => {
                          return (
                            <>
                              {shift + ", "}
                              {key % 2 === 1 ? <br></br> : ""}
                            </>
                          );
                        })}
                      </div>
                    </Box>
                  )}
                </Grid> */}
                <Grid item xs={12} sm={6} md={4}>
                  <Typography></Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid className={classes.section}>
          <Card className={classes.section}>
            <CardHeader
              action={
                <Button
                  component={Link}
                  to={`/${user && user.slug}/skills`}
                  variant="outlined"
                  size="small"
                  className={classes.button}
                >
                  {skill ? "Update Experience" : "Add Experience"}
                </Button>
              }
              title={
                <Box className={classes.red}>Experience</Box>
              }
              subheader={
                <Box className={classes.subheader}>
                  <i>this section must be filled in for you to be seen by employers</i>
                </Box>
              }
            />
            {skill && (
              <Fragment>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent className={classes.moreSkills}>
                    <Profession profession={employeeData.skill} />
                  </CardContent>
                </Collapse>
              </Fragment>
            )}
          </Card>
        </Grid>

        <Grid className={classes.section}>
          <Card className={classes.section}>
            <CardHeader
              action={
                <Button
                  component={Link}
                  to={`/${user && user.slug}/work-experience`}
                  variant="outlined"
                  size="small"
                  className={classes.button}
                >
                  {experience
                    ? "Update My Work History"
                    : "Add My Work History"}
                </Button>
              }
              title="Work History"
              subheader=""
            />
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
                        { }
                      </Typography>
                      <Typography className={classes.jobPeriod}>
                        {moment(new Date(experience.primaryJob.startDate)).format('MM/DD/YYYY')}&nbsp;~ &nbsp;
                        {experience.primaryJob.current
                          ? "Present"
                          : moment(new Date(experience.primaryJob.endDate)).format('MM/DD/YYYY')}
                      </Typography>
                      {/* <Typography className={classes.description}>
                        {experience.primaryJob.description}
                      </Typography> */}
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
                          {moment(new Date(experience.secondaryJob.startDate)).format('MM/DD/YYYY')}&nbsp;~ &nbsp;
                                      {experience.secondaryJob.current
                            ? "Present"
                            : moment(new Date(experience.secondaryJob.endDate)).format('MM/DD/YYYY')}
                        </Typography>
                        {/* <Typography className={classes.jobPeriod}>
                          {experience.secondaryJob.description}
                        </Typography> */}
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
                          {moment(new Date(job.startDate)).format('MM/DD/YYYY')}&nbsp;~ &nbsp;
                          {moment(new Date(job.endDate)).format('MM/DD/YYYY')}
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
          <Portfolio />
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
}

const mapStateToProps = ({
  employee: {
    employeeData,
    videoUpload
  },
}) => ({
  employeeData,
  videoUpload
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      ...employeeActions,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
