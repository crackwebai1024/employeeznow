import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  interviewText: {
    maxWidth: "350px",
    margin: "auto",
    fontSize: "20px",
    // textAlign: 'center',
    fontWeight: 900,
    fontFamily: "calibri",
  },
  listText: {
    fontSize: "18px",
    fontWeight: 300,
    lineHeight: 2,
    margin: "auto",
    width: "fit-content",
  },
  title: {
    fontSize: "32px",
    textAlign: "center",
    marginTop: "4rem",
    marginBottom: "1.5rem",
  },
}));

export default function SelfInterviewSection() {
  const classes = useStyles();
  return (
    <Fragment>
      <Grid item xs={12} md={12}>
        <Typography className={classes.title}>
          Sample topics for a Self-Interview
        </Typography>
      </Grid>
      {/* <Grid item xs={12} md={6}>
        <div style={{ padding: "50.65% 0 0 0", position: "relative" }}>
          <iframe src="https://player.vimeo.com/video/414927401?title=0?byline=0?portrait=0" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} frameborder="0" allow="autoplay; fullscreen" allowfullscreen>
          </iframe>
        </div>
        <script src="https://player.vimeo.com/api/player.js"></script>
      </Grid>

      <Grid item xs={12} md={6}>
        <Typography className={classes.interviewText}>
          Your EmployeezNow profile allows you to create and build a portfolio to show what
          you can do.  Upload pictures of your accomplishment,
          videos of your ‘at work’ skills and even your Self-Interview.
          Now you get to control the narrative and talk about the topics
          and questions that best suit you.<br /> <br /> <br />
          Here are some suggestions that you can use on your video.
        </Typography>
      </Grid> */}

      <Grid item xs={12} md={12}>
        <Typography className={classes.listText}>
          <ul>
            <li>I got into hospitality…</li>
            <li>I love the hospitality industry because…</li>
            <li>I am good at my job because…</li>
            <li>My Hospitality career goals are….</li>
            <li>My coworkers would describe me as…</li>
            <li>The definition of hospitality to me would be…</li>
            <li>I would like to improve my…</li>
            <li>I keep myself organized by…</li>
            <li>The last time I had a difficult guest I…</li>
            <li>I consider myself a team player because….</li>
            <li>I work well under pressure because…</li>
            <li>My last great hospitality experience as a customer was…</li>
            <li>I believe performance should be measured by…</li>
            <li>My favorite thing about my last job was…</li>
            <li>At my last job, I think I would change…</li>
            <li>The person that influenced me the most was…</li>
            <li>My ‘death row’ meal would be…</li>
          </ul>
        </Typography>
      </Grid>
    </Fragment>
  );
}
