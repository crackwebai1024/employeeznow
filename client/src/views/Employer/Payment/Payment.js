import React, { useState, useEffect } from "react";
import { Container, Paper, Box, } from "@material-ui/core";
import { StripeProvider, Elements } from 'react-stripe-elements';
import { makeStyles } from '@material-ui/core/styles';
import PaymentForm from './form/PaymentForm';
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

const Payment = () => {
  const [stripe, setStripe] = useState("")
  const classes = useStyles();

  useEffect(() => {
    if (window.Stripe) {
      setStripe(window.Stripe("pk_test_28rk6OSjfyVC9jxrH4DkHZAm00N57JKFdB"))
    } else {
      document.querySelector("#stripe-js").addEventListener("load", () => {
        setStripe(window.Stripe("pk_test_28rk6OSjfyVC9jxrH4DkHZAm00N57JKFdB"))
      });
    }
  }, [])

  return <Box component="main" className={classes.boxWrapper}>
    <Container maxWidth="md" className={classes.container}>
      <Paper elevation={5}>
        {
          stripe && (
            <StripeProvider stripe={stripe}>
              <Elements>
                <PaymentForm />
              </Elements>
            </StripeProvider>
          )
        }
      </Paper>
    </Container>
  </Box>
}

export default Payment;
