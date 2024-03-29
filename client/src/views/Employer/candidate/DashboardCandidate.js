import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { actions as employerActions } from "@store/employer";
import { bindActionCreators } from "redux";
import { getUser, getFilterID } from "@helpers/auth-helpers";
import Typography from "@material-ui/core/Typography";
import ProfilePhoto from "../../Employee/Dashboard/ProfilePhoto";
import { Card, CardContent, Button } from "@material-ui/core";
import { successMessage, errorMessage } from "@helpers/utils";
import Profession from "../../Employee/Dashboard/Profession";
import BackgroundPhoto from "../../Employee/Dashboard/BackgroundPhoto";
import Portfolio from "./Portfolio";
import _ from "lodash";
import moment from "moment";
import CallToAction from "@components/CallToAction";
// set styles - material-ui
const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "95vh",
  },
  header: {
    background: "white",
    paddingBottom: "1rem",
    marginBottom: "1rem",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
  },
  dialog: {
    maxHeight: "90vh",
    marginTop: "5rem",
    overflowY: "auto",
  },
  profilePhoto: {
    width: 100,
    textAlign: "center",
    marginLeft: "3rem",
    marginTop: -100,
    padding: 0,
    cursor: "pointer",
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      display: "block",
      margin: "auto",
      // marginLeft: "0rem",
      marginTop: -100,
    },
  },
  callToAction: {},
  profileContainer: {
    [theme.breakpoints.down("sm")]: {
      marginTop: "-7rem",
    },
  },
  bgContainer: {
    maxHeight: 300,
  },
  underPhotoContainer: {
    marginTop: "0.8rem",
  },
  professionContainer: {
    [theme.breakpoints.down("xs")]: {
      marginTop: "2rem",
    },
  },
  professionDetailsContainer: {
    [theme.breakpoints.down("xs")]: {
      marginTop: "2rem",
    },
  },
  button: {
    color: theme.palette.common.blue,
    borderColor: theme.palette.common.blue,
    textAlign: "center",
    margin: "auto",
  },
  nameText: {
    ...theme.typography.h6,
    color: theme.palette.common.darkBlue,
    marginTop: "1.5rem",
    marginBottom: "0.8rem",
  },
  noInfotext: {
    color: theme.palette.common.blue,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: 600,
  },
  basicTitle: {
    fontSize: 20,
    fontWeight: 900,
    [theme.breakpoints.down("xs")]: {
      fontSize: 16,
    },
  },
  basicInfo: {
    maxWidth: "600px",
    marginTop: -60,
    marginLeft: 220,
    marginBottom: "2rem",
    [theme.breakpoints.down("xs")]: {
      marginTop: 0,
      marginLeft: "0rem",
      textAlign: "center",
    },
  },
  content: {
    maxWidth: 700,
    paddingLeft: "1rem",
    paddingRight: "1rem",
    paddingBottom: "0rem",
    margin: "auto",
    [theme.breakpoints.down("xs")]: {
      paddingTop: "0rem",
    },
  },
  alert: {
    marginBottom: "1rem",
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: "white",
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
    textAlign: "center",
    padding: "1rem",
  },
  name: {
    marginLeft: "1rem",
    width: "100%",
    color: "RGB(23,41, 64)",
    fontSize: "2rem",
    fontWeight: 600,
  },
  details: {
    fontSize: "1.5rem",
    marginLeft: "1rem",
  },
  section: {
    color: "RGB(23,41, 64)",
    marginBottom: 10,
    paddingBottom: 0,
    borderRadius: "0px",
  },
  moreSkills: {
    fontSize: "16px",
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
  summary: {
    border: "1px solid gray",
    padding: "10px",
    maxHeight: "250px",
    overflowY: "auto",
    marginBottom: 40,
  },
  subTitle: {
    fontWeight: 600,
    fontSize: "26px",
    padding: "10px 15px",
  },
  description: {
    wordWrap: "break-word",
    marginBottom: 40,
    maxHeight: "250px",
    overflowY: "auto",
    marginTop: 10,
  },
}));

const DashboardCandidate = ({
  actions,
  askInterestStatus,
  isLimited,
  match,
  employeeData,
}) => {
  const {
    basic,
    experience,
    portfolio,
    preference,
    skill,
    purchased,
  } = employeeData;
  const classes = useStyles();
  const history = useHistory();
  const { slug } = match.params;
  const user = JSON.parse(getUser());
  const [modal, setModal] = useState(false);
  const currentFilterID = getFilterID();
  /* eslint-disable react/jsx-one-expression-per-line */

  useEffect(() => {
    const data = {
      employeeID: slug,
      id: user._id,
    };
    actions.getSearchEmployee(data);
  }, []);

  useEffect(() => {
    if (askInterestStatus === "SUCCESS") {
      successMessage("Message is sent successfully!");
    } else if (askInterestStatus === "FAILURE") {
      errorMessage("Sending message is failed!");
    }
    actions.askInterestStatusHidden();
  }, [askInterestStatus]);

  // ask about interested request
  const onAskInterest = () => {
    const data = {
      employeeID: slug,
      id: user._id,
      filterID: currentFilterID,
    };
    actions.askInterestRequest(data);
  };

  const purchaseProfile = () => {
    const data = {
      id: user._id,
      employeeID: slug,
    };
    actions.purchaseRequest(data);
  };

  if (isLimited) {
    history.push(`/payment/${slug}`);
  }

  console.log(employeeData);

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
              {purchased && basic
                ? employeeData.basic.firstName +
                  " " +
                  employeeData.basic.lastName
                : basic && `ID - #${basic.employeezNowId}`}
            </Grid>
            {purchased && basic && (
              <>
                <Grid className={classes.details}>Email: {basic.email}</Grid>
                <Grid className={classes.details}>Phone: {basic.cell}</Grid>
              </>
            )}
          </Grid>
        </Grid>

        <Grid className={classes.section}>
          <Card className={classes.section}>
            <Grid item container className={classes.callToAction}>
              <Grid item xs={12}>
                <CallToAction
                  onAskInterest={onAskInterest}
                  purchased={purchased}
                  purchaseProfile={purchaseProfile}
                  incart={employeeData.inCart}
                  id={slug}
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>

        <Grid className={classes.section}>
          <Card className={classes.section}>
            <Grid>
              <Typography className={classes.subTitle}>
                Personal Preferences
              </Typography>
            </Grid>
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
            <Grid>
              <Typography className={classes.subTitle}>Experience</Typography>
            </Grid>
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
            <Grid>
              <Typography className={classes.subTitle}>Work History</Typography>
            </Grid>
            <CardContent>
              <Grid item container xs={12}>
                <Grid item xs={12} md={6}>
                  <Typography className={classes.jobtitle}>
                    {experience && experience.primaryJob.title}
                  </Typography>
                  {experience && experience.primaryJob && (
                    <>
                      <Typography className={classes.company}>
                        {experience.primaryJob.company}
                      </Typography>
                      <Typography className={classes.jobPeriod}>
                        {experience.primaryJob.startDate &&
                          moment(
                            new Date(experience.primaryJob.startDate)
                          ).format("MM/YYYY")}

                        {experience.primaryJob.current
                          ? "Present"
                          : experience.primaryJob.endDate && (
                              <span>
                                &nbsp;~ &nbsp;
                                {moment(
                                  new Date(experience.primaryJob.endDate)
                                ).format("MM/YYYY")}
                              </span>
                            )}
                      </Typography>
                    </>
                  )}
                </Grid>
                {experience && experience.secondaryJob.title && (
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
                          {experience.secondaryJob.startDate &&
                            moment(
                              new Date(experience.secondaryJob.startDate)
                            ).format("MM/YYYY")}

                          {experience.secondaryJob.endDate && (
                            <span>
                              &nbsp;~ &nbsp;
                              {moment(
                                new Date(experience.secondaryJob.endDate)
                              ).format("MM/YYYY")}
                            </span>
                          )}
                        </Typography>
                      </Fragment>
                    )}
                  </Grid>
                )}
                {experience &&
                  experience.otherJob.map(
                    (job, i) =>
                      job.title && (
                        <Grid item xs={12} md={6} key={i}>
                          <Typography className={classes.jobtitle}>
                            {job.title}
                          </Typography>
                          <Fragment>
                            <Typography className={classes.company}>
                              {job.company}
                            </Typography>
                            <Typography className={classes.jobPeriod}>
                              {job.startDate &&
                                moment(new Date(job.startDate)).format(
                                  "MM/YYYY"
                                )}
                              {job.endDate && (
                                <span>
                                  &nbsp;~ &nbsp;
                                  {moment(new Date(job.endDate)).format(
                                    "MM/YYYY"
                                  )}
                                </span>
                              )}
                            </Typography>
                          </Fragment>
                        </Grid>
                      )
                  )}
              </Grid>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <Button
                  className={classes.button}
                  onClick={(e) => setModal(true)}
                >
                  Show Details
                </Button>
              </Grid>
              {/* {employeeData.experience && employeeData.experience.employee} */}
            </CardContent>
          </Card>
        </Grid>

        <Grid className={classes.section}>
          <Portfolio portfolios={portfolio && portfolio.portfolios} />
        </Grid>
        <Grid className={classes.deploma}>
          <Typography className={classes.center}>
            To upload any documents (diplomas, letter of recommentation, etc)
            please email to: Register@EmployeezNow.com
          </Typography>
        </Grid>
        <Dialog
          open={modal}
          onClose={(e) => setModal(false)}
          aria-labelledby="dialog-title"
          fullWidth
          maxWidth="lg"
          className={classes.dialog}
        >
          <DialogTitle>
            <Typography className={classes.modalTitle}>Work History</Typography>
          </DialogTitle>
          <DialogContent>
            <Grid container item xs={12}>
              <Grid item xs={12}>
                <Typography className={classes.jobtitle}>Summary</Typography>
                <Typography id="cartList" className={classes.summary}>
                  {experience && experience.summary}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.jobtitle}>
                  {experience && experience.primaryJob.title}
                </Typography>
                {experience && experience.primaryJob && (
                  <Fragment>
                    <Typography className={classes.company}>
                      {experience.primaryJob.company}
                    </Typography>
                    <Typography>
                      {experience.primaryJob.startDate &&
                        moment(
                          new Date(experience.primaryJob.startDate)
                        ).format("MM/YYYY")}

                      {experience.primaryJob.current ? (
                        <span>&nbsp;~ &nbsp;Present</span>
                      ) : (
                        experience.primaryJob.endDate && (
                          <span>
                            &nbsp;~ &nbsp;
                            {moment(
                              new Date(experience.primaryJob.endDate)
                            ).format("MM/YYYY")}
                          </span>
                        )
                      )}
                    </Typography>
                    <Typography className={classes.description}>
                      {experience.primaryJob.description}
                    </Typography>
                  </Fragment>
                )}
              </Grid>

              <Grid item xs={12}>
                {experience && experience.secondaryJob.title && (
                  <Fragment>
                    <Typography className={classes.jobtitle}>
                      {experience && experience.secondaryJob.title}
                    </Typography>
                    {experience && experience.secondaryJob && (
                      <Fragment>
                        <Typography className={classes.company}>
                          {experience.secondaryJob.company}
                        </Typography>
                        <Typography>
                          {experience.secondaryJob.startDate &&
                            moment(
                              new Date(experience.secondaryJob.startDate)
                            ).format("MM/YYYY")}
                          {experience.secondaryJob.endDate && (
                            <span>
                              &nbsp;~ &nbsp;
                              {moment(
                                new Date(experience.secondaryJob.endDate)
                              ).format("MM/YYYY")}
                            </span>
                          )}
                        </Typography>
                        <Typography className={classes.description}>
                          {experience.secondaryJob.description}
                        </Typography>
                      </Fragment>
                    )}
                  </Fragment>
                )}
              </Grid>

              <Grid item xs={12}>
                {experience &&
                  experience.otherJob.map(
                    (job, i) =>
                      job.title && (
                        <Grid item xs={12} key={i}>
                          <Typography className={classes.jobtitle}>
                            {job.title}
                          </Typography>
                          <Fragment>
                            <Typography className={classes.company}>
                              {job.company}
                            </Typography>
                            <Typography>
                              {job.startDate &&
                                moment(new Date(job.startDate)).format(
                                  "MM/YYYY"
                                )}
                              {job.endDate && (
                                <span>
                                  &nbsp;~ &nbsp;
                                  {moment(new Date(job.endDate)).format(
                                    "MM/YYYY"
                                  )}
                                </span>
                              )}
                            </Typography>
                            <Typography className={classes.description}>
                              {job.description}
                            </Typography>
                          </Fragment>
                        </Grid>
                      )
                  )}
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </Container>
    </Fragment>
  ) : (
    <Fragment></Fragment>
  );
};

const mapStateToProps = ({
  employer: { askInterestStatus, employeeData, isLimited },
}) => ({
  employeeData,
  askInterestStatus,
  isLimited,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      ...employerActions,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardCandidate);
