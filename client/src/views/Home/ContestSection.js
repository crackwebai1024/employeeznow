import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, Button } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import MainButton from '@components/Element/Button/MainButton';

const useStyles = makeStyles((theme) => ({
  heading1: {
    color: theme.palette.primary.main,
    fontSize: '26px',
    fontWeight: 300,
    [theme.breakpoints.down('sm')]: {
      fontSize: '26px',
      letterSpacing: '0.08rem',
    },
  },
  list: {
    fontSize: '16px',
    textAlign: 'center',
    marginTop: '20px',
    marginBottom: '20px',
    color: theme.palette.common.lightBlack,
    fontWeight: 600
  },
  paper2: {
    background: 'none',
    display: 'flex',
    borderRadius: '30px',
    marginTop: "30px",
    paddingTop: '20px',
    marginRight: '50px',
    float: 'right',
    paddingBottom: "50px",
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      textAlign: 'center',
      float: 'none'
    },
  },
  button1: {
    border: '2px solid #1f73be',
    background: 'white',
    textAlign: 'center',
    cursor: 'pointer',
    padding: '0.8rem 2rem',
    marginTop: '-30px',
    width: '300px',
    fontSize: '20px',
    margin: 'auto',
    '&:hover': {
      backgroundColor: '#eeeeee'
    },
  },
  image: {
    // width: '100%',
    maxWidth: '600px',
    maxHeight: '300px',
    cursor: 'pointer',
    transition: '0.2s',
    // padding: "10px",
    '&:hover': {
    },
  },
  col_center: {
    display: "flex",
    alignItems: "center"
  }
}));

export default function ContestSection() {
  const classes = useStyles()
  return (
    <Container>
      <Grid container xs={12}>
        <Grid item xs={12} md={6}>
          <Paper elevation={0} className={classes.paper2}>
            <img
              src={`${process.env.PUBLIC_URL}/img/win.png`}
              alt="chef"
              className={`${classes.image} animate__animated animate__bounce`}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} className={classes.col_center}>
          <Grid style={{ margin: 'auto'}}>
            <Typography variant="h1" style={{ textAlign: "center" }} className={classes.heading1}>
              Check out our <span style={{fontWeight: '700'}}>HOSPITALITY CHALLENGE</span>
            </Typography >
            <Typography variant="h1" style={{ textAlign: "center", color: 'green' }} className={classes.heading1}>
              Enter a video or vote on others
            </Typography>
            <Typography className={classes.list}>
              BEST COCKTAIL &nbsp;&nbsp;&nbsp; BEST ENTREE &nbsp;&nbsp;&nbsp; BEST SANDWICH/BURGER &nbsp;&nbsp;&nbsp; BEST COFFEE
            </Typography>
            <MainButton
              background="green"
              color="color"
              border="green"
              hoverColor="white"
              hoverBack="#007000"
              pd={60} fontSize={18}
              label="Go To Contest"
              color="white"
              hoverColor="white"
              to="" width="260px">
            </MainButton>
          </Grid>
        </Grid>
      </Grid>
    </Container >
  )
}
