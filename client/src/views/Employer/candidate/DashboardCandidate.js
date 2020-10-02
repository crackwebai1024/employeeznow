import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { loadEmployee } from '../../../store/actions/employee';
import CandidateProfileHeader from './CandidateProfileHeader';
import ProfilePhoto from '../../Employee/Dashboard/ProfilePhoto';
import BackgourndPhoto from '../../Employee/Dashboard/BackgroundPhoto';
import Profession from '../../Employee/Dashboard/Profession';
import ProfessionDetail from '../../Employee/Dashboard/Professiondetail';
import CallToAction from '../../Employee/Dashboard/CallToAction';

// set styles - material-ui
const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '95vh',
  },
  profileContainer: {
    [theme.breakpoints.down('xs')]: {
      marginTop: '-7rem',
    },
  },
  bgContainer: {
    maxHeight: 300,
    //border: '5px solid green', //just for debug
  },
  underPhotoContainer: {
    marginTop: '0.8rem',
  },
  professionContainer: {
    [theme.breakpoints.down('xs')]: {
      marginTop: '2rem',
    },
  },
  professionDetailsContainer: {
    [theme.breakpoints.down('xs')]: {
      marginTop: '2rem',
    },
  },
  button: {
    color: theme.palette.common.blue,
    borderColor: theme.palette.common.blue,
  },
  nameText: {
    ...theme.typography.h6,
    color: theme.palette.common.darkBlue,
    marginTop: '1.5rem',
    marginBottom: '0.8rem',
  },
  noInfotext: {
    color: theme.palette.common.blue,
  },
}));

const DashboardCandidate = ({
  location,
  employee,
  slug,
  errorMessage,
  loadEmployee,
}) => {
  console.log(location.data);
  useEffect(() => {
    console.log('calling');
    loadEmployee(location.data.employeeId);
  }, []);

  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  /* eslint-disable react/jsx-one-expression-per-line */

  return (
    <Container className={classes.container}>
      {/* Dashboard whole page column root */}
      <Grid container direction="column">
        {/* column 1 / profile image, account button & background image / */}
        {/* row Profile image & background image */}
        <Grid
          item
          container
          direction={matchesXS ? 'column-reverse' : 'row'}
          justify="flex-start"
        >
          {/* row 1 / 2 row={4}*/}
          <Grid
            item
            container
            direction="column"
            sm={4}
            alignItems="center"
            justify="center"
            className={classes.profileContainer}
          >
            {/* nested column 1 / 3 profile image - veteran's profile is visible to all employers */}
            <Grid item>
              {employee.professionDetails &&
              employee.professionDetails.veteran.status === true ? (
                <ProfilePhoto photo={employee.profilePhoto} slug={slug} />
              ) : (
                <ProfilePhoto
                  photo={`${process.env.PUBLIC_URL}/img/default.png`}
                />
              )}
            </Grid>

            {/* nested column 2 / 3 Name */}
            <Grid item>
              <Typography className={classes.nameText}>
                {`Candidate: ${employee.employeezNowId}`}
              </Typography>
            </Grid>

            {/* nested column 3 / 3 account Button - hidden for employer */}
            <Grid item />
          </Grid>

          {/* row 2 / 2  row={8} background photo */}
          <Grid item container direction="column" sm={8} justify="flex-start">
            {/* nested column 1 / 2 */}
            <Grid item className={classes.bgContainer}>
              {/* default pictures, should get photo from api  */}
              {/* <BackgourndPhoto photo={employee.backgroundPhoto} slug={slug} /> */}
              <BackgourndPhoto photo={employee} slug={slug} />
            </Grid>
          </Grid>
        </Grid>

        {/* column 2 /  profession & profession details*/}
        <Grid item>
          {/* row 1 / 2  profession visible to all employers except for add/edit button */}
          <Grid
            container
            direction="row"
            className={classes.underPhotoContainer}
          >
            <Grid
              item
              md={4}
              sm={12}
              xs={12}
              className={classes.professionContainer}
            >
              {!employee.profession ? (
                ''
              ) : (
                <Profession profession={employee.profession} />
              )}
            </Grid>

            {/* row 2 / 2  profession details - visible to all employers except for add/edit button */}
            <Grid
              item
              md={8}
              sm={12}
              xs={12}
              className={classes.professionDetailsContainer}
            >
              {!employee.professionDetails ? (
                <Grid container direction="column">
                  <Grid item>
                    <Typography
                      className={classes.noInfotext}
                      align={matchesSM ? 'center' : 'flex-start'}
                    >
                      This candidate does not have Job interests yet.
                    </Typography>
                  </Grid>
                  <Grid item>
                    <CallToAction />
                  </Grid>
                </Grid>
              ) : (
                <ProfessionDetail details={employee.professionDetails} />
              )}
            </Grid>
          </Grid>
        </Grid>

        {/* column 2 /  portfolio */}
        <Grid item>Gallery</Grid>
      </Grid>
    </Container>
  );
};

DashboardCandidate.propTypes = {
  // loadEmployee: PropTypes.func.isRequired,
  // profession: PropTypes.shape([]),
  // professionDetails: PropTypes.shape([]),
};

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.error,
    slug: state.auth.slug,
    employee: state.employee,
  };
};

export default connect(mapStateToProps, { loadEmployee })(DashboardCandidate);
