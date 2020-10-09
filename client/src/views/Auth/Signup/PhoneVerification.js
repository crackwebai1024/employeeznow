import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { actions as authActions } from '@store/auth';
import { bindActionCreators } from 'redux';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import Typography from '@material-ui/core/Typography';
import MuiPhoneNumber from "material-ui-phone-number";
import GoogleLibPhoneNumber from 'google-libphonenumber';
import ReactCodeInput from 'react-code-input';
import _ from 'lodash'

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    background: theme.palette.common.blue,
  },
  formControl: {
    marginTop: '1.3rem',
    backgroundColor: 'transparent',
  },
  heading1: {
    ...theme.typography.h1,
    marginBottom: '1.5rem',
  },
  button: {
    marginTop: 30,
    marginBottom: 25,
  },
  linkContainer: {
    marginBottom: '8rem',
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.common.blue,
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },
  invalidMessage: {
    textAlign: 'center',
    color: theme.palette.error.main,
    marginBottom: '2rem',
  },
  companyInfo: {
    marginTop: '3rem',
    marginBottom: '-1rem',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
  horizontal: {
    border: 'none',
    borderTop: `1px dotted ${theme.palette.common.blue}`,
  },
  contactInfo: {
    marginTop: '1rem',
    marginBottom: '-1rem',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
  description: {
    marginBottom: 15,
    textAlign: 'center'
  },
  emailInfo: {
    ...theme.typography.caption,
    marginTop: '-1.3rem',
    color: theme.palette.common.blue,
  },
  stateError: {
    color: theme.palette.error.main,
  },
}));

const PhoneVerification = ({
  errorMessage,
  isAuthenticated,
  user,
  digicodeConfirmError,
  isSentPhoneNumber,
  actions,
  signupUser,
}) => {
  // react-hook-form setup
  const { register, handleSubmit, errors, watch } = useForm({});
  // address.state error customized check
  const [error, setError] = useState('');
  const [phone, setPhone] = useState('')
  const [countryCode, setCountryCode] = useState({})
  const [digitCode, setDigitCode] = useState("");
  const [phoneData, setPhoneData] = useState({})
  // material-ui
  const classes = useStyles();

  const handleDigit = (e) => {
    setDigitCode(e)
  }

  useEffect(() => {
    if (digicodeConfirmError)
      setError("Please Input correct 6 Digit code!")
  }, [digicodeConfirmError])

  const onSendDigitCode = () => {
    debugger
    if (digitCode.length == 6) {
      let confirmedSixCode = {
        sixDigitCode: digitCode
      }
      let cellNumber = {
        cell: '' + phoneData.countryCode + phoneData.phoneNumber
      }
      let role = {
        role: "employee"
      }
      let confirmData = {
        ...confirmedSixCode,
        ...signupUser,
        ...cellNumber,
        ...role,
        ...phoneData
      }
      actions.signupConfirmRequest(confirmData)
    } else {
      setError("Please Input 6 Digit")
    }
  }

  const onConfirm = (e, data) => {
    const phoneUtil = GoogleLibPhoneNumber.PhoneNumberUtil.getInstance();
    // Print the phone's country code.
    try {
      const number = phoneUtil.parseAndKeepRawInput(phone, countryCode.dialCode);
      if (number) {
        if (phoneUtil.isPossibleNumber(number)) {
          const data = {
            phoneNumber: number.getNationalNumber(),
            countryCode: number.getCountryCode(),
          }
          setPhoneData(data)
          actions.phoneVerifyRequestRequest(data)
        } else {
          setError("Phone number is invalid!")
        }
      }
    } catch {
      setError("Phone number is invalid!")
      return
    }
  };

  const props = {
    className: "reactCodeInput",
    inputStyle: {
      fontFamily: 'monospace',
      margin: '14px',
      MozAppearance: 'textfield',
      width: '50px',
      borderRadius: '3px',
      fontSize: '34px',
      height: '65px',
      paddingLeft: '17px',
      // backgroundColor: 'black',
      color: 'black',
      border: '1px solid black'
    },
    inputStyleInvalid: {
      fontFamily: 'monospace',
      margin: '4px',
      MozAppearance: 'textfield',
      width: '15px',
      borderRadius: '3px',
      fontSize: '14px',
      height: '26px',
      paddingLeft: '7px',
      backgroundColor: 'black',
      color: 'red',
      border: '1px solid red'
    }
  }

  // connected to action
  const handlePhoneChange = (value, data) => {
    setPhone(value)
    setCountryCode(data)
    setError("")
  };

  // Redirect to employer account page after sign up
  if (isAuthenticated) {
    return <Redirect to={`/employees/${user.slug}`} />;
  }
  if (_.isEmpty(signupUser)) {
    return <Redirect to='/signup' />
  }

  return (
    <Container component="main" maxWidth="sm">
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <Avatar className={classes.avatar}>
            <VpnKeyOutlinedIcon />
          </Avatar>
        </Grid>
        <Grid item>
          <Typography className={classes.heading1}>{isSentPhoneNumber ? "6 Digit Code" : "Phone Verification"}</Typography>
          <Typography className={classes.description}>Please take a moment to verify your phone number.</Typography>
        </Grid>
        {
          isSentPhoneNumber ?
            <Fragment>
              <ReactCodeInput type='text' fields={6} {...props} onChange={handleDigit} />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={onSendDigitCode}
                className={classes.button}
              >
                Confirm
            </Button>
            </Fragment> :
            <form onSubmit={(e) => e.preventDefault()}>
              <Grid item container direction="row" spacing={0}>

                <MuiPhoneNumber
                  name="phone"
                  label="Phone Number"
                  data-cy="user-phone"
                  defaultCountry={"us"}
                  variant="outlined"
                  fullWidth
                  value={phone}
                  error={error}
                  onChange={handlePhoneChange}
                  helperText={`${error ? "Invalid PhoneNumber" : ""}`}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={onConfirm}
                  className={classes.button}
                >
                  Send Code
            </Button>
                {/* If authorization was failed */}
              </Grid>
            </form>
        }
      </Grid>
      {error && (
        <Grid item className={classes.invalidMessage}>
          {error}
        </Grid>
      )}
    </Container>
  );
};

const mapStateToProps = ({
  auth: {
    signupUser, isSentPhoneNumber, isAuthenticated, user, digicodeConfirmError
  },
}) => ({
  signupUser, isSentPhoneNumber, isAuthenticated, user, digicodeConfirmError
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...authActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneVerification);