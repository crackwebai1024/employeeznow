import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  profileSubtitle: {
    textAlign: 'center',
    fontSize: '20px',
    marginBottom: '20px'
  },
  profileSubdescription: {
    maxWidth: '400px',
    margin: 'auto',
    fontWeight: "550",
    fontSize: "16px"
  },
  ContainerRight: {
    [theme.breakpoints.down('sm')]: {
      textAlign: "center"
    },
  },
  ContainerLeft: {
    maxWidth: '500px',
    float: 'right',
    [theme.breakpoints.down('sm')]: {
      float: "none",
      margin: 'auto',
    },
  }
}))

const ProfileDescription = () => {
  const classes = useStyles()
  return (<Fragment>
    <Grid item xs={12} style={{ textAlign: 'center' }}>
      Your Profile can include
  </Grid>
    <Grid item xs={12} md={6}>
      <Grid className={classes.ContainerLeft}>
      </Grid>
    </Grid>
    <Grid item xs={12} md={6}>
      <Grid className={classes.ContainerRight} style={{ marginTop: '50px' }}>
        <Typography className={classes.profileSubtitle}>
          <b>AT-WORK VIDEO </b>that shows off your skills
      </Typography>
        <Typography className={classes.profileSubdescription}>
          Don't let a resume be the only thing that tells your story. You can add videos of you at work,
          performing at your best and allowing hiring managers to see what you can do for them.
      </Typography>
      </Grid>
    </Grid>
    <Grid item xs={12} md={6}>
      <Typography className={classes.profileSubtitle}>
        <b>A SELF-INTERVIEW</b> to let them know who you are
      </Typography>
      <Typography className={classes.profileSubdescription}>
        Your EmoloyeezNow profile allows you to create and build a portfolio to show what you can do.
        Upload pictures of your accompishment and even your self-interview.
        Now you get to control the narrative and talk about the topics and questions that best suit you.
      </Typography>
    </Grid>
    <Grid item xs={12} md={6}>

    </Grid>
    <Grid item xs={12} md={6}>

    </Grid>
    <Grid item xs={12} md={6}>
      <Typography className={classes.profileSubtitle}>
        PHOTOS of your CREATIONS
      </Typography>
      <Typography className={classes.profileSubdescription}>
        Add multiple pictures to show your different areas of knowledge
      </Typography>
    </Grid>
  </Fragment>
  )
}

export default ProfileDescription