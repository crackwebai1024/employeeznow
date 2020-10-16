import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
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

// import { loadSearchQueries } from '../../../store/actions/searchQueries';
// import { createSearchQuery } from '../../../store/actions/searchQuery';
// import { searchAndSavefilterProfessions } from '../../../store/actions/professions';

import {
  usaStates,
  shifts,
  jobTypes,
  styles,
  cuisines,
  wineKnowledges,
  cocktailKnowledges,
  poss,
  reservations,
} from '../../Employee/professionTypes';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '2rem',
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
}));

const SearchForm = ({
  employerId,
  slug,
  // searchQueries,
  history,
  // loadSearchQueries,
  searchAndSavefilterProfessions,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  // useEffect(() => {
  //   loadSearchQueries();
  // }, []);

  // react-hook-form setup
  const { register, handleSubmit, errors } = useForm();

  // connected to action
  const onSubmit = (formData) => {
    console.log(formData);
    const systems = [];
    systems.push(formData.pos, formData.reservation);

    delete formData.reservation;
    const sendData = { ...formData, systems };
    console.log(sendData);
    //load filtered professios and save search query
    searchAndSavefilterProfessions(sendData, history, slug, employerId);
  };

  // setData({
  //   searchAddress: {
  //    ...search
  //   }
  //   street: searchQueries[buttonId].street
  //     ? searchQueries[buttonId].street
  //     : '',
  //   shift: searchQueries[buttonId].shift ? searchQueries[buttonId].shift : '',
  //   primary: searchQueries[buttonId].primary
  //     ? searchQueries[buttonId].primary
  //     : '',
  //   secondary: searchQueries[buttonId].secondary
  //     ? searchQueries[buttonId].secondary
  //     : '',
  //   style: searchQueries[buttonId].style
  //     ? searchQueries[buttonId].street
  //     : '',
  //   cuisine: searchQueries[buttonId].cuisine
  //     ? searchQueries[buttonId].cuisine
  //     : '',
  //   wineKnowledge: searchQueries[buttonId].wineKnowledge
  //     ? searchQueries[buttonId].wineKnowldge
  //     : '',
  //   cocktailKnowledge: searchQueries[buttonId].cocktailKnowledge
  //     ? searchQueries[buttonId].cocktailKnowledge
  //     : '',
  //   pos: searchQueries[buttonId].pos ? searchQueries[buttonId].pos : 0,
  //   reservation: searchQueries[buttonId].reservation
  //     ? searchQueries[buttonId].reservation
  //     : '',
  //   name: searchQueries[buttonId].name ? searchQueries[buttonId].name : '',
  // });

  return (
    <Container maxWidth="sm">
      <div className={classes.root}>
        <Typography variant="h2" className={classes.title}>
          SEARCH FORM
        </Typography>
        <Typography variant="body2" className={classes.subTitle}>
          Please create a personalized filter. We will find the best matched
          candidates!
        </Typography>

        <form onSubmit={(e) => e.preventDefault()}>
          <Grid container direction="column">
            {/* address */}
            <Grid item container alignItems="flex-end">
              <Grid item>
                <AssignmentOutlinedIcon fontSize="small" />
              </Grid>

              <Grid item>
                <Typography variant="body2" className={classes.inputTitle}>
                  WORKPLACE
                </Typography>
              </Grid>
            </Grid>

            <Grid item>
              <TextField
                fullWidth
                margin="none"
                name="searchAddress.street"
                label="Street"
                type="text"
                id="street"
                autoComplete="street"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                inputRef={register}
              />
            </Grid>

            <Grid item>
              <TextField
                error={
                  errors.searchAddress && errors.searchAddress.city
                    ? true
                    : false
                }
                helperText={
                  errors.searchAddress && errors.searchAddress.city
                    ? 'This filed is required'
                    : ''
                }
                required
                fullWidth
                margin="none"
                name="searchAddress.city"
                label="City"
                type="text"
                id="city"
                autoComplete="city"
                InputLabelProps={{
                  shrink: true,
                }}
                inputRef={register({ required: true, minLength: 2 })}
              />
            </Grid>

            <Grid item>
              <TextField
                error={
                  errors.searchAddress && errors.searchAddress.state
                    ? true
                    : false
                }
                helperText={
                  errors.searchAddress && errors.searchAddress.state
                    ? 'This filed is required'
                    : ''
                }
                required
                fullWidth
                select
                margin="none"
                name="searchAddress.state"
                label="State"
                id="state"
                autoComplete="state"
                InputLabelProps={{
                  shrink: true,
                }}
                inputRef={register({
                  required: true,
                })}
                SelectProps={{
                  native: true,
                }}
              >
                <option value=""></option>
                {usaStates.map((usaState) => (
                  <option value={usaState.value} key={usaState.value}>
                    {usaState.label}
                  </option>
                ))}
              </TextField>
            </Grid>

            <Grid item>
              <TextField
                error={
                  errors.searchAddress && errors.searchAddress.zipcode
                    ? true
                    : false
                }
                helperText={
                  errors.searchAddress && errors.searchAddress.zipcode
                    ? 'This filed is required'
                    : ''
                }
                required
                fullWidth
                margin="none"
                name="searchAddress.zipcode"
                label="Zip Code"
                type="text"
                id="zipcode"
                autoComplete="zipcode"
                InputLabelProps={{
                  shrink: true,
                }}
                inputRef={register({
                  required: true,
                  minLength: 5,
                  maxLength: 5,
                  pattern: /^[0-9]*$/,
                })}
              />
            </Grid>

            <Grid item container alignItems="flex-end">
              <Grid item>
                <AssignmentOutlinedIcon fontSize="small" />
              </Grid>

              <Grid item>
                <Typography variant="body1" className={classes.inputTitle}>
                  SHIFT
                </Typography>
              </Grid>
            </Grid>

            <FormControl
              component="fieldset"
              required
              error={errors.shift ? true : false}
            >
              <FormLabel> </FormLabel>
              <FormGroup>
                <Grid item>
                  {shifts.map((sh, i) => (
                    <FormControlLabel
                      control={<Checkbox id={sh} />}
                      key={`${sh}${i}`}
                      name="shift"
                      value={sh}
                      label={sh}
                      inputRef={register({
                        required: true,
                      })}
                    />
                  ))}
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

            <TextField
              error={errors.primary && errors.primary ? true : false}
              helperText={
                errors.primary && errors.primary ? 'This filed is required' : ''
              }
              required
              select
              fullWidth
              margin="none"
              name="primary"
              label="Primary Job"
              id="primary"
              inputRef={register({
                required: true,
              })}
              InputLabelProps={{
                shrink: true,
              }}
              SelectProps={{
                native: true,
              }}
            >
              <option value=""></option>
              {jobTypes.map((jobType) => (
                <option key={jobType} value={jobType}>
                  {jobType}
                </option>
              ))}
            </TextField>

            <TextField
              error={errors.secondary && errors.secondary ? true : false}
              helperText={
                errors.secondary && errors.secondary
                  ? 'This filed is required'
                  : ''
              }
              required
              select
              fullWidth
              margin="none"
              name="secondary"
              label="Secondary Job"
              id="secondary"
              inputRef={register({
                required: true,
              })}
              InputLabelProps={{
                shrink: true,
              }}
              SelectProps={{
                native: true,
              }}
            >
              <option value=""></option>
              {jobTypes.map((jobType) => (
                <option key={jobType} value={jobType}>
                  {jobType}
                </option>
              ))}
            </TextField>

            <TextField
              error={errors.style && errors.style ? true : false}
              helperText={
                errors.style && errors.style ? 'This filed is required' : ''
              }
              required
              select
              fullWidth
              margin="none"
              name="style"
              label="Style"
              id="style"
              inputRef={register({
                required: true,
              })}
              InputLabelProps={{
                shrink: true,
              }}
              SelectProps={{
                native: true,
              }}
            >
              <option value=""></option>
              {styles.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </TextField>

            <TextField
              error={errors.cuisine && errors.cuisine ? true : false}
              helperText={
                errors.cuisine && errors.cuisine ? 'This filed is required' : ''
              }
              required
              select
              fullWidth
              margin="none"
              name="cuisine"
              label="Cuisine"
              id="cuisine"
              inputRef={register({
                required: true,
              })}
              InputLabelProps={{
                shrink: true,
              }}
              SelectProps={{
                native: true,
              }}
            >
              <option value=""></option>
              {cuisines.map((cu) => (
                <option key={cu} value={cu}>
                  {cu}
                </option>
              ))}
            </TextField>

            <TextField
              error={
                errors.wineKnowledge && errors.wineKnowledge ? true : false
              }
              helperText={
                errors.wineKnowledge && errors.wineKnowledge
                  ? 'This filed is required'
                  : ''
              }
              required
              select
              fullWidth
              margin="none"
              name="wineKnowledge"
              label="Wine Knowledge"
              id="wineKnowledge"
              inputRef={register({
                required: true,
              })}
              InputLabelProps={{
                shrink: true,
              }}
              SelectProps={{
                native: true,
              }}
            >
              <option value=""></option>
              {wineKnowledges.map((wine) => (
                <option key={wine} value={wine}>
                  {wine}
                </option>
              ))}
            </TextField>

            <TextField
              error={
                errors.cocktailKnowledge && errors.cocktailKnowledge
                  ? true
                  : false
              }
              helperText={
                errors.cocktailKnowledge && errors.cocktailKnowledge
                  ? 'This filed is required'
                  : ''
              }
              required
              select
              fullWidth
              margin="none"
              name="cocktailKnowledge"
              label="Cocktail Knowledge"
              id="cocktailKnowledge"
              inputRef={register({
                required: true,
              })}
              InputLabelProps={{
                shrink: true,
              }}
              SelectProps={{
                native: true,
              }}
            >
              <option value=""></option>
              {cocktailKnowledges.map((cocktail) => (
                <option key={cocktail} value={cocktail}>
                  {cocktail}
                </option>
              ))}
            </TextField>

            <TextField
              error={errors.pos && errors.pos ? true : false}
              helperText={
                errors.pos && errors.pos ? 'This filed is required' : ''
              }
              select
              fullWidth
              required
              margin="none"
              name="pos"
              label="POS"
              inputRef={register({
                required: true,
              })}
              InputLabelProps={{
                shrink: true,
              }}
              SelectProps={{
                native: true,
              }}
            >
              <option value="" />
              {poss.map((pos) => (
                <option key={pos} value={pos}>
                  {pos}
                </option>
              ))}
            </TextField>

            <TextField
              error={errors.reservation && errors.reservation ? true : false}
              helperText={
                errors.reservation && errors.reservation
                  ? 'This filed is required'
                  : ''
              }
              select
              fullWidth
              required
              margin="none"
              name="reservation"
              label="Reservation"
              inputRef={register({
                required: true,
              })}
              InputLabelProps={{
                shrink: true,
              }}
              SelectProps={{
                native: true,
              }}
            >
              <option value="" />
              {reservations.map((res) => (
                <option key={res} value={res}>
                  {res}
                </option>
              ))}
            </TextField>

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
                This filter name. You can use the same filter next time!
              </Typography>
              <TextField
                error={errors.name && errors.name ? true : false}
                helperText={
                  errors.name && errors.name ? 'This filed is required' : ''
                }
                required
                fullWidth
                margin="none"
                name="name"
                label="Name (ex. My 5th st Cafe)"
                type="text"
                id="name"
                autoComplete="name"
                InputLabelProps={{
                  shrink: true,
                }}
                inputRef={register({ required: true, mixLength: 10 })}
              />
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="outlined"
              color="primary"
              onClick={handleSubmit(onSubmit)}
              className={classes.button}
            >
              Confirm
            </Button>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    slug: state.auth.slug,
    employerId: state.auth.userId,
    searchQueries: state.searchQueries.searchQueries,
  };
};

export default connect(mapStateToProps, {
  // loadSearchQueries,
  // createSearchQuery,
  // searchAndSavefilterProfessions,
})(SearchForm);
