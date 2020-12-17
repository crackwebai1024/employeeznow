import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: "1200px",
    fontSize: "16px",
  },
  title: {
    textAlign: "center",
    marginBottom: "1rem",
    fontSize: "24px",
    fontWeight: 600,
  },
  orderList: {
    paddingLeft: "100px",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "30px",
    },
  },
  list: {
    paddingLeft: "20px",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "15px",
    },
  },
  listDeatail: {
    paddingLeft: "7.5rem",
    marginBottom: "2rem",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "3rem",
    },
  },
  spacing: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const HowisWorks = () => {
  const classes = useStyles();

  return (
    <Grid container item xs={12} className={classes.container}>
      <Grid item xs={12}>
        <Typography className={classes.title}>HOW IT WORKS:</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography className={classes.subtitle}>
          <b>EMPLOYERS</b> NEEDING TO HIRE:
        </Typography>
        <ol className={classes.orderList}>
          <li className={classes.list}>
            Sign up your name and verify your cell to create your application
            profile
          </li>
          <li className={classes.list}>
            Tell us about who you are, by answering some multiple-choice
            questions
          </li>
          <li className={classes.list}>
            We'll add you resume and start showing your profile to employers in
            your area
          </li>
          <li className={classes.list}>
            We'll keep tryig to show your profile to more employers and won't
            stop until you find a job
          </li>
        </ol>
        <Typography className={classes.listDeatail}>
          EmployeezNow is <b>FREE</b> for all hospitality workers to use!
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography className={classes.subtitle}>
          <b>WORKERS</b> IN NEED OF EMPLOYMENT:
        </Typography>
        <ol className={classes.orderList}>
          <li className={classes.list}>
            Enter the details of your ideal condidate into our search filter
            Grill Cook/ Has at least 4 years of experience / Has worked in
            Fine-Dining / Has experence cooking seafood / Wants lunch or dinner
            / Wants $20 per hour
          </li>
          <li className={classes.list}>
            We'll <b>INSTANTLY</b> provide you a list of the best matching
            candidates!
          </li>
          <li className={classes.list}>
            Review the profiles and choose your favorites in just minutes
          </li>
          <li className={classes.list}>
            We'll ask who is interested, so you can set up intervieews right
            away
          </li>
        </ol>
        <Typography className={classes.listDeatail}>
          You can find you perfect new hire that day, all for a cost under $10!
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography className={classes.subtitle}>
          <b>EMPLOYED</b> INDUSTRY WORKERS:
        </Typography>
        <Typography>
          <span className={classes.spacing}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; We are a venue
          for you to build a profile that's so much more than a resume. A
          portfolio filled with videos of your skills, pics of your creations, a
          snapshot of that great review or anything that might tell employers
          more about you. This way, it's all in one place, ready for the day you
          ask <b>EmployeezNow</b> to start bringing new employers to you
        </Typography>
      </Grid>
    </Grid>
  );
};

export default HowisWorks;
