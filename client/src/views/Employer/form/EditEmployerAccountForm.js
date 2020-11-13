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
import { actions as employerActions } from '@store/employer';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { usaStates } from '../../Employee/professionTypes';
import { getUser } from '@helpers/auth-helpers';

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.root
  },
  formControl: {
    marginTop: '0.7rem',
    backgroundColor: 'transparent',
  },
  heading1: {
    ...theme.typography.h1,
    marginBottom: '1.5rem',
  },
  stateSelect: {
    marginTop: '1rem'
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

const EditEmployerAccountForm = ({ employerData, actions }) => {
  const [formData, setFormData] = useState({})
  const { register, handleSubmit, errors, setValue } = useForm({
    defaultValues: employerData
  });
  const user = JSON.parse(getUser())

  // material-ui
  const classes = useStyles();

  // control address.state manually - check if address.state has value. It it has value, errror => false

  const onSubmit = (formData) => {
    const sendData = {
      ...formData,
      address: { ...formData.address },
      role: 'employer',
      id: user._id
    };

    actions.updateEmployerAccount(sendData);
  };

  useEffect(() => {
    let data = {
      id: user._id
    }
    actions.getEmployerData(data);
  }, [])

  useEffect(() => {
    if (!_.isEmpty(employerData)) {
      setFormData({ defaultValues: employerData })
    }
  }, [employerData])

  return (
    !_.isEmpty(employerData) &&
    <div>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <DialogTitle id="dialog-title">
            Change Account Information
          </DialogTitle>
        </Grid>

        <form onSubmit={(e) => e.preventDefault()}>
          <DialogContent>
            <Grid item container direction="row" spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={errors.name ? true : false}
                  helperText={errors.name ? 'This filed is required' : ''}
                  required
                  variant="outlined"
                  margin="normal"
                  size="small"
                  fullWidth
                  // className={classes.root}
                  name="name"
                  label="Company Name"
                  type="text"
                  id="name"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  autoComplete="name"
                  inputRef={register({
                    required: true,
                  })}
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
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                  id="city"
                  autoComplete="city"
                  inputRef={register({ required: true, minLength: 2 })}
                />
              </Grid>

              <Grid item sm={4} xs={6}>
              <TextField
                  error={errors.address && errors.address.state
                    ? true : false
                  }
                  helperText={errors.address && errors.address.state
                    ? 'This filed is required' : ''
                  }
                  variant="outlined" size="small"
                  required fullWidth select margin="none" name="address.state" label="State" id="address.state"
                  autoComplete="state" InputLabelProps={{ shrink: true }}
                  inputRef={register({ required: true })}
                  SelectProps={{ native: true }}
                  className={classes.stateSelect}
                >
                  <option value=""></option>
                  {usaStates.map((usaState) => (
                    <option value={usaState.value} key={usaState.value}>
                      {usaState.label}
                    </option>
                  ))}
                </TextField>
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
                  InputLabelProps={{
                    shrink: true,
                  }}
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

            <Grid item container direction="row" spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={errors.generalEmail ? true : false}
                  helperText={
                    errors.generalEmail ? 'This filed is required' : ''
                  }
                  required
                  variant="outlined"
                  margin="normal"
                  size="small"
                  fullWidth
                  name="generalEmail"
                  label="General Email Address"
                  type="email"
                  id="generalEmail"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  autoComplete="generalEmail"
                  inputRef={register({
                    required: true,
                    pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                />
              </Grid>
            </Grid>

            <Grid item container direction="row" spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  size="small"
                  fullWidth
                  name="website"
                  label="Website"
                  type="url"
                  id="website"
                  autoComplete="website"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputRef={register({
                    pattern: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
                  })}
                />
              </Grid>
            </Grid>

            <Grid item container direction="row" spacing={2}>
              <Grid item md={6} xs={12}>
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                  // placeholder={firstName}
                  inputRef={register({ required: true })}
                />
              </Grid>

              <Grid item md={6} xs={12}>
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputRef={register({ required: true })}
                />
              </Grid>
            </Grid>

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
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputRef={register({
                    required: true,
                    pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                />
              </Grid>
            </Grid>

            <Grid item container direction="row" spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  size="small"
                  fullWidth
                  name="title"
                  label="Title"
                  type="text"
                  id="title"
                  autoComplete="title"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputRef={register}
                />
              </Grid>
            </Grid>

            <Grid item container direction="row" spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={errors.cell ? true : false}
                  helperText={errors.cell ? 'Phone number is required' : ''}
                  required
                  variant="outlined"
                  margin="normal"
                  size="small"
                  fullWidth
                  name="phone"
                  label="Phone Number"
                  type="tel"
                  id="phone"
                  autoComplete="phone"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputRef={register({
                    required: true,
                    minLength: 10,
                    maxLength: 10,
                    pattern: /^[0-9]*$/,
                  })}
                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
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
          {/* {errorMessage && (
            <Grid item className={classes.invalidMessage}>
              {errorMessage}
            </Grid>
          )} */}
        </form>
      </Grid>
    </div>
  );
};

const mapStateToProps = ({
  employer: {
    employerData
  },
}) => ({
  employerData
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...employerActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditEmployerAccountForm);
