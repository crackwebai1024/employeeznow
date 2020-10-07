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
import {
  loadProfessionDetails,
  updateProfessionDetails,
} from '../../../store/actions/professionDetails';

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

const EditProfessionDetailsForm = ({
  loadProfessionDetails,
  updateProfessionDetails,
  loading,
  employeeId,
  slug,
  history,
  currentData,
  errorMessage,
}) => {
  const [formData, setFormData] = useState({
    primaryJob: { company: '', startDate: '', endDate: '', current: false },
    secondaryJob: { company: '', startDate: '', endDate: '' },
    employmentStatus: '',
    // milesToWork: '',
    idealSalary: { amount: '', unit: '' },
    planningToMove: { planning: false, location: '', dateToMove: '' },
    randomShift: false,
    randomShiftRole: [],
    newOpportunity: { availability: false, title: '' },
    veteran: { status: false, veteranId: '' },
    dateOfBirth: '',
    employee: '',
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
    loadProfessionDetails();

    // decide not to add default value for select box - uncontrolled behavior
    setFormData({
      primaryJob: {
        ...formData.primaryJob,
        company:
          loading || !currentData.primaryJob.company
            ? ''
            : currentData.primaryJob.company,
        startDate:
          loading || !currentData.primaryJob.startDate
            ? ''
            : convertDate(currentData.primaryJob.startDate),
        endDate:
          loading || !currentData.primaryJob.endDate
            ? ''
            : convertDate(currentData.primaryJob.endDate),
        current:
          loading || !currentData.primaryJob.current
            ? false
            : currentData.primaryJob.current,
      },
      secondaryJob: {
        ...formData.secondaryJob,
        company:
          loading || !currentData.secondaryJob.company
            ? ''
            : currentData.secondaryJob.company,
        startDate:
          loading || !currentData.secondaryJob.startDate
            ? ''
            : convertDate(currentData.secondaryJob.startDate),
        endDate:
          loading || !currentData.secondaryJob.endDate
            ? ''
            : convertDate(currentData.secondaryJob.endDate),
      },
      employmentStatus:
        loading || !currentData.employmentStatus
          ? ''
          : currentData.employmentStatus,
      // milesToWork:
      //   loading || !currentData.milesToWork ? '' : currentData.milesToWork,
      idealSalary: {
        ...formData.idealSalary,
        amount:
          loading || !currentData.idealSalary.amount
            ? false
            : currentData.idealSalary.amount,
        unit:
          loading || !currentData.idealSalary.unit
            ? ''
            : currentData.idealSalary.unit,
      },
      dateOfBirth:
        loading || !currentData.dateOfBirth
          ? ''
          : convertDate(currentData.dateOfBirth),
      planningToMove: {
        ...formData.planningToMove,
        planning: loading || false,
        location: loading || '',
        dateToMove: loading || '',
      },
      randomShiftRole: loading || [],
      newOpportunity: loading || false,
      veteran: loading || false,
      // open box and checkbox has difficult behavior
      // planningToMove: {
      //   ...formData.planningToMove,
      //   planning:
      //     loading || !currentData.planningToMove.planning
      //       ? false
      //       : currentData.planningToMove.planning,
      //   location:
      //     loading || !currentData.planningToMove.location
      //       ? ''
      //       : currentData.planningToMove.location,
      //   dateToMove:
      //     loading || !currentData.planningToMove.dateToMove
      //       ? ''
      //       : convertDate(currentData.planningToMove.dateToMove),
      // },
      // randomShift:
      //   loading || !currentData.randomShift ? false : currentData.randomShift,
      // randomShiftRole:
      //   loading || !currentData.randomShiftRole
      //     ? []
      //     : [...randomShiftRole, currentData.randomShiftRole],
      // newOpportunity:
      //   loading || !currentData.newOpportunity
      //     ? false
      //     : currentData.newOpportunity,
      // veteran: loading || !currentData.veteran ? '' : currentData.veteran,

      employee: loading || employeeId,
      _id: loading || currentData.professionDetailId,
    });
  }, [loading]);

  // destructure
  const {
    primaryJob,
    secondaryJob,
    employmentStatus,
    //milesToWork,
    idealSalary,
    planningToMove,
    randomShift,
    randomShiftRole,
    newOpportunity,
    veteran,
    dateOfBirth,
  } = formData;

  const onChange = ({ target: { id, name, value, checked } }) => {
    console.log('id:', id, 'name:', name, 'value:', value, 'checked', checked);

    switch (name) {
      case 'dateOfBirth':
      case 'employmentStatus': {
        return setFormData({ ...formData, [name]: value });
      }
      // case 'milesToWork': {
      //   // validation
      //   if (value < 0) {
      //     return setError({ milesToWork: 'Incorrect number' });
      //   }
      //   setError({ milesToWork: '' });
      //   return setFormData({ ...formData, [name]: value });
      // }
      case 'endDate':
      case 'company':
      case 'startDate':
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

      case 'randomShift': {
        return setFormData({
          ...formData,
          randomShift: !randomShift,
        });
      }

      default:
        return formData;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateProfessionDetails(formData, history, slug);
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
            Job Experience
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

          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  name="current"
                  id="primaryJob"
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
                InputLabelProps={{
                  shrink: true,
                }}
                value={secondaryJob.endDate}
                onChange={(e) => onChange(e)}
                className={classes.item}
              />
            </Grid>
          </Grid>

          {/* employemnt status job */}
          <Grid item className={classes.textContainer}>
            <Typography gutterBottom variant="h6">
              Employment Status
            </Typography>
          </Grid>

          <Grid item>
            <Select
              native
              required
              name="employmentStatus"
              id="employmentStatus"
              value={employmentStatus}
              onChange={(e) => onChange(e)}
            >
              <option aria-label="none" value="" />
              <option value="Unemployed and looking for">
                Unemployed and looking for
              </option>
              <option value="Employed and looking for">
                Employed and looking for
              </option>
              <option value="Employed and not looking for">
                Employed and not looking for
              </option>
            </Select>
          </Grid>

          {/* miles to work */}
          {/* <Grid item className={classes.textContainer}>
            <Typography gutterBottom variant="h6">
              Miles to Work
            </Typography>
          </Grid>

          <Grid item>
            <TextField
              error={error.milesToWork.length !== 0}
              helperText={error.milesToWork}
              type="number"
              name="milesToWork"
              id="milesToWork"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">miles</InputAdornment>
                ),
              }}
              value={milesToWork}
              onChange={(e) => onChange(e)}
            />
          </Grid> */}

          {/* ideal salary */}
          <Grid item className={classes.textContainer}>
            <Typography gutterBottom variant="h6">
              Ideal Salary
            </Typography>
          </Grid>

          <Grid item>
            <TextField
              type="number"
              name="amount"
              id="idealSalary"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">US$</InputAdornment>
                ),
              }}
              value={idealSalary.amount}
              onChange={(e) => onChange(e)}
            />
            <TextField
              id="idealSalary"
              select
              value={idealSalary.unit}
              name="unit"
              onChange={(e) => onChange(e)}
              SelectProps={{
                native: true,
              }}
              helperText="Please select your unit"
              className={classes.item}
            >
              {units.map((unit) => (
                <option key={unit.value} value={unit.value}>
                  {unit.value}
                </option>
              ))}
            </TextField>
          </Grid>

          {/* date of birth */}
          <Grid item className={classes.Container}>
            <Typography gutterBottom variant="h6">
              Date of Birth
            </Typography>
          </Grid>

          <Grid item>
            <TextField
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              InputLabelProps={{
                shrink: true,
              }}
              value={dateOfBirth}
              onChange={(e) => onChange(e)}
              className={classes.item}
            />
          </Grid>

          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  name="planning"
                  value={planningToMove.planning}
                  id="planningToMove"
                  onChange={(e) => onChange(e)}
                />
              }
              label="Planning to move ?"
              className={classes.checkboxText}
            />

            {planningToMove.planning ? (
              <Grid container>
                <Grid item xs={6}>
                  <TextField
                    type="text"
                    name="location"
                    id="planningToMove"
                    label="Location"
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={planningToMove.location}
                    onChange={(e) => onChange(e)}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    type="date"
                    name="dateToMove"
                    id="planningToMove"
                    label="Date to Move"
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={planningToMove.dateToMove}
                    onChange={(e) => onChange(e)}
                    className={classes.item}
                  />
                </Grid>
              </Grid>
            ) : (
              ''
            )}
          </Grid>

          {/* random shift */}
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  name="randomShift"
                  id="randomShift"
                  value={randomShift}
                  onChange={(e) => onChange(e)}
                />
              }
              label="Open to random shifts ?"
              className={classes.checkboxText}
            />

            {randomShift ? (
              <Grid item>
                <Typography>Select which role you can work for</Typography>

                <Grid container>
                  {roles.map((role) => (
                    <Grid item key={role} sm={4} xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="randomShiftRole"
                            id={role}
                            value={randomShiftRole}
                            // checked={
                            //   randomShiftRole.includes(role) ? true : false
                            // }
                            onChange={(e) => onChange(e)}
                          />
                        }
                        label={role}
                        className={classes.item}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            ) : (
              ''
            )}
          </Grid>

          {/* new opportunity */}
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  name="availability"
                  id="newOpportunity"
                  value={newOpportunity.availability}
                  onChange={(e) => onChange(e)}
                />
              }
              label="Open to new opportunity ?"
              className={classes.checkboxText}
            />

            {newOpportunity.availability ? (
              <Grid item>
                <Typography>Select a title</Typography>

                <Grid container>
                  {jobTypes.map((type) => (
                    <Grid item key={type} sm={4} xs={12}>
                      <FormControlLabel
                        control={
                          <Radio
                            name="title"
                            id="newOpportunity"
                            value={type}
                            checked={
                              newOpportunity.title === type ? true : false
                            }
                            onChange={(e) => onChange(e)}
                          />
                        }
                        label={type}
                        name="title"
                        className={classes.item}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            ) : (
              ''
            )}
          </Grid>

          {/* veteran status */}
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  name="status"
                  id="veteran"
                  value={veteran.status}
                  onChange={(e) => onChange(e)}
                />
              }
              label="Are you a veteran ?"
              className={classes.checkboxText}
            />

            {veteran.status ? (
              <Grid item>
                <TextField
                  type="text"
                  name="veteranId"
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

const mapStateToProps = (state) => {
  return {
    errorMessage: state.professionDetails.error,
    loading: state.auth.loading,
    employeeId: state.auth.userId,
    slug: state.auth.slug,
    currentData: state.professionDetails,
  };
};

export default connect(mapStateToProps, {
  loadProfessionDetails,
  updateProfessionDetails,
})(EditProfessionDetailsForm);
