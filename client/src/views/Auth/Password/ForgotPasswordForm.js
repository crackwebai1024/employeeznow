import React, { useState, useEffect } from 'react';
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
import { successMessage } from '@helpers/utils';
import { bindActionCreators } from 'redux';

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

const Login = ({ actions, errorMessage, loading, slug, changepassword }) => {
  const { register, handleSubmit, errors } = useForm({});
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const classes = useStyles();

  const onSubmit = (formData) => {
    actions.forgotPasswordRequest(formData)
  };

  const handleInputChange = () => {
    setError('')
  }

  useEffect(() => {
    if(success){
      setTimeout(() => {
        setSuccess(false)
      }, [8000])
    }
  }, [success])

  useEffect(() => {
    if(changepassword == "SUCCESS") {
      setSuccess(true)
    } else if(changepassword == "FAILURE") {
      setError("Email is Invalid.")
      setSuccess(false)
    }
  }, [changepassword])

  return (
    <Container>
      {success && successMessage("Cool")}
      <Grid container direction="column" className={classes.container} alignItems="center">
        <Grid item>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
        </Grid>
        <Grid item>
          <Typography variant="h1" className={classes.heading1}>
            Please Input Your Verify Email.
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
            id="email"
            autoComplete="email"
            autoFocus
            inputRef={register({
              required: true,
              pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
          <Grid item container>
            <Grid xs={5}>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                color="primary"
                onClick={handleSubmit(onSubmit)}
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
                disabled = {loading}
                color="primary"
                onClick={handleSubmit(onSubmit)}
                className={classes.button}
              >
                Confirm
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
    signupUser, loading, changepassword, user, loginStatus
  },
}) => ({
  signupUser, loading, changepassword, user, loginStatus
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...authActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);