import React, { useState, useEffect, Fragment } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { AccordionActions, Container } from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import { getUser } from "@helpers/auth-helpers";
import { connect } from "react-redux";
import { actions as employeeActions } from "@store/employee";
import { bindActionCreators } from "redux";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import clsx from "clsx";
import _ from "lodash";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import ProfilePhoto from "./ProfilePhoto";
import BackgroundPhoto from "./BackgroundPhoto";
import Portfolio from "./Portfolio";
import VideoGallery from "./VideoGallery";
import { Link } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
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
  container: {},
  header: {
    background: "white",
    paddingBottom: "1rem",
    marginBottom: "1rem",
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
    marginBottom: 20,
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
    background: "RGB(250, 250, 250)",
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
    marginBottom: 40,
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
    resumeLoading,
    licenseLoading,
    deplomaLoading,
    refletterLoading,
    referenceLetterLoading,
  } = props;
  const user = JSON.parse(getUser());
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(true);
  const [document, setDocument] = useState([]);
  const [open, setOpen] = useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
                employeeData.basic.lastName +
                  " " +
                  employeeData.basic.firstName}
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
              title="Personal Preference"
              subheader=""
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
                      <b className={classes.title}>Expected : </b> US${" "}
                      {preference.idealSalary.amount +
                        "/" +
                        preference.idealSalary.unit}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  {preference && (
                    <Typography>
                      <b className={classes.title}>Planing to Move : </b>
                      {preference.planningToMove.location}{" "}
                      {preference.planningToMove.dateToMove}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  {preference && (
                    <Typography className={classes.randomrole}>
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
            <CardHeader
              action={
                <Button
                  component={Link}
                  to={`/${user && user.slug}/skills`}
                  variant="outlined"
                  size="small"
                  className={classes.button}
                >
                  {skill ? "Update Skills" : "Add Skills"}
                </Button>
              }
              title="Skills"
              subheader=""
            />
            {skill && (
              <Fragment>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent className={classes.moreSkills}>
                    <Profession profession={employeeData.skill} />
                  </CardContent>
                </Collapse>
                <Grid item xs={12}>
                  <CardActions>
                    <IconButton
                      className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                      })}
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </CardActions>
                </Grid>
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
                    ? "Update My Work Experience"
                    : "Add My Work Experience"}
                </Button>
              }
              title="Work Experience"
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
                {experience &&
                  experience.otherJob.map((job, i) => (
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
          <Portfolio />
        </Grid>

        {/* <Grid className={classes.section}>
            <Card className={classes.section}>
              <CardHeader
                title="DOCUMENTS"
                subheader=""
              />
              <CardContent>
                <Grid className={classes.section}> */}
        {/* <Card className={classes.section}>
                    <CardHeader
                      title="resume"
                      subheader=""
                    />
                    <CardContent>
                      <input
                        accept="*"
                        className={classes.input}
                        id="contained-button-resume"
                        multiple
                        onChange={e => uploadDocument(e, "resume")}
                        type="file"
                      />
                      <label htmlFor="contained-button-resume">
                        <Button variant="contained" color="primary" component="span">
                          Resume Upload
                        </Button>
                      </label>
                      {resumeLoading ? "loading..." : document.resume && document.resume}
                    </CardContent>
                  </Card> */}

        {/* <Card className={classes.section}>
                    <CardHeader
                      title="licence"
                      subheader=""
                    />
                    <CardContent>
                      <input
                        accept="*"
                        className={classes.input}
                        id="contained-button-license"
                        multiple
                        onChange={e => uploadDocument(e, "license")}
                        type="file"
                      />
                      <label htmlFor="contained-button-license">
                        <Button variant="contained" color="primary" component="span">
                          License Upload
                        </Button>
                      </label>
                      {licenseLoading ? "loading..." : document.license && document.license}
                    </CardContent>
                  </Card> */}

        {/* <Card className={classes.section}>
                    <CardHeader
                      title="deploma"
                      subheader=""
                    />
                    <CardContent>
                      <input
                        accept="*"
                        className={classes.input}
                        id="contained-button-deploma"
                        multiple
                        onChange={e => uploadDocument(e, "deploma")}
                        type="file"
                      />
                      <label htmlFor="contained-button-deploma">
                        <Button variant="contained" color="primary" component="span">
                          Deploma Upload
                        </Button>
                      </label>
                      {deplomaLoading ? "loading..." : document.deploma && document.deploma}
                    </CardContent>
                  </Card> */}
        {/* <Card className={classes.section}>
                    <CardHeader
                      title="refletter"
                      subheader=""
                    />
                    <CardContent>
                      <input
                        accept="*"
                        className={classes.input}
                        id="contained-button-refletter"
                        multiple
                        onChange={e => uploadDocument(e, "refletter")}
                        type="file"
                      />
                      <label htmlFor="contained-button-refletter">
                        <Button variant="contained" color="primary" component="span">
                          Refletter Upload
                        </Button>
                      </label>
                      {refletterLoading ? "loading..." : document.refletter && document.refletter}
                    </CardContent>
                  </Card> */}
        {/* </Grid>
              </CardContent>
            </Card>
          </Grid> */}
      </Container>
    </Fragment>
  ) : (
    <Fragment></Fragment>
  );
}

const mapStateToProps = ({
  employee: {
    employeeData,
    resumeLoading,
    resume,
    licenseLoading,
    deplomaLoading,
    refletterLoading,
  },
}) => ({
  employeeData,
  resumeLoading,
  resume,
  licenseLoading,
  deplomaLoading,
  refletterLoading,
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
