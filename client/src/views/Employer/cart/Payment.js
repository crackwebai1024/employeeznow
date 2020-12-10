import React, { useState, useEffect } from "react";
import { Container, Paper, Box } from "@material-ui/core";
import { StripeProvider, Elements } from "react-stripe-elements";
import { makeStyles } from "@material-ui/core/styles";
import PaymentForm from "./PaymentForm";

const publish_key =
  "pk_test_51HhcEXCIGo4tK7NRleEfPk3GUJ3oqCZoxzfB0FbDjOp5Zw1csOmHhFVP2vBP5pM0R47aJjO6qNCghPuQwo6Y1RtA0013Su773C";

const useStyles = makeStyles((theme) => ({
  boxWrapper: {
    marginBottom: "55px",
    minHeight: "calc(26vh + 260px)",
    maxWidth: "350px",
    float: "right",
    [theme.breakpoints.down("sm")]: {
      marginTop: "1rem",
    },
  },
  header: {
    height: 70,
    background: theme.palette.common.black,
  },
  container: {
    position: "relative",
    zIndex: "1100",
    maxWidth: "600px",
    marginBottom: "45px",
    paddingRight: "0px",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "0px",
    },
  },
}));

const Payment = (props) => {
  const [stripe, setStripe] = useState("");
  const classes = useStyles();
  const { items, selected, buyCount } = props;

  useEffect(() => {
    if (window.Stripe) {
      setStripe(window.Stripe(publish_key));
    } else {
      if (document.querySelector("#stripe-js")) {
        document.querySelector("#stripe-js").addEventListener("load", () => {
          setStripe(window.Stripe(publish_key));
        });
      }
    }
  }, []);

  return (
    <Box component="main" className={classes.boxWrapper}>
      <Container maxWidth="md" className={classes.container}>
        <Paper elevation={0}>
          <Box className={classes.header}></Box>
          {stripe && (
            <StripeProvider stripe={stripe}>
              <Elements>
                <PaymentForm
                  items={items}
                  selected={selected}
                  buyCount={buyCount}
                />
              </Elements>
            </StripeProvider>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Payment;
