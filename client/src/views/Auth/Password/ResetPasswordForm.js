import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Container, Avatar, Button } from "@material-ui/core";
import MainButton from "@components/Element/Button/MainButton";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { actions as authActions } from "@store/auth";
import PasswordInput from "@components/PasswordInput";
import { bindActionCreators } from "redux";
import { successMessage } from "@helpers/utils";

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    background: theme.palette.common.blue,
  },
  eye: {
    cursor: "pointer",
  },
  form: {
    width: "100%",
    padding: "0 2rem 0 2rem",
  },
  heading1: {
    ...theme.typography.h4,
    marginBottom: "1.5rem",
  },
  button: {
    marginTop: 30,
    width: "100%",
    marginBottom: 25,
  },
  container: {
    maxWidth: "600px",
    margin: "auto",
    background: "white",
    padding: "2rem 0",
    boxShadow: "0 0 4px 0 rgba(0,0,0,.08), 0 2px 4px 0 rgba(0,0,0,.12)",
  },
  linkContainer: {
    marginBottom: "8rem",
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
}));

const Login = ({ actions, resetPassword, loading, slug }) => {
  const { register, handleSubmit, errors, watch } = useForm({});
  const [error, setError] = useState("");
  const classes = useStyles();
  const history = useHistory();

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (formData) => {
    let token = window.location.pathname.split("/")[2];
    let data = {
      role: formData.role,
      newPasswordConfirm: formData.password,
      newPassword: formData.password,
      token,
    };

    actions.resetPasswordRequest(data);
  };

  useEffect(() => {
    if (resetPassword === "SUCCESS") {
      successMessage("Successfully changed your password.");
    } else if (resetPassword === "FAILURE") {
      setError("Something Wrong!");
      // errorMessage("")
    }
  }, [resetPassword]);

  return (
    <Container>
      <Grid
        container
        direction="column"
        width="sm"
        className={classes.container}
        alignItems="center"
      >
        <Grid item xs={12}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h1" className={classes.heading1}>
            Reset Password
          </Typography>
        </Grid>

        <Grid container item xs={12}>
          <form onSubmit={(e) => e.preventDefault()} className={classes.form}>
            <RadioGroup aria-label="role">
              <Grid item container direction="row" justify="center" xs={12}>
                <Grid item>
                  <FormControlLabel
                    control={<Radio value="employer" />}
                    label="EMPLOYER"
                    name="role"
                    id="employer"
                    inputRef={register({ required: true })}
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    control={<Radio value="employee" />}
                    label="EMPLOYEE"
                    name="role"
                    id="employee"
                    inputRef={register({ required: true })}
                  />
                </Grid>
              </Grid>
              <FormHelperText
                error={errors.role ? true : false}
                style={{ textAlign: "center" }}
              >
                {errors.role ? "Please select your role" : ""}
              </FormHelperText>
            </RadioGroup>

            <Grid item xs={12}>
              <PasswordInput
                error={errors.password ? true : false}
                name="password"
                fullWidth
                size="small"
                label="Password"
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
                name="passwordConfirm"
                autoComplete="passwordConfirm"
                size="small"
                inputRef={register({
                  validate: (value) =>
                    value === password.current || "The passwords do not match",
                })}
              />
            </Grid>

            <Grid item container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Box className={classes.button}>
                  <MainButton
                    background="green"
                    pd={20}
                    fontSize={18}
                    bd={3}
                    label="Change Password"
                    width="100%"
                    hoverBack="#007000"
                    onClick={handleSubmit(onSubmit)}
                    border="green"
                    color="white"
                    hoverColor="white"
                  ></MainButton>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  color="primary"
                  className={classes.button}
                  onClick={(e) => history.push("/forgotPassword")}
                  variant="outlined"
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
            {/* errorMassge when authentication is failed */}
            {error && (
              <Grid item className={classes.invalidMessage}>
                {error}
              </Grid>
            )}
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = ({
  auth: { resetPassword, loading, changepassword, user, loginStatus },
}) => ({
  resetPassword,
  loading,
  changepassword,
  user,
  loginStatus,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      ...authActions,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
