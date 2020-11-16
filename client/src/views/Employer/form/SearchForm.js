import React, { useState, useEffect, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { actions as employerActions } from '@store/employer';
import { bindActionCreators } from 'redux';
import { makeStyles, useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import _ from 'lodash';
import { getUser } from '@helpers/auth-helpers';
import { usaStates, shifts, jobTypes, styles, cuisines, wineKnowledges, cocktailKnowledges, poss, reservations } from '../../Employee/professionTypes';
import LoadingCircular from '@components/LoadingCircular';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '2rem',
    [theme.breakpoints.down('sm')]: {
      margin: '1rem 0.5rem'
    },
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  subTitle: {
    color: theme.palette.common.darkBlue,
  },
  inputTitle: {
    marginTop: '1.8rem',
    paddingLeft: '0.5rem',
    paddingBottom: '0.2rem',
  },
  button: {
    marginTop: '2rem',
    verticalAlign: 'baseline',
  },
  invalidMessage: {
    color: theme.palette.error.main,
    marginBottom: '2rem',
  },
  error: {
    color: 'red'
  }
}));

const SearchForm = ({ actions, saveFilter, setOpenSearchForm, searchFormData, slug }) => {
  const classes = useStyles();
  const theme = useTheme();
  const user = JSON.parse(getUser())

  const [shift, setShift] = useState(searchFormData ? searchFormData.shift : [])
  const [reload, setReload] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [style, setStyle] = useState(searchFormData ? searchFormData.style : []);
  const [cuisine, setCuisine] = useState(searchFormData ? searchFormData.cuisine : []);
  const [cuisineError, setCuisineError] = useState("")
  const [styleError, setStyleError] = useState("")

  const { register, handleSubmit, errors, setValue } = useForm({
    defaultValues: searchFormData
  });

  const onSubmit = (formData) => {
    if (shift.length == 0) {
      return setError("Please Check the avaliable shift.")
    }
    const systems = [];
    systems.push(formData.pos, formData.reservation);
    delete formData.reservation;
    const id = user._id
    // filter save request action
    let sendData = {}
    if (searchFormData) {
      sendData = {
        ...formData, systems, id, "filterID": slug, shift, style, cuisine
      };
    } else {
      sendData = { ...formData, systems, id, shift, style, cuisine };
    }
    console.log(sendData, "sendData")
    actions.saveFilterRequest(sendData)
  };

  useEffect(() => {
    if (saveFilter == "SUCCESS") {
      const data = {
        id: user._id
      }
      actions.getFilterListRequest(data)
      setOpenSearchForm(false)
      actions.initialLoading()
      setLoading(false)
    } else if (saveFilter == "REQUEST") {
      setLoading(true)
    }
  }, [saveFilter])

  const handleChange = ({ target: { id, name, value, checked } }) => {
    if (checked) {
      shift.push(value)
      setShift(shift)
      setReload(!reload)
    } else {
      _.remove(shift, function (val) {
        return val == value
      })
      setShift(shift)
      setReload(!reload)
    }
    setError("")
  }

  useEffect(() => {
    setTimeout(() => {
      setCuisineError("")
      setStyleError("")
    }, 3000);
  }, [styleError, cuisineError])

  const onStyleChange = (e, value) => {
    setStyleError("")
    if (value.length > 3) {
      return setStyleError("You can only select maximun 3 items.")
    }
    setStyle(value)
  }

  const onCuisinechange = (e, value) => {
    setCuisineError("")
    if (value.length > 3) {
      return setCuisineError("You can only select maximum 3 items.")
    }
    setCuisine(value)
  }

  return (
    <Fragment>
      {loading && <LoadingCircular />}
      <Container maxWidth="sm" style={loading ? { overflowY: "hidden" } : { overflowY: "scroll" }}>
        <div className={classes.root}>
          <Typography variant="h2" className={classes.title}>
            SEARCH FORM
        </Typography>
          <Typography variant="body2" className={classes.subTitle}>
            Please create a personalized filter. We will find the best matched
            candidates!
        </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container direction="row" spacing={2}>
              {/* address */}
              <Grid item container alignItems="flex-end">
                <Grid item>
                  <AssignmentOutlinedIcon fontSize="small" />
                </Grid>

                <Grid item>
                  <Typography variant="body2" className={classes.inputTitle}>
                    ADDRESS OF EMPLOYMENT OPPORTUNITY
                </Typography>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField fullWidth margin="none" name="searchAddress.street" label="Street"
                  variant="outlined" InputLabelProps={{ shrink: true }}
                  type="text" id="street" size="small" inputRef={register}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={errors.searchAddress && errors.searchAddress.city
                    ? true : false
                  }
                  helperText={errors.searchAddress && errors.searchAddress.city
                    ? 'This filed is required' : ''
                  }
                  required fullWidth margin="none" name="searchAddress.city" label="City"
                  type="text" id="city" autoComplete="city" inputRef={register({ required: true, minLength: 2 })}
                  InputLabelProps={{ shrink: true }} variant="outlined" size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={errors.searchAddress && errors.searchAddress.state
                    ? true : false
                  }
                  helperText={errors.searchAddress && errors.searchAddress.state
                    ? 'This filed is required' : ''
                  }
                  variant="outlined" size="small"
                  required fullWidth select margin="none" name="searchAddress.state" label="State" id="state"
                  autoComplete="state" InputLabelProps={{ shrink: true }}
                  inputRef={register({ required: true })}
                  SelectProps={{ native: true }}
                  onChange={handleChange}
                >
                  <option value=""></option>
                  {usaStates.map((usaState) => (
                    <option value={usaState.value} key={usaState.value}>
                      {usaState.label}
                    </option>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  error={errors.searchAddress && errors.searchAddress.zipcode
                    ? true : false
                  }
                  helperText={errors.searchAddress && errors.searchAddress.zipcode
                    ? 'This filed is required' : ''
                  }
                  required fullWidth margin="none" name="searchAddress.zipcode" label="Zip Code"
                  type="text" id="zipcode" autoComplete="zipcode" size="small"
                  InputLabelProps={{ shrink: true }} variant="outlined"
                  inputRef={register({
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    pattern: /^[0-9]*$/,
                  })}
                />
              </Grid>

              <Grid>
                <Typography style={{ marginTop: '2rem', fontWeight: 600 }}>
                  REQUIRED FILTERS:
                </Typography>
              </Grid>

              <Grid item container alignItems="flex-end">
                <Grid item>
                  <AssignmentOutlinedIcon fontSize="small" />
                </Grid>

                <Grid item>
                  <Typography variant="body1" className={classes.inputTitle}>
                    SHIFT *
                </Typography>
                </Grid>
              </Grid>

              <FormControl component="fieldset" required error={errors.shift ? true : false} >
                <FormGroup>
                  <Grid item>
                    {searchFormData ?
                      shifts.map((sh, i) => (
                        <FormControlLabel
                          control={
                            <Checkbox id={sh}
                              value={sh} name={sh} onChange={(e) => handleChange(e)}
                              checked={searchFormData.shift.filter(shift => shift == sh).length > 0 ? true : false}
                            />
                          }
                          key={`${sh}${i}`} name="shift" label={sh}
                        />
                      ))
                      :
                      shifts.map((sh, i) => (
                        <FormControlLabel
                          control={
                            <Checkbox id={sh}
                              value={sh} name={sh} onChange={(e) => handleChange(e)}
                            />
                          }
                          key={`${sh}${i}`} name="shift" label={sh}
                        />
                      ))
                    }
                    {error && <Typography className={classes.error}>{error}</Typography>}
                  </Grid>
                </FormGroup>
                <FormHelperText>
                  {errors.shift && `This field is required`}
                </FormHelperText>
              </FormControl>

              <Grid item container alignItems="flex-end">
                <Grid item>
                  <AssignmentOutlinedIcon fontSize="small" />
                </Grid>

                <Grid item>
                  <Typography variant="body1" className={classes.inputTitle}>
                    EXPERIENCE
                </Typography>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  error={errors.primary && errors.primary ? true : false}
                  helperText={errors.primary && errors.primary ? 'This filed is required' : ''
                  }
                  required select fullWidth margin="none" name="primary" label="Primary Job"
                  id="primary" inputRef={register({ required: true })}
                  InputLabelProps={{ shrink: true }} variant="outlined"
                  SelectProps={{ native: true }} size="small"
                >
                  <option value=""></option>
                  {jobTypes.map((jobType) => (
                    <option key={jobType} value={jobType}>
                      {jobType}
                    </option>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  error={errors.minimumexp && errors.minimumexp ? true : false}
                  helperText={errors.minimumexp && errors.minimumexp
                    ? 'This filed is required' : ''
                  }
                  type="number"
                  required fullWidth margin="none" name="minimumexp" label="Minimum years of experience"
                  id="minimumexp" inputRef={register({ required: true })}
                  InputLabelProps={{ shrink: true }} size="small"
                  SelectProps={{ native: true }} variant="outlined"
                >
                </TextField>
              </Grid>

              <Grid xs={12} item >
                <Typography style={{ marginTop: '2rem', marginBottom: "1rem", fontWeight: 600 }}>
                  OPTIONAL FILTERS:
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  error={errors.minimumexp && errors.minimumexp ? true : false}
                  helperText={errors.minimumexp && errors.minimumexp
                    ? 'This filed is required' : ''
                  }
                  type="number"
                  fullWidth margin="none" name="idealSalary.amount" label="Pay Rate"
                  inputRef={register()}
                  InputLabelProps={{ shrink: true }} size="small"
                  SelectProps={{ native: true }} variant="outlined"
                >
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select fullWidth margin="none" name="idealSalary.unit" label="Pay Rate Unit"
                  inputRef={register()}
                  InputLabelProps={{ shrink: true }}
                  SelectProps={{ native: true }}
                  size="small" variant="outlined"
                >
                  <option value=""></option>
                  <option value="hourly">hourly</option>
                  <option value="weekely">weekely</option>
                  <option value="annualy">annualy</option>
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <Autocomplete
                  multiple fullWidth
                  size="small"
                  options={styles}
                  getOptionLabel={(option) => option}
                  defaultValue={searchFormData ? searchFormData.style : []}
                  value={style}
                  onChange={(e, value) => onStyleChange(e, value)}
                  renderInput={(params) => (
                    <TextField {...params}
                      variant="outlined" label="PREFERRED WORK EXPERIENCE"
                      InputLabelProps={{ shrink: true }}
                      name="style" id="style"
                      SelectProps={{ native: true }}
                    />
                  )}
                />
                <Typography className={classes.error}>
                  {styleError}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Autocomplete
                  multiple fullWidth
                  error={cuisineError ? true : false}
                  helperText={cuisineError ? "You can only select 3 items." : ""}
                  size="small"
                  name="cuisine"
                  options={cuisines}
                  value={cuisine}
                  defaultValue={searchFormData ? searchFormData.cuisine : []}
                  onChange={onCuisinechange}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField {...params}
                      variant="outlined" label="PREFERRED CUISINE EXPERIENCE"
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
                <Typography className={classes.error}>
                  {cuisineError}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  error={errors.wineKnowledge && errors.wineKnowledge ? true : false}
                  helperText={errors.wineKnowledge && errors.wineKnowledge
                    ? 'This filed is required' : ''}
                  select fullWidth margin="none" name="wineKnowledge" label="Wine Knowledge"
                  id="wineKnowledge" inputRef={register()}
                  InputLabelProps={{ shrink: true }}
                  SelectProps={{ native: true }}
                  size="small" variant="outlined"
                >
                  <option value=""></option>
                  {wineKnowledges.map((wine) => (
                    <option key={wine} value={wine}>
                      {wine}
                    </option>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  error={errors.cocktailKnowledge && errors.cocktailKnowledge
                    ? true : false
                  }
                  helperText={errors.cocktailKnowledge && errors.cocktailKnowledge
                    ? 'This filed is required' : ''
                  }
                  select fullWidth margin="none" name="cocktailKnowledge" label="Cocktail Knowledge"
                  id="cocktailKnowledge" inputRef={register()}
                  InputLabelProps={{ shrink: true }}
                  size="small" variant="outlined"
                  SelectProps={{ native: true }}
                >
                  <option value=""></option>
                  {cocktailKnowledges.map((cocktail) => (
                    <option key={cocktail} value={cocktail}>
                      {cocktail}
                    </option>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  error={errors.pos && errors.pos ? true : false}
                  helperText={errors.pos && errors.pos ? 'This filed is required' : ''}
                  select fullWidth margin="none" name="pos" label="POS EXPERIENCE"
                  InputLabelProps={{ shrink: true }} variant='outlined'
                  SelectProps={{ native: true }} size="small" inputRef={register()}
                >
                  <option value="" />
                  {poss.map((pos) => (
                    <option key={pos} value={pos}>
                      {pos}
                    </option>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} >
                <TextField
                  error={errors.reservation && errors.reservation ? true : false}
                  helperText={errors.reservation && errors.reservation
                    ? 'This filed is required'
                    : ''
                  }
                  select fullWidth margin="none" name="reservation" label="RESERVATION SYSTEM EXPERIENCE"
                  InputLabelProps={{ shrink: true }} variant="outlined"
                  SelectProps={{ native: true }} size="small" inputRef={register()}
                >
                  <option value="" />
                  {reservations.map((res) => (
                    <option key={res} value={res}>
                      {res}
                    </option>
                  ))}
                </TextField>
              </Grid>

              <Grid item container alignItems="flex-end">
                <Grid item>
                  <AssignmentOutlinedIcon fontSize="small" />
                </Grid>

                <Grid item>
                  <Typography variant="body1" className={classes.inputTitle}>
                    FILTER NAME
                  </Typography>
                </Grid>
              </Grid>

              <Grid item>
                <Typography variant="caption">
                  Name this search filter to save it for later use.
              </Typography>
                <TextField
                  error={errors.name && errors.name ? true : false}
                  helperText={errors.name && errors.name ? 'This filed is required' : ''
                  }
                  required fullWidth margin="none" name="name" label="Name (ex. My 5th st Cafe)" type="text"
                  id="name" autoComplete="name" InputLabelProps={{ shrink: true }}
                  inputRef={register({ required: true, mixLength: 10 })}
                  size="small"
                />
              </Grid>
              <Button type="submit" fullWidth variant="outlined" color="primary"
                className={classes.button}
              >
                Confirm
          </Button>
            </Grid>
          </form>
        </div>
      </Container>
    </Fragment>
  );
};

const mapStateToProps = ({
  employer: {
    saveFilter
  },
}) => ({
  saveFilter
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...employerActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
