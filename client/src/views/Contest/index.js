import React from "react";
import { Grid, Container, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import smallLogo from "../../assets/white-logo.svg";
import MainButton from "@components/Element/Button/MainButton";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    fontFamily: "Calibri",
    maxWidth: "900px",
    margin: "auto",
    paddingTop: "3rem",
    paddingBottom: "3rem",
  },
  wrapper: {
    backgroundColor: "rgb(0, 28, 80)",
    marginTop: "-3rem",
    minHeight: "90vh",
    marginBottom: "-3rem",
  },
  font16_un: {
    fontSize: 30,
    fontWeight: 550,
    [theme.breakpoints.down("xs")]: {
      fontSize: 24,
    },
  },
  font12: {
    color: "white",
    fontSize: 24,
    margin: "auto",
    textAlign: "center",
    maxWidth: "700px",
    fontWeight: 550,
    [theme.breakpoints.down("xs")]: {
      fontSize: 18,
    },
  },
  center: {
    margin: "auto",
    textAlign: "center",
  },
  image: {
    maxWidth: "322px",
    width: "100%",
  },
  m4: {
    marginBottom: "4rem",
  },
  winMark: {
    color: "rgb(255,180,0)",
    fontSize: 120,
    margin: "auto",
    width: "fit-content",
    fontFamily: "Copper Black",
    [theme.breakpoints.down("sm")]: {
      fontSize: 80,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 50,
    },
  },
  buttonWrapper: {
    padding: "2rem 0",
  },
  font16: {
    fontSize: 30,
    margin: "20px 0px",
    fontWeight: 600,
    color: "white",
    textDecoration: "underline white",
    [theme.breakpoints.down("xs")]: {
      fontSize: 24,
    },
  },
  yellow: {
    color: "rgb(255, 180,0)",
  },
  red: {
    color: "rgb(157, 4,5)",
  },
  m2: {
    margin: "3rem 0px",
    fontWeight: 600,
  },
  font24: {
    fontSize: 40,
  },
  gray: {
    color: "rgb(169, 169, 169)",
  },
}));

const Contest = () => {
  const classes = useStyles();
  const history = useHistory();
  window.scrollTo(0, 0);

  return (
    <Box className={classes.wrapper}>
      <Container contaier className={classes.container} item xs={12}>
        <Grid item xs={12} className={classes.center}>
          <img src={smallLogo} alt="img" className={classes.image} />
        </Grid>
        <Grid item xs={12} className={classes.m4}>
          <Typography className={`${classes.font12}`}>
            is a hospitality network whose mission is to bring employers
            together with the best matching industry workers. As we rollout in
            the Phoenix area, we want to start by finding the best!
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={`${classes.font12}`}>
            THERE ARE TWO CHANCES TO
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.winMark}>WIN $2500</Typography>
        </Grid>
        <Grid container item xs={12}>
          <Grid
            item
            xs={6}
            className={`${classes.center} ${classes.font12} ${classes.red}`}
          >
            THE BEST <br />
            <span className={classes.font24}>PLATE</span>
          </Grid>
          <Grid
            item
            xs={6}
            className={`${classes.center} ${classes.font12} ${classes.red}`}
          >
            THE BEST <br />
            <span className={classes.font24}>BEVERACE</span>
          </Grid>
        </Grid>
        <Grid className={classes.font12} item xs={12}>
          <Typography className={`${classes.font16_un} ${classes.yellow}`}>
            THAT MOST REPRESENTS ARIZONA
          </Typography>
        </Grid>
        <Grid container item xs={12}>
          <Grid
            item
            xs={12}
            sm={6}
            className={`${classes.center} ${classes.font16}`}
          >
            <i>ANYONE CAN ENTER</i>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            className={`${classes.center} ${classes.font16}`}
          >
            <i>ANYONE CAN VOTE</i>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            <span className={`${classes.font12} ${classes.yellow}`}>
              TO ENTER:{" "}
            </span>{" "}
            <i className={`${classes.font12} ${classes.gray}`}>
              make a video of you cooking, plating, pouring or discussing your
              best food item or beverage that bests represents Arizona. Sign up
              an EmployeezNow partial profile, letting us know more about you.
              Upload your video to the food or drink contest page starting Jan
              1st. Vote yourself and have your friends find your video by your
              last name. The video with the most stars after January 31st WINS!
            </i>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            className={`${classes.font12} ${classes.center} ${classes.m2}`}
          >
            SECOND PLACE: $1500 & THIRD PLACE: $750 PRIZES <br />
            FOR BOTH CONTESTS
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            <span className={`${classes.font12} ${classes.yellow}`}>
              TO VOTE:{" "}
            </span>
            <i className={`${classes.font12} ${classes.gray}`}>
              Anyone can vote for videos on either contest and registering takes
              less than 30 seconds. Enter your name and verify your cell phone
              through our Employee Sign Up. Verification is required to reduce
              abuse of over-voting. Voters can view randomly or search for
              someone’s video by last name. Vote 1, 2 or 3 stars (3 being the
              highest vote) for any video. Changes can be made anytime, voting
              closes 12am 02/01/21
            </i>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.buttonWrapper}>
            <MainButton
              label="SIGN TO VOTE"
              background="#70ad47"
              border="#70ad47"
              pd={20}
              width="280px"
              hoverColor="white"
              hoverBack="##70ad47"
              color="white"
              fontSize={24}
              onClick={(e) => history.push("/signup/voter")}
            ></MainButton>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contest;
