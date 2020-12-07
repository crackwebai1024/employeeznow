import React, { Fragment } from 'react';
//import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@material-ui/core/Container';
import { Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

// set styles - material-ui
const useStyles = makeStyles((theme) => ({
  container: {
    // border: `1px solid ${theme.palette.grey[200]}`,
    padding: '2rem',
    marginTop: '1rem',
  },
  buttonContainer: {
    marginLeft: 'auto',
    marginRight: '3rem',
    marginBottom: '1rem',
    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
    },
  },
  button: {
    color: theme.palette.common.blue,
  },
  wrapper: {
    width: "100%",
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  title: {
    color: theme.palette.common.darkBlue,
    fontSize: '0.9rem',
  },
  item: {
    fontSize: '0.9rem',
    marginRight: '1rem',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'left',
    },
  },
  itemDate: {
    [theme.breakpoints.down('sm')]: {
      textAlign: 'right',
    },
  },
  hr: {
    width: '100%',
    border: 'none',
    borderTop: "1px dashed #dddddd"
  },
  docContainer: {
    marginTop: '1.5rem',
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto',
    },
  },
}));

const Profession = ({ profession }) => {
  const {
    shift,
    style,
    cuisine,
    wineKnowledge,
    cocktailKnowledge,
    systems,
    milesToWork,
  } = profession;

  // material-ui
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));


  console.log(style, "style")
  const renderProfession = (
    <Grid
      container
      direction={'row'}
    >
      <Grid container item xs={12}>
        <Grid container>
          {style && style.length !== 0 ?
            <Fragment>
              <Grid item xs={3} md={1}>
                <Typography className={classes.title}>Style</Typography>
              </Grid>
              <Grid container item xs={9} md={11}>
                {
                  style.map((st, i) => (
                    <Grid item key={i} container xs={12} md={6}>
                      <Grid item xs={8}>{st.type}</Grid>
                      <Grid item xs={4}>{st.years} years</Grid>
                    </Grid>
                  ))
                }
              </Grid>
              <hr className={classes.hr} />
            </Fragment>
            : ""}
        </Grid>
      </Grid>

      {/* cuisine */}
      <Grid item xs={12}>
        <Grid container>
          {cuisine && cuisine.length !== 0 ?
            <Fragment>
              <Grid item xs={3} md={1}>
                <Typography className={classes.title}>Cuisine</Typography>
              </Grid>
              <Grid container item xs={9} md={11}>
                {
                  cuisine.map((cu, i) => (
                    <Grid item key={i} container xs={12} md={6}>
                      <Grid item xs={8}>{cu.type}</Grid>
                      <Grid item xs={4}>{cu.years} years</Grid>
                    </Grid>
                  ))
                }
              </Grid>
              <hr className={classes.hr} />
            </Fragment>
            : ""}
        </Grid>
      </Grid>

      {/* shift */}
      <Grid item xs={12}>
        {shift && shift.length !== 0 && (
          <Grid container className={classes.wrapper} justify="flex-start">
            <Grid
              item
              container
              className={classes.wrapper}
              justify="flex-start"
            >
              <Grid item xs={3} md={1}>
                <Typography className={classes.title}>Shift</Typography>
              </Grid>
              <Grid item xs={9} md={7}>
                {shift.map((sh, i) => (
                  <span className={classes.item}>
                    {sh}
                  </span>
                ))}
              </Grid>
            </Grid>
            <hr className={classes.hr} />
          </Grid>
        )}
      </Grid>

      {/* wineKnowledge */}
      <Grid item container xs={12}>
        <Grid item container xs={12} sm={6}>
          {wineKnowledge && (
            <Grid item container className={classes.wrapper} justify="flex-start">
              <Grid item xs={7} md={5}>
                <Typography className={classes.title}>Wine Knowledge</Typography>
              </Grid>
              <Grid item xs={5} md={7}>
                <Typography className={classes.item} variant="body1">
                  {wineKnowledge}
                </Typography>
              </Grid>
            </Grid>
          )}
        </Grid>
        {/* <hr style={{ width: "100%" }} /> */}

        <Grid item xs={12} sm={6}>
          {cocktailKnowledge && (
            <Grid container className={classes.wrapper} justify="flex-start">
              <Grid item xs={7} md={5}>
                <Typography className={classes.title}>
                  Cocktail Knowldge
              </Typography>
              </Grid>
              <Grid item xs={5} md={7}>
                <Typography className={classes.item} variant="body1">
                  {cocktailKnowledge}
                </Typography>
              </Grid>
            </Grid>
          )}
        </Grid>

        <Grid item xs= {12}>
          <hr className={classes.hr} />
        </Grid>
      </Grid>

      {/* systems */}
      <Grid item xs={12} sm={6}>
        {systems && systems.length !== 0 && (
          <Grid container className={classes.wrapper} justify="flex-start">
            <Grid
              item
              container
              className={classes.wrapper}
              justify="flex-start"
            >
              <Grid item xs={7} md={5}>
                <Typography className={classes.title}>
                  POS &amp; Reservation
                  </Typography>
              </Grid>
              <Grid item xs={5} md={7}>
                {systems.map((sy, i) => (
                  <Typography className={classes.item} variant="body1">
                    {sy}{' '}
                  </Typography>
                ))}
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
      {/* milesToWork */}
      <Grid item xs={12} sm={6}>
        {milesToWork && (
          <Grid container className={classes.wrapper} justify="flex-start">
            <Grid item xs={7} md={5}>
              <Typography className={classes.title}>Miles to Work</Typography>
            </Grid>
            <Grid item xs={5} md={7}>
              <Typography className={classes.item} variant="body1">
                {milesToWork} miles
              </Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid item xs={12}>
      <hr className={classes.hr} />
      </Grid>
    </Grid>
  );
  // *** this page is shared both employee and employer.
  //     visibility for employer is limited  *** ////
  return (
    <Grid container direction="column">
      {/* column 1 / 3 edit button - only visible auth user */}
      <Grid item className={classes.buttonContainer}>
        {localStorage.getItem('role') === 'employee' && (
          <IconButton
            component={Link}
            to="/profession-form-edit"
            size="small"
            className={classes.button}
          >
            {/* <FontAwesomeIcon icon={faEdit} swapOpacity /> */}
          </IconButton>
        )}
      </Grid>

      {/* column 2 / 3 profession */}
      {matchesSM ? (
        <Container className={classes.container}>{renderProfession}</Container>
      ) : (
          <Grid item>{renderProfession}</Grid>
        )}

      {/* column 3 / 3  document page - currently documents are not necessary to upload*/}
      {/* <Grid item className={classes.docContainer}>
        {localStorage.role === 'employee' && <EmployeeDocument />}
      </Grid> */}
    </Grid>
  );
};

//Profession.propTypes = {};

export default Profession;
