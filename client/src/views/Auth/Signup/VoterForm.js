import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { actions as authActions } from "@store/auth";
import { bindActionCreators } from "redux";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Grid, TextField } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import PasswordInput from "@components/PasswordInput";
import Button from "@material-ui/core/Button";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";
import Typography from "@material-ui/core/Typography";

const invalidError = "This field is invalid!";

const useStyles = makeStyles((theme) => ({
  avatar: {
    marginRight: "2rem",
    background: theme.palette.common.blue,
  },

  heading1: {
    fontSize: "30px",
    fontWeight: 600,
    marginBottom: "1.5rem",
  },
  button: {
    marginTop: 30,
    marginBottom: 25,
  },
  linkContainer: {
    marginBottom: "2rem",
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
  wrapper: {
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.16)",
    maxWidth: "500px",
    position: "relative",
    background: theme.palette.common.white,
    top: "5rem",
    padding: "2rem",
    margin: "auto",
  },
}));

const EmployeeForm = (props) => {
  const { actions, voterEmailValid } = props;
  // react-hook-form setup
  const { register, handleSubmit, errors, watch } = useForm({});
  const password = useRef({});
  password.current = watch("password", "");

  const email = useRef({});
  email.current = watch("email", "");
  const [emailError, setEmailError] = useState("");

  // material-ui
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSubmit = (e) => {
    actions.voterEmailConfirmRequest(e);
  };

  if (voterEmailValid === "SUCCESS")
    return <Redirect to="/signup/phoneverify" />;

  return (
    <Container
      component="main"
      maxWidth="sm"
      style={{ paddingBottom: "10rem" }}
    >
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.wrapper}
      >
        <Grid item style={{ display: "flex" }}>
          <Avatar className={classes.avatar}>
            <VpnKeyOutlinedIcon />
          </Avatar>
          <Typography className={classes.heading1}>Voter Sign Up</Typography>
        </Grid>
        <form onSubmit={(e) => e.preventDefault()}>
          <Grid item container direction="row" spacing={1}>
            <Grid item xs={12}>
              <TextField
                error={errors.firstName ? true : false}
                helperText={errors.firstName ? invalidError : ""}
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

            <Grid item xs={12}>
              <TextField
                error={errors.lastName ? true : false}
                helperText={errors.lastName ? invalidError : ""}
                required
                variant="outlined"
                margin="normal"
                fullWidth
                size="small"
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
                error={errors.email ? true : false}
                helperText={errors.email ? invalidError : ""}
                required
                variant="outlined"
                margin="normal"
                fullWidth
                name="email"
                size="small"
                label="Email Address"
                type="email"
                id="email"
                autoComplete="email"
                inputRef={register({
                  required: true,
                  pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                error={errors.emailConfirm ? true : false}
                helperText={errors.emailConfirm ? invalidError : ""}
                required
                variant="outlined"
                margin="normal"
                size="small"
                fullWidth
                name="emailConfirm"
                label="Email Address Confirm"
                type="email"
                id="email"
                autoComplete="email"
                inputRef={register({
                  required: true,
                  pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  validate: (value) =>
                    value === email.current || "The email do not match",
                })}
              />
            </Grid>

            <Grid item xs={12}>
              <PasswordInput
                error={errors.password ? true : false}
                name="password"
                label="Password"
                size="small"
                helperText={
                  errors.password ? "Password must be munimum 8 characters" : ""
                }
                id="password"
                autoComplete="password"
                inputRef={register({
                  required: true,
                  minLength: 8,
                })}
              />
            </Grid>

            <Grid item xs={12}>
              <PasswordInput
                error={errors.passwordConfirm ? true : false}
                label="Password Confirm"
                helperText={
                  errors.passwordConfirm ? "Passwords do not match" : ""
                }
                id="passwordConfirm"
                size="small"
                name="passwordConfirm"
                autoComplete="passwordConfirm"
                inputRef={register({
                  validate: (value) =>
                    value === password.current || "The passwords do not match",
                })}
              />
            </Grid>
            {emailError && (
              <Grid item className={classes.invalidMessage}>
                {emailError}
              </Grid>
            )}

            <Button
              disabled={voterEmailValid === "REQUEST"}
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              onClick={handleSubmit(onSubmit)}
              className={classes.button}
            >
              Next
            </Button>
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

const mapStateToProps = ({ auth: { voterEmailValid } }) => ({
  voterEmailValid,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      ...authActions,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeForm);
