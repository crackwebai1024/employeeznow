import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import Typography from '@material-ui/core/Typography';
import ReactCodeInput from 'react-code-input';
import { actions as authActions } from '@store/auth';
import { bindActionCreators } from 'redux';
import { getUser } from '@helpers/auth-helpers';
import { makeStyles } from '@material-ui/core/styles';
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
    marginTop: '1.5rem',
  },
  linkContainer: {
    marginBottom: '8rem',
  },
  container: {
    width: "80%"
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

const EmailVerification = ({
  isSingupUser,
  isAuthenticated,
  digicodeConfirmError,
  isSentPhoneNumber,
  isEmailCodeError,
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

  const user = JSON.parse(getUser())

  const handleDigit = (e) => {
    setError('')
    setDigitCode(e)
  }

  useEffect(() => {
    if (isEmailCodeError)
      setError("Please Input correct 6 Digit code!")
  }, [isEmailCodeError])

  const onSendDigitCode = () => {
    if (digitCode.length == 6) {
      let confirmedSixCode = {
        sixDCode: digitCode
      }
      let confirmData = {
        ...signupUser,
        ...confirmedSixCode,
      }
      actions.employerEmailCodeSend(confirmData)
    } else {
      setError("Please Input 6 Digit")
    }
  }

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
  
  if (_.isEmpty(signupUser)) {
    return <Redirect to='/signup/employer' />
  }

  const onBack = () => {

  }

  const onDigitBack = () => {
    actions.signupuserEmpty()
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
          <Typography className={classes.heading1}>Email Verification</Typography>
        </Grid>
        <Fragment>
          <Typography className={classes.description}>We sent 6 digit code to your email. Please Input the digit code.</Typography>
          <ReactCodeInput type='text' fields={6} {...props} error={error} onChange={handleDigit} />
          {error && (
            <Grid item className={classes.invalidMessage}>
              {error}
            </Grid>
          )}
          <Grid item container className={classes.container}>
            <Grid xs={5} >
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                fullWidth
                onClick={onDigitBack}
                className={classes.button}
              >
                Back
                  </Button>
            </Grid>
            <Grid xs={2}></Grid>
            <Grid xs={5}>
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
            </Grid>
          </Grid>
        </Fragment>

      </Grid>
    </Container>
  );
};

const mapStateToProps = ({
  auth: {
    isEmailCodeError, signupUser
  },
}) => ({
  isEmailCodeError, signupUser
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...authActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailVerification);