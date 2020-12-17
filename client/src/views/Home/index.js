import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import ProfileDescription from "./ProfileDescription";
import Hospitality from "./Hospitality";
import VeteranSection from "./VeteranSection";
import MainButton from "@components/Element/Button/MainButton";
import InsertDriveFileOutlinedIcon from "@material-ui/icons/InsertDriveFileOutlined";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";
import MovieFilterOutlinedIcon from "@material-ui/icons/MovieFilterOutlined";
import DirectionsCarOutlinedIcon from "@material-ui/icons/DirectionsCarOutlined";
import FormatListBulletedOutlinedIcon from "@material-ui/icons/FormatListBulletedOutlined";
import AutorenewOutlinedIcon from "@material-ui/icons/AutorenewOutlined";
import { getUser, getRole } from "@helpers/auth-helpers";
import ExampleProfile from "./ExampleProfile";
import HowisWorks from "./HowisWorks";

const useStyles = makeStyles((theme) => ({
  contestContainer: {
    background: "#FAFAFA",
    textAlign: "center",
    width: "100%",
  },
  mainContainer: {
    width: "auto",
    maxWidth: "1024",
    [theme.breakpoints.down("md")]: {},
  },
  textLgContainer: {
    marginTop: "4rem",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  howisworks: {
    margin: "6rem 0 5rem 0",
    textAlign: "left",
  },
  sectionIcon: {
    width: "42px",
    height: "42px",
    color: theme.palette.common.lightBlack,
  },
  heading1: {
    color: theme.palette.primary.main,
    fontWeight: 400,
    fontSize: "2.5rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.5rem",
      letterSpacing: "0.08rem",
    },
  },
  heading2: {
    marginTop: "1.5rem",
    marginBottom: "4rem",
    fontFamily: "Nunito Sans",
    fontSize: "24px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
      letterSpacing: "0.05rem",
    },
  },
  headingBatang: {
    textAlign: "center",
    fontSize: "30px",
    fontWeight: 550,
  },
  heading3: {
    fontWeight: 600,
    fontSize: "30px",
    textAlign: "center",
    marginTop: "2rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.8rem",
    },
  },
  bottom: {
    marginBottom: "8rem",
  },
  text: {
    fontWeight: 500,
    textAlign: "center",
    fontSize: "16px",
  },
  HomeWrapper: {
    background: "white",
    marginTop: "-3rem",
    marginBottom: "-3rem",
  },
  paper1: {
    padding: "10px",
    marginTop: "1.5rem",
    borderRadius: "10px",
    fontWeight: 800,
    fontSize: "16px",
  },
  center: {
    textAlign: "center",
  },
  getStartedSection: {
    textAlign: "center",
  },
  font14: {
    fontSize: "14px",
    textAlign: "center",
  },
  font16: {
    fontSize: "16px",
  },
  font24: {
    fontSize: "24px",
  },
  getStartedButton: {
    marginTop: "5rem",
  },
  col_center: {
    display: "flex",
    alignItems: "center",
  },
  p1: {
    padding: "1rem",
  },
  p3: {
    padding: "2rem",
  },
  profileSection: {
    background: "#FAFAFA",
    padding: "3rem 0 3rem 0",
  },
  spacing: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  const user = JSON.parse(getUser());
  const role = getRole();
  window.scrollTo(0, 0);
  return (
    <Box className={classes.HomeWrapper}>
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
                      A HOSPITALITY EMPLOYMENT NETWORK
                    </Typography>
                    <Typography variant="h2" className={classes.heading2}>
                      Where your job does the work of finding you!
                    </Typography>
                    <Typography className="aboutme">
                      <i>
                        <span className={classes.spacing}>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Thank you for visiting EmployeezNow, the first
                        employment network designed specifically for
                        Hospitality. Our industry is obviously suffering from
                        its most challenging time in history. This happens to be
                        the perfect time to rollout our new platform. I know
                        EmployeezNow can help you, because I have stood in your
                        shoes! Over the last 33 years I’ve worked almost every
                        position in the biz: dishwasher to fine dining server,
                        assistant manager to GM and even owner. Please take a
                        moment to see how it works, and you will see just how
                        amazing EmployeezNow can be for you.
                      </i>
                    </Typography>
                    <Typography className="aboutme name">
                      <i>
                        -Scott Gardiner &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <br />
                        Founder
                      </i>
                    </Typography>
                    <Box className={classes.howisworks}>
                      <HowisWorks />
                    </Box>
                    <Box className={classes.getStartedButton}>
                      <MainButton
                        background="green"
                        pd={30}
                        fontSize={20}
                        label={user ? "Go To Dashboard" : "Get Started"}
                        to={user ? `${role}s/${user.slug}` : "/signup"}
                        width="250px"
                        hoverBack="#007000"
                        border="green"
                        color="white"
                        hoverColor="white"
                      ></MainButton>
                    </Box>
                    <Typography className={classes.heading3}>
                      FREE to Register
                    </Typography>
                  </Grid>
                  {/* nested column 1/2 button */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container style={{ marginTop: "100px" }}>
          <Grid item xs={12} md={12}>
            <Grid>
              <Typography variant="h4" className={classes.headingBatang}>
                HOSPITALITY EMPLOYEES
              </Typography>
              <Paper elevation={0} className={classes.paper1}>
                <Typography className={classes.text}>
                  You've never had a profile like this.
                  <br />
                  Register your FREE employment profile and when you want, we
                  will show it to dozens of employers that are hiring in your
                  area.
                </Typography>
                <Typography className={`${classes.text} ${classes.p1}`}>
                  YOUR PROFILE CAN BE SO MUCH MORE THAN JUST A RESUME
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4} className={classes.p3}>
            <Typography className={classes.center}>
              <InsertDriveFileOutlinedIcon className={classes.sectionIcon} />
            </Typography>
            <Typography className={classes.font14}>
              Upload <b>"At-Work" videos</b> showing off your skills
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} className={classes.p3}>
            <Typography className={classes.center}>
              <MovieFilterOutlinedIcon className={classes.sectionIcon} />
            </Typography>
            <Typography className={classes.font14}>
              Create a <b>Self-Interview</b> to explain who you are
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} className={classes.p3}>
            <Typography className={classes.center}>
              <DirectionsCarOutlinedIcon className={classes.sectionIcon} />
            </Typography>
            <Typography className={classes.font14}>
              Select the miles you're willing to travel from home to work
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} className={classes.p3}>
            <Typography className={classes.center}>
              <MonetizationOnOutlinedIcon className={classes.sectionIcon} />
            </Typography>
            <Typography className={classes.font14}>
              Include your salary expectations
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} className={classes.p3}>
            <Typography className={classes.center}>
              <FormatListBulletedOutlinedIcon className={classes.sectionIcon} />
            </Typography>
            <Typography className={classes.font14}>
              List yourself eligible for multiple job titles
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} className={classes.p3}>
            <Typography className={classes.center}>
              <AutorenewOutlinedIcon className={classes.sectionIcon} />
            </Typography>
            <Typography className={classes.font14}>
              Our automation will help you keep it up to date
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={3} style={{ marginTop: "3rem" }}>
          <Grid item xs={12} className={classes.center}>
            <Typography className={`${classes.font24} ${classes.p1}`}>
              Much, Much More!
            </Typography>
            <Typography className={`${classes.center} ${classes.font16}`}>
              Once you are registered, we will help you keep your profile
              current and always up to date.
            </Typography>
            <Typography className={`${classes.center} ${classes.font16}`}>
              When you are ready, we will bring the job opportunites to you and
              only the ones that fit your needs!
            </Typography>
            <Typography className={`${classes.center} ${classes.font16}`}>
              We're like a personal staffing agency that works for FREE.
            </Typography>
            <Typography
              className={`${classes.center} ${classes.font16} ${classes.bottom}`}
            >
              Until you're ready for something new, just keep building your
              profile to be the best it can be!
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Grid container className={classes.contestContainer}>
        {/* <ContestSection /> */}
      </Grid>
      <Container width="sm" className={classes.mainContainer}>
        <Grid container spacing={3} style={{ marginTop: "50px" }}>
          <ProfileDescription />
        </Grid>
      </Container>
      {!user && (
        <Grid
          container
          className={classes.profileSection}
          style={{ marginTop: "100px" }}
        >
          <Container width="sm">
            <Grid container item xs={12}>
              <Grid item xs={12} md={6} className={classes.col_center}>
                <Typography
                  className={`${classes.font24}`}
                  style={{ margin: "auto" }}
                >
                  REGISTER YOUR EMPLOYEE PROFILE
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <MainButton
                  background="green"
                  hoverBack="#007000"
                  pd={50}
                  fontSize={24}
                  label="SIGN UP NOW"
                  to="/signup"
                  width="280px"
                  border="green"
                  hoverColor="white"
                  color="white"
                ></MainButton>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      )}
      <Container width="sm" className={classes.mainContainer}>
        <ExampleProfile />
      </Container>
      <Container
        width="sm"
        className={classes.mainContainer}
        style={{ marginTop: "4rem" }}
      >
        <Hospitality />
      </Container>
      <Grid container item xs={12}>
        <VeteranSection />
      </Grid>
    </Box>
  );
};

export default Home;
