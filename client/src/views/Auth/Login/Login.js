import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Grid, TextField, FormControlLabel, Box } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import MainButton from '@components/Element/Button/MainButton';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { actions as authActions } from '@store/auth';
import PasswordInput from '@components/PasswordInput'
import { bindActionCreators } from 'redux';

const useStyles = makeStyles((theme) => ({
  avatar: {
    marginRight: theme.spacing(2),
    background: theme.palette.common.blue,
  },
  eye: {
    cursor: 'pointer',
  },

  heading1: {
    fontSize: '30px',
    marginBottom: '1rem',
  },
  button: {
    marginTop: 30,
    marginBottom: 25,
  },
  linkContainer: {
    marginTop: '0.3rem',
    borderTop: 'solid 1px lightgray'
    // marginBottom: '8rem',
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.common.blue,
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },
  wrapper: {
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.16)",
    maxWidth: '500px',
    // position: "relative",
    background: theme.palette.common.white,
    top: '5rem',
    padding: '2rem',
    margin: 'auto',
    [theme.breakpoints.down('xs')]: {
      padding: "1rem"
    },
  },
  invalidMessage: {
    textAlign: 'center',
    color: theme.palette.error.main,
    marginBottom: '2rem',
  }
}));

const Login = ({ actions, errorMessage, isAuthenticated, slug, loginStatus }) => {
  const { register, handleSubmit, errors } = useForm({});
  const [error, setError] = useState('')
  const classes = useStyles();

  const onSubmit = (formData) => {
    actions.loginRequest(formData)
  };

  const handleInputChange = () => {
    setError('')
  }

  useEffect(() => {
    if (loginStatus == "FAILURE") {
      setError("Email or Password is not correct")
    }
  }, [loginStatus])

  //Redirect to each account page after logged in
  if (isAuthenticated && localStorage.getItem('role') === 'employer') {
    return <Redirect to={`/employers/${slug}`} />;
  }

  if (isAuthenticated && localStorage.getItem('role') === 'employee') {
    return <Redirect to={`/employees/${slug}`} />;
  }

  return (
    <Container>
      <Grid container direction="column" alignItems="center" className={classes.wrapper}>
        <Grid item style={{ display: 'flex' }}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h1" className={classes.heading1}>
            Log In
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

          <TextField
            error={errors.email ? true : false}
            helperText={errors.email ? 'Invalid Email' : ''}
            variant="outlined"
            margin="normal"
            onChange={handleInputChange}
            required
            fullWidth
            name="email"
            label="Email"
            type="email"
            size="small"
            id="email"
            autoComplete="email"
            autoFocus
            inputRef={register({
              required: true,
              pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
          <PasswordInput
            error={errors.password ? true : false}
            label="password"
            size="small"
            helperText={
              errors.password ? 'Passwords must be minimum 8 characters' : ''
            }
            name="password"
            inputRef={register({
              required: true,
              minLength: 8,
            })}
          />
          <Box className={classes.button}>
            <MainButton
              width="100%"
              label="LOG IN"
              background="green"
              border="green"
              hoverColor="white"
              hoverBack="#007000"
              color="white"
              fontSize={16}
              onClick={handleSubmit(onSubmit)}
            >
            </MainButton>
          </Box>
          {/* errorMassge when authentication is failed */}
          {error && (
            <Grid item className={classes.invalidMessage}>
              {error}
            </Grid>
          )}
        </form>
        <hr/>
        <Grid
          container
          direction="row"
          justify="center"
          spacing={5}
          className={classes.linkContainer}
        >
          <Grid item>
            <Link to="/forgotPassword" className={classes.link}>
              Forgot your password?
            </Link>
          </Grid>
          <Grid item>
            <Link to="/signup" className={classes.link}>
              Don&apos;t have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = ({
  auth: {
    signupUser, isSentPhoneNumber, isAuthenticated, user, loginStatus
  },
}) => ({
  signupUser, isSentPhoneNumber, isAuthenticated, user, loginStatus
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...authActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);