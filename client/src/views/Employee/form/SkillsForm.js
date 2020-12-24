import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { actions as employeeActions } from "@store/employee";
import { bindActionCreators } from "redux";
import { getUser } from "@helpers/auth-helpers";
import _ from "lodash";

import {
  jobTypes,
  shifts,
  styles,
  cuisines,
  wineKnowledges,
  cocktailKnowledges,
  poss,
  reservations,
} from "../professionTypes";

// set styles - material-ui
const useStyles = makeStyles((theme) => ({
  heading1: {
    marginTop: "5rem",
    fontSize: "2rem",
    color: theme.palette.primary.main,
  },
  titleContainer: {
    marginTop: "2.5rem",
    marginBottom: "1rem",
  },
  title: {
    fontSize: "1.3rem",
    color: theme.palette.common.darkBlue,
  },
  yearsText: {
    marginRight: "1rem",
    paddingTop: "0.3rem",
  },
  yearsInput: {
    width: "5.5rem",
  },
  item: {
    "& .MuiFormControlLabel-label": {
      fontSize: "0.85rem",
      color: theme.palette.grey[700],
    },
  },
  styleSubtitle: {
    color: theme.palette.error.main,
    fontSize: "0.85rem",
  },
  styleandcuisineInput: {
    "& >label ": {
      fontSize: "0.85rem",
      color: theme.palette.grey[700],
    },
  },
  adornment: {
    "& >p": {
      fontSize: "0.8rem",
    },
  },
  styleRadio: {
    top: "0.87rem",
    left: "0.7rem",
  },
  helperText: {
    marginTop: "1rem",
    fontSize: 16,
  },
  openContainer: {
    marginTop: "2rem",
    "&::after": {
      transform: "all 1s",
    },
  },
  avatar: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.blue,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "RGB(88, 142, 222)",
    },
  },
  openText: {
    color: theme.palette.common.darkBlue,
  },
  button: {
    marginTop: "1rem",
    marginBottom: "5rem",
  },
  goback_button: {
    float: "right",
    marginTop: "1rem",
    marginBottom: "5rem",
  },
}));

///*** This route should come from Dashboard (profession.js) because link has current profession data */
const SkillsForm = ({
  profession,
  actions,
  loading,
  skill,
  // loadProfession,
  // updateProfession,
  setAlert,
  slug,
  employee,
  success,
}) => {
  const [primaryJob, setPrimaryJob] = useState({ title: "", years: "" });
  const [secondaryJob, setSecondaryJob] = useState([]);
  const [checkbox, setCheckbox] = useState(false);
  const [primaryOther, setPrimaryOther] = useState("");
  const [secondaryOther, setSecondaryOther] = useState("");
  const [secondaryCheckbox, setSecondaryCheckbox] = useState(false);
  const [shift, setShift] = useState([]);
  const [systems, setSystems] = useState([]);
  const [style, setStyle] = useState([]);
  const [styleCurrent, setStyleCurrent] = useState("");
  const [cuisine, setCuisine] = useState([]);
  const [wineKnowledge, setWineKnowledge] = useState("");
  const [cocktailKnowledge, setCocktailKnowledge] = useState("");
  const [openJob, setOpenJob] = useState(false);

  const [primaryYearsError, setPrimaryYearsError] = useState("");
  const [secondaryYearsError, setSecondaryYearsError] = useState("");
  const [styleYearsError, setStyleYearsError] = useState("");
  const [cuisineYearsError, setCuisineYearsError] = useState("");

  // material-ui
  const classes = useStyles();
  const user = JSON.parse(getUser());
  // toggle open/close for secondaryJob container
  const openSecodaryJob = (e) => {
    e.preventDefault();
    setOpenJob(!openJob);
  };

  function _loadData() {
    let data = {
      id: user._id,
    };
    actions.loadSkillData(data);
  }
  // display previous value to each field. But it currently works only primary and secondaryJob
  useEffect(() => {
    _loadData();
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
      } = skill;
      setPrimaryJob(primaryJob);
      setSecondaryJob(secondaryJob);
      setCheckbox(checkbox);
      setPrimaryOther(primaryOther);
      setSecondaryOther(secondaryOther);
      setSecondaryCheckbox(secondaryCheckbox);
      setShift(shift);
      setSystems(systems);
      setStyle(style);
      setStyleCurrent(styleCurrent);
      setCuisine(cuisine);
      setWineKnowledge(wineKnowledge);
      setCocktailKnowledge(cocktailKnowledge);
      if (secondaryJob.length > 0) setOpenJob(true);
    }
  }, [skill]);

  const handleChange = ({ target: { id, name, value } }) => {
    console.log("id:", id, "name:", name, "value:", value);

    switch (name) {
      case "primaryJob.title": {
        // When other field is checked, mark change setCheckbox. If others are checked, unmark 'Other" checkbox and remove text from 'Other'
        if (id === "primaryOther") {
          setCheckbox(!checkbox);
        } else {
          setCheckbox(false);
          setPrimaryOther("");
        }
        return setPrimaryJob({ ...primaryJob, title: value });
      }
      case "primaryOther": {
        // Other text input value
        if (value) {
          setPrimaryOther(value);
          return setPrimaryJob({ ...primaryJob, title: value });
        }
        // if value is empty or deleted, it returns ''
        return setPrimaryOther("");
      }
      case "primaryJob.years": {
        if (value < 0) {
          return setPrimaryYearsError("Invalid input");
        }

        setPrimaryYearsError("");
        return setPrimaryJob({ ...primaryJob, years: value });
      }
      case "shift": {
        const newArray = [...shift];
        // uncheck - if the same shift already exists in state, the shift is removed from state
        if (newArray.length !== 0 && newArray.includes(value)) {
          const idx = newArray.indexOf(value);
          newArray.splice(idx, 1);
          return setShift(newArray);
        }

        newArray.push(value); // Set the new value
        return setShift(newArray);
      }
      case "pos": {
        const newArray = [...systems];
        // uncheck - if the same shift already exists in state, the shift is removed from state
        if (newArray.length !== 0 && newArray.includes(value)) {
          const idx = newArray.indexOf(value);
          newArray.splice(idx, 1);
          return setSystems(newArray);
        }
        let posArray = newArray.filter((x) => poss.includes(x));
        if (posArray.length > 4) return;
        newArray.push(value); // Set the new value
        return setSystems(newArray);
      }
      case "reservations": {
        const newArray = [...systems];
        // uncheck - if the same shift already exists in state, the shift is removed from state
        if (newArray.length !== 0 && newArray.includes(value)) {
          const idx = newArray.indexOf(value);
          newArray.splice(idx, 1);
          return setSystems(newArray);
        }

        let resArray = newArray.filter((x) => reservations.includes(x));
        if (resArray.length > 4) return;
        newArray.push(value); // Set the new value
        return setSystems(newArray);
      }
      case "style": {
        if (value < 0) {
          return setStyleYearsError("Invalid input. Years must be above 0");
        }
        if (style.length > 4) return;
        let newArray = [];
        let idx = style.findIndex((item) => item.type === id);
        if (value === "") {
          style.splice(idx, 1);
          newArray = [...style];
        } else {
          if (idx > -1) {
            style[idx].years = value;
            newArray = [...style];
          } else {
            if (style.length > 3) return;
            style.push({ type: id, years: value });
            newArray = [...style];
          }
        }
        return setStyle(newArray);
      }
      case "secondaryJob": {
        if (value < 0) {
          return;
        }
        let newArray = [];
        let idx = secondaryJob.findIndex((item) => item.type === id);
        if (value === "") {
          secondaryJob.splice(idx, 1);
          newArray = [...secondaryJob];
        } else {
          if (idx > -1) {
            secondaryJob[idx].years = value;
            newArray = [...secondaryJob];
          } else {
            if (secondaryJob.length > 2) return;
            secondaryJob.push({ title: id, years: value });
            newArray = [...secondaryJob];
            console.log(newArray);
          }
        }
        return setSecondaryJob(newArray);
      }
      case "cuisine": {
        if (value < 0) {
          return setCuisineYearsError("Invalid input. Years must be above 0");
        }
        let newArray = [];
        let idx = cuisine.findIndex((item) => item.type === id);
        if (value === "") {
          cuisine.splice(idx, 1);
          newArray = [...cuisine];
        } else {
          if (idx > -1) {
            cuisine[idx].years = value;
            newArray = [...cuisine];
          } else {
            if (cuisine.length > 5) return;
            cuisine.push({ type: id, years: value });
            newArray = [...cuisine];
          }
        }
        return setCuisine(newArray);
      }
      case "styleCurrent": {
        setStyle({ type: id, years: "" });
        return setStyleCurrent(id);
      }
      case "wineKnowledge": {
        return setWineKnowledge(id);
      }
      case "cocktailKnowledge": {
        return setCocktailKnowledge(id);
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
        "error",
        "Invalid inputs. Please correct the value and try again"
      );
      return window.scrollTo(0, 0);
    }
    const formData = createFormData();
    window.scrollTo(0, 0);
    actions.updateSkillRequest(formData);
    _loadData();
  };

  useEffect(() => {
    if (success === true) {
      history.push(`/employees/${user.slug}`);
    } else if (success === false) {
    }
    actions.initiateSuccess();
  }, [success]);

  const history = useHistory();
  const onCancleHandle = () => {
    const slug = user.slug;
    history.push(`/employees/${slug}`);
  };

  console.log(secondaryJob, "secondaryJob");

  return (
    <>
      <Container maxWidth="sm" id="#">
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Typography variant="h1" className={classes.heading1}>
              UPDATE SKILLS
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
                  value={primaryJob && primaryJob.years}
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
                    Please select your Secondary job title (3 max)
                  </Typography>
                </Grid>

                <FormControl component="fieldset">
                  <Grid item container direction="row">
                    {jobTypes.map((cu, i) => (
                      <Grid item key={`${cu}${i}`} xs={12} sm={6}>
                        <TextField
                          type="number"
                          name="secondaryJob"
                          label={cu}
                          id={cu}
                          value={
                            secondaryJob.filter((cui) => cui.title === cu)[0]
                              ? secondaryJob.filter(
                                  (cui) => cui.title === cu
                                )[0].years
                              : ""
                          }
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
                  </Grid>
                </FormControl>
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
                    checked={
                      shift.filter((shift) => shift === sh)[0] ? true : false
                    }
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
            </Grid>

            <FormControl component="fieldset">
              <RadioGroup aria-label="styleCurrent" name="styleCurrent">
                <Grid item container direction="row">
                  {styles.map((st, i) => (
                    <Grid item key={`${st}${i}`} sm={6}>
                      <TextField
                        id={st}
                        type="number"
                        name="style"
                        label={st}
                        value={
                          style.filter((style) => style.type === st)[0]
                            ? style.filter((style) => style.type === st)[0]
                                .years
                            : ""
                        }
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
                <FormHelperText
                  error={cuisineYearsError.length !== 0}
                  className={classes.helperText}
                >
                  {cuisineYearsError}
                </FormHelperText>
                <Grid item container direction="row">
                  {cuisines.map((cu, i) => (
                    <Grid item key={`${cu}${i}`} xs={12} sm={6}>
                      <TextField
                        type="number"
                        name="cuisine"
                        label={cu}
                        id={cu}
                        value={
                          cuisine.filter((cui) => cui.type === cu)[0]
                            ? cuisine.filter((cui) => cui.type === cu)[0].years
                            : ""
                        }
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
              <RadioGroup
                aria-label="cocktailKnowledge"
                name="cocktailKnowledge"
              >
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
                experience working with (max 5 items):
              </Typography>

              <Grid item container direction="row">
                {poss.map((pos) => (
                  <Grid item key={pos} sm={4} xs={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          id={pos}
                          value={pos}
                          checked={
                            systems.filter((sys) => sys === pos)[0]
                              ? true
                              : false
                          }
                          onChange={(e) => handleChange(e)}
                        />
                      }
                      name="pos"
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
                Select all reservation systems that you have at least one year
                of experience working with (max 5 items):
              </Typography>

              <Grid item container direction="row">
                {reservations.map((res) => (
                  <Grid item key={res} sm={4} xs={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          id={res}
                          checked={
                            systems.filter((sys) => sys === res)[0]
                              ? true
                              : false
                          }
                          value={res}
                          onChange={(e) => handleChange(e)}
                        />
                      }
                      name="reservations"
                      label={res}
                      className={classes.item}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid container item xs={12}>
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  onClick={onCancleHandle}
                  className={classes.goback_button}
                >
                  Go Back
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Container>
    </>
  );
  // );
};

SkillsForm.propTypes = {
  updateProfession: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  //slug: PropTypes.string.isRequired,
};

const mapStateToProps = ({ employee: { skill, loading, success } }) => ({
  skill,
  loading,
  success,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      ...employeeActions,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(SkillsForm);
