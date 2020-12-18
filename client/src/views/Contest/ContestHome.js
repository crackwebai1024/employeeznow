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
    paddingBottom: "3rem",
  },
  arizonaContainer: {
    maxWidth: "1100px",
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
    fontWeight: 600,
    lineHeight: "1",
  },
  arizona: {
    color: "white",
    fontSize: "42px",
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
    fontWeight: 500,
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
              className={`${classes.lineHeight} ${classes.content} ${classes.white}`}
            >
              CAN YOU MAKE
            </Typography>
            <Typography
              className={`copper_font ${classes.arizona} ${classes.lineHeight}`}
            >
              THE BEST {props.title}
            </Typography>
            <Typography
              className={`${classes.lineHeight} ${classes.content} ${classes.white}`}
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
                SECOND PLAGE: $1500
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography className={classes.font20}>
                THIRD PLACE: $750
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Container width="sm" className={classes.container}>
        <Grid item xs={12}>
          <Typography className={classes.subTitle}>
            LET US KNOW HOW YOU ARE
          </Typography>
          <Typography className={classes.content}>
            To be eligible to win,
            <br />
            you must complete your profile's&nbsp;
            <span>
              <Link to="#" className={classes.link}>
                Personal/Preferences
              </Link>
              &nbsp;
            </span>
            & &nbsp;
            <span>
              <Link to="#" className={classes.link}>
                Experiences
              </Link>{" "}
              sections
            </span>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.subTitle}>ENTER YOUR VIDEO</Typography>
          <Typography className={classes.content}>
            Upload a video of you making/pouring your cocktail (no longer than 1
            minute)
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.subTitle}>THEME</Typography>
          <Typography className={classes.content}>
            The cocktail that best represents Arizona
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.subTitle}>
            WINNER CHOSEN BY THE PUBLIC
          </Typography>
          <Typography className={classes.content}>
            Anyone can vote, just enter through ‘employee’ sign up and verify
            your cell phone
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.subTitle}>
            THE MOST STARS WINS
          </Typography>
          <Typography className={classes.content}>
            Voters select 1,2 or 3 stars for the videos the choose to vote on
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
