import React, { useState, useEffect } from "react";
import { TextField, Grid, Typography, Box } from "@material-ui/core";
import { connect } from "react-redux";
import { actions as employerActions } from "@store/employer";
import { bindActionCreators } from "redux";
import { getUser } from "@helpers/auth-helpers";
import StripeInput from "@components/StripeInput";
import { makeStyles } from "@material-ui/core/styles";
import { errorMessage } from "@helpers/utils";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  injectStripe,
} from "react-stripe-elements";

const useStyles = makeStyles((theme) => ({
  mainBox: {
    position: "relative",
    padding: "30px 5px 10px 10px",
    borderBottomRightRadius: "4px",
    borderBottomLeftRadius: "4px",
    background: theme.palette.background.default,
  },
  payform: {
    padding: "10px",
  },
  formControl: {
    margin: "15px 0",
  },
  button: {
    width: "100%",
    margin: "auto",
  },
  description: {
    textAlign: "center",
    color: theme.palette.common.green,
  },
  cardElement: {
    border: "1px solid gray",
    padding: "1rem",
  },
  acceptPay: {
    fontSize: 16,
    fontWeight: 600,
    textAlign: "center",
  },
  error: {
    color: "red",
    fontSize: "12px",
  },
  summarybody: {
    color: "gray",
    fontWeight: 550,
    padding: "10px",
  },
  otherSummary: {
    fontWeight: 600,
    fontSize: 22,
    paddingLeft: "10px",
  },
  flexR: {
    textAlign: "right",
    width: "100%",
  },
  bodyList: {
    display: "flex",
    padding: "7px",
    borderBottom: "2px solid #e6e6e6",
  },
  flexL: {
    minWidth: "210px",
    with: "100%",
    [theme.breakpoints.down("xs")]: {
      minWidth: "180px",
    },
  },
  bodyListBottom: {
    display: "flex",
    padding: "15px 5px 15px 5px",
    color: "black",
  },
}));

const cardsLogo = ["cirrus", "dankort", "jcb", "maestro", "mastercard", "visa"];

const PaymentForm = (props) => {
  const { actions, stripe, selected, items, buyCount, payEvent } = props;
  const [error, setError] = useState("");
  const [profilePrice, setProfilePrice] = useState(0);

  const classes = useStyles();

  const user = JSON.parse(getUser());

  useEffect(() => {
    setProfilePrice(buyCount * 8.99);
  }, [selected]);

  useEffect(() => {
    if (payEvent) handleSubmit();
  }, [payEvent]);

  const handleSubmit = (e) => {
    setError("");
    // e.preventDefault()
    let employeeId = [];
    items.forEach((item, key) => {
      if (selected[key]) {
        employeeId.push(item._id);
      }
    });
    if (buyCount === 0 && payEvent === "BUY_SELECT") {
      return actions.freePurchase({
        id: user._id,
        employees: employeeId,
      });
    }
    stripe.createToken({}).then((result) => {
      if (!result.error) {
        const data = {
          token: result.token,
          id: user._id,
          employees: employeeId,
          purchasenum: payEvent,
          buyCount: buyCount,
        };
        actions.chargeRequest(data);
      } else {
        errorMessage(result.error.message);
      }
      actions.getEvent(undefined);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box className={classes.mainBox}>
        <Grid container xs={12} item justify="space-around" alignItems="center">
          <Grid item xs={12}>
            <Typography className={classes.otherSummary}>
              OTHER SUMMARY
            </Typography>
            <Box className={classes.summarybody}>
              <Grid container item xs={12}>
                <Grid item xs={12} className={classes.bodyList}>
                  <Typography>PROFILES</Typography>
                  <Typography className={classes.flexR}>
                    ${profilePrice.toFixed(2)}
                  </Typography>
                </Grid>
                <Grid item xs={12} className={classes.bodyList}>
                  <Typography className={classes.flexL}>
                    Credit card convenience fee
                  </Typography>
                  <Typography className={classes.flexR}>
                    ${(((profilePrice * 105.6) / 100) * 0.03).toFixed(2)}
                  </Typography>
                </Grid>
                <Grid item xs={12} className={classes.bodyList}>
                  <Typography className={classes.flexL}>
                    Sales tax(5.6%)
                  </Typography>
                  <Typography className={classes.flexR}>
                    ${((profilePrice * 5.6) / 100).toFixed(2)}
                  </Typography>
                </Grid>
                <Grid item xs={12} className={classes.bodyListBottom}>
                  <Typography className={classes.flexL}>Total</Typography>
                  <Typography className={classes.flexR}>
                    $
                    {(
                      Number(((profilePrice * 5.6) / 100).toFixed(2)) +
                      Number(profilePrice.toFixed(2)) +
                      Number(((profilePrice * 105.6) / 100) * 0.03)
                    ).toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid container item xs={12} className={classes.payform} spacing={2}>
            <Typography className={classes.acceptPay}>
              ACCEPTED METHODS OF PAYMENTS
            </Typography>
            <Grid item xs={12} justify="space-between">
              {cardsLogo.map((e) => (
                <img
                  key={e}
                  src={`../img/cards/${e}.png`}
                  alt={e}
                  width="50px"
                  align="bottom"
                  style={{ padding: "0 5px" }}
                />
              ))}
            </Grid>
            <Grid container item xs={12}>
              <Grid item xs={12}>
                <Grid item xs={12} className={classes.formControl}>
                  <TextField
                    label="Credit Card Number"
                    name="ccnumber"
                    variant="outlined"
                    size="small"
                    required
                    InputProps={{
                      inputComponent: StripeInput,
                      inputProps: {
                        component: CardNumberElement,
                      },
                    }}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} className={classes.formControl}>
                  <TextField
                    label="Expiration Date"
                    name="ccexp"
                    variant="outlined"
                    size="small"
                    required
                    // onChange={inputHandle}
                    InputProps={{
                      inputComponent: StripeInput,
                      inputProps: {
                        component: CardExpiryElement,
                      },
                    }}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} className={classes.formControl}>
                  <TextField
                    label="CVC"
                    name="cvc"
                    variant="outlined"
                    size="small"
                    required
                    InputProps={{
                      inputComponent: StripeInput,
                      inputProps: {
                        component: CardCvcElement,
                      },
                    }}
                    // onChange={inputHandle}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
              <Typography className={classes.error}>{error}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

const mapStateToProps = ({ employer: { formValues, paid, payEvent } }) => ({
  formValues,
  paid,
  payEvent,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      ...employerActions,
    },
    dispatch
  ),
});

export default injectStripe(
  connect(mapStateToProps, mapDispatchToProps)(PaymentForm)
);
