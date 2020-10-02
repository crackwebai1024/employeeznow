import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { actions as employeeActions } from '@store/employee';
import { bindActionCreators } from 'redux';
import { getUser } from '@helpers/auth-helpers';
import _ from 'lodash';
// import {
//   updateProfession,
//   loadProfession,
// } from '../../../store/actions/profession';
// import setAlert from '../../../store/actions/alert';

import {
  jobTypes,
  shifts,
  styles,
  cuisines,
  wineKnowledges,
  cocktailKnowledges,
  poss,
  reservations,
} from '../professionTypes';

// set styles - material-ui
const useStyles = makeStyles((theme) => ({
  heading1: {
    marginTop: '1.5rem',
    marginBottom: '1rem',
    fontSize: '2rem',
    color: theme.palette.primary.main,
  },
  titleContainer: {
    marginTop: '3.5rem',
    marginBottom: '1rem',
  },
  title: {
    fontSize: '1.3rem',
    color: theme.palette.common.darkBlue,
  },
  yearsText: {
    marginRight: '1rem',
    paddingTop: '0.3rem',
  },
  yearsInput: {
    width: '5.5rem',
  },
  item: {
    '& .MuiFormControlLabel-label': {
      fontSize: '0.85rem',
      color: theme.palette.grey[700],
    },
  },
  styleSubtitle: {
    color: theme.palette.error.main,
    fontSize: '0.85rem',
  },
  styleandcuisineInput: {
    '& >label ': {
      fontSize: '0.85rem',
      color: theme.palette.grey[700],
    },
  },
  adornment: {
    '& >p': {
      fontSize: '0.8rem',
    },
  },
  styleRadio: {
    top: '0.87rem',
    left: '0.7rem',
  },
  helperText: {
    marginTop: '1rem',
  },
  openContainer: {
    marginTop: '2rem',
    '&::after': {
      transform: 'all 1s',
    },
  },
  avatar: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.blue,
    cursor: 'pointer',
    '&:hover' : {
      backgroundColor: 'RGB(88, 142, 222)'
    }
  },
  openText: {
    color: theme.palette.common.darkBlue,
  },
  button: {
    marginTop: '1rem',
    marginBottom: '5rem',
  },
}));

///*** This route should come from Dashboard (profession.js) because link has current profession data */
const SkillsForm = ({
  loading,
  history,
  profession,
  actions,
  skill,
  // loadProfession,
  // updateProfession,
  setAlert,
  slug,
  employee,
}) => {
  // set State
  const [primaryJob, setPrimaryJob] = useState({ title: '', years: '' });
  const [secondaryJob, setSecondaryJob] = useState({ title: '', years: '' });
  const [checkbox, setCheckbox] = useState(false);
  const [primaryOther, setPrimaryOther] = useState('');
  const [secondaryOther, setSecondaryOther] = useState('');
  const [secondaryCheckbox, setSecondaryCheckbox] = useState(false);
  const [shift, setShift] = useState([]);
  const [systems, setSystems] = useState([]);
  const [style, setStyle] = useState([]);
  const [styleCurrent, setStyleCurrent] = useState('');
  const [cuisine, setCuisine] = useState([]);
  const [wineKnowledge, setWineKnowledge] = useState('');
  const [cocktailKnowledge, setCocktailKnowledge] = useState('');
  const [milesToWork, setMilesToWork] = useState('');
  const [openJob, setOpenJob] = useState(false);

  const [professionId, setProfessionId] = useState('');

  const [primaryYearsError, setPrimaryYearsError] = useState('');
  const [secondaryYearsError, setSecondaryYearsError] = useState('');
  const [styleYearsError, setStyleYearsError] = useState('');
  const [cuisineYearsError, setCuisineYearsError] = useState('');

  // material-ui
  const classes = useStyles();
  const user = JSON.parse(getUser())
  // toggle open/close for secondaryJob container
  const openSecodaryJob = (e) => {
    e.preventDefault();
    setOpenJob(!openJob);
  };

  function _loadData () {
    let data = {
      id: user._id
    }
    actions.loadSkillData(data)
  }
  // display previous value to each field. But it currently works only primary and secondaryJob
  useEffect(() => {
    _loadData()
  }, []);

  useEffect(() => {
    if (!_.isEmpty(skill)) {
      const {
        primaryJob,
        secondaryJob,
        checkbox,
        primaryOther,
        secondaryOther,
        secondaryCheckbox,
        shift,
        systems,
        style,
        styleCurrent,
        cuisine,
        wineKnowledge,
        cocktailKnowledge,
        milesToWork,
        openJob,
      } = skill
      setPrimaryJob(primaryJob)
      setSecondaryJob(secondaryJob)
      setCheckbox(checkbox)
      setPrimaryOther(primaryOther)
      setSecondaryOther(secondaryOther)
      setSecondaryCheckbox(secondaryCheckbox)
      setShift(shift)
      setSystems(systems)
      setStyle(style)
      setStyleCurrent(styleCurrent)
      setCuisine(cuisine)
      setWineKnowledge(wineKnowledge)
      setCocktailKnowledge(cocktailKnowledge)
      setMilesToWork(milesToWork)
      setOpenJob(openJob)
    }
  }, [skill])

  const handleChange = ({ target: { id, name, value } }) => {
    console.log('id:', id, 'name:', name, 'value:', value);

    switch (name) {
      case 'primaryJob.title': {
        // When other field is checked, mark change setCheckbox. If others are checked, unmark 'Other" checkbox and remove text from 'Other'
        if (id === 'primaryOther') {
          setCheckbox(!checkbox);
        } else {
          setCheckbox(false);
          setPrimaryOther('');
        }
        return setPrimaryJob({ ...primaryJob, title: value });
      }
      case 'primaryOther': {
        // Other text input value
        if (value) {
          setPrimaryOther(value);
          return setPrimaryJob({ ...primaryJob, title: value });
        }
        // if value is empty or deleted, it returns ''
        return setPrimaryOther('');
      }
      case 'primaryJob.years': {
        if (value < 0) {
          return setPrimaryYearsError('Invalid input');
        }

        setPrimaryYearsError('');
        return setPrimaryJob({ ...primaryJob, years: value });
      }
      case 'secondaryJob.title': {
        // When other field is checked, mark change setCheckbox. If others are checked, unmark 'Other" checkbox and remove text from 'Other'
        if (id === 'secondaryOther') {
          setSecondaryCheckbox(!secondaryCheckbox);
        } else {
          setSecondaryCheckbox(false);
          setSecondaryOther('');
        }
        return setSecondaryJob({ ...secondaryJob, title: value });
      }
      case 'secondaryOther': {
        // Other text input value
        if (value) {
          setSecondaryOther(value);
          return setSecondaryJob({ ...secondaryJob, title: value });
        }
        // if value is empty or deleted, it returns ''
        return setSecondaryOther('');
      }
      case 'secondaryJob.years': {
        if (value < 0) {
          return setSecondaryYearsError('Invalid input');
        }
        setSecondaryYearsError('');
        return setSecondaryJob({ ...secondaryJob, years: value });
      }
      case 'shift': {
        const newArray = [...shift];

        // uncheck - if the same shift already exists in state, the shift is removed from state
        if (newArray.length !== 0 && newArray.includes(value)) {
          const idx = newArray.indexOf(value);
          newArray.splice(idx, idx + 1);
          return setShift(newArray);
        }

        newArray.push(value); // Set the new value
        return setShift(newArray);
      }
      case 'systems': {
        const newArray = [...systems];

        // uncheck - if the same shift already exists in state, the shift is removed from state
        if (newArray.length !== 0 && newArray.includes(value)) {
          const idx = newArray.indexOf(value);
          newArray.splice(idx, idx + 1);
          return setSystems(newArray);
        }

        newArray.push(value); // Set the new value
        return setSystems(newArray);
      }
      case 'style': {
        if (value < 0) {
          return setStyleYearsError('Invalid input. Years must be above 0');
        }

        setStyleYearsError('');

        const newArray = [...style];

        // change years = 0 to '' - it is easier to remove data later
        const noZeroValue = value === '0' ? (value = '') : value;
        newArray.push({ type: id, years: value });
        // update years if type exisits - Also if year is '', obj removed
        const update = newArray.filter(function (obj) {
          return obj.type === id ? (obj.years = noZeroValue) : obj;
        });

        // remove duplicate type and year (when input value has two digits ex.10, onChange triggers input twice)
        const noDuplicateArray = update.filter(
          (v, i, a) =>
            a.findIndex((t) => t.type === v.type && t.years === v.years) === i
        );

        return setStyle(noDuplicateArray);
      }
      case 'cuisine': {
        if (value < 0) {
          return setCuisineYearsError('Invalid input. Years must be above 0');
        }

        setCuisineYearsError('');

        const newArray = [...cuisine];

        // change years = 0 to '' - it is easier to remove data later
        const noZeroValue = value === '0' ? (value = '') : value;
        newArray.push({ type: id, years: value });
        // update years if type exisits - Also if year is '', obj removed
        const update = newArray.filter(function (obj) {
          return obj.type === id ? (obj.years = noZeroValue) : obj;
        });

        // remove duplicate type and year (when input value has two digits ex.10, onChange triggers input twice)
        const noDuplicateArray = update.filter(
          (v, i, a) =>
            a.findIndex((t) => t.type === v.type && t.years === v.years) === i
        );

        return setCuisine(noDuplicateArray);
      }
      case 'styleCurrent': {
        return setStyleCurrent(id);
      }
      case 'wineKnowledge': {
        return setWineKnowledge(id);
      }
      case 'cocktailKnowledge': {
        return setCocktailKnowledge(id);
      }
      case 'milesToWork' : {
        return setMilesToWork(value)
      }
      default:
        break;
    }
  };

  // create formData to send backend api
  const createFormData = () => {
    let formData = {};
    formData = {
      primaryJob,
      secondaryJob,
      shift,
      style,
      styleCurrent,
      cuisine,
      wineKnowledge,
      cocktailKnowledge,
      systems,
      id: user._id,
      employee,
      milesToWork
    };
    return formData;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //If there are errors, pop up alert
    if (
      primaryYearsError ||
      secondaryYearsError ||
      styleYearsError ||
      cuisineYearsError
    ) {
      setAlert(
        'error',
        'Invalid inputs. Please correct the value and try again'
      );
      return window.scrollTo(0, 0);
    }
    const formData = createFormData();

    actions.updateSkillRequest(formData)
    debugger
    _loadData()
    // updateProfession(formData, history, slug);
    // this will display when server errors happened... should not call here
    //setAlert('success', 'Successfully updated!', history, slug);
  };

  return (
    <Container maxWidth="sm" id="#">
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Typography variant="h1" className={classes.heading1}>
            {/* UPDATE SKILLS */}
          </Typography>
        </Grid>

        <form onSubmit={handleSubmit}>
          <Grid item className={classes.titleContainer}>
            <Typography className={classes.title}>
              Please select your primary job title (1 max)
            </Typography>
          </Grid>
          {/* primary job */}
          <FormControl component="fieldset" focused>
            <RadioGroup aria-label="primaryJob.title" name="primaryJob.title">
              <Grid item container direction="row">
                {jobTypes.map((jobType, i) => (
                  <Grid item key={`${jobType}${i}`} sm={4} xs={6}>
                    <FormControlLabel
                      control={
                        <Radio
                          value={jobType}
                          id="primaryJob"
                          checked={jobType === primaryJob.title}
                          onChange={(e) => handleChange(e)}
                        />
                      }
                      label={jobType}
                      className={classes.item}
                    />
                  </Grid>
                ))}

                {/* Radio 'Other' field. Need a text input - create separate state from primryJob. Otherwise input was inserted to the text column*/}
                {/* <Grid item>
                  <FormControlLabel
                    control={
                      <Radio
                        id="primaryOther"
                        name="primaryJob.title"
                        onChange={(e) => handleChange(e)}
                      />
                    }
                    checked={checkbox}
                    label="Other"
                    className={classes.item}
                  />
                  <TextField
                    type="text"
                    name="primaryOther"
                    value={primaryOther}
                    id="primaryJob"
                    onChange={(e) => handleChange(e)}
                  />
                </Grid> */}
              </Grid>
            </RadioGroup>
          </FormControl>

          <Grid item container direction="row">
            <Grid item>
              <Typography className={classes.yearsText}>
                &#42; How many years of experience for your primary job
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                error={primaryYearsError.length !== 0}
                helperText={primaryYearsError}
                type="number"
                name="primaryJob.years"
                id="primaryJob"
                value={primaryJob.years}
                onChange={(e) => handleChange(e)}
                className={classes.yearsInput}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      className={classes.adornment}
                    >
                      years
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          {/* secondary job */}
          {/* open and close secondary job container */}
          <Grid
            item
            container
            alignItems="center"
            spacing={1}
            className={classes.openContainer}
          >
            <Grid item>
              <Avatar
                onClick={(e) => openSecodaryJob(e)}
                className={classes.avatar}
              >
                {openJob ? <RemoveIcon /> : <AddIcon />}
              </Avatar>
            </Grid>
            <Grid item>
              <Typography className={classes.openText}>
                Add Secondary Job
              </Typography>
            </Grid>
          </Grid>

          {openJob && (
            <Grid item>
              <Grid item className={classes.titleContainer}>
                <Typography className={classes.title}>
                  Please select your Secondary job title (1 max)
                </Typography>
              </Grid>

              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="secondaryJob.title"
                  name="secondaryJob.title"
                >
                  <Grid item container direction="row">
                    {jobTypes.map((jobType, i) => (
                      <Grid item key={`${jobType}${i}`} sm={4} xs={6}>
                        <FormControlLabel
                          control={
                            <Radio
                              value={jobType}
                              checked={jobType === secondaryJob.title}
                              id="secondaryJob"
                              onChange={(e) => handleChange(e)}
                            />
                          }
                          label={jobType}
                          className={classes.item}
                        />
                      </Grid>
                    ))}
                    {/* Radio 'Other' field. Need a text input */}
                    {/* <Grid item>
                      <FormControlLabel
                        control={
                          <Radio
                            id="secondaryOther"
                            name="secondaryJob.title"
                            onChange={(e) => handleChange(e)}
                            className={classes.item}
                          />
                        }
                        checked={secondaryCheckbox}
                        label="Other"
                        className={classes.item}
                      />
                      <TextField
                        type="text"
                        name="secondaryOther"
                        value={secondaryOther}
                        id="secondaryJob"
                        onChange={(e) => handleChange(e)}
                      />
                    </Grid> */}
                  </Grid>
                </RadioGroup>
              </FormControl>

              <Grid item container direction="row">
                <Typography className={classes.yearsText}>
                  &#42; How many years of experience for your secondary job
                </Typography>

                <Grid item>
                  <TextField
                    error={secondaryYearsError.length !== 0}
                    helperText={secondaryYearsError}
                    type="number"
                    name="secondaryJob.years"
                    id="secondaryJob.years"
                    value={secondaryJob.years}
                    onChange={(e) => handleChange(e)}
                    className={classes.yearsInput}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          className={classes.adornment}
                        >
                          years
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          )}

          {/*  Shift */}
          <Grid item className={classes.titleContainer}>
            <Typography className={classes.title}>
              Please indicate which shift(s) you are willing to work
            </Typography>
          </Grid>

          <FormControl component="fieldset">
            <Grid item>
              {shifts.map((sh, i) => (
                <FormControlLabel
                  control={<Checkbox id={sh} />}
                  key={`${sh}${i}`}
                  name="shift"
                  value={sh}
                  checked = {shift.filter(shift => shift == sh)[0] ? true : false}
                  label={sh}
                  onChange={(e) => handleChange(e)}
                  className={classes.item}
                />
              ))}
            </Grid>
          </FormControl>

          {/* Stytle */}
          <Grid item className={classes.titleContainer}>
            <Typography className={classes.title}>
              Please enter your years of experience for each style of service
            </Typography>
            <Typography className={classes.styleSubtitle}>
              &#42; Please select your current style of service
            </Typography>
          </Grid>

          <FormControl component="fieldset">
            <RadioGroup aria-label="styleCurrent" name="styleCurrent">
              <Grid item container direction="row">
                {styles.map((st, i) => (
                  <Grid item key={`${st}${i}`} sm={6}>
                    <FormControlLabel
                      control={
                        <Radio
                          size="small"
                          id={st}
                          checked={styleCurrent === st}
                          onChange={(e) => handleChange(e)}
                          className={classes.styleRadio}
                        />
                      }
                      name="styleCurrent"
                    />
                    <TextField
                      id={st}
                      type="number"
                      name="style"
                      label={st}
                      values={style.years}
                      onChange={(e) => handleChange(e)}
                      min="0"
                      className={classes.styleandcuisineInput}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            className={classes.adornment}
                          >
                            years
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                ))}
                <FormHelperText
                  error={styleYearsError.length !== 0}
                  className={classes.helperText}
                >
                  {styleYearsError}
                </FormHelperText>
              </Grid>
            </RadioGroup>
          </FormControl>

          {/* cuisine */}
          <Grid item className={classes.titleContainer}>
            <Typography className={classes.title}>
              Please enter your years of experience for each cuisine (max 4
              selections)
            </Typography>

            <FormControl component="fieldset">
              <Grid item container direction="row">
                {cuisines.map((cu, i) => (
                  <Grid item key={`${cu}${i}`} xs={12} sm={6}>
                    <TextField
                      type="number"
                      name="cuisine"
                      label={cu}
                      id={cu}
                      value={cuisine.filter(cui => cui.type == cu)[0] ? cuisine.filter(cui => cui.type == cu)[0].years : ""}
                      onChange={(e) => handleChange(e)}
                      min="0"
                      className={classes.styleandcuisineInput}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            className={classes.adornment}
                          >
                            years
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                ))}
                <FormHelperText
                  error={cuisineYearsError.length !== 0}
                  className={classes.helperText}
                >
                  {cuisineYearsError}
                </FormHelperText>
              </Grid>
            </FormControl>
          </Grid>

          {/* wineKnowledge */}
          <Grid item className={classes.titleContainer}>
            <Typography className={classes.title}>
              Please choose your level of wine knowledge:
            </Typography>
            <RadioGroup aria-label="wineKnowledge" name="wineKnowledge">
              <Grid container direction="row">
                {wineKnowledges.map((wine) => (
                  <Grid item key={wine}>
                    <FormControlLabel
                      control={
                        <Radio
                          id={wine}
                          value={wine}
                          checked={wineKnowledge === wine}
                          onChange={(e) => handleChange(e)}
                        />
                      }
                      label={wine}
                      name="wineKnowledge"
                      className={classes.item}
                    />
                  </Grid>
                ))}
              </Grid>
            </RadioGroup>
          </Grid>

          {/* cocktailKnowledge */}
          <Grid item className={classes.titleContainer}>
            <Typography className={classes.title}>
              Please choose your level of cocktail knowledge:
            </Typography>
            <RadioGroup aria-label="cocktailKnowledge" name="cocktailKnowledge">
              <Grid container direction="row">
                {cocktailKnowledges.map((cocktail) => (
                  <Grid item key={cocktail}>
                    <FormControlLabel
                      control={
                        <Radio
                          id={cocktail}
                          value={cocktail}
                          checked={cocktailKnowledge === cocktail}
                          onChange={(e) => handleChange(e)}
                        />
                      }
                      label={cocktail}
                      name="cocktailKnowledge"
                      className={classes.item}
                    />
                  </Grid>
                ))}
              </Grid>
            </RadioGroup>
          </Grid>

          {/* POS */}
          <Grid item className={classes.titleContainer}>
            <Typography className={classes.title}>
              Please select all POS that you have at least one year of
              experience working with:
            </Typography>

            <Grid item container direction="row">
              {poss.map((pos) => (
                <Grid item key={pos} sm={4} xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id={pos}
                        value={pos}
                        checked = {systems.filter(sys => sys === pos)[0] ? true : false}
                        onChange={(e) => handleChange(e)}
                      />
                    }
                    name="systems"
                    label={pos}
                    className={classes.item}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Reservation */}
          <Grid item className={classes.titleContainer}>
            <Typography className={classes.title}>
              Select all reservation systems that you have at least one year of
              experience working with:
            </Typography>

            <Grid item container direction="row">
              {reservations.map((res) => (
                <Grid item key={res} sm={4} xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id={res}
                        checked = {systems.filter(sys => sys === res)[0] ? true : false}
                        value={res}
                        onChange={(e) => handleChange(e)}
                      />
                    }
                    name="systems"
                    label={res}
                    className={classes.item}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* miles to work */}
          <Grid item className={classes.titleContainer}>
            <Typography gutterBottom variant="h6">
              Miles to Work
            </Typography>
            <Typography variant="caption">
              &#42; Please input distance you can commute.
            </Typography>
          </Grid>

          <Grid item>
            <TextField
              required
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
              onChange={(e) => handleChange(e)}
            />
          </Grid>

          <Grid item>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={(e) => handleSubmit(e)}
              className={classes.button}
            >
              {!_.isEmpty(skill) ? "update" : "Add"}
            </Button>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
};

SkillsForm.propTypes = {
  updateProfession: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  //slug: PropTypes.string.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(SkillsForm);
