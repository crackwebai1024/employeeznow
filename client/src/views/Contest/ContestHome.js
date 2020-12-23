import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Grid, Container, Typography, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { actions as employeeActions } from "@store/employee";
import { bindActionCreators } from "redux";
import BackupIcon from "@material-ui/icons/Backup";
import VideoUpload from "./VideoUpload";
import { getUser } from "@helpers/auth-helpers";

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: "center",
  },
  arizonaWrapper: {
    width: "100%",
    textAlign: "center",
    background: "#c00000",
    marginTop: "-3rem",
    paddingTop: "1rem",
    paddingBottom: "2rem",
  },
  arizonaContainer: {
    maxWidth: "700px",
    margin: "auto",
  },
  link: {
    // textDecoration: "none",
    color: theme.palette.common.black,
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
  subTitle: {
    fontFamily: "Roboto !important",
    fontWeight: 600,
    lineHeight: "1.4",
    marginTop: "2rem",
    fontSize: "26px",
  },
  content: {
    fontSize: "18px",
    maxWidth: 600,
    margin: "auto",
    fontWeight: 900,
    lineHeight: "1.3",
  },
  content1: {
    fontSize: "24px",
    fontWeight: 900,
  },
  arizona: {
    color: "white",
    fontSize: "60px",
  },
  lineHeight: {
    lineHeight: "1.3 !important",
  },
  font20: {
    color: "white",
    fontSize: "22px",
    fontWeight: 600,
  },
  section1: {
    marginTop: "1rem",
  },
  white: {
    color: "white",
  },
}));

const ContestHome = (props) => {
  const classes = useStyles();
  return (
    <Fragment>
      <Box className={classes.arizonaWrapper}>
        <Grid container item xs={12} className={classes.arizonaContainer}>
          <Grid item xs={12} className={classes.section1}>
            <Typography
              className={`${classes.lineHeight} ${classes.content1} ${classes.white}`}
            >
              CAN YOU MAKE
            </Typography>
            <Typography
              className={`copper_font ${classes.arizona} ${classes.lineHeight}`}
            >
              THE BEST {props.title}
            </Typography>
            <Typography
              className={`${classes.lineHeight} ${classes.content1} ${classes.white}`}
            >
              IN THE PHOENIX AREA?
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.section1}>
            <Typography className={`copper_font ${classes.arizona}`}>
              WINNER GETS $2500
            </Typography>
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={12} sm={6}>
              <Typography className={classes.font20}>
                2<sup style={{ fontWeight: 400 }}>ND</sup> PLAGE - $1500
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography className={classes.font20}>
                3<sup style={{ fontWeight: 400 }}>RD</sup> PLACE - $750
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Container width="sm" className={classes.container}>
        <Grid item xs={12}>
          <Typography className={classes.subTitle}>ENTER YOUR VIDEO</Typography>
          <Typography className={classes.content}>
            Upload a video of you mixing, pouring or talking about your cocktail
            that BEST re presents Arizona! <br />
            (videos can't be longer than 1 minute)
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography className={classes.subTitle}>
            WINNER CHOSEN BY THE PUBLIC
          </Typography>
          <Typography className={classes.content}>
            Anyone can vote by signing up and verifying your cell phone.
            <br />
            The Winner will be the video with the most stars.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography className={classes.subTitle}>
            TELL US KNOW HOW YOU ARE
          </Typography>
          <Typography className={classes.content}>
            To be eligible to win, you must sign up a partial profile:
            <br />
            Complete the
            <span>
              <Link to="#" className={classes.link}>
                &nbsp;Who you are
              </Link>
              &nbsp;
            </span>
            & &nbsp;
            <span>
              <Link to="#" className={classes.link}>
                What you want
              </Link>{" "}
              sections
            </span>
          </Typography>
        </Grid>
      </Container>
    </Fragment>
  );
};

const mapStateToProps = ({ employee: { cockTailVideo } }) => ({
  cockTailVideo,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...employeeActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContestHome);
