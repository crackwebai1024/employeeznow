import React, { useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions as authActions } from '@store/auth';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import PasswordInput from '@components/PasswordInput'
import Button from '@material-ui/core/Button';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { countryOptions } from './AddressState'

const invalidError = "This field is invalid!"

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
  emailInfo: {
    ...theme.typography.caption,
    marginTop: '-1.3rem',
    color: theme.palette.common.blue,
  },
  stateError: {
    color: theme.palette.error.main,
  },
}));

const EmployeeForm = ({
  // signupEmployee,
  actions,
  emailFailure,
  signupLoading,
  phoneVerifyNeed,
  errorMessage,
  isAuthenticated,
  slug,
}) => {
  // react-hook-form setup
  const { register, handleSubmit, errors, watch } = useForm({});
  const password = useRef({});
  password.current = watch('password', '');

  // address.state error customized check
  const [stateError, setStateError] = useState(false);
  const [emailError, setEmailError] = useState('')
  // material-ui
  const classes = useStyles();

  // check if address.state has value. It it has value, errror => false
  const handleChange = (e) => {
    register({ name: 'address.state', value: e.target.value })
    if (e.target.value) setStateError(false);
  };

  useEffect(() => {
    if (emailFailure)
      setEmailError("Someone used this email. If you already registered, then please log in.")
  }, [emailFailure])


  // connected to action
  const onSubmit = async (formData) => {
    if (!formData.address.state) return setStateError(true)
    if (formData) {
      actions.signupRequest(formData)
    }
  };
  // Redirect to employer account page after sign up
  if (isAuthenticated) {
    return <Redirect to={`/employees/${slug}`} />;
  }
  if (phoneVerifyNeed) {
    return <Redirect to='/signup/phoneverify' />
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
          <Typography className={classes.heading1}>Employee Sign Up</Typography>
        </Grid>
        <form onSubmit={(e) => e.preventDefault()}>
          <Grid item container direction="row" spacing={2}>
            <Grid item sm={12}>
              <TextField
                error={errors.firstName ? true : false}
                helperText={errors.firstName ? invalidError : ''}
                required
                variant="outlined"
                margin="normal"
                fullWidth
                name="firstName"
                label="First Name"
                type="text"
                id="firstName"
                autoComplete="firstName"
                inputRef={register({ required: true })}
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                error={errors.middleName ? true : false}
                helperText={errors.middleName ? invalidError : ''}
                variant="outlined"
                margin="normal"
                fullWidth
                name="middleName"
                label="Middle Name"
                type="text"
                id="middleName"
                autoComplete="middleName"
                inputRef={register}
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                error={errors.lastName ? true : false}
                helperText={errors.lastName ? invalidError : ''}
                required
                variant="outlined"
                margin="normal"
                fullWidth
                name="lastName"
                label="Last Name"
                type="text"
                id="lastName"
                autoComplete="lastName"
                inputRef={register({ required: true })}
              />
            </Grid>
            <Grid item sm={8} xs={12}>
              <TextField
                error={errors.address && errors.address.street1 ? true : false}
                helpertext={
                  errors.address && errors.address.street1
                    ? invalidError
                    : ''
                }
                variant="outlined"
                margin="normal"
                required
                fullWidth
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
                name="address.street2"
                label="Apt / Suite"
                type="text"
                id="street2"
                autoComplete="street2"
                inputRef={register}
              />
            </Grid>
            <Grid item sm={4} xs={6}>
              <TextField
                error={errors.address && errors.address.city ? true : false}
                helpertext={
                  errors.address && errors.address.city
                    ? invalidError
                    : ''
                }
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="address.city"
                label="City"
                type="text"
                id="city"
                autoComplete="city"
                inputRef={register({ required: true, minLength: 2 })}
              />
            </Grid>
            <Grid item sm={4} xs={6}>
              <FormControl
                required
                error={stateError ? true : false}
                // helpertext={stateError ? 'Please select state' : ''}
                className={classes.formControl}
              >
                <InputLabel htmlFor="address.state">State</InputLabel>

                <Select
                  native
                  labelId="address.state"
                  id="address.state"
                  key="address.state"
                  onChange={(e) => handleChange(e)}
                >
                  {
                    countryOptions.map((option, item) => {
                      return <option key={item} value={option.value}>{option.label}</option>
                    })
                  }
                </Select>
              </FormControl>
            </Grid>

            <Grid item sm={4} xs={6}>
              <TextField
                error={errors.address && errors.address.zipcode ? true : false}
                helperText={
                  errors.address && errors.address.zipcode
                    ? invalidError
                    : ''
                }
                required
                variant="outlined"
                margin="normal"
                fullWidth
                name="address.zipcode"
                label="Zip Code"
                type="text"
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
                error={errors.email ? true : false}
                helperText={errors.email ? invalidError : ''}
                required
                variant="outlined"
                margin="normal"
                fullWidth
                name="email"
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
            {emailError &&
              <Grid item className={classes.invalidMessage}>
                {emailError}
              </Grid>
            }
            <Button
              disabled={signupLoading}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit)}
              className={classes.button}
            >
              Next
            </Button>
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
                ''
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

const mapStateToProps = ({
  auth: {
    phoneVerifyNeed, signupLoading, emailFailure
  },
}) => ({
  phoneVerifyNeed, signupLoading, emailFailure
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...authActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeForm);

