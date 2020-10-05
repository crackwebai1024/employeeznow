import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import InputAdornment from '@material-ui/core/InputAdornment';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { jobTypes, roles } from '../professionTypes';
import { actions as employeeActions } from '@store/employee';
import { bindActionCreators } from 'redux';
// import {
//   loadProfessionDetails,
//   updateProfessionDetails,
// } from '../../../store/actions/professionDetails';

// set style
const useStyles = makeStyles((theme) => ({
  heading1: {
    marginTop: '1.5rem',
    marginBottom: '1.5rem',
    fontSize: '2rem',
    color: theme.palette.primary.main,
  },
  formContainer: {
    marginTop: '3rem',
  },
  textContainer: {
    marginTop: '2rem',
  },
  checkboxText: {
    marginTop: '1.5rem',
  },
  item: {
    '& .MuiInput-input': {
      color: theme.palette.grey[700],
    },
    '& .MuiFormControlLabel-label': {
      fontSize: '0.85rem',
      color: theme.palette.grey[700],
    },
  },
  button: {
    marginTop: '2rem',
    marginBottom: '5rem',
  },
  invalidMessage: {
    textAlign: 'center',
    color: theme.palette.error.main,
    marginBottom: '2rem',
  },
}));

const ExperienceForm = ({
  // loadProfessionDetails,
  // updateProfessionDetails,
  loading,
  errorMessage,
}) => {
  const [formData, setFormData] = useState({
    primaryJob: { company: '', startDate: '', endDate: '', current: false },
    secondaryJob: { company: '', startDate: '', endDate: '' },
    _id: '',
  });

  // set error
  // const [error, setError] = useState({
  //   milesToWork: '',
  // });

  // material-ui
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  // disablt 'end date' for primaryJob if current was checked
  const [toDisabled, setToDisabled] = useState(formData.primaryJob.current);
  const [toggleBox, setToggleBox] = useState(false);

  const units = [
    { value: 'hourly' },
    { value: 'weekly' },
    { value: 'annually' },
  ];

  // convert date (MongoDB/UTC) to "month, year"
  const convertDate = (date) => {
    return date !== null && date.slice(0, 10);
  };

  // load profession details and set default
  useEffect(() => {

  }, [loading]);

  // destructure
  const {
    primaryJob,
    secondaryJob,
  } = formData;

  const onChange = ({ target: { id, name, value, checked } }) => {
    console.log('id:', id, 'name:', name, 'value:', value, 'checked', checked);
    return setFormData(formData)
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData, "formdata")
  };

  return (
    <Container maxWidth="sm">
      <Grid
        container
        direction="column"
        alignItems={matchesXS ? 'center' : 'flex-start'}
      >
        <Grid item>
          <Typography variant="h1" className={classes.heading1}>
            Experience
          </Typography>
        </Grid>
      </Grid>

      <form onSubmit={(e) => onSubmit(e)} className={classes.formContainer}>
        <Grid
          container
          direction="column"
          alignItems={matchesXS ? 'center' : 'flex-start'}
        >
          {/* primary job */}
          <Grid item>
            <Typography gutterBottom variant="h6">
              Primary Job
            </Typography>
          </Grid>

          <Grid
            container
            justify="flex-start"
            direction={matchesXS ? 'column' : 'row'}
            alignItems="center"
          >
            <Grid item sm={4}>
              <TextField
                type="text"
                name="company"
                id="primaryJob"
                label="Company Name"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => onChange(e)}
              />
            </Grid>

            <Grid item sm={4}>
              <TextField
                type="date"
                name="startDate"
                id="primaryJob"
                label="Start Date"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => onChange(e)}
                className={classes.item}
              />
            </Grid>

            <Grid item sm={4}>
              <TextField
                type="date"
                name="endDate"
                id="primaryJob"
                label="End Date"
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={toDisabled ? true : false}
                onChange={(e) => onChange(e)}
                className={classes.item}
              />
            </Grid>
          </Grid>

          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  name="current"
                  id="primaryJob"
                  onChange={(e) => onChange(e)}
                />
              }
              label="Current"
            />
          </Grid>

          {/* secondary job */}
          <Grid item className={classes.textContainer}>
            <Typography gutterBottom variant="h6">
              Secondary Job
            </Typography>
          </Grid>

          <Grid
            container
            justify="flex-start"
            direction={matchesXS ? 'column' : 'row'}
            alignItems="center"
          >
            <Grid item xs={12} sm={4}>
              <TextField
                type="text"
                name="company"
                id="secondaryJob"
                label="Company Name"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => onChange(e)}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                type="date"
                name="startDate"
                id="secondaryJob"
                label="Start Date"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => onChange(e)}
                className={classes.item}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                type="date"
                name="endDate"
                id="secondaryJob"
                label="End Date"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => onChange(e)}
                className={classes.item}
              />
            </Grid>
          </Grid>

        </Grid>

        <Grid item>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Save
            </Button>
        </Grid>

        {/* If authorization was failed */}
        {errorMessage && (
          <Grid item className={classes.invalidMessage}>
            {errorMessage}
          </Grid>
        )}
      </form>
    </Container >
  );
};

const mapStateToProps = ({
  employee: {
    skill
  },
}) => ({
  skill
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...employeeActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExperienceForm);