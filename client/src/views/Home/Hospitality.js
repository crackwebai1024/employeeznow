import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Box } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const listData = [
  "It is FREE to search anytime!",
  "Enter the details of your ideal new hire & INSTANTLY get a list of the best matching profiles",
  'Watch <b>"At - Work Videos" </b>of the candidates in action',
  "Watch their <b>Self-Interviews</b>",
  "Review their detailed work history",
  "Identify your final candidates in just minutes",
  "We will make sure they are interested in your opening",
  "Choose your finalist and purchas their contact information for just $8.99 each",
  "There are no other hidden fees",
]

const useStlyes = makeStyles((theme) => ({
  profileSubtitle: {
    textAlign: 'center',
    fontSize: '20px',
    marginBottom: '20px',
    // maxWidth: '300px',
    margin: 'auto'
  },
  profileSubdescription: {
    maxWidth: '372px',
    margin: 'auto',
    fontWeight: "550",
    fontSize: "16px"
  },
  title: {
    textAlign: 'center',
    fontSize: '26px',
    padding: '30px'
  },
  image: {
    marginLeft: '0.5rem',
    maxWidth: '372px',
    width: '100%',
    boxShadow: "0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)",
    [theme.breakpoints.down('sm')]: {
      marginTop: '3rem'
    },
  },
  listDescription: {
    width: 'fit-content',
    margin: 'auto',
    marginTop: '4rem'
  },
  bottomDescription: {
    fontSize: '20px',
    marginTop: "2rem",
    paddingBottom: '6rem',
    textAlign: 'center',
  },
  font14: {
    fontSize: "16px",
    padding: '0.3rem 0 0.3rem 0',
    color: theme.palette.common.darkgray
  },
  arrowIcon: {
    height: '16px',
    marginTop: '0.45rem',
    marginRight: '20px',
    marginLeft: '20px'
  },
  center: {
    textAlign: 'center'
  },
  col_center: {
    display: 'flex',
    alignIems: "center",
  }
}))

const Hospitality = () => {
  const classes = useStlyes()
  return (<Fragment>
    <Grid xs={12}>
      <Typography className={classes.title}>
        EMPLOYERS OF HOSPITALITY
    </Typography>
    </Grid>
    <Grid container xs={12}>
      <Grid xs={12} sm={6} className={classes.col_center}>
        <Box style={{ margin: 'auto' }}>
          <Typography className={classes.profileSubtitle}>
            THE FASTEST WAY TO HIRE
          </Typography>
          <Typography className={classes.profileSubdescription}>
            The next time you have a job opening, don't spend days with multiple
            sites just to get a list of qualified candidates. Register your company profile &
            get your candidates in just a few minutes!
          </Typography>
        </Box>
      </Grid>
      <Grid xs={12} sm={6} className={classes.center}>
        <img src={`${process.env.PUBLIC_URL}/img/img4.png`} className={classes.image} />
      </Grid>
    </Grid>
    <Grid xs={12}>
      <Box className={classes.listDescription}>
        {
          listData.map(list => {
            return <Box style={{ display: 'flex' }}>
              <img src={`${process.env.PUBLIC_URL}/img/arrow.svg`} alt="arrow" className={classes.arrowIcon} />
              <div dangerouslySetInnerHTML={{ __html: list }} className={classes.font14}>
              </div>
            </Box>
          })
        }
        <Box className={classes.bottomDescription}>
          EmployeezNow will reduce the time and cost it takes to hire by 50% or more!
        </Box>
      </Box>
    </Grid>
  </Fragment>
  )
}

export default Hospitality;