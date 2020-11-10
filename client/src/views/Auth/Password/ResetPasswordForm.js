import React, { useState, useEffect, useRef } from 'react';
import { router } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { actions as authActions } from '@store/auth';
import PasswordInput from '@components/PasswordInput'
import { bindActionCreators } from 'redux';
import { successMessage, errorMessage } from '@helpers/utils';

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    background: theme.palette.common.blue,
  },
  eye: {
    cursor: 'pointer',
  },
  form: {
    width: '30rem'
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
}));

const Login = ({ actions, resetPassword, loading, slug }) => {
  const { register, handleSubmit, errors, watch } = useForm({});
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const classes = useStyles();

  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit = (formData) => {
    let token = window.location.pathname.split("/")[2];
    let data = {
      role: formData.role,
      newPasswordConfirm : formData.password,
      newPassword : formData.password,
      token
    }

    actions.resetPasswordRequest(data)
  };

  const handleInputChange = () => {
    setError('')
  }

  useEffect(() => {
    if (resetPassword == "SUCCESS") {
      successMessage("Successfully changed your password.")
    } else if (resetPassword == "FAILURE") {
      setError("Something Wrong!")
      // errorMessage("")
    }
  }, [resetPassword])

  return (
    <Container>
      <Grid container direction="column" className={classes.container} alignItems="center">
        <Grid item>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
        </Grid>
        <Grid item>
          <Typography variant="h1" className={classes.heading1}>
            Reset Password
          </Typography>
        </Grid>

        <form onSubmit={(e) => e.preventDefault()} className={classes.form}>
          <RadioGroup aria-label="role">
            <Grid item container direction="row" justify="center">
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
              style={{ textAlign: 'center' }}
            >
              {errors.role ? 'Please select your role' : ''}
            </FormHelperText>
          </RadioGroup>

          <Grid item xs={12}>
            <PasswordInput
              error={errors.password ? true : false}
              name="password"
              label="Password"
              helperText={
                errors.password ? 'Password must be munimum 8 characters' : ''
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
                errors.passwordConfirm ? 'Passwords do not match' : ''
              }
              id="passwordConfirm"
              name="passwordConfirm"
              autoComplete="passwordConfirm"
              inputRef={register({
                validate: (value) =>
                  value === password.current || 'The passwords do not match',
              })}
            />
          </Grid>
          <Grid item container>
            <Grid xs={5}>
            </Grid>
            <Grid xs={2}></Grid>
            <Grid xs={5}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                color="primary"
                onClick={handleSubmit(onSubmit)}
                className={classes.button}
              >
                Change Password
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
    </Container>
  );
};

const mapStateToProps = ({
  auth: {
    resetPassword, loading, changepassword, user, loginStatus
  },
}) => ({
  resetPassword, loading, changepassword, user, loginStatus
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...authActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);