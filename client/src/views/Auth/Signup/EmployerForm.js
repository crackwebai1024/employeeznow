import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {
  Grid,
  Box,
  TextField,
  Avatar,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MainButton from "@components/Element/Button/MainButton";
import Select from "@material-ui/core/Select";
import { actions as authActions } from "@store/auth";
import { bindActionCreators } from "redux";
import { countryOptions } from "./AddressState";
import _ from "lodash";

// set styles - material-ui
const useStyles = makeStyles((theme) => ({
  avatar: {
    marginRight: theme.spacing(2),
    background: theme.palette.common.blue,
  },
  policy: {
    display: "flex",
    marginLeft: "1rem",
    height: "28px",
    // color: theme.palette.common.blue,
  },
  formControl: {
    marginTop: "1rem",
    backgroundColor: "transparent",
  },
  heading1: {
    fontSize: "30px",
    marginBottom: "1.5rem",
  },
  button: {
    marginTop: 30,
    marginBottom: 25,
  },
  linkContainer: {
    marginBottom: "2rem",
    margin: "auto",
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
    marginTop: "1rem",
    marginBottom: "-1rem",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
  },
  wrapper: {
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.16)",
    maxWidth: "500px",
    position: "relative",
    top: "5rem",
    padding: "2rem",
    margin: "auto",
    background: theme.palette.common.white,
    [theme.breakpoints.down("xs")]: {
      padding: "1rem",
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
  emailInfo: {
    ...theme.typography.caption,
    marginTop: "-0.5rem",
    color: theme.palette.common.blue,
  },
  stateLabel: {
    background: "white",
  },
  buttonWrapper: {
    width: "100%",
    marginTop: "1rem",
    marginBottom: "2rem",
  },
}));

const EmployerForm = ({
  // signupEmployer,
  errorMessage,
  actions,
  signupUser,
  isAuthenticated,
  slug,
}) => {
  // react-hook-form setup
  const { register, handleSubmit, errors, watch } = useForm({});
  const password = useRef({});
  password.current = watch("password", "");

  // address.state error customized check
  const [stateError, setStateError] = useState("");

  const [policy, confirmPolicy] = useState(false);
  const [policyError, setPolicyError] = useState("");
  // material-ui
  const classes = useStyles();

  // check if address.state has value. It it has value, errror => false
  const handleChange = (e) => {
    register({ name: "address.state", value: e.target.value });
    if (e.target.value) setStateError(false);
  };

  // connected to action
  const onSubmit = (formData) => {
    setPolicyError("");
    if (!formData.address.state) return setStateError(true);
    if (!policy) {
      return setPolicyError("Please check the Terms & Condition");
    }
    if (formData) {
      let data = {
        ...formData,
        role: "employer",
      };
      actions.employerSignupRequest(data);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Redirect to employer account page after sign up
  if (isAuthenticated) {
    return <Redirect to={`/employers/${slug}`} />;
  }

  if (!_.isEmpty(signupUser)) {
    return <Redirect to="/signup/emailverify" />;
  }

  const handleCheck = (e) => {
    confirmPolicy(e.target.checked);
  };

  return (
    <Container maxWidth="sm" style={{ paddingBottom: "10rem" }}>
      <Grid
        container
        direction="column"
        alignItems="center"
        className={classes.wrapper}
      >
        <Grid item style={{ display: "flex" }}>
          <Avatar className={classes.avatar}>
            <VpnKeyOutlinedIcon />
          </Avatar>
          <Typography variant="h1" className={classes.heading1}>
            Employer Sign Up
          </Typography>
        </Grid>

        <form onSubmit={(e) => e.preventDefault()}>
          <Grid item container direction="row" spacing={1}>
            <Grid item sm={12} xs={12}>
              <Typography variant="h6" className={classes.companyInfo}>
                COMPANY INFORMATION:
              </Typography>
            </Grid>

            <Grid item sm={12} xs={12}>
              <TextField
                error={errors.name ? true : false}
                helperText={errors.name ? "This filed is required" : ""}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                size="small"
                name="name"
                label="Company Name"
                type="text"
                id="name"
                autoComplete="name"
                inputRef={register({ required: true })}
              />
            </Grid>

            <Grid item sm={8} xs={12}>
              <TextField
                error={errors.address && errors.address.street1 ? true : false}
                helperText={
                  errors.address && errors.address.street1
                    ? "This filed is required"
                    : ""
                }
                variant="outlined"
                margin="normal"
                required
                fullWidth
                size="small"
                name="address.street1"
                label="Street"
                type="text"
                id="street1"
                autoComplete="street1"
                inputRef={register({ required: true, minLength: 2 })}
              />
            </Grid>

            <Grid item sm={4} xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                size="small"
                name="address.street2"
                label="Apt / Suite"
                type="text"
                id="street2"
                autoComplete="street2"
                inputRef={register}
              />
            </Grid>

            <Grid item sm={4} xs={12}>
              <TextField
                error={errors.address && errors.address.city ? true : false}
                helperText={
                  errors.address && errors.address.city
                    ? "This filed is required"
                    : ""
                }
                variant="outlined"
                margin="normal"
                required
                fullWidth
                size="small"
                name="address.city"
                label="City"
                type="text"
                id="city"
                autoComplete="city"
                inputRef={register({ required: true, minLength: 2 })}
              />
            </Grid>

            <Grid item sm={4} xs={12}>
              <FormControl
                required
                size="small"
                variant="outlined"
                fullWidth
                error={stateError ? true : false}
                className={classes.formControl}
              >
                <InputLabel
                  htmlFor="address.state"
                  className={classes.stateLabel}
                >
                  State
                </InputLabel>

                <Select
                  native
                  labelId="address.state"
                  id="address.state"
                  key="address.state"
                  onChange={(e) => handleChange(e)}
                >
                  <option aria-label="None" value="" />
                  {countryOptions.map((option, item) => {
                    return (
                      <option key={item} value={option.value}>
                        {option.label}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item sm={4} xs={12}>
              <TextField
                error={errors.address && errors.address.zipcode ? true : false}
                helperText={
                  errors.address && errors.address.zipcode
                    ? "This filed is required"
                    : ""
                }
                required
                variant="outlined"
                margin="normal"
                fullWidth
                name="address.zipcode"
                label="Zip Code"
                type="text"
                size="small"
                id="zipcode"
                autoComplete="zipcode"
                inputRef={register({
                  required: true,
                  minLength: 5,
                  maxLength: 5,
                  pattern: /^[0-9]*$/,
                })}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                error={errors.generalEmail ? true : false}
                helperText={errors.generalEmail ? "This filed is required" : ""}
                required
                variant="outlined"
                margin="normal"
                fullWidth
                size="small"
                name="generalEmail"
                label="General Email Address"
                type="email"
                id="generalEmail"
                autoComplete="generalEmail"
                inputRef={register({
                  required: true,
                  pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                error={errors.website ? true : false}
                helperText={errors.website ? "Invalid Address" : ""}
                variant="outlined"
                margin="normal"
                fullWidth
                name="website"
                size="small"
                label="Company Website"
                type="url"
                id="website"
                autoComplete="website"
                inputRef={register({
                  required: false,
                  pattern: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
                })}
              />
            </Grid>

            <Grid item xs={12}>
              <hr className={classes.horizontal} />
              <Typography variant="h6" className={classes.contactInfo}>
                CONTACT INFORMATION:
              </Typography>
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField
                error={errors.firstName ? true : false}
                helperText={errors.firstName ? "This filed is required" : ""}
                required
                variant="outlined"
                margin="normal"
                size="small"
                fullWidth
                name="firstName"
                label="First Name"
                type="text"
                id="firstName"
                autoComplete="firstName"
                inputRef={register({ required: true })}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField
                error={errors.lastName ? true : false}
                helperText={errors.lastName ? "This filed is required" : ""}
                required
                variant="outlined"
                margin="normal"
                size="small"
                fullWidth
                name="lastName"
                label="Last Name"
                type="text"
                id="lastName"
                autoComplete="lastName"
                inputRef={register({ required: true })}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                size="small"
                name="title"
                label="Title"
                type="text"
                id="title"
                autoComplete="title"
                inputRef={register}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                error={errors.phone ? true : false}
                helperText={errors.phone ? "Phone number is required" : ""}
                required
                variant="outlined"
                margin="normal"
                size="small"
                fullWidth
                name="phone"
                label="Phone Number"
                type="tel"
                id="phone"
                autoComplete="phone"
                inputRef={register({
                  required: true,
                  minLength: 10,
                  maxLength: 10,
                  pattern: /^[0-9]*$/,
                })}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                error={errors.email ? true : false}
                helperText={errors.email ? "This filed is required" : ""}
                required
                variant="outlined"
                margin="normal"
                fullWidth
                name="email"
                label="Email Address"
                size="small"
                type="email"
                id="email"
                autoComplete="email"
                inputRef={register({
                  required: true,
                  pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
              />
            </Grid>

            <Grid item sm={12} className={classes.emailInfo}>
              &#42;&#42; This email is used for log in
            </Grid>

            <Grid item xs={12}>
              <TextField
                error={errors.password ? true : false}
                helperText={
                  errors.password ? "Password must be munimum 8 characters" : ""
                }
                required
                variant="outlined"
                margin="normal"
                fullWidth
                size="small"
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="password"
                inputRef={register({
                  required: true,
                  minLength: 8,
                })}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                error={errors.password ? true : false}
                helperText={errors.password ? "Password do not match" : ""}
                required
                variant="outlined"
                margin="normal"
                size="small"
                fullWidth
                name="passwordConfirm"
                label="Password Confirm"
                type="password"
                id="passwordConfirm"
                autoComplete="passwordConfirm"
                inputRef={register({
                  validate: (value) =>
                    value === password.current || "The passwords do not match",
                })}
              />
            </Grid>

            <Grid item xs={12} className={classes.policy}>
              <FormControlLabel
                control={<Checkbox id="check" size="small" />}
                name="check"
                required
                onChange={(e) => handleCheck(e)}
              />
              <Box>
                I agree to the&nbsp;
                <a
                  className={classes.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.termsandconditionsgenerator.com/live.php?token=hGzUKi4ebKg83jsIZjOZoKviB7zt2cv6"
                >
                  Terms & Conditions
                </a>
              </Box>
            </Grid>

            <Grid item xs={12} style={{ color: "red" }}>
              {policyError}
            </Grid>

            <Box className={classes.buttonWrapper}>
              <MainButton
                width="100%"
                label="SIGN UP"
                color="white"
                border="green"
                background="green"
                hoverColor="white"
                hoverBack="#007000"
                fontSize={16}
                onClick={handleSubmit(onSubmit)}
              ></MainButton>
            </Box>
            {/* If authorization was failed */}
            {errorMessage && (
              <Grid item className={classes.invalidMessage}>
                {errorMessage}
              </Grid>
            )}

            {/* If address.state value was empty - the value was check onSubmit so added error message at the bottom */}
            {stateError ? (
              <Grid item className={classes.invalidMessage}>
                State is missing. Plese review your address fields.
              </Grid>
            ) : (
              ""
            )}
          </Grid>
        </form>

        <Grid item className={classes.linkContainer}>
          <Link to="/login" className={classes.link}>
            Alredy have an account ? Log In
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = ({ auth: { phoneVerifyNeed, signupUser } }) => ({
  phoneVerifyNeed,
  signupUser,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      ...authActions,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployerForm);
