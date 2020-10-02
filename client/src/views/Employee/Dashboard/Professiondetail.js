import React from 'react';
//import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import HighlightOutlinedIcon from '@material-ui/icons/HighlightOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit } from '@fortawesome/free-regular-svg-icons';
import CallToAction from './CallToAction';

// set styles - material-ui
const useStyles = makeStyles((theme) => ({
  container: {
    border: `1px solid ${theme.palette.grey[200]}`,
    boxShadow: theme.shadows[12],
    padding: '2rem',
    marginTop: '1rem',
  },
  buttonContainer: {
    marginLeft: 'auto',
    marginRight: '3rem',
    marginBottom: '1rem',
  },
  button: {
    color: theme.palette.common.blue,
    borderColor: theme.palette.common.blue,
  },
  title: {
    color: theme.palette.common.darkBlue,
    fontSize: '0.75rem',
  },
  item: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem',
    },
  },
  itemDate: {
    textAlign: 'right',
  },
  editContainer: {
    marginLeft: 'auto',
    marginBottom: '1rem',
  },
  icon: {
    color: theme.palette.secondary.main,
    paddingRight: '0.2rem',
  },
}));

const Professiondetail = ({ details }) => {
  const {
    primaryJob,
    secondaryJob,
    employmentStatus,
    idealSalary,
    planningToMove,
    randomShift,
    randomShiftRole,
    newOpportunity,
    veteran,
    dateOfBirth,
  } = details;

  // material-ui
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  // convert ideal salary digits
  const kFormatter = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k'
      : Math.sign(num) * Math.abs(num);
  };

  // convert date (MongoDB/UTC) to "month, year"
  const convertDate = (date) => {
    const convert = new Date(date).toUTCString();
    return convert.split(' ').splice(2, 2).join(', ');
  };

  // set date for start date and end date for Primary or Secondary Job
  let sectionJob;
  const createSectionJob = (job, type) => {
    let start;
    let end;
    if (!job.startDate) {
      start = '';
    } else {
      start = convertDate(job.startDate);
    }

    if (!job.current && !job.endDate) {
      end = '';
    } else if (!job.current && job.endDate) {
      end = convertDate(job.endDate);
    } else {
      end = 'Present';
    }
    sectionJob = (
      <Grid container>
        <Grid item xs={3}>
          <Typography className={classes.title}>{type}</Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography className={classes.item} variant="body1">
            {job.company}
          </Typography>
        </Grid>

        <Grid item xs={5} className={classes.itemDate}>
          <Typography className={classes.item} variant="body1">
            {start} - {end}
          </Typography>
        </Grid>
      </Grid>
    );

    return sectionJob;
  };

  // map for RandamShit Role
  const sectionRandomShiftRole = (roles) => (
    <Grid item xs={9}>
      {roles.map((role) => (
        <Typography component="span" key={role} className={classes.item}>
          {role}&nbsp;&nbsp;
        </Typography>
      ))}
    </Grid>
  );

  // *** this page is shared both employee and employer.
  //     visibility for employer is limited  *** ////
  return (
    <Grid container direction="column">
      {/* display "Edit" link if current user is 'employee' */}
      {/* column 1 / */}
      <Grid item className={classes.editContainer}>
        {localStorage.getItem('role') === 'employee' && (
          <IconButton
            component={Link}
            to={{
              pathname: '/professiondetails-form-edit',
              currentData: details,
            }}
            size="small"
            className={classes.button}
          >
            {/* <FontAwesomeIcon icon={faEdit} swapOpacity /> */}
          </IconButton>
        )}
      </Grid>

      {/* column 2 / */}
      <Grid item>
        <Grid
          container
          direction={matchesSM ? 'column' : 'row'}
          alignItems={matchesSM ? 'center' : undefined}
        >
          {/* row  1 / 3 */}
          <Grid item md={5}>
            {employmentStatus && (
              <Grid container>
                <Grid item className={classes.icon}>
                  <HighlightOutlinedIcon fontSize="small" />
                </Grid>
                <Grid item>
                  <Typography variant="body2">{employmentStatus}</Typography>
                </Grid>
              </Grid>
            )}
          </Grid>

          {/* row  2 / 3 */}
          <Grid item md={4}>
            {idealSalary.amount > 0 && (
              <Grid container justify="center">
                <Grid item className={classes.icon}>
                  <MonetizationOnOutlinedIcon fontSize="small" />
                </Grid>
                <Grid item>
                  <Typography variant="body2">
                    Expected: US$
                    {kFormatter(idealSalary.amount)} {idealSalary.unit}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Grid>

          {/* row  3 / 3 */}
          <Grid item md={3}>
            {veteran && veteran.status && (
              <Grid container>
                <Grid item className={classes.icon}>
                  <FlagOutlinedIcon fontSize="small" />
                </Grid>
                <Grid item>
                  <Typography variant="body2">{`Veteran ID: ${veteran.veteranId}`}</Typography>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>

      <Container className={classes.container}>
        <Grid item>
          {primaryJob && createSectionJob(primaryJob, 'Primary')}
        </Grid>
        <Grid item>
          {secondaryJob && createSectionJob(secondaryJob, 'Secondary')}
        </Grid>

        <Grid item>
          {randomShiftRole && (
            <Grid container>
              <Grid item className={classes.title} xs={3}>
                Shift Availability
              </Grid>
              {randomShift ? (
                sectionRandomShiftRole(randomShiftRole)
              ) : (
                <Typography className={classes.item} variant="body1">
                  Not available right now
                </Typography>
              )}
            </Grid>
          )}
        </Grid>

        <Grid item>
          {newOpportunity && (
            <Grid container>
              <Grid item xs={3}>
                <Typography className={classes.title}>
                  New Opportunity
                </Typography>
              </Grid>

              <Grid item xs={9}>
                {newOpportunity.availability ? (
                  <Typography className={classes.item} variant="body1">
                    {newOpportunity.title}
                  </Typography>
                ) : (
                  <Typography className={classes.item} variant="body1">
                    Not available right now
                  </Typography>
                )}
              </Grid>
            </Grid>
          )}
        </Grid>

        <Grid item>
          {planningToMove && (
            <Grid container>
              <Grid item xs={3}>
                <Typography className={classes.title}>
                  Planning to Move
                </Typography>
              </Grid>

              {planningToMove.planning ? (
                <Grid item xs={9}>
                  <Typography component="span" className={classes.item}>
                    Yes.{' '}
                  </Typography>
                  <Typography component="span" className={classes.item}>
                    Move to {planningToMove.location}{' '}
                  </Typography>
                  <Typography component="span" className={classes.item}>
                    in {convertDate(planningToMove.dateToMove)}
                  </Typography>
                </Grid>
              ) : (
                <Grid item xs={9}>
                  <Typography className={classes.item}>No</Typography>
                </Grid>
              )}
            </Grid>
          )}
        </Grid>
      </Container>

      {/* Call to action - visile only to employer */}
      <Grid item>{localStorage.role === 'employer' && <CallToAction />}</Grid>
    </Grid>
  );
};

//Professiondetail.propTypes = {};

export default Professiondetail;
