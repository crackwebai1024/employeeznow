import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  interview_desktop: {
    [theme.breakpoints.down('sm')]: {
      display: 'none !important'
    },
  },
  interview_mobile: {
    display: 'none !important',
    [theme.breakpoints.down('sm')]: {
      display: 'flex !important'
    },
  },
  profileSubtitle: {
    textAlign: 'center',
    fontSize: '20px',
    marginBottom: '20px'
  },
  profileSubdescription: {
    maxWidth: '400px',
    margin: 'auto',
    fontWeight: "550",
    fontSize: "16px",
  },
  profiledDetails: {
    marginTop: '2rem',
    color: theme.palette.common.gray
  },
  ContainerRight: {
    [theme.breakpoints.down('sm')]: {
      textAlign: "center"
    },
  },
  ContainerLeft: {
    // maxWidth: '500px',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      float: "none",
      textAlign: 'center',
    },
  },
  video: {
    padding: "80% 0 0 0",
    position: 'relative'
  },
  profile: {
    fontSize: '26px',
    textAlign: 'center',
    boxShadow: ''
  },
  image: {
    maxWidth: "378px",
    width: "100%",
    boxShadow: "0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)"
  },
  col_center: {
    display: 'flex',
    alignIems: "center",
  },
  center: {
    textAlign: 'center'
  }
}))

const ProfileDescription = () => {
  const classes = useStyles()
  return (<Fragment>
    <Grid item xs={12} >
      <Typography className={classes.profile}>
        Your Profile can include
      </Typography>
    </Grid>
    <Grid item xs={12} md={6} className={`${classes.col_center} ${classes.interview_mobile}`}>
      <Box style={{ margin: 'auto', marginTop: '4rem' }}>
        <Typography className={classes.profileSubtitle}>
          <b>AT-WORK VIDEO </b>that shows off your skills
        </Typography>
      </Box>
    </Grid>
    <Grid item xs={12} md={6}>
      <Grid className={classes.ContainerLeft}>
        <Box style={{ margin: 'auto', maxWidth: '472px' }}>
          <div style={{ padding: "75% 0 0 0", position: "relative" }}>
            <iframe title="iframe_1" src="https://player.vimeo.com/video/7743003?title=0&byline=0&portrait=0"
              style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%" }}
              frameBorder="0" allow="autoplay; fullscreen" allowFullScreen>
            </iframe>
          </div>
          <script src="https://player.vimeo.com/api/player.js"></script>
        </Box>
      </Grid>
    </Grid>
    <Grid item xs={12} md={6} className={classes.col_center}>
      <Box style={{ margin: 'auto' }}>
        <Box className={classes.interview_desktop}>
          <Typography className={classes.profileSubtitle}>
            <b>AT-WORK VIDEO </b>that shows off your skills
          </Typography>
        </Box>
        <Typography className={classes.profileSubdescription}>
          Don't let a resume be the only thing that tells your story. You can add videos of you at work,
          performing at your best and allowing hiring managers to see what you can do for them.
        </Typography>
      </Box>
    </Grid>

    <Grid item xs={12} md={6} className={`${classes.col_center}`}>
      <Box style={{ margin: 'auto', marginTop: '4rem' }}>
        <Typography className={classes.profileSubtitle}>
          <b>A SELF-INTERVIEW</b> to let them know who you are
          </Typography>
        <Box className={classes.interview_desktop}>
          <Typography className={classes.profileSubdescription}>
            Your EmployeezNow profile allows you to create and build a portfolio to show what you can do.
            Upload pictures of your accompishment and even your self-interview.
            Now you get to control the narrative and talk about the topics and questions that best suit you.
        </Typography>
          <Typography className={classes.profiledDetails}>
            (View our Self-Interview questions on the Learn More page)
        </Typography>
        </Box>
      </Box>
    </Grid>

    <Grid item xs={12} md={6} className={classes.center}>
      <div className={classes.video}>
        <iframe title="iframe_2" src="https://player.vimeo.com/video/472816351?title=0&byline=0&portrait=0"
          style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%" }}
          allow="autoplay; fullscreen" frameBorder="0" allowFullScreen>
        </iframe>
      </div>
      <script src="https://player.vimeo.com/api/player.js"></script>
    </Grid>

    <Grid item xs={12} md={6} className={`${classes.interview_mobile} ${classes.col_center}`}>
      <Box style={{ margin: 'auto' }}>
        <Typography className={classes.profileSubdescription}>
          Your EmployeezNow profile allows you to create and build a portfolio to show what you can do.
          Upload pictures of your accompishment and even your self-interview.
          Now you get to control the narrative and talk about the topics and questions that best suit you.
          </Typography>
        <Typography className={classes.profiledDetails}>
          (View our Self-Interview questions on the Learn More page)
        </Typography>
      </Box>
    </Grid>

    <Grid item xs={12} md={6} className={`${classes.col_center} ${classes.interview_mobile}`}>
      <Box style={{ margin: 'auto', marginTop: '4rem' }}>
        <Grid item xs={12}>
          <Typography className={classes.profileSubtitle}>
            PHOTOS of your CREATIONS
          </Typography>
        </Grid>
      </Box>
    </Grid>

    <Grid item xs={12} md={6} className={classes.center}>
      <img src={`${process.env.PUBLIC_URL}/img/test/img3.svg`} className={classes.image} />
    </Grid>
    <Grid item xs={12} md={6} className={classes.col_center}>
      <Box style={{ margin: 'auto' }}>
        <Grid item xs={12}>
          <Box className={classes.interview_desktop}>
            <Typography className={classes.profileSubtitle}>
              PHOTOS of your CREATIONS
            </Typography>
          </Box>
          <Typography className={classes.profileSubdescription}>
            Add multiple pictures to show your different areas of knowledge
          </Typography>
        </Grid>
      </Box>
    </Grid>
  </Fragment>
  )
}

export default ProfileDescription