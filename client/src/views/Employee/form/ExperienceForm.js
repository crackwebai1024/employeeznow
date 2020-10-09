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
import { actions as employeeActions } from '@store/employee';
import { bindActionCreators } from 'redux';
import { jobTypes, roles } from '../professionTypes';
import { getUser } from '@helpers/auth-helpers';
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
  error : {
    color : 'red'
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
  experience,
  actions,
  errorMessage,
}) => {
  const [formData, setFormData] = useState({
    primaryJob: { company: '', startDate: '', endDate: '', current: false },
    secondaryJob: { company: '', startDate: '', endDate: '' },
    employmentStatus: '',
  });
  const [error, setError] = useState({
    primaryJob: '',
    secondaryJob: ''
  })
  const user = JSON.parse(getUser())
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
    let data = {
      id: user._id
    }
    actions.loadExperienceData(data)
  }, []);

  useEffect(() => {
    if (experience && experience.experience) {
      if (experience.experience.primaryJob.current) {
        setToDisabled(true)
      }
      setFormData(experience.experience)
    }

  }, [experience])
  // destructure
  const {
    primaryJob,
    secondaryJob,
  } = formData;

  const onChange = ({ target: { id, name, value, checked } }) => {
    console.log('id:', id, 'name:', name, 'value:', value, 'checked', checked);
    switch (name) {
      case 'dateOfBirth':
      case 'employmentStatus': {
        return setFormData({ ...formData, [name]: value });
      }
      case 'endDate':
        if (formData[id].startDate > value) {
          setError({
            ...error,
            [id]: "Your end date can’t be earlier than your start date."
          })
        } else {
          setError({
            ...error,
            [id]: ""
          })
        }
        setFormData((prevState) => ({
          ...prevState,
          [id]: { ...prevState[id], [name]: value },
        }));
        break;
      case 'company':
      case 'startDate': {
        if (formData[id].endDate && formData[id].endDate < value) {
          setError({
            ...error,
            [id]: "Your end date can’t be earlier than your start date."
          })
        } else {
          setError({
            ...error,
            [id]: ""
          })
        }
        setFormData((prevState) => ({
          ...prevState,
          [id]: { ...prevState[id], [name]: value },
        }));
        break;
      }
      case 'amount':
      case 'unit':
      case 'location':
      case 'dateToMove':
      case 'title':
      case 'veteranId': {
        return setFormData({
          ...formData,
          [id]: { ...formData[id], [name]: value },
        });
      }
      case 'current': {
        setFormData((prevState) => ({
          ...prevState,
          [id]: { ...prevState[id], [name]: checked },
        }));
        if(checked) {
          setError({ ...error, [id] : ''})
        } else {
          if(formData[id].startDate > formData[id].endDate) {
            setError({ ...error, [id]: 'Your end date can’t be earlier than your start date.'})
          }
        }
        setToDisabled(!toDisabled);
        break;
      }
      case 'planning':
      case 'availability':
      case 'status': {
        setFormData((prevState) => ({
          ...prevState,
          [id]: { ...prevState[id], [name]: checked },
        }));
        setToggleBox(!toggleBox);
        break;
      }
      case 'randomShiftRole': {
        const newArray = [...formData[name]];

        //  uncheck - if the same shift already exists in state, the shift is removed from state
        if (newArray.includes(id)) {
          const idx = newArray.indexOf(id);
          newArray.splice(idx, idx + 1);

          return setFormData({
            ...formData,
            [name]: newArray,
          });
        }

        newArray.push(id); // Set the new value
        return setFormData({
          ...formData,
          [name]: newArray,
        });
      }

      default:
        return formData;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(formData)
    if(error.primaryJob || error.secondaryJob) {
      return
    }
    
    if(!formData.secondaryJob.company) {
      return  
    }
    let data = {
      ...formData,
      id: user._id
    }
    actions.updateJobExperience(data)
  };

  console.log(formData, error, "payload")
  return (
    !loading &&
    <Container maxWidth="sm">
      <Grid
        container
        direction="column"
        alignItems={matchesXS ? 'center' : 'flex-start'}
      >
        <Grid item>
          <Typography variant="h1" className={classes.heading1}>
            JOB EXPERIENCE
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
                required
                label="Company Name"
                InputLabelProps={{
                  shrink: true,
                }}
                value={primaryJob.company}
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
                value={primaryJob.startDate}
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
                error={error.primaryJob ? true : false}
                InputLabelProps={{
                  shrink: true,
                }}
                value={toDisabled ? '' : primaryJob.endDate}
                disabled={toDisabled ? true : false}
                onChange={(e) => onChange(e)}
                className={classes.item}
              />
            </Grid>
          </Grid>
          <Grid item className={classes.error}>
            {error.primaryJob && error.primaryJob}
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  name="current"
                  id="primaryJob"
                  checked={primaryJob.current}
                  value={primaryJob.current}
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
                value={secondaryJob.company}
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
                value={secondaryJob.startDate}
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
                error={error.secondaryJob ? true : false}
                InputLabelProps={{
                  shrink: true,
                }}
                value={secondaryJob.endDate}
                onChange={(e) => onChange(e)}
                className={classes.item}
              />
            </Grid>
          </Grid>
          <Grid item className={classes.error}>
            {error.secondaryJob && error.secondaryJob}
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
        </Grid>

        {/* If authorization was failed */}
        {errorMessage && (
          <Grid item className={classes.invalidMessage}>
            {errorMessage}
          </Grid>
        )}
      </form>
    </Container>
  );
};

const mapStateToProps = ({
  employee: {
    experience, loading
  },
}) => ({
  experience, loading
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...employeeActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExperienceForm);
