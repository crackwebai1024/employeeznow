import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Grid, Typography, Box, TextField } from '@material-ui/core';
import ContestSection from './Home/ContestSection';
import { getUser, getFilterID } from '@helpers/auth-helpers';

const imageList = ["desktop", "binoculars", "memo", "profile", "question", "", "", "calendar"]

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    width: 'auto',
    [theme.breakpoints.down('md')]: {

    },
  },
  title: {
    fontSize: '30px',
    fontWeight: 600,
    textAlign: 'center',
    color: theme.palette.common.black
  },
  contestContainer: {
    background: "#FAFAFA",
    textAlign: 'center',
    width: '100%'
  },
  col_center: {
    display: 'flex',
    alignItems: 'center'
  },
  servingImage: {
    textAlign: 'center',
    padding: '3rem'
  },
  sub_title: {
    textAlign: 'center',
    fontSize: '20px',
    marginBottom: '1rem'
  },
  contactInfo: {
    maxWidth: '600px',
    textAlign: 'center',
    margin: 'auto'
  },
  center: {
    margin: 'auto'
  },
  Wrapper: {
    background: 'white'
  }
}));

const Contact = () => {
  const classes = useStyles();
  const user = JSON.parse(getUser())

  return (<Box className={classes.Wrapper}>
    <Container width="sm" className={classes.mainContainer}>
      <Grid container ustify="center" spacing={0} style={{ paddingBottom: '6rem' }}>
        <Grid xs={12} className={classes.servingImage}>
          <img
            src={`${process.env.PUBLIC_URL}/img/serving.svg`}
          />
        </Grid>
        <Grid xs={12}>
          <Typography className={classes.sub_title}>
            EmployeezNow is not just another job site, but
          </Typography>
          <Typography className={classes.title}>
            THE FIRST <br />
            EMPLOYEE SEARCH ENGINE FOR HOSPITALITY
          </Typography>
        </Grid>

        <Grid item xs={12} md={7} className={classes.col_center}>
          <Box className={classes.center}>
            <form>
              <Grid container xs={12} spacing={3}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Fist Name"
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="email"
                    label="Email"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Comment or Message"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>

        <Grid item xs={12} md={5} style={{ marginTop: '2rem' }}>
          <div style={{ padding: "100% 0 0 0", position: "relative" }}>
            <iframe src="https://player.vimeo.com/video/455932248" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} frameborder="0" allow="autoplay; fullscreen" allowfullscreen>
            </iframe>
          </div>
          <script src="https://player.vimeo.com/api/player.js"></script>
        </Grid>

      </Grid>
      <Grid container item xs={12} className={classes.contactInfo}>
        <Grid xs={12}>
          <Typography>
            Contact Information
          </Typography>
        </Grid>
        <Grid xs={12} sm={6}>
          <Typography>
            PHONE: (888) 66 EZ-NOW
          </Typography>
        </Grid>
        <Grid xs={12} sm={6}>
          <Typography>
            EMAIL: QUESTIONS@EMPLOYEEZNOW
          </Typography>
        </Grid>
      </Grid>
    </Container>

    <Grid container className={classes.contestContainer}>
      <ContestSection />
    </Grid>
  </Box>
  );
};

export default Contact;
