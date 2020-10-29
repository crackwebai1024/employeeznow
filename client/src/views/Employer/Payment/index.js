import React, { useState } from "react";
import { Container, Paper, Box, } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import Stepper from './Stepper'

const useStyles = makeStyles(() => ({
  boxWrapper: {
    marginBottom: "55px",
    minHeight: "calc(26vh + 260px)"
  },
  container: {
    position: "relative",
    zIndex: "1100",
    marginTop: "95px",
    marginBottom: "45px",
  }
}));

const Main = () => {

  const classes = useStyles();
  const stripe = loadStripe("pk_test_28rk6OSjfyVC9jxrH4DkHZAm00N57JKFdB");


  return <Box component="main" className={classes.boxWrapper}>
    <Container maxWidth="md" className={classes.container}>
      <Paper elevation={5}>
        <Elements stripe={stripe}>
          <Stepper />
        </Elements>
      </Paper>
    </Container>
  </Box>
}

export default Main;
