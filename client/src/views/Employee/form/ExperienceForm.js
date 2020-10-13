import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { actions as employeeActions } from '@store/employee';
import { bindActionCreators } from 'redux';
import CloseIcon from '@material-ui/icons/Close';
import { jobTypes, roles } from '../professionTypes';
import { getUser } from '@helpers/auth-helpers';
import AddBoxIcon from '@material-ui/icons/AddBox';
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
  addOtherJob: {
    fontSize: "40px",
    cursor: "pointer"
  },
  dialog: {
    padding: '2rem',
    textAlign: "center",
  },
  error: {
    color: 'red'
  },
  description: {
    marginTop: '1rem'
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
  contactEmail: {
    paddingTop: "3rem"
  },
  close: {
    cursor: "pointer",
  }
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
    primaryJob: { jobTitle: "", company: '', startDate: '', endDate: '', description: "", current: false },
    employmentStatus: '',
  });

  const [error, setError] = useState({
    primaryJob: '',
  })

  const user = JSON.parse(getUser())
  // material-ui
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  // disablt 'end date' for primaryJob if current was checked
  const [toDisabled, setToDisabled] = useState(formData.primaryJob.current);
  const [toggleBox, setToggleBox] = useState(false);

  const [otherJobs, setOtherJobs] = useState([]);
  const [reload, setReload] = useState(false)
  const [limit, setLimit] = useState(false)

  const units = [
    { value: 'hourly' },
    { value: 'weekly' },
    { value: 'annually' },
  ];

  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

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
      setOtherJobs(experience.experience.otherJob)
    }
  }, [experience])
  // destructure
  const {
    primaryJob
  } = formData;

  const onChange = ({ target: { id, name, value, checked } }) => {
    console.log('id:', id, 'name:', name, 'value:', value, 'checked', checked);
    switch (name) {
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
      case 'current': {
        setFormData((prevState) => ({
          ...prevState,
          [id]: { ...prevState[id], [name]: checked },
        }));
        if (checked) {
          setError({ ...error, [id]: '' })
        } else {
          if (formData[id].startDate > formData[id].endDate) {
            setError({ ...error, [id]: 'Your end date can’t be earlier than your start date.' })
          }
        }
        setToDisabled(!toDisabled);
        break;
      }
      case 'status': {
        setFormData((prevState) => ({
          ...prevState,
          [id]: { ...prevState[id], [name]: checked },
        }));
        setToggleBox(!toggleBox);
        break;
      }
      case 'company':
      case 'description':
      case 'jobTitle':
      default:
        return setFormData((prevState) => ({
          ...prevState,
          [id]: { ...prevState[id], [name]: value },
        }));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (error.primaryJob) {
      return
    }
    let data = {
      ...formData,
    }
    let submitData = {
      primaryJob: data.primaryJob,
      otherJob: otherJobs,
      id: user._id
    }
    actions.updateJobExperience(submitData)
  };

  const handleInput = (e, key) => {
    let data = otherJobs
    data[key][e.target.name] = e.target.value
    setOtherJobs(data)
    setReload(!reload)
  }

  const addOtherJobs = () => {
    if (otherJobs.length >= 5) {
      setLimit(true)
      return
    }
    let otherJob = otherJobs
    otherJob.push({})
    setOtherJobs(otherJob)
    setReload(!reload)
  }
  console.log(otherJobs, "payload")
  return experience ?
    <Container maxWidth="md">
      <Grid
        container direction="column" alignItems={matchesXS ? 'center' : 'flex-start'}
      >
        <Grid item>
          <Typography variant="h1" className={classes.heading1}>
            WORK EXPERIENCE
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
            container justify="flex-start" direction={matchesXS ? 'column' : 'row'} alignItems="center"
          >
            <Grid container>
              <Grid item sm={3}>
                <TextField type="text" name="title" id="primaryJob"
                  required label="Job Title" InputLabelProps={{ shrink: true }}
                  value={primaryJob.title} onChange={(e) => onChange(e)}
                />

              </Grid>
              <Grid item sm={3}>
                <TextField type="text" name="company" id="primaryJob" required
                  label="Company Name" InputLabelProps={{ shrink: true }}
                  value={primaryJob.company} onChange={(e) => onChange(e)}
                />
              </Grid>

              <Grid item sm={3}>
                <TextField type="date" name="startDate" id="primaryJob"
                  label="Start Date" InputLabelProps={{ shrink: true }}
                  value={primaryJob.startDate} onChange={(e) => onChange(e)}
                  className={classes.item}
                />
              </Grid>

              <Grid item sm={3}>
                <TextField type="date" name="endDate" id="primaryJob"
                  label="End Date" error={error.primaryJob ? true : false}
                  InputLabelProps={{ shrink: true }}
                  value={toDisabled ? '' : primaryJob.endDate}
                  disabled={toDisabled ? true : false}
                  onChange={(e) => onChange(e)} className={classes.item}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} sm={12}>
                <TextField id="primaryJob" name="description" label="Description"
                  multiline fullWidth InputLabelProps={{ shrink: true }}
                  value={primaryJob.description} onChange={(e) => onChange(e)}
                  rows={4} className={classes.description} variant="outlined"
                />
              </Grid>
            </Grid>

          </Grid>
          <Grid item className={classes.error}>
            {error.primaryJob && error.primaryJob}
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox name="current" id="primaryJob"
                  checked={primaryJob.current} value={primaryJob.current}
                  onChange={(e) => onChange(e)}
                />
              }
              label="Current"
            />
          </Grid>
          {/* other job */}
          {otherJobs.map((otherjob, key) => {
            return <Fragment>
              <Grid item className={classes.textContainer}>
                <Typography gutterBottom variant="h6">
                  Other Job {key + 1}
                </Typography>
              </Grid>
              <Grid container justify="flex-start" alignItems="center">
                <Grid container>
                  <Grid item xs={12} sm={3}>
                    <TextField type="text" name="title" label="Job Title"
                      InputLabelProps={{ shrink: true }}
                      value={otherJobs[key].title} onChange={(e) => handleInput(e, key)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <TextField type="text" name="company" label="Company Name"
                      InputLabelProps={{ shrink: true }}
                      value={otherJobs[key].company} onChange={(e) => handleInput(e, key)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <TextField type="date" name="startDate" label="Start Date"
                      InputLabelProps={{ shrink: true }}
                      value={otherJobs[key].startDate} onChange={(e) => handleInput(e, key)}
                      className={classes.item}
                    />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <TextField type="date" name="endDate" id="" label="End Date"
                      // error={error.otherJobs[key] ? true : false}
                      InputLabelProps={{ shrink: true }} className={classes.item}
                      value={otherJobs[key].endDate} onChange={(e) => handleInput(e, key)}
                    />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={12}>
                    <TextField name="description" label="Description"
                      multiline fullWidth InputLabelProps={{ shrink: true }}
                      value={otherJobs[key].description} className={classes.description} variant="outlined"
                      onChange={(e) => handleInput(e, key)} rows={4}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className={classes.error}>
                {/* {error.otherJobs[key] && error.otherJobs[key]} */}
              </Grid>
            </Fragment>
          }
          )}
          {!limit &&
            <Grid>
              <Button onClick={addOtherJobs}>
                <AddBoxIcon className={classes.addOtherJob} />
                    Add Other Jobs
                    </Button>
            </Grid>
          }
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
      {!experience.experience &&
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className={classes.dialog}
        >
          <DialogActions>
            <CloseIcon className={classes.close} onClick={handleClose} />
          </DialogActions>
          <DialogContent>
            <DialogContentText>
              <Typography>
                <i>
                  You can manually enter your work experience or email your resume
                  and it will be uploaded in approximately 48 hours
            </i>
              </Typography>
              <Typography className={classes.contactEmail}>
                Register@EmployeezNow.com
          </Typography>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      }
    </Container> :
    ""
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
