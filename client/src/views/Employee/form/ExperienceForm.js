import React, { useState, useEffect, Fragment } from "react";
import { useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import { useForm } from 'react-hook-form';
import MainButton from '@components/Element/Button/MainButton';
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { actions as employeeActions } from "@store/employee";
import { bindActionCreators } from "redux";
import CloseIcon from "@material-ui/icons/Close";
import { jobTypes, roles } from "../professionTypes";
import { getUser } from "@helpers/auth-helpers";
import AddBoxIcon from "@material-ui/icons/AddBox";
import MenuItem from "@material-ui/core/MenuItem";
import { successMessage, errorMessage } from '@helpers/utils'
import { Box } from "@material-ui/core";

// import {
//   loadProfessionDetails,
//   updateProfessionDetails,
// } from '../../../store/actions/professionDetails';

// set style
const useStyles = makeStyles((theme) => ({
  green: {
    color: theme.palette.common.green
  },
  heading1: {
    marginTop: "5rem",
    marginBottom: "1.5rem",
    fontSize: "2rem",
    color: theme.palette.primary.main,
  },
  center: {
    textAlign: 'center'
  },
  formContainer: {
    // marginTop: "1rem",
  },
  textContainer: {
    marginTop: "2rem",
  },
  addOtherJob: {
    fontSize: "40px",
    margin: '1rem 0 1rem 0',
    cursor: "pointer",
  },
  dialog: {
    padding: "2rem",
    textAlign: "center",
  },
  error: {
    color: "red",
  },
  description: {
    marginTop: "1rem",
  },
  checkboxText: {
    marginTop: "1.5rem",
  },
  item: {
    "& .MuiInput-input": {
      color: theme.palette.grey[700],
    },
    "& .MuiFormControlLabel-label": {
      fontSize: "0.85rem",
      color: theme.palette.grey[700],
    },
  },
  button: {
    marginTop: "2rem",
  },
  invalidMessage: {
    textAlign: "center",
    color: theme.palette.error.main,
    marginBottom: "2rem",
  },
  contactEmail: {
    paddingTop: "3rem",
  },
  close: {
    cursor: "pointer",
  },
  goback_button: {
    marginTop: "2rem",
    float: 'right',
    marginBottom: '5rem'
  },
  menuItem: {
    maxHeight: "500px",
  },
}));

const ExperienceForm = ({
  // loadProfessionDetails,
  // updateProfessionDetails,
  success,
  loading,
  experience,
  actions,
  errorMessage,
}) => {
  const [formData, setFormData] = useState({
    primaryJob: {
      title: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
      years: 0,
      current: false,
    },
    secondaryJob: {
      title: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
      years: 0,
    },
    employmentStatus: "",
    exclude: []
  });

  const [showAlert, setShowAlert] = useState(0);

  const [error, setError] = useState({
    primaryJob: "",
  });

  const user = JSON.parse(getUser());
  // material-ui
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  // disablt 'end date' for primaryJob if current was checked
  const [toDisabled, setToDisabled] = useState(formData.primaryJob.current);
  const [toggleBox, setToggleBox] = useState(false);

  const [otherJobs, setOtherJobs] = useState([]);
  const [reload, setReload] = useState(false);
  const [limit, setLimit] = useState(false);

  const units = [
    { value: "hourly" },
    { value: "weekly" },
    { value: "annually" },
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
      id: user._id,
    };
    actions.loadExperienceData(data);
  }, []);

  useEffect(() => {
    if (experience && experience.experience) {
      if (experience.experience.primaryJob.current) {
        setToDisabled(true);
      }
      setFormData(experience.experience);
      setOpen(false);
      setOtherJobs(experience.experience.otherJob);
      setExclude(experience.experience.exclude)
    }
  }, [experience]);

  useEffect(() => {
    if (success) {
      setShowAlert(1);
      successMessage("Successfully Saved!")
    } else if (success === false) {
      setShowAlert(2);
      successMessage("Sorry! Saving is failed!")
    } else {
      setShowAlert(0);
    }
    setTimeout(() => {
      actions.initiateSuccess();
    }, 5000);
  }, [success]);

  // destructure
  const { primaryJob, secondaryJob } = formData;
  const history = useHistory()
  const { register, handleSubmit, errors, watch } = useForm({});

  const onChange = ({ target: { id, name, value, checked } }) => {
    console.log("id:", id, "name:", name, "value:", value, "checked", checked);
    switch (name) {
      case "employmentStatus": {
        return setFormData({ ...formData, [name]: value });
      }
      case "primaryJob": {
        return setFormData({
          ...formData,
          [name]: value,
        });
      }
      case "endDate":
        if (formData[id].startDate > value) {
          setError({
            ...error,
            [id]: "Your end date can’t be earlier than your start date.",
          });
        } else {
          setError({
            ...error,
            [id]: "",
          });
        }
        let years = 0;
        if (formData[id].startDate && formData[id].endDate) {
          let start = new Date(formData[id].startDate);
          let end = new Date(formData[id].endDate);
          years = (end - start) / 86400000 / 365;
        }
        setFormData((prevState) => ({
          ...prevState,
          [id]: { ...prevState[id], [name]: value, years: years },
        }));
        break;
      case "startDate": {
        if (formData[id].endDate && formData[id].endDate < value) {
          setError({
            ...error,
            [id]: "Your end date can’t be earlier than your start date.",
          });
        } else {
          setError({
            ...error,
            [id]: "",
          });
        }
        let years = 0;
        if (formData[id].startDate && formData[id].endDate) {
          let start = new Date(formData[id].startDate);
          let end = new Date(formData[id].endDate);
          years = (end - start) / 86400000 / 365;
        }
        setFormData((prevState) => ({
          ...prevState,
          [id]: { ...prevState[id], [name]: value, years: years },
        }));
        break;
      }
      case "current": {
        setFormData((prevState) => ({
          ...prevState,
          [id]: { ...prevState[id], [name]: checked },
        }));
        if (checked) {
          setError({ ...error, [id]: "" });
        } else {
          if (formData[id].startDate > formData[id].endDate) {
            setError({
              ...error,
              [id]: "Your end date can’t be earlier than your start date.",
            });
          }
        }
        setToDisabled(!toDisabled);
        break;
      }
      case "status": {
        setFormData((prevState) => ({
          ...prevState,
          [id]: { ...prevState[id], [name]: checked },
        }));
        setToggleBox(!toggleBox);
        break;
      }
      case "company":
      case "description":
      case "jobTitle":
      default:
        return setFormData((prevState) => ({
          ...prevState,
          [id]: { ...prevState[id], [name]: value },
        }));
    }
  };

  const onSubmit = (e) => {
    if (error.primaryJob) {
      return;
    }
    let data = {
      ...formData,
    };
    let submitData = {
      primaryJob: data.primaryJob,
      secondaryJob: data.secondaryJob,
      otherJob: otherJobs,
      id: user._id,
      exclude: exclude
    };

    actions.updateJobExperience(submitData);
  };

  const handleInput = (e, key) => {
    let data = otherJobs;
    data[key][e.target.name] = e.target.value;
    if (data[key].startDate && data[key].endDate) {
      let start = new Date(data[key].startDate);
      let end = new Date(data[key].endDate);
      let years = Number((end - start) / 86400000 / 365);
      data[key].years = years;
    }

    setOtherJobs(data);
    setReload(!reload);
  };

  const addOtherJobs = () => {
    if (otherJobs.length >= 5) {
      setLimit(true);
      return;
    }
    let otherJob = otherJobs;
    otherJob.push({});
    setOtherJobs(otherJob);
    setReload(!reload);
  };

  const onJobTitleChange = (e, id) => {
    setFormData((prevState) => ({
      ...prevState,
      [id]: { ...prevState[id], title: e.target.value },
    }));
  };

  const goBackHandle = () => {
    history.push(`/employees/${user.slug}`)
  }


  const [exclude, setExclude] = useState([])
  const handleBusiness = (event, value) => {
    setExclude(value)
  }

  console.log(primaryJob.title, "payload");
  return experience ? (
    <Container maxWidth="md">
      <Grid
        container
        direction="column"
        alignItems={matchesXS ? "center" : "flex-start"}
      >
        <Grid item>
          <Typography variant="h1" className={classes.heading1}>
            WORK EXPERIENCE
          </Typography>
        </Grid>
      </Grid>
      <form onSubmit={(e) => e.preventDefault()} className={classes.formContainer}>
        <Grid
          container
          direction="column"
          alignItems={matchesXS ? "center" : "flex-start"}
        >
          {/* primary job */}
          <Grid item>
            <Typography gutterBottom variant="h6">
              Current/Last Job
            </Typography>
          </Grid>

          <Grid
            container
            justify="flex-start"
            direction={matchesXS ? "column" : "row"}
            alignItems="center"
          >
            <Grid container>
              <Grid item sm={3}>
                {primaryJob && (
                  <TextField
                    required
                    select
                    label="Primary Job"
                    id="primaryJob"
                    name="title"
                    value={primaryJob.title}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => onJobTitleChange(e, "primaryJob")}
                    helperText="Please select your currency"
                    PaperProps={{
                      style: {
                        maxHeight: 500,
                        width: "20ch",
                      },
                    }}
                  >
                    {jobTypes.map((job) => {
                      return (
                        <MenuItem key={job} value={job} id="primaryJob">
                          {job}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                )}
              </Grid>
              <Grid item sm={3}>
                <TextField
                  type="text"
                  name="company"
                  id="primaryJob"
                  required
                  label="Company Name"
                  InputLabelProps={{ shrink: true }}
                  value={primaryJob.company}
                  onChange={(e) => onChange(e)}
                />
              </Grid>

              <Grid item sm={3}>
                <TextField
                  type="date"
                  name="startDate"
                  id="primaryJob"
                  label="Start Date"
                  InputLabelProps={{ shrink: true }}
                  value={primaryJob.startDate}
                  onChange={(e) => onChange(e)}
                  className={classes.item}
                />
              </Grid>

              <Grid item sm={3}>
                <TextField
                  type="date"
                  name="endDate"
                  id="primaryJob"
                  label="End Date"
                  error={error.primaryJob ? true : false}
                  InputLabelProps={{ shrink: true }}
                  value={toDisabled ? "" : primaryJob.endDate}
                  disabled={toDisabled ? true : false}
                  onChange={(e) => onChange(e)}
                  className={classes.item}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="primaryJob"
                  name="description"
                  label="Description"
                  multiline
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={primaryJob.description}
                  onChange={(e) => onChange(e)}
                  rows={4}
                  className={classes.description}
                  variant="outlined"
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

          <Grid item>
            <Typography gutterBottom variant="h6">
              Previous Job
            </Typography>
          </Grid>

          <Grid
            container
            justify="flex-start"
            direction={matchesXS ? "column" : "row"}
            alignItems="center"
          >
            <Grid container>
              <Grid item sm={3}>
                <TextField
                  select
                  label="Previous Job"
                  id="secondaryJob"
                  name="title"
                  value={secondaryJob.title}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => onJobTitleChange(e, "secondaryJob")}
                  helperText="Please select your currency"
                >
                  {jobTypes.map((job) => {
                    return (
                      <MenuItem
                        key={`secondary_${job}`}
                        value={job}
                        id="secondaryJob"
                      >
                        {job}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Grid>
              <Grid item sm={3}>
                <TextField
                  type="text"
                  name="company"
                  id="secondaryJob"
                  label="Company Name"
                  InputLabelProps={{ shrink: true }}
                  value={secondaryJob.company}
                  onChange={(e) => onChange(e)}
                />
              </Grid>

              <Grid item sm={3}>
                <TextField
                  type="date"
                  name="startDate"
                  id="secondaryJob"
                  label="Start Date"
                  InputLabelProps={{ shrink: true }}
                  value={secondaryJob.startDate}
                  onChange={(e) => onChange(e)}
                  className={classes.item}
                />
              </Grid>

              <Grid item sm={3}>
                <TextField
                  type="date"
                  name="endDate"
                  id="secondaryJob"
                  label="End Date"
                  error={error.secondaryJob ? true : false}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => onChange(e)}
                  className={classes.item}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="secondaryJob"
                  name="description"
                  label="Description"
                  multiline
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={secondaryJob.description}
                  onChange={(e) => onChange(e)}
                  rows={4}
                  className={classes.description}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.error}>
            {error.secondaryJob && error.secondaryJob}
          </Grid>

          {/* other job */}
          {otherJobs.map((otherjob, key) => {
            return (
              <Fragment key={key}>
                <Grid item className={classes.textContainer}>
                  <Typography gutterBottom variant="h6">
                    Previous Job
                  </Typography>
                </Grid>
                <Grid container justify="flex-start" alignItems="center">
                  <Grid container>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        select
                        label="Job Title"
                        id="secondaryJob"
                        name="title"
                        value={otherJobs[key].title}
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => handleInput(e, key)}
                        helperText="Please select your currency"
                      >
                        {jobTypes.map((job) => {
                          return (
                            <MenuItem key={job} value={job}>
                              {job}
                            </MenuItem>
                          );
                        })}
                      </TextField>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <TextField
                        type="text"
                        name="company"
                        label="Company Name"
                        InputLabelProps={{ shrink: true }}
                        value={otherJobs[key].company}
                        onChange={(e) => handleInput(e, key)}
                      />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <TextField
                        type="date"
                        name="startDate"
                        label="Start Date"
                        InputLabelProps={{ shrink: true }}
                        value={otherJobs[key].startDate}
                        onChange={(e) => handleInput(e, key)}
                        className={classes.item}
                      />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <TextField
                        type="date"
                        name="endDate"
                        id=""
                        label="End Date"
                        // error={error.otherJobs[key] ? true : false}
                        InputLabelProps={{ shrink: true }}
                        className={classes.item}
                        value={otherJobs[key].endDate}
                        onChange={(e) => handleInput(e, key)}
                      />
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        name="description"
                        label="Description"
                        multiline
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={otherJobs[key].description}
                        className={classes.description}
                        variant="outlined"
                        onChange={(e) => handleInput(e, key)}
                        rows={4}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item className={classes.error}>
                  {/* {error.otherJobs[key] && error.otherJobs[key]} */}
                </Grid>
              </Fragment>
            );
          })}
          {!limit && (
            <Grid className={classes.addOtherJob}>
              <Button onClick={addOtherJobs} >
                <AddBoxIcon />
                &nbsp;&nbsp;&nbsp;Add Other Jobs
              </Button>
            </Grid>
          )}

          <Grid container item xs={12} spacing={1}>
            <Grid item xs={12}>
              <Typography className={`${classes.center} ${classes.green}`} variant="h6">
                EXCLUDED BUSINESSES
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.center}>
              Please enter business you <b>DO NOT</b> wish to show up on their searches
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={[]}
                size="small"
                freeSolo
                value={exclude}
                onChange={handleBusiness}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                  ))
                }
                renderInput={(params) => (
                  <TextField {...params}
                    variant="standard"
                    fullWidth
                    // label="Excluded Businesses"
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Grid item container xs={12}>
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                onClick={goBackHandle}
                className={classes.button}
              >
                Go Back
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box className={classes.goback_button}>
                <MainButton
                  width="100%"
                  label="Save"
                  background="green"
                  border="green"
                  pd={60}
                  hoverColor="white"
                  hoverBack="#007000"
                  color="white"
                  fontSize={16}
                  onClick={handleSubmit(onSubmit)}
                >
                </MainButton>
              </Box>

              {/* <MainButton
                type="submit"
                variant="contained"
                color="primary"
                className={classes.}
              >
                Save
              </MainButton> */}
            </Grid>
          </Grid>
        </Grid>

        {/* If authorization was failed */}
        {errorMessage && (
          <Grid item className={classes.invalidMessage}>
            {errorMessage}
          </Grid>
        )}
      </form>
      {!experience.experience && (
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
                  You can manually enter your work experience or email your
                  resume and it will be uploaded in approximately 48 hours
                </i>
              </Typography>
              <Typography className={classes.contactEmail}>
                Register@EmployeezNow.com
              </Typography>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      )}
    </Container>
  ) : (
      ""
    );
};

const mapStateToProps = ({ employee: { experience, loading, success } }) => ({
  experience,
  loading,
  success,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...employeeActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExperienceForm);
