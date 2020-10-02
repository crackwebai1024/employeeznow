import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import { signupEmployer } from '../../../store/actions/auth';

// set styles - material-ui
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
}));

const EmployerForm = ({
  // signupEmployer,
  errorMessage,
  isAuthenticated,
  slug,
}) => {
  // react-hook-form setup
  const { register, handleSubmit, errors, watch } = useForm({});
  const password = useRef({});
  password.current = watch('password', '');

  // address.state error customized check
  const [stateError, setStateError] = useState('');

  // material-ui
  const classes = useStyles();

  // check if address.state has value. It it has value, errror => false
  const handleChange = (e) => {
    if (e.target.value) setStateError(false);
  };

  // connected to action
  const onSubmit = (formData) => {
    if (!formData.address.state) return setStateError(true);
    // if (!stateError) return signupEmployer(formData, 'employer');
  };

  // Redirect to employer account page after sign up
  if (isAuthenticated) {
    return <Redirect to={`/employers/${slug}`} />;
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
          <Typography variant="h1" className={classes.heading1}>
            Employer Sign Up
          </Typography>
        </Grid>

        <form onSubmit={(e) => e.preventDefault()}>
          <Grid item container direction="row" spacing={2}>
            <Grid item sm={12} xs={12}>
              <Typography variant="h6" className={classes.companyInfo}>
                COMPANY INFORMATION:
              </Typography>
            </Grid>

            <Grid item sm={12} xs={12}>
              <TextField
                error={errors.name ? true : false}
                helperText={errors.name ? 'This filed is required' : ''}
                variant="outlined"
                margin="normal"
                required
                fullWidth
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
                    ? 'This filed is required'
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
                helperText={
                  errors.address && errors.address.city
                    ? 'This filed is required'
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
                className={classes.formControl}
              >
                <InputLabel htmlFor="address.state">State</InputLabel>

                <Select
                  native
                  labelId="address.state"
                  id="address.state"
                  key="address.state"
                  onChange={(e) => handleChange(e)}
                  inputProps={{
                    name: 'address.state',
                    id: 'address.state',
                    inputRef: (ref) => {
                      if (!ref) return;
                      register(
                        // { required: !ref.value }  *does not work,
                        {
                          name: 'address.state',
                          value: ref.value,
                        }
                      );
                    },
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </Select>
              </FormControl>
            </Grid>

            <Grid item sm={4} xs={6}>
              <TextField
                error={errors.address && errors.address.zipcode ? true : false}
                helperText={
                  errors.address && errors.address.zipcode
                    ? 'This filed is required'
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
                error={errors.generalEmail ? true : false}
                helperText={errors.generalEmail ? 'This filed is required' : ''}
                required
                variant="outlined"
                margin="normal"
                fullWidth
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
                helperText={errors.website ? 'Invalid Address' : ''}
                variant="outlined"
                margin="normal"
                fullWidth
                name="website"
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
                helperText={errors.firstName ? 'This filed is required' : ''}
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

            <Grid item sm={6} xs={12}>
              <TextField
                error={errors.lastName ? true : false}
                helperText={errors.lastName ? 'This filed is required' : ''}
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

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
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
                helperText={errors.phone ? 'Phone number is required' : ''}
                required
                variant="outlined"
                margin="normal"
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
                helperText={errors.email ? 'This filed is required' : ''}
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

            <Grid item sm={12} className={classes.emailInfo}>
              &#42;&#42; This email is used for log in
            </Grid>

            <Grid item xs={12}>
              <TextField
                error={errors.password ? true : false}
                helperText={
                  errors.password ? 'Password must be munimum 8 characters' : ''
                }
                required
                variant="outlined"
                margin="normal"
                fullWidth
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
                helperText={errors.password ? 'Password do not match' : ''}
                required
                variant="outlined"
                margin="normal"
                fullWidth
                name="passwordConfirm"
                label="Password Confirm"
                type="password"
                id="passwordConfirm"
                autoComplete="passwordConfirm"
                inputRef={register({
                  validate: (value) =>
                    value === password.current || 'The passwords do not match',
                })}
              />
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit)}
              className={classes.button}
            >
              Sign Up
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

const mapStateToProps = (state) => {
  return {
    // error massage when auth was failed
    errorMessage: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated,
    slug: state.auth.slug,
  };
};

// export default connect(mapStateToProps, { signupEmployer })(EmployerForm);
export default connect(mapStateToProps, null)(EmployerForm);
/* <h1>Employer Sign Up</h1>
<form onSubmit={(e) => e.preventDefault()}>
  <div>
    <label htmlFor="name">
      <input
        type="text"
        name="name"
        placeholder="company name"
        ref={register({ required: true })}
      />
    </label>
    {errors.name && <p>Please enter a company name</p>}
  </div>

  <div>address</div>
  <div>
    <label htmlFor="street1">
      <span>street 1</span>
      <input
        type="text"
        name="address.street1"
        id="street1"
        placeholder="Street 1"
        ref={register({
          required: 'Please enter street address',
          minLength: 2,
        })}
      />
    </label>
    <ErrorMessage errors={errors} name="address.street1" as="p" />
  </div>

  <div>
    <label htmlFor="street2">
      <span>street 2</span>
      <input
        type="text"
        name="address.street2"
        id="street2"
        placeholder="Street 2"
        ref={register}
      />
    </label>
  </div>

  <div>
    <label htmlFor="city">
      <span>city</span>
      <input
        type="text"
        name="address.city"
        id="city"
        placeholder="city"
        ref={register({
          required: 'Please enter city',
          minLength: 3,
        })}
      />
    </label>
    <ErrorMessage errors={errors} name="address.city" as="p" />
  </div>

  <div>
    <label htmlFor="state">
      <span>state</span>

      <option
        name="address.state"
        id="state"
        ref={register({ required: 'Pleae option state' })}
      >
        <option value="">-- Select a State --</option>
        <option value="AL">Alabama</option>
        <option value="AK">Alaska</option>
        <option value="AZ">Arizona</option>
        <option value="AR">Arkansas</option>
        <option value="CA">California</option>
        <option value="CO">Colorado</option>
        <option value="CT">Connecticut</option>
        <option value="DE">Delaware</option>
        <option value="DC">District Of Columbia</option>
        <option value="FL">Florida</option>
        <option value="GA">Georgia</option>
        <option value="HI">Hawaii</option>
        <option value="ID">Idaho</option>
        <option value="IL">Illinois</option>
        <option value="IN">Indiana</option>
        <option value="IA">Iowa</option>
        <option value="KS">Kansas</option>
        <option value="KY">Kentucky</option>
        <option value="LA">Louisiana</option>
        <option value="ME">Maine</option>
        <option value="MD">Maryland</option>
        <option value="MA">Massachusetts</option>
        <option value="MI">Michigan</option>
        <option value="MN">Minnesota</option>
        <option value="MS">Mississippi</option>
        <option value="MO">Missouri</option>
        <option value="MT">Montana</option>
        <option value="NE">Nebraska</option>
        <option value="NV">Nevada</option>
        <option value="NH">New Hampshire</option>
        <option value="NJ">New Jersey</option>
        <option value="NM">New Mexico</option>
        <option value="NY">New York</option>
        <option value="NC">North Carolina</option>
        <option value="ND">North Dakota</option>
        <option value="OH">Ohio</option>
        <option value="OK">Oklahoma</option>
        <option value="OR">Oregon</option>
        <option value="PA">Pennsylvania</option>
        <option value="RI">Rhode Island</option>
        <option value="SC">South Carolina</option>
        <option value="SD">South Dakota</option>
        <option value="TN">Tennessee</option>
        <option value="TX">Texas</option>
        <option value="UT">Utah</option>
        <option value="VT">Vermont</option>
        <option value="VA">Virginia</option>
        <option value="WA">Washington</option>
        <option value="WV">West Virginia</option>
        <option value="WI">Wisconsin</option>
        <option value="WY">Wyoming</option>
      </option>
    </label>
    <ErrorMessage errors={errors} name="address.state" as="p" />
  </div>

  <div>
    <label htmlFor="zipcode">
      <span>zip code</span>
      <input
        type="text"
        name="address.zipcode"
        id="zipcode"
        ref={register({
          required: true,
          minLength: 5,
          maxLength: 5,
          pattern: /^[0-9]*$/,
        })}
      />
    </label>
    <ErrorMessage
      errors={errors}
      name="address.zipcode"
      as="p"
      message="Please enter valid zip code"
    />
  </div>

  <div>
    <label htmlFor="generalEmail">
      <span>general email</span>
      <input
        type="email"
        name="generalEmail"
        id="generalEmail"
        placeholder="General Email"
        ref={register({
          required: true,
          minLength: 3,
          pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        })}
      />
    </label>
    {errors.generalEmail && <p>Please enter a valid email</p>}
  </div>

  <div>
    <label htmlFor="website">
      <span>website</span>
      <input
        type="url"
        name="website"
        id="website"
        placeholder="Website"
        ref={register({
          require: true,
          pattern: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
        })}
      />
    </label>
    {errors.website && <p>Please enter a valid url</p>}
  </div>

  <div>Contact Person</div>
  <div>
    <label htmlFor="firstName">
      <span>first name</span>
      <input
        type="text"
        name="firstName"
        id="firstName"
        placeholder="First Name"
        ref={register({ required: true })}
      />
    </label>
    {errors.firstName && <p>Please enter your first name</p>}
  </div>

  <div>
    <label htmlFor="lastName">
      <span>last name</span>
      <input
        type="text"
        name="lastName"
        id="lastName"
        placeholder="Last Name"
        ref={register({ required: true })}
      />
    </label>
    {errors.lastName && <p>Please enter your last name</p>}
  </div>

  <div>
    <label htmlFor="title">
      title
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Title"
        ref={register}
      />
    </label>
  </div>

  <div>
    <label htmlFor="phone">
      <span>phone</span>
      <input
        type="tel"
        name="phone"
        id="phone"
        placeholder="Phone"
        ref={register({
          required: true,
          minLength: 10,
          maxLength: 10,
          pattern: /^[0-9]*$/,
        })}
      />
    </label>
    {errors.phone && <p>Please enter a valid phone number (10 digits)</p>}
  </div>

  <div>
    <label htmlFor="email">
      <span>contact email (This will be a login email</span>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        ref={register({
          required: true,
          pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        })}
      />
    </label>
    {errors.email && <p>Please enter a valid email</p>}
  </div>

  <div>
    <label htmlFor="password">
      <span>password</span>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        autoComplete="on"
        ref={register({
          required: 'You must specify a password',
          minLength: {
            value: 8,
            message: 'Password must have at leaset 8 charactors',
          },
        })}
      />
    </label>
    {errors.password && <p>{errors.password.message}</p>}
  </div>

  <div>
    <label htmlFor="passwordConfirm">
      <span>password confirm</span>
      <input
        type="password"
        name="passwordConfirm"
        id="passwordConfirm"
        placeholder="Password Confirm"
        autoComplete="on"
        ref={register({
          validate: (value) =>
            value === password.current || 'The passwords do not match',
        })}
      />
    </label>
    {errors.passwordConfirm && <p>{errors.passwordConfirm.message}</p>}
  </div>
  <input type="submit" value="Sign Up" onClick={handleSubmit(onSubmit)} />

  {/* If authorization was failed */

//   {errorMessage ? <div>{errorMessage}</div> : ''}
// </form>
// <div>
// <p>
//   Already have an account?
//   <Link to="/login">Log In</Link>
// </p>
//</div>*/}
