import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  heading1: {
    maxWidth: "750px",
    color: theme.palette.primary.main,
    fontSize: '2.2rem',
    fontWeight: 300,
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
      letterSpacing: '0.08rem',
    },
  },
  list: {
    fontSize: '18px',
    textAlign: 'center',
    marginTop: '20px',
    color: "rgb(0,0,0,0.6)",
    fontWeight: 300
  },
  paper2: {
    background: "#fcfcfc",
    display: 'flex',
    borderRadius: '30px',
    marginTop: "30px",
    paddingTop: '20px',
    paddingBottom: "50px",
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      textAlign: 'center'
    },
  },
  button1: {
    border: '2px solid #1f73be',
    background: 'white',
    textAlign:'center',
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
    width: '80%',
    maxWidth: '400px',
    maxHeight: '200px',
    cursor: 'pointer',
    transition: '0.2s',
    padding: "10px",
    '&:hover': {
      padding: "8px",
    },
  }
}));

export default function ContestSection() {
  const classes = useStyles()
  return (
    <Fragment>
      <Grid item xs={12} md={12}>
        <Paper elevation={0} className={classes.paper2}>
          <img
            src={`${process.env.PUBLIC_URL}/img/img2.svg`}
            alt="chef"
            className={classes.image}
          />
          <Grid>
            <Typography variant="h1" style={{ textAlign: "center" }} className={classes.heading1}>
              Check out our Contest Page Enter a video or Vote on others
            </Typography>
            <Typography className={classes.list}>
              <i>
                Best Cocktail &nbsp; &#8226;  Best Entrée &nbsp; &#8226; Best Sandwich &nbsp; &#8226; Best Coffee
              </i>
            </Typography>
          </Grid>
        </Paper>
      </Grid>
      <Grid container spacing={3} style={{ position: 'relative' }}>
        <div
          // variant="contained"
          color="primary"
          className={classes.button1}
        >
          GO TO THE <br />
          CONTEST PAGE
        </div>
      </Grid>
    </Fragment>
  )
}
