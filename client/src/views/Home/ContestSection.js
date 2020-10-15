import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  heading1: {
    maxWidth: "750px",
    color: theme.palette.primary.main,
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.5rem',
      letterSpacing: '0.08rem',
    },
  },
  paper2: {
    background: "#eaeff8",
    display: 'flex',
    borderRadius: '30px',
    marginTop: "30px",
    paddingBottom: "50px",
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      textAlign: 'center'
    },
  },
  button1: {
    borderRadius: '15px',
    backgroundColor: '#C00000',
    padding: '0.8rem 2rem',
    marginTop: '-30px',
    width: '300px',
    fontSize: '20px',
    margin: 'auto',
    '&:hover': {
      backgroundColor: '#A00000'
    },
  },
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
            style={{
              width: '80%',
              maxWidth: '400px'
            }}
          />
          <Grid>
            <Typography variant="h1" style={{ textAlign: "center" }} className={classes.heading1}>
              Check out our Contest Page Enter a video or Vote on others
            </Typography>
            <Typography style={{ fontSize: '32px', textAlign: 'center' }}>
              <i>
                Best Cocktail &#8226; Best Entrée  &#8226; Best Sandwich  &#8226; Best Coffee
                </i>
            </Typography>
          </Grid>
        </Paper>
      </Grid>
      <Grid container spacing={3} style={{ position: 'relative'}}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button1}
        >
          GO TO THE <br />
          CONTEST PAGE
        </Button>
      </Grid>
    </Fragment>
  )
}
