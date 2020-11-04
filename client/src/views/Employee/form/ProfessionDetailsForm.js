import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import InputAdornment from "@material-ui/core/InputAdornment";
import Radio from "@material-ui/core/Radio";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { jobTypes, roles } from "../professionTypes";
import { actions as employeeActions } from "@store/employee";
import { bindActionCreators } from "redux";
import { getUser } from "@helpers/auth-helpers";
import { FormControl } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  heading1: {
    marginTop: "1.5rem",
    marginBottom: "1.5rem",
    fontSize: "2rem",
    color: theme.palette.primary.main,
  },
  titleContainer: {
    marginTop: "3.5rem",
    marginBottom: "1rem",
  },
  title: {
    fontSize: "1.3rem",
    color: theme.palette.common.darkBlue,
  },
  openIcon: {
    color: theme.palette.common.black,
    backgroundColor: "transparent",
    marginLeft: "1.5rem",
    "&:hover": {
      color: theme.palette.common.blue,
    },
  },
  dropzoneContainer: {
    justifyContent: "center",
    alignSelf: "center",
    textAlign: "center",
  },
  dropzoneText: {
    color: theme.palette.secondary.main,
    fontWeight: 700,
    textDecoration: "underline",
    marginBottom: "1rem",
    cursor: "pointer",
  },
  formContainer: {
    marginTop: "3rem",
  },
  textContainer: {
    marginTop: "2rem",
  },
  checkboxText: {
    marginTop: "1.5rem",
  },
  item: {
    marginLeft: "2rem",
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
    marginBottom: "5rem",
  },
  invalidMessage: {
    textAlign: "center",
    color: theme.palette.error.main,
    marginBottom: "2rem",
  },
  employmentStatus: {
    width: "300px",
  },
}));

const ProfessionDetailsForm = ({
  // createProfessionDetails,
  actions,
  preference,
  loading,
  errorMessage,
  success,
}) => {
  const [formData, setFormData] = useState({
    employmentStatus: "",
    idealSalary: { amount: "", unit: "hourly" },
    planningToMove: { planning: false, location: "", dateToMove: "" },
    randomShift: false,
    randomShiftRole: [],
    newOpportunity: { availability: false, title: "" },
    veteran: { status: false, veteranId: "" },
  });
  const [showAlert, setShowAlert] = useState(0);
  const {
    employmentStatus,
    idealSalary,
    planningToMove,
    randomShift,
    randomShiftRole,
    newOpportunity,
    veteran,
  } = formData;

  // disablt 'end date' for primaryJob if current was checked
  const [toDisabled, setToDisabled] = useState(false);
  const [toggleBox, setToggleBox] = useState(false);

  // set error
  // const [error, setError] = useState({
  //   milesToWork: '',
  // });

  // style material-ui
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  const user = JSON.parse(getUser());

  const units = [
    { value: "hourly" },
    { value: "weekly" },
    { value: "annually" },
  ];

  useEffect(() => {
    actions.loadPreference({ id: user._id });
  }, []);

  useEffect(() => {
    if (preference && preference.preference) {
      setFormData(preference.preference);
    }
  }, [preference]);

  useEffect(() => {
    if (success) {
      setShowAlert(1);
    } else if (success === false) {
      setShowAlert(2);
    } else {
      setShowAlert(0);
    }
    setTimeout(() => {
      actions.initiateSuccess();
    }, 5000);
  }, [success]);

  const onChange = ({ target: { id, name, value, checked } }) => {
    console.log("id:", id, "name:", name, "value:", value, "checked", checked);

    switch (name) {
      case "dateOfBirth":
      case "employmentStatus": {
        return setFormData({ ...formData, [name]: value });
      }
      case "company":
      case "startDate":
      case "endDate":
      case "amount":
      case "unit":
      case "location":
      case "dateToMove":
      case "title":
      case "veteranId": {
        return setFormData({
          ...formData,
          [id]: { ...formData[id], [name]: value },
        });
      }
      case "current": {
        setFormData((prevState) => ({
          ...prevState,
          [id]: { ...prevState[id], [name]: checked },
        }));
        setToDisabled(!toDisabled);
        break;
      }
      case "planning":
      case "availability":
      case "status": {
        setFormData((prevState) => ({
          ...prevState,
          [id]: { ...prevState[id], [name]: checked },
        }));
        setToggleBox(!toggleBox);
        break;
      }
      case "randomShiftRole": {
        const newArray = [...formData[name]];
        // uncheck - if the same shift already exists in state, the shift is removed from state
        if (newArray.includes(id)) {
          const idx = newArray.indexOf(id);
          newArray.splice(idx, 1);

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

      case "randomShift": {
        return setFormData({
          ...formData,
          randomShift: !randomShift,
        });
      }

      default:
        return formData;
    }
  };
  console.log(formData, "formdata");
  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
      ...formData,
      id: user._id,
    };
    actions.updatePreference(data);
  };

  return (
    !loading && (
      <Container maxWidth="sm">
        <Grid
          container
          direction="column"
          alignItems={matchesXS ? "center" : "flex-start"}
        >
          <Grid item>
            <Typography variant="h1" className={classes.heading1}>
              PERSONAL PREFERENCE
            </Typography>
          </Grid>

          <Grid item>
            <Typography variant="body2">
              Please enter your personal experience.
            </Typography>
          </Grid>
        </Grid>
        {showAlert === 1 && (
          <Alert severity="success">Successfully saved!</Alert>
        )}
        {showAlert === 2 && (
          <Alert severity="error">Sorry! Saving failed!</Alert>
        )}
        <form onSubmit={onSubmit} className={classes.formContainer}>
          <Grid
            container
            direction="column"
            alignItems={matchesXS ? "center" : "flex-start"}
          >
            {/* employemnt status job */}
            <Grid item className={classes.textContainer}>
              <Typography gutterBottom variant="h6">
                Employment Status
              </Typography>
            </Grid>

            <Grid item>
              <FormControl>
                <Select
                  className={classes.employmentStatus}
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
              </FormControl>
            </Grid>

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

            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    name="planning"
                    checked={planningToMove.planning}
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
                ""
              )}
            </Grid>

            {/* random shift */}
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    name="randomShift"
                    id="randomShift"
                    checked={randomShift}
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
                              checked={
                                randomShiftRole.filter((r) => r == role)
                                  .length > 0
                                  ? true
                                  : false
                              }
                              value={randomShiftRole}
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
                ""
              )}
            </Grid>

            {/* new opportunity */}
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    name="availability"
                    id="newOpportunity"
                    checked={newOpportunity.availability}
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
                ""
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
    )
  );
};

ProfessionDetailsForm.propTypes = {
  createProfessionDetails: PropTypes.func.isRequired,
};

const mapStateToProps = ({ employee: { preference, loading, success } }) => ({
  preference,
  loading,
  success,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...employeeActions }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfessionDetailsForm);
