import React from "react";
import { Grid, Container, Box, Typography, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import smallLogo from "../../assets/white-logo.svg";
import MainButton from "@components/Element/Button/MainButton";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  white: {
    color: "white",
  },
  flex: {
    display: "flex",
  },
  right: {
    float: "right",
  },
  container: {
    fontFamily: "Calibri",
    maxWidth: "1100px",
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
  font24: {
    fontSize: 30,
  },
  font12: {
    color: "white",
    fontSize: 24,
    // margin: "auto",
    // maxWidth: "700px",
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
    marginTop: "-1rem",
    width: "fit-content",
    textAlign: "center",
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
    [theme.breakpoints.down("xs")]: {
      fontSize: 24,
    },
  },
  yellow: {
    color: "rgb(255, 180,0)",
  },
  red: {
    color: "rgb(130, 4,5)",
  },
  m2: {
    margin: "3rem auto",
    fontWeight: 900,
  },
  font48: {
    fontSize: 48,
  },
  gray: {
    color: "rgb(169, 169, 169)",
  },
  bold: {
    fontWeight: 900,
  },
  toright: {
    clipPath: "polygon(0 0, 96% 0, 100% 50%, 96% 100%, 0 100%)",
    backgroundColor: "yellow",
    width: "100%",
    maxWidth: "400px",
    height: "40px",
    color: "red",
    textAlign: "center",
    fontSize: "25px",
    fontWeight: "800",
    textDecoration: "none",
  },
  toleft: {
    clipPath: "polygon(4% 0, 100% 0%, 100% 100%, 4% 100%, 0% 50%)",
    backgroundColor: "yellow",
    width: "100%",
    maxWidth: "400px",
    height: "40px",
    color: "red",
    textAlign: "center",
    fontSize: "25px",
    fontWeight: "600",
    textDecoration: "none",
    float: "right",
  },
  li: {
    "&::marker": {
      color: "yellow",
    },
  },
  content: {
    paddingLeft: "3px",
    marginBottom: "10px",
    fontStyle: "normal",
    "&::marker": {
      color: "transparent",
    },
  },
  align: {
    textAlign: "left",
    paddingLeft: "20px",
  },
  descriptionRight: {
    paddingLeft: "40px",
    paddingBottom: "20px",
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "20px",
    },
  },
  description: {
    display: "flex",
    paddingLeft: "30px",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  font18: {
    fontSize: "18px",
  },
  descriptionLeft: {
    minWidth: "140px",
    maxWidth: "140px",
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
          <Typography className={`${classes.font12} ${classes.center}`}>
            The first employment network designed specifically for the
            hospitality industry, is not launching in the Phoenix area! So, we
            are having a contest and letting the public vote for the winners.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={`${classes.font12} ${classes.center}`}>
            THERE ARE TWO CHANCES TO
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={`copper_font ${classes.winMark}`}>
            WIN $2500
          </Typography>
        </Grid>

        <Grid container item xs={12} spacing={3}>
          <Grid
            item
            xs={12}
            sm={6}
            className={`copper_font ${classes.center} ${classes.font24} ${classes.red} ${classes.bold}`}
          >
            THE BEST <br />
            <span className={`copper_font ${classes.font48}`}>PLATE</span>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            className={`copper_font ${classes.center} ${classes.font24} ${classes.red} ${classes.bold}`}
          >
            THE BEST <br />
            <span className={`copper_font ${classes.font48}`}>BEVERAGE</span>
          </Grid>
        </Grid>

        <Grid className={`${classes.font12} ${classes.center}`} item xs={12}>
          <Typography
            className={`${classes.font16_un} ${classes.yellow} ${classes.bold}`}
          >
            THAT BEST REPRESENTS ARIZONA
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            className={`${classes.font12} ${classes.center} ${classes.m2}`}
          >
            SECOND PLACE: <span className={classes.yellow}>$1500</span> & THIRD
            PLACE: <span className={classes.yellow}>$750</span> PRIZES <br />
            FOR BOTH CONTESTS
          </Typography>
        </Grid>
        <Grid container item xs={12}>
          <Grid
            item
            xs={12}
            sm={6}
            className={`${classes.center} ${classes.font16}`}
          >
            <Typography className={classes.toright}>
              ANYONE CAN ENTER
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid item xs={12} className={classes.description}>
            <Grid className={classes.descriptionLeft}>
              <Typography className={`${classes.font12} ${classes.yellow}`}>
                TO ENTER:{" "}
              </Typography>{" "}
            </Grid>
            <Grid>
              <Typography
                className={`${classes.font12} ${classes.descriptionRight}`}
              >
                Upload a video of your cooking, plating, pouring or discussing
                your best food item or cocktail that bests represents Arizona.
              </Typography>
              <i className={`${classes.font12}`} style={{ textAlign: "left" }}>
                <ul>
                  <li className={classes.li}>
                    Videos cannot be longer than 1 minute.
                  </li>
                  <li className={classes.li}>
                    Contest page opens on January 8th and closes after January
                    31st.
                  </li>
                  <li className={classes.li}>
                    Voting will continue for a week and end after February 7th.
                  </li>
                  <li className={classes.li}>
                    The vidoes with the most total stars at the end, are the
                    winners.
                  </li>
                  <li className={classes.li}>
                    You must register an EmployeezNow partial profile to be
                    eligible for prizes.
                  </li>
                </ul>
              </i>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.flex}>
          <Hidden xsDown>
            <Grid item xs={6} />
          </Hidden>
          <Grid
            item
            xs={12}
            sm={6}
            className={`${classes.center} ${classes.font16}`}
          >
            <Typography className={classes.toleft}>ANYONE CAN VOTE</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.description}>
          <Grid className={classes.descriptionLeft}>
            <Typography>
              <span className={`${classes.font12} ${classes.yellow}`}>
                TO VOTE:{" "}
              </span>
            </Typography>
          </Grid>
          <Grid className={classes.descriptionRight}>
            <Typography className={`${classes.font12}`}>
              Anyone can register to vote, it takes less than 30 seconds.
            </Typography>
            <Typography style={{ marginBottom: "20px" }}>
              <i className={`${classes.font12}`}>
                Sign up with your name & verify your cell phone.
              </i>
            </Typography>
            <Typography className={`${classes.font12}`}>
              Voters can search for someone's video by last name.
              <br /> Vote 1, 2 or 3 stars (3 being the highest vote).
              <br /> Changes can be made anytime, voting closes 12 am 02/08/21.
            </Typography>
            <Typography style={{ marginTop: "20px" }}>
              <i className={`${classes.font18} ${classes.white}`}>
                Official rules can be requested by emailing
                Questions@EmployeezNow.com
              </i>
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.buttonWrapper}>
            <MainButton
              label="SIGN UP TO VOTE"
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
