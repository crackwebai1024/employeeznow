import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Grid, TextField, Box } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Typography from '@material-ui/core/Typography';
import { actions as authActions } from '@store/auth';
import MainButton from '@components/Element/Button/MainButton';
import { successMessage } from '@helpers/utils';
import { bindActionCreators } from 'redux';

const useStyles = makeStyles((theme) => ({
  avatar: {
    marginRight: theme.spacing(2),
    background: theme.palette.common.blue,
    alignItems: 'center'
  },
  eye: {
    cursor: 'pointer',
  },
  form: {
    maxWidth: '30rem',
    width: "100%",
  },
  heading1: {
    marginBottom: '1.5rem',
    marginTop: '0.5rem',
    fontSize: '24px',
    textAlign: 'center'
  },
  button: {
    marginTop: 30,
    height: '42px',
    marginBottom: 25,
  },
  container: {
    background: 'white',
    padding: '2rem',
    maxWidth: "600px",
    margin: "auto",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.16)",
    [theme.breakpoints.down('xs')]: {
      padding: '1rem'
    }
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
  const history = useHistory();

  const onSubmit = (formData) => {
    actions.forgotPasswordRequest(formData)
  };

  const handleInputChange = () => {
    setError('')
  }

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false)
      }, [8000])
    }
  }, [success])

  useEffect(() => {
    if (changepassword === "SUCCESS") {
      setSuccess(true)
    } else if (changepassword === "FAILURE") {
      setError("Email is Invalid.")
      setSuccess(false)
    }
  }, [changepassword])

  return (
    <Container>
      {success && successMessage("Sent the Forgot Password link to you email.")}
      <Grid container direction="column" className={classes.container} alignItems="center">
        <Grid item style={{ display: 'flex' }}>
          <Avatar className={classes.avatar}>
            <MailOutlineIcon />
          </Avatar>
        </Grid>
        <Grid item>
          <Typography variant="h1" className={classes.heading1}>
            Please Input Your Verify Email
          </Typography>
        </Grid>

        <form onSubmit={(e) => e.preventDefault()} className={classes.form}>
          <Grid container item xs={12} width="sm">

          </Grid>
          <Grid item xs={12}>
            <RadioGroup aria-label="role">
              <Grid item container direction="row" justify="center">
                <Grid>
                  <FormControlLabel
                    control={<Radio value="employer" />}
                    label="EMPLOYER"
                    name="role"
                    id="employer"
                    inputRef={register({ required: true })}
                  />
                </Grid>
                <Grid>
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
          </Grid>

          <Grid item xs={12}>
            <TextField
              error={errors.email ? true : false}
              helperText={errors.email ? 'Invalid Email' : ''}
              variant="outlined"
              margin="normal"
              onChange={handleInputChange}
              required
              size="small"
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
          </Grid>

          <Grid item container spacing={2}>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                onClick={e => history.push("/login")}
                className={classes.button}
              >
                Back
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Box className={classes.button}>
                <MainButton
                  background="green"
                  pd={20} fontSize={20}
                  bd={3}
                  label="Confirm"
                  width="100%"
                  hoverBack="#007000"
                  onClick={handleSubmit(onSubmit)}
                  border="green"
                  color="white"
                  hoverColor="white"
                >
                </MainButton>
              </Box>
              {/* <Button
                fullWidth
                variant="contained"
                disabled={loading}
                color="primary"
                
                className={classes.button}
              >
                Confirm
              </Button> */}
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