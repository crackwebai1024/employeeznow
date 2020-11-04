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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PublishIcon from '@material-ui/icons/Publish';
import { countryOptions } from './AddressState'

const invalidError = "This field is invalid!"

const useStyles = makeStyles((theme) => ({
  avatar: {
    marginRight: '2rem',
    background: theme.palette.common.blue,
  },
  formControl: {
    marginTop: '1rem',
    backgroundColor: 'transparent',
  },
  uploadButton: {
    marginTop: '1rem'
  },
  uploadImage: {
    width: "150px",
    height: "150px"
  },
  heading1: {
    fontSize: '30px',
    fontWeight: 600
  },
  button: {
    marginTop: 30,
    marginBottom: 25,
  },
  linkContainer: {
    marginBottom: '2rem',
  },
  input: {
    display: 'none',
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
  wrapper: {
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.16)",
    maxWidth: '500px',
    position: "relative",
    top: '5rem',
    padding: '2rem',
    margin: 'auto',
  },
  stateError: {
    color: theme.palette.error.main,
  },
  stateLabel: {
    background: 'white'
  }
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

  const email = useRef({})
  email.current = watch("email", "");
  // address.state error customized check
  const [stateError, setStateError] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [veteran, setVeteran] = useState({ status: false, veteranId: "" });
  const [veteranError, setVeteranError] = useState("")
  const [veteranCard, setVeteranCard] = useState(null)
  // material-ui
  const classes = useStyles();

  const onChange = (e) => {
    if (e.target.name == 'status')
      return setVeteran({
        ...veteran,
        status: !veteran.status
      })

    if (e.target.name == 'veteranId') {
      setVeteran({
        ...veteran,
        veteranId: e.target.value
      })
    }
  }

  // check if address.state has value. It it has value, errror => false
  const handleChange = (e) => {
    register({ name: 'address.state', value: e.target.value })
    if (e.target.value) setStateError(false);
  };

  useEffect(() => {
    if (emailFailure)
      setEmailError("Someone used this email. If you already registered, then please log in.")
  }, [emailFailure])

  const uploadVeteranCard = (e, type) => {
    const formData = new FormData();
    formData.append("type", type)
    formData.append("content", e.target.files[0])
    formData.append("fname", e.target.files[0].name)
    setVeteranCard(formData);
  }
  // connected to action
  const onSubmit = async (formData) => {
    if (veteran.status && veteran.veteranId == "") {
      return setVeteranError("This field is required")
    }
    if (veteran.status && veteranCard == null) {
      return setVeteranError("please Upload Veteran Card Image!")
    }
    if (!formData.address.state) return setStateError(true)

    if (veteran.veteranId) {
      veteranCard.append("veteranId", veteran.veteranId);

      actions.saveVeteranCard(veteranCard)
    }

    if (formData) {
      let data = {
        ...formData,
        role: "employee"
      }
      actions.signupRequest(data)
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
    <Container component="main" maxWidth="sm" style={{ paddingBottom: '10rem' }}>
      <Grid container direction="column" justify="center" alignItems="center" className={classes.wrapper}>
        <Grid item style={{ display: 'flex' }}>
          <Avatar className={classes.avatar}>
            <VpnKeyOutlinedIcon />
          </Avatar>
          <Typography className={classes.heading1}>Employee Sign Up</Typography>
        </Grid>
        <form onSubmit={(e) => e.preventDefault()}>
          <Grid item container direction="row" spacing={1}>
            <Grid item xs={12}>
              <TextField
                error={errors.firstName ? true : false}
                helperText={errors.firstName ? invalidError : ''}
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
                error={errors.middleName ? true : false}
                helperText={errors.middleName ? invalidError : ''}
                variant="outlined"
                size="small"
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
            <Grid item xs={12}>
              <TextField
                error={errors.lastName ? true : false}
                helperText={errors.lastName ? invalidError : ''}
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
                size="small"
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
                <InputLabel htmlFor="address.state" className={classes.stateLabel}>State</InputLabel>

                <Select
                  native
                  labelId="address.state"
                  id="address.state"
                  key="address.state"
                  onChange={(e) => handleChange(e)}
                >
                  <option aria-label="None" value="" />
                  {
                    countryOptions.map((option, item) => {
                      return <option key={item} value={option.value}>{option.label}</option>
                    })
                  }
                </Select>
              </FormControl>
            </Grid>

            <Grid item sm={4} xs={12}>
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
                error={errors.email ? true : false}
                helperText={errors.email ? invalidError : ''}
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
                helperText={errors.emailConfirm ? invalidError : ''}
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
                    value === email.current || 'The email do not match',
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
                size="small"
                name="passwordConfirm"
                autoComplete="passwordConfirm"
                inputRef={register({
                  validate: (value) =>
                    value === password.current || 'The passwords do not match',
                })}
              />
            </Grid>
            <Grid>
              {/* veteran status */}
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="status"
                      id="veteran"
                      checked={veteran.status}
                      value={veteran.status}
                      onChange={(e) => onChange(e)}
                    />
                  }
                  label="Are you a veteran ?"
                  className={classes.checkboxText}
                />

                {veteran.status ? (
                  <Grid item container direction="column" justify="center" alignItems="center">
                    <img
                      className={classes.uploadImage}
                      src={veteranCard && URL.createObjectURL(veteranCard.getAll("content")[0])}>
                    </img>
                    <Grid>
                      <input
                        accept="*"
                        className={classes.input}
                        id="contained-button-license"
                        multiple
                        onChange={e => uploadVeteranCard(e, "veteran")}
                        type="file"
                      />
                    </Grid>
                    <Grid>
                      <label htmlFor="contained-button-license">
                        <Button color="primary" component="span" className={classes.uploadButton}>
                          <PublishIcon />Upload Image
                        </Button>
                      </label>
                    </Grid>
                    {/* formData.append("fname", e.target.files[0].name) */}
                    <TextField
                      type="text"
                      name="veteranId"
                      helperText={
                        veteranError ? veteranError : ''
                      }
                      error={veteranError ? true : false}
                      id="veteran"
                      label="Veteran ID"
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={veteran.veteranId}
                      onChange={(e) => onChange(e)}
                    />
                  </Grid>
                ) : (
                    ''
                  )}
              </Grid>
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
              color="secondary"
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
    phoneVerifyNeed, signupLoading, emailFailure, isEmailCodeError
  },
}) => ({
  phoneVerifyNeed, signupLoading, emailFailure, isEmailCodeError
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...authActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeForm);
