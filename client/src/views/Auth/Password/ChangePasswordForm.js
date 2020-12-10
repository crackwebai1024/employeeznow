import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { actions as authActions } from "@store/auth";
import { bindActionCreators } from "redux";
import LoadingCircular from "@components/LoadingCircular";

const useStyles = makeStyles((theme) => ({
  heading1: {
    ...theme.typography.h1,
    textTransform: "uppercase",
    marginBottom: "-1rem",
  },
  button: {
    marginTop: 30,
    marginBottom: 25,
  },
  passwordWrapper: {
    width: "80%",
    [theme.breakpoints.down("sm")]: {
      width: "95%",
    },
  },
  error: {
    fontSize: "8px",
    color: "red",
  },
  invalidMessage: {
    textAlign: "center",
    color: theme.palette.error.main,
    marginBottom: "2rem",
  },
}));

const ChangePassfordForm = ({
  actions,
  changepassword,
  setOpenPassword,
  errorMessage,
}) => {
  // react-hook-form
  const { register, handleSubmit, errors, watch } = useForm({});
  const [error, setError] = useState("");
  const password = useRef({});
  password.current = watch("password", "");

  // material-ui
  const classes = useStyles();

  const onSubmit = (formData) => {
    formData.id = JSON.parse(localStorage.getItem("USER"))["_id"];
    formData.role = "employee";
    console.log(formData);
    actions.changePasswordRequest(formData);
  };

  useEffect(() => {
    if (changepassword === "FAILURE") {
      setError("Current password is not correct!");
    }
  }, [changepassword]);

  return (
    <Grid container direction="column" alignItems="center">
      {changepassword === "REQUEST" && <LoadingCircular />}
      <Box className={classes.passwordWrapper}>
        <Grid item>
          <DialogTitle id="dialog-title" className={classes.heading1}>
            Change Your Password
          </DialogTitle>
        </Grid>

        <form onSubmit={(e) => e.preventDefault()}>
          <DialogContent>
            <Grid item container>
              <TextField
                error={errors.currentPassword ? true : false}
                helperText={
                  error.currentPassword
                    ? "Password must have at leaset 8 charactors"
                    : ""
                }
                required
                variant="outlined"
                margin="normal"
                size="small"
                fullWidth
                name="currentPassword"
                label="Current Password"
                type="password"
                id="currentPassword"
                autoComplete="currentPassword"
                inputRef={register({
                  required: true,
                  minLength: 8,
                })}
              />
            </Grid>
            <Typography className={classes.error}>{error}</Typography>
            <Grid item container>
              <TextField
                error={errors.password ? true : false}
                helperText={
                  errors.password
                    ? "Password must have at leaset 8 charactors"
                    : ""
                }
                required
                variant="outlined"
                margin="normal"
                size="small"
                fullWidth
                name="password"
                label="New Password"
                type="password"
                id="password"
                autoComplete="password"
                inputRef={register({
                  required: true,
                  minLength: 8,
                })}
              />
            </Grid>

            <Grid item container>
              <TextField
                error={errors.passwordConfirm ? true : false}
                helperText={
                  errors.passwordConfirm ? "Passwords do not match" : ""
                }
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
          </DialogContent>

          <DialogActions>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              onClick={(e) => setOpenPassword(false)}
              className={classes.button}
            >
              CANCEL
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit)}
              className={classes.button}
            >
              Update
            </Button>
          </DialogActions>

          {/* If authorization was failed */}
          {errorMessage && (
            <Grid item className={classes.invalidMessage}>
              {errorMessage}
            </Grid>
          )}
        </form>
      </Box>
    </Grid>
  );
};

const mapStateToProps = ({
  employee: { employeeData, updateSuccess },
  auth: { changepassword },
}) => ({
  employeeData,
  updateSuccess,
  changepassword,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      ...authActions,
    },
    dispatch
  ),
});

// export default connect(mapStateToProps, { updatePassword })(ChangePassfordForm);
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassfordForm);
