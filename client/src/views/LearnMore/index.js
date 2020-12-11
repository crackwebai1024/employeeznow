import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Grid, Typography, Box } from "@material-ui/core";
import logo from "@assets/logo.svg";
import RegisterSection from "../Home/RegisterSection";
import SelfInterviewSection from "../Home/SelfInterviewSection";
import { getUser } from "@helpers/auth-helpers";

const listData = [
  {
    img: "desktop",
    title: "EMPLOYEE REGISTRATION",
    description:
      "It is free for anyone to sign up and create their employee profile. It is not just about up loading a resume, personal preferences are  included to complete your overall profile.",
  },
  {
    img: "binoculars",
    title: "EMPLOYER SEARCH",
    description:
      "It is free for any employer to search the <b>EmployeezNow</b> database. Simply upload specific details required for the open position, such as zip-code, job titles, years of experience and keywords.",
  },
  {
    img: "memo",
    title: "THE RESULTS",
    description:
      "EmployeezNow will instantly provide employers a list of candidates that best match the details of the search. The results will yield partial profiles only.",
  },
  {
    img: "profile",
    title: "PARTIAL PROFILES",
    description:
      "All information such as work history and personal preferences are free to be viewed by the employer. The only thing missing is any relevant contact information.",
  },
];

const listData1 = [
  {
    img: "question",
    title: "INTEREST REQUEST",
    description:
      "Employers can send a request through EmployeezNow to inquire if the candidate would be interested in their specific job opportunity",
  },
  {
    img: "podium",
    title: "COMPLETE PROFILE",
    description:
      "Profiles that contain all of the candidate's contact information can be purchased by the employer to continue with the hiring process.",
  },
  {
    img: "finger",
    title: "ONE TIME FEE",
    description:
      "Complete profiles are just $8.99 and that employer will have access to their purchased profiles indefinitely.",
  },
  {
    img: "calendar",
    title: "AUTOMATION",
    description:
      "<b>EmployeezNow</b> will keep all profiles current so employers know the information is accurate. Because <b>EmployeezNow</b> does the work for you the candidates, registering once until you are ready to retire!",
  },
];

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    width: "auto",
    [theme.breakpoints.down("md")]: {},
  },
  title: {
    fontSize: "30px",
    fontWeight: 600,
    textAlign: "center",
    color: theme.palette.common.black,
  },
  contestContainer: {
    background: "#FAFAFA",
    // textAlign: 'center',
    width: "100%",
  },
  veteranSectionTitle: {
    fontSize: "30px",
    fontWeight: 400,
    [theme.breakpoints.down("sm")]: {
      fontSize: "46px",
    },
  },
  veteranSectionSubTitle: {
    fontSize: "30px",
    fontWeight: 400,
    color: theme.palette.common.green,
    [theme.breakpoints.down("sm")]: {
      fontSize: "30px",
    },
  },
  partImg: {
    maxHeight: "50px",
  },
  veteranImg: {
    maxWidth: "500px",
  },
  logo: {
    width: "100%",
  },
  veteranSectionBottom: {
    fontSize: "16px",
  },
  col_center: {
    display: "flex",
    alignItems: "center",
  },
  description: {
    textAlign: "center",
    fontSize: "14px",
    marginTop: "2rem",
  },
  iconTitle: {
    fontSize: "16px",
    textAlign: "center",
    fontWeight: 200,
  },
  center: {
    margin: "auto",
  },
  bigTitle: {
    fontSize: "30px",
    fontWeight: 200,
    textAlign: "center",
    marginBottom: "30px",
  },
  Wrapper: {
    background: "white",
    marginTop: "-3rem",
    marginBottom: "-3rem",
  },
}));

const LearnMore = () => {
  const classes = useStyles();
  const user = JSON.parse(getUser());

  return (
    <Box className={classes.Wrapper}>
      <Container width="sm" className={classes.mainContainer}>
        <Grid
          container
          ustify="center"
          spacing={0}
          style={{ paddingTop: "100px" }}
        >
          <Grid item xs={12} md={12} className={classes.title}>
            WHY SPEND A FEW DAYS WHEN YOU CAN GET <br />
            EMPLOYEEZNOW IN JUST A FEW MINUTES!
          </Grid>
        </Grid>

        <Grid
          container
          ustify="center"
          spacing={5}
          style={{ marginTop: "100px" }}
        >
          <Grid item xs={12} md={12}>
            <Typography className={classes.bigTitle}>
              The process is quick and easy
            </Typography>
          </Grid>
          {listData.map((list, i) => {
            return (
              <Grid
                key={i}
                item
                xs={12}
                sm={6}
                md={3}
                style={{ textAlign: "center" }}
              >
                <img
                  className={classes.partImg}
                  src={`${process.env.PUBLIC_URL}/img/test/${list.img}.svg`}
                  alt="chef"
                  style={{
                    width: "90%",
                  }}
                />
                <Typography className={classes.iconTitle}>
                  {list.title}
                </Typography>
                <Typography className={classes.description}>
                  <span
                    dangerouslySetInnerHTML={{ __html: list.description }}
                  ></span>
                </Typography>
              </Grid>
            );
          })}
        </Grid>

        <Grid
          container
          ustify="center"
          spacing={5}
          style={{ marginTop: "100px", marginBottom: "100px" }}
        >
          <Grid item xs={12} md={12} style={{ textAlign: "center" }}>
            <Typography className={classes.bigTitle}>
              Profiles are reviewed and decisions are made
            </Typography>
          </Grid>
          {listData1.map((list, i) => {
            return (
              <Grid
                key={i}
                item
                xs={12}
                sm={6}
                md={3}
                style={{ textAlign: "center" }}
              >
                <img
                  className={classes.partImg}
                  src={`${process.env.PUBLIC_URL}/img/test/${list.img}.svg`}
                  alt="chef"
                  style={{
                    width: "90%",
                  }}
                />
                <Typography className={classes.iconTitle}>
                  {list.title}
                </Typography>
                <Typography className={classes.description}>
                  <span
                    dangerouslySetInnerHTML={{ __html: list.description }}
                  ></span>
                </Typography>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      <Grid container className={classes.contestContainer}>
        <SelfInterviewSection />
      </Grid>

      <Container width="sm" className={classes.mainContainer}>
        <Grid
          container
          ustify="center"
          spacing={5}
          style={{ marginTop: "100px", textAlign: "center" }}
        >
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
              src={`${process.env.PUBLIC_URL}/img/test/veteran.jpg`}
              alt="chef"
              style={{
                width: "90%",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.veteranSectionBottom}>
              All registered U.S Millitary Veteran's profiles will be FREE to
              purchased
              <b> EmployeezNow</b> is the ony site that can offer a completely
              FREE process to hire a Veteran. Some sites claim the same, but
              they charge employers to post jobs or to view resumes.
            </Typography>
            <Typography className={classes.veteranSectionBottom}>
              <b>EmployeezNow</b> wants to thank veterans for their service, as
              we know none of this would be possible without them!
            </Typography>
          </Grid>
        </Grid>
        {!user && (
          <Grid
            container
            ustify="center"
            spacing={0}
            style={{ marginTop: "100px" }}
          >
            <RegisterSection />
          </Grid>
        )}
        <Grid
          container
          ustify="center"
          spacing={0}
          style={{ marginTop: "100px", paddingBottom: "6rem" }}
        >
          <Grid item xs={12}>
            <Typography className={classes.title}>
              THE FIRST AUTOMATED SEARCH ENGINE FOR
              <br />
              EMPLOYEES OF HOSPITALITY
            </Typography>
          </Grid>
          <Grid item xs={12} md={5} style={{ marginTop: "2rem" }}>
            <div style={{ width: "400px", margin: "auto", padding: "1rem" }}>
              <div style={{ padding: "100% 0 0 0", position: "relative" }}>
                <iframe
                  src="https://player.vimeo.com/video/455932248?title=0&byline=0&portrait=0"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  frameborder="0"
                  title="iframe"
                  allow="autoplay; fullscreen"
                  allowfullscreen
                ></iframe>
              </div>
              <script src="https://player.vimeo.com/api/player.js"></script>
            </div>
          </Grid>
          <Grid item xs={12} md={7} className={classes.col_center}>
            <Box className={classes.center}>
              <Typography style={{ textAlign: "center" }}>
                <img
                  className={classes.veteranImg}
                  src={logo}
                  alt="logo"
                  style={{
                    width: "70%",
                  }}
                ></img>
              </Typography>
              <Typography style={{ margin: "auto", maxWidth: "500px" }}>
                Serving out Employer & Employee Clients Nationwide!
                <ul>
                  <li>THE FASTEST WAY TO EMPLOYEE SEARCH</li>
                  <li>
                    WHY SPEND A FEW DAYS WHEN YOU CAN GET <b>EMPLOYEEZNOW</b> IN
                    JUST A FEW MINUTES?
                  </li>
                  <li>LET YOUR JOB DO THE WORK OF FINDING YOU</li>
                  <li>
                    NEVER POST ANOTHER JOB BUT STILL GET THE BEST CANDIDATES
                  </li>
                  <li>EMPLOYEES WILL REGISTER MORE THAN JUST A RESUME!</li>
                </ul>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LearnMore;
