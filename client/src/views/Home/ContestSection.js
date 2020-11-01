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
    fontSize: '18px',
    textAlign: 'center',
    marginTop: '20px',
    color: theme.palette.common.lightBlack,
    fontWeight: 300
  },
  paper2: {
    background: "#fcfcfc",
    display: 'flex',
    borderRadius: '30px',
    marginTop: "30px",
    paddingTop: '20px',
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
    width: '100%',
    maxWidth: '400px',
    maxHeight: '200px',
    cursor: 'pointer',
    transition: '0.2s',
    padding: "10px",
    '&:hover': {
    },
  }
}));

export default function ContestSection() {
  const classes = useStyles()
  return (
    <Container>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Paper elevation={0} className={classes.paper2}>
            <img
              src={`${process.env.PUBLIC_URL}/img/img2.svg`}
              alt="chef"
              className={classes.image}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid>
            <Typography variant="h1" style={{ textAlign: "center" }} className={classes.heading1}>
              Check out our Contest Page
            </Typography >
            <Typography variant="h1" style={{ textAlign: "center", color : 'green' }} className={classes.heading1}>
              Enter a video or Vote on others
            </Typography>
            <Typography className={classes.list}>
              Best Cocktail   Best Entrée    Best Sandwich       Best Coffee
            </Typography>
          </Grid>
          <MainButton 
            background="green"
            color="color"
            hoverColo=""
            pd={80} fontSize={18} 
            label="Go To Contest" 
            to="" width="200px">
          </MainButton>
        </Grid>
      </Grid>
    </Container >
  )
}
