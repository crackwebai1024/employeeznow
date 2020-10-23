import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { actions as employeeActions } from '@store/employee';
import { actions as authActions } from '@store/auth';
import { bindActionCreators } from 'redux';
import { getUser } from '@helpers/auth-helpers';
import PublishIcon from '@material-ui/icons/Publish';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import { updateEmployee } from '../../../store/actions/employee';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: '1.3rem',
    backgroundColor: 'transparent',
  },
  uploadImage: {
    width: "150px",
    height: "150px"
  },
  heading1: {
    ...theme.typography.h1,
    marginBottom: '1.5rem',
  },
  uploadButton: {
    marginTop: '1rem'
  },
  input: {
    display: 'none',
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
  stateInput: {
    marginTop: '0.3rem',
  },
}));

const EditEmployeeAccountForm = ({
  employee: {
    _id,
    firstName,
    middleName,
    lastName,
    cell,
    email,
    address,
    employeezNowId,
  },
  actions,
  updateEmployee,
  errorMessage,
  updateLoading,
  setOpenAccount,
  history,
  slug,
}) => {
  // react-hook-form
  const { register, handleSubmit, errors } = useForm({
    // add current value in the input value value name matches with name in input field
    defaultValues: {
      firstName,
      middleName,
      lastName,
      email,
      cell,
      address,
    },
  });
  // address.state error customized check
  const [stateError, setStateError] = useState('');
  const [updatedState, setUpdatedState] = useState(address.state); //default value - avoid submitting empty string

  const [veteran, setVeteran] = useState({ status: false, veteranId: "" });
  const [veteranError, setVeteranError] = useState("")
  const [veteranCard, setVeteranCard] = useState(null)

  // material-ui
  const classes = useStyles();
  const user = JSON.parse(getUser())

  // control address.state manually - check if address.state has value. It it has value, errror => false
  const handleChange = (e) => {
    if (!e.target.value) setStateError(true);
    if (e.target.value) {
      setStateError(false);
      setUpdatedState(e.target.value);
    }
  };

  const uploadVeteranCard = (e, type) => {
    const formData = new FormData();
    formData.append("type", type)
    formData.append("content", e.target.files[0])
    formData.append("fname", e.target.files[0].name)
    setVeteranCard(formData);
  }

  const onChange = (e) => {
    console.log(e.target.name)
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

  const onSubmit = async (formData) => {
    if (veteran.status && veteran.veteranId == "") {
      return setVeteranError("This field is required")
    }
    if (veteran.status && veteranCard == null) {
      return setVeteranError("please Upload Veteran Card Image!")
    }
    const sendData = {
      ...formData,
      id: user._id,
      address: { ...formData.address, state: updatedState },
    };
    console.log(sendData);
    await actions.updateBasicInfoRequest(sendData)
    setOpenAccount(false);
  };

  return (
    <div>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <DialogTitle id="dialog-title">
            Change Personal Information
          </DialogTitle>
        </Grid>

        <form onSubmit={(e) => e.preventDefault()}>
          <DialogContent>
            <Grid item container direction="row" spacing={2}>
              <Grid item md={4} xs={12}>
                <TextField
                  error={errors.firstName ? true : false}
                  helperText={errors.firstName ? 'This filed is required' : ''}
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
                  // placeholder={firstName}
                  inputRef={register({ required: true })}
                />
              </Grid>

              <Grid item md={4} xs={12}>
                <TextField
                  error={errors.middleName ? true : false}
                  helperText={errors.middleName ? 'This filed is required' : ''}
                  variant="outlined"
                  margin="normal"
                  size="small"
                  fullWidth
                  name="middleName"
                  label="Middle Name"
                  type="text"
                  id="middleName"
                  autoComplete="middleName"
                  inputRef={register}
                />
              </Grid>

              <Grid item md={4} xs={12}>
                <TextField
                  error={errors.lastName ? true : false}
                  helperText={errors.lastName ? 'This filed is required' : ''}
                  required
                  variant="outlined"
                  margin="normal"
                  size="small"
                  fullWidth
                  name="lastName"
                  label="Last Name"
                  type="text"
                  id="lastName"
                  autoComplete="lastName"
                  inputRef={register({ required: true })}
                />
              </Grid>
            </Grid>
            <Grid item container direction="row" spacing={2}>
              <Grid item sm={8} xs={12}>
                <TextField
                  error={
                    errors.address && errors.address.street1 ? true : false
                  }
                  helpertext={
                    errors.address && errors.address.street1
                      ? 'This filed is required'
                      : ''
                  }
                  variant="outlined"
                  margin="normal"
                  size="small"
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
                  size="small"
                  fullWidth
                  name="address.street2"
                  label="Apt / Suite"
                  type="text"
                  id="street2"
                  autoComplete="street2"
                  inputRef={register}
                />
              </Grid>
            </Grid>

            <Grid item container direction="row" spacing={2}>
              <Grid item sm={4} xs={6}>
                <TextField
                  error={errors.address && errors.address.city ? true : false}
                  helpertext={
                    errors.address && errors.address.city
                      ? 'This filed is required'
                      : ''
                  }
                  variant="outlined"
                  margin="normal"
                  size="small"
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
                  size="small"
                  error={stateError ? true : false}
                  // helpertext={stateError ? 'Please select state' : ''}
                  className={classes.formControl}
                >
                  {address.state === '' && (
                    <InputLabel htmlFor="address.state">State</InputLabel>
                  )}

                  <Select
                    native
                    labelId="address.state"
                    id="address.state"
                    key="address.state"
                    onChange={(e) => handleChange(e)}
                    className={classes.stateInput}
                    defaultValue={address.state}
                    inputProps={{
                      name: 'address.state',
                      id: 'address.state',
                      inputRef: (ref) => {
                        if (!ref) return;
                        console.log(ref.value);
                        register(
                          //{ required: !ref.value, minLength: 2 }, // *does not work,
                          { name: 'address.state', value: ref.value }
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
                {/* If address.state value was empty - the value was check onSubmit so added error message at the bottom */}
                {stateError ? (
                  <Grid item className={classes.invalidMessage}>
                    <Typography variant="caption">State is requreid</Typography>
                  </Grid>
                ) : (
                    ''
                  )}
              </Grid>

              <Grid item sm={4} xs={6}>
                <TextField
                  error={
                    errors.address && errors.address.zipcode ? true : false
                  }
                  helperText={
                    errors.address && errors.address.zipcode
                      ? 'This filed is required'
                      : ''
                  }
                  required
                  variant="outlined"
                  margin="normal"
                  size="small"
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
            </Grid>

            {/* <Grid item container direction="row" spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={errors.cell ? true : false}
                  helperText={errors.cell ? 'Phone number is Invalid' : ''}
                  required
                  variant="outlined"
                  margin="normal"
                  size="small"
                  fullWidth
                  name="cell"
                  label="Phone Number"
                  type="tel"
                  id="cell"
                  autoComplete="cell"
                  inputRef={register({
                    required: true,
                    minLength: 10,
                    maxLength: 10,
                    pattern: /^[0-9]*$/,
                  })}
                />
              </Grid>
            </Grid> */}
            <Grid item container direction="row" spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={errors.email ? true : false}
                  helperText={errors.email ? 'This filed is required' : ''}
                  required
                  variant="outlined"
                  margin="normal"
                  size="small"
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
            </Grid>
            <Grid item container direction="row" spacing={2}>
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
          </DialogContent>

          <DialogActions>
            <Button
              type="submit"
              fullWidth
              disabled={updateLoading ? true : false}
              variant="outlined"
              color="primary"
              onClick={e => setOpenAccount(false)}
              className={classes.button}
            >
              CANCEL
            </Button>
            <Button
              type="submit"
              fullWidth
              disabled={updateLoading ? true : false}
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
      </Grid >
    </div >
  );
};

const mapStateToProps = ({
  employee: {
    experience, loading, updateLoading, updateEmployee
  },
}) => ({
  experience, loading, updateLoading, updateEmployee
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...employeeActions,
    ...authActions
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditEmployeeAccountForm);
