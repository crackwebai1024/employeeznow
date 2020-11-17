import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";
import Typography from "@material-ui/core/Typography";
import MuiPhoneNumber from "material-ui-phone-number";
import GoogleLibPhoneNumber from "google-libphonenumber";
import ReactCodeInput from "react-code-input";
import { actions as authActions } from "@store/auth";
import { bindActionCreators } from "redux";
import { makeStyles } from "@material-ui/core/styles";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    background: theme.palette.common.blue,
  },
  formControl: {
    marginTop: "1.3rem",
    backgroundColor: "transparent",
  },
  heading1: {
    ...theme.typography.h1,
    [theme.breakpoints.down("xs")]: {
      ...theme.typography.h2,
      textAlign: "center",
    },
    marginBottom: "1.5rem",
  },
  button: {
    marginTop: "1.5rem",
  },
  linkContainer: {
    marginBottom: "8rem",
  },
  container: {
    width: "80%",
    marginBottom: '1.5rem'
  },
  link: {
    textDecoration: "none",
    color: theme.palette.common.blue,
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
  invalidMessage: {
    textAlign: "center",
    color: theme.palette.error.main,
    marginBottom: "2rem",
  },
  companyInfo: {
    marginTop: "3rem",
    marginBottom: "-1rem",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
  },
  horizontal: {
    border: "none",
    borderTop: `1px dotted ${theme.palette.common.blue}`,
  },
  contactInfo: {
    marginTop: "1rem",
    marginBottom: "-1rem",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
  },
  description: {
    marginBottom: 15,
    textAlign: "center",
  },
  emailInfo: {
    ...theme.typography.caption,
    marginTop: "-1.3rem",
    color: theme.palette.common.blue,
  },
  stateError: {
    color: theme.palette.error.main,
  },
}));

const PhoneVerification = ({
  isSingupUser,
  isAuthenticated,
  user,
  veteranCardData,
  digicodeConfirmError,
  isSentPhoneNumber,
  actions,
  signupUser,
}) => {
  // react-hook-form setup
  const { register, handleSubmit, errors, watch } = useForm({});
  // address.state error customized check
  const [error, setError] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState({});
  const [digitCode, setDigitCode] = useState("");
  const [phoneData, setPhoneData] = useState({});
  // material-ui
  const classes = useStyles();

  const handleDigit = (e) => {
    setError("");
    setDigitCode(e);
  };

  useEffect(() => {
    if (digicodeConfirmError) setError("Please Input correct 6 Digit code!");
  }, [digicodeConfirmError]);

  const onSendDigitCode = () => {
    if (digitCode.length == 6) {
      let confirmedSixCode = {
        sixDigitCode: digitCode,
      };
      let cellNumber = {
        cell: "" + phoneData.countryCode + phoneData.phoneNumber,
      };
      let role = {
        role: "employee",
      };
      let confirmData = {
        ...confirmedSixCode,
        ...signupUser,
        ...cellNumber,
        ...role,
        ...phoneData,
      };
      actions.signupConfirmRequest({ confirmData, veteranCardData });
    } else {
      setError("Please Input 6 Digit");
    }
  };

  const onConfirm = (e, data) => {
    const phoneUtil = GoogleLibPhoneNumber.PhoneNumberUtil.getInstance();
    // Print the phone's country code.
    try {
      const number = phoneUtil.parseAndKeepRawInput(
        phone,
        countryCode.dialCode
      );
      if (number) {
        if (phoneUtil.isPossibleNumber(number)) {
          const data = {
            phoneNumber: number.getNationalNumber(),
            countryCode: number.getCountryCode(),
          };
          setPhoneData(data);
          actions.phoneVerifyRequestRequest(data);
          console.log(data, "data is sent!");
        } else {
          setError("Phone number is invalid!");
        }
      }
    } catch {
      setError("Phone number is invalid!");
      return;
    }
  };

  const props = {
    className: "reactCodeInput",
    inputStyleInvalid: {
      fontFamily: "monospace",
      margin: "4px",
      MozAppearance: "textfield",
      width: "15px",
      borderRadius: "3px",
      fontSize: "14px",
      height: "26px",
      paddingLeft: "7px",
      backgroundColor: "black",
      color: "red",
      border: "1px solid red",
    },
  };

  // connected to action
  const handlePhoneChange = (value, data) => {
    setPhone(value);
    setCountryCode(data);
    setError("");
  };

  // Redirect to employer account page after sign up
  if (isAuthenticated) {
    return <Redirect to={`/employees/${user.slug}`} />;
  }
  if (!isSingupUser) {
    return <Redirect to="/signup/employee" />;
  }

  const onBack = () => {
    actions.signupuserEmpty();
  };

  const onDigitBack = () => {
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
          <Typography className={classes.heading1}>
            {isSentPhoneNumber ? "6 Digit Code" : "Phone Verification"}
          </Typography>
        </Grid>
        {isSentPhoneNumber ? (
          <Fragment>
            <Typography className={classes.description}>
              We sent 6 digit code to your phone. Please Input the digit code.
            </Typography>
            <ReactCodeInput
              type="text"
              fields={6}
              {...props}
              error={error}
              onChange={handleDigit}
            />
            {error && (
              <Grid item className={classes.invalidMessage}>
                {error}
              </Grid>
            )}
            <Grid item container className={classes.container}>
              <Grid xs={5}>
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
        ) : (
            <form onSubmit={(e) => e.preventDefault()}>
              <Grid item container direction="row" spacing={0}>
                {/* {error && (
                  <Grid item className={classes.invalidMessage}>
                    {error}
                  </Grid>
                )} */}
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
                <Grid item container>
                  <Grid xs={5}>
                    <Button
                      type="submit"
                      variant="outlined"
                      color="primary"
                      fullWidth
                      onClick={onBack}
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
                      onClick={onConfirm}
                      className={classes.button}
                    >
                      Send Code
                  </Button>
                  </Grid>
                </Grid>

                {/* If authorization was failed */}
              </Grid>
            </form>
          )}
      </Grid>
    </Container>
  );
}

const mapStateToProps = ({
  auth: {
    signupUser, isSentPhoneNumber, isAuthenticated, user, digicodeConfirmError, isSingupUser, veteranCardData,
  },
}) => ({
  signupUser, isSentPhoneNumber, isAuthenticated, user, digicodeConfirmError, isSingupUser, veteranCardData,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      ...authActions,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneVerification);
