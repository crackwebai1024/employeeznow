import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Grid, Typography, Box, Button } from "@material-ui/core";
import { connect } from 'react-redux';
import { actions as employerActions } from '@store/employer';
import { bindActionCreators } from 'redux';
import { getUser } from '@helpers/auth-helpers';
import StripeInput from '@components/StripeInput';
import { makeStyles } from '@material-ui/core/styles'
import { CardElement, injectStripe } from 'react-stripe-elements';

const useStyles = makeStyles(theme => ({
  mainBox: {
    position: "relative",
    padding: "30px 5px 10px 10px",
    borderBottomRightRadius: "4px",
    borderBottomLeftRadius: "4px",
    background: theme.palette.background.default
  },
  payform: {
    padding: '10px'
  },
  button: {
    width: "100%",
    margin: 'auto',
  },
  description: {
    textAlign: 'center',
    color: theme.palette.common.green
  },
  cardElement: {
    border: '1px solid gray',
    padding: '1rem',

  },
  acceptPay: {
    fontSize: 16,
    fontWeight: 600,
    textAlign: 'center'
  },
  error: {
    color: 'red',
    fontSize: '12px'
  },
  buttonWrapper: {
    marginTop: '1rem',
    marginBottom: "1rem"
  },
  summarybody: {
    color: 'gray',
    fontWeight: 550,
    padding: '10px'
  },
  otherSummary: {
    fontWeight: 600,
    fontSize: 22,
    paddingLeft: '10px'
  },
  flexR: {
    textAlign: 'right',
    width: "100%"
  },
  bodyList: {
    display: 'flex',
    padding: '7px',
    borderBottom: '2px solid #e6e6e6'
  },
  flexL: {
    minWidth: '210px',
    with: "100%",
    [theme.breakpoints.down("xs")]: {
      minWidth: '180px'
    }
  },
  bodyListBottom: {
    display: 'flex',
    padding: '15px 5px 15px 5px',
    color: 'black'
  }
}));

const cardsLogo = ["cirrus", "dankort", "jcb", "maestro", "mastercard", "visa"];

const PaymentForm = (props) => {
  const { actions, stripe, selected, items } = props;
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [profilePrice, setProfilePrice] = useState(0)

  const classes = useStyles();

  const user = JSON.parse(getUser());

  useEffect(() => {
    let profilePrice = 0
    selected.forEach(item => {
      if(item){
        profilePrice += 8.99
      }
    })
    setProfilePrice(profilePrice)
  }, [selected])

  const handleSubmit = (e) => {
    setError("")
    e.preventDefault()
    let employeeId = items.filter((item, key) => {
      if (selected[key]) {
        return item._id
      }
    })

    stripe.createToken({})
      .then(result => {
        if (!result.error) {
          const data = {
            token: result.token,
            id: user._id,
            employeeID: employeeId,
            email: email
          }
          actions.payRequest(data)
        } else {
          setError(result.error.message)
        }
      })
  }

  return <form onSubmit={handleSubmit}>
    <Box className={classes.mainBox}>
      <Grid
        container
        xs={12}
        item
        justify="space-around"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Typography className={classes.otherSummary}>OTHER SUMMARY</Typography>
          <Box className={classes.summarybody}>
            <Grid container item xs={12}>
              <Grid item xs={12} className={classes.bodyList}>
                <Typography >
                  PROFILES
                </Typography>
                <Typography className={classes.flexR}>
                  ${profilePrice.toFixed(2)}
                </Typography>
              </Grid>
              <Grid item xs={12} className={classes.bodyList}>
                <Typography className={classes.flexL}>
                  Credit card convenience fee
                </Typography>
                <Typography className={classes.flexR}>
                  $0.67
                </Typography>
              </Grid>
              <Grid item xs={12} className={classes.bodyList}>
                <Typography className={classes.flexL}>
                  Sales tax(5.6%)
                </Typography>
                <Typography className={classes.flexR}>
                  ${(profilePrice * 5.6 / 100).toFixed(2)}
                </Typography>
              </Grid>
              <Grid item xs={12} className={classes.bodyListBottom}>
                <Typography className={classes.flexL}>
                  Total
                </Typography>
                <Typography className={classes.flexR}>
                  ${(Number((profilePrice * 5.6 /100).toFixed(2)) + Number(profilePrice.toFixed(2)) + 0.67).toFixed(2)}
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
            {cardsLogo.map(e => <img key={e} src={`../img/cards/${e}.png`} alt={e} width="50px" align="bottom" style={{ padding: "0 5px" }} />)}
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={12}>
              <Box className={classes.cardElement}>
                <CardElement />
              </Box>
            </Grid>
            <Typography className={classes.error}>
              {error}
            </Typography>
          </Grid>
        </Grid>

        <Grid container item xs={12} spacing={3} className={classes.buttonWrapper}>
          <Grid item xs={12} sm={6}>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              PAY
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  </form>
}

const mapStateToProps = ({
  employer: {
    formValues, paid
  },
}) => ({
  formValues, paid
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...employerActions,
  }, dispatch),
});

export default injectStripe(connect(mapStateToProps, mapDispatchToProps)(PaymentForm));