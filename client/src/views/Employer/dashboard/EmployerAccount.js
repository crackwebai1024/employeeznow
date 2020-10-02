import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import { loadEmployer } from '../../../store/actions/employer';
import EditEmployerAccountForm from '../form/EditEmployerAccountForm';
import ChangePasswordForm from '../../Auth/Password/ChangePasswordForm';

// import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  container: {},
  dialog: {
    marginTop: '5rem',
    zIndex: 1303, // larger than header and footer
  },
  heading1: {
    fontSize: '2rem',
    textTransform: 'uppercase',
    marginBottom: '1.5rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.5rem',
    },
  },
  wrapper: {
    marginTop: '1rem',
    marginBottom: '1.5rem',
  },
  buttonColumn: {
    marginTop: '2rem',
    marginBottom: '2rem',
  },
  buttonContainer: {
    textAlign: 'center',
    marginTop: '2rem',
  },
  button: {
    fontSize: '0.8rem',
    padding: '0.3rem 1.5rem',
    '&:hover': {
      transform: 'translateY(-3px)',
      boxShadow: theme.shadows[1],
      backgroundColor: 'transparent',
      color: theme.palette.secondary.main,
      border: `1px solid ${theme.palette.secondary.main}`,

      '&::after': {
        transform: 'scaleX(1.4) scaleY(1.6)',
        opacity: 0,
      },

      //focus for button
      '&:focus': {
        outline: 'none', //for button element
        transform: 'translateY(-1px)',
        boxShadow: '0 .5rem 1rem rgba(black,.2)',
      },
    },
  },

  button1: {
    border: `1px solid ${theme.palette.secondary.main}`,
    color: theme.palette.secondary.main,
  },
  button2: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    marginLeft: '1rem',
  },
}));

// User change, changePassword, etc
const EmployerAccount = ({ loadEmployer, slug, employer, history }) => {
  useEffect(() => {
    loadEmployer();
  }, []);

  // material-ui
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  // open dialog(modal) - account info update
  const [openAccount, setOpenAccount] = useState(false);
  // open dialog(modal) - password update
  const [openPassword, setOpenPassword] = useState(false);

  // update account dialog
  const accountClose = () => {
    setOpenAccount(false);
  };

  const accountClickOpen = () => {
    setOpenAccount(true);
  };

  // update password dialog
  const passwordClose = () => {
    setOpenPassword(false);
  };

  const passwordClickOpen = () => {
    setOpenPassword(true);
  };

  const {
    _id,
    name,
    address,
    generalEmail,
    website,
    firstName,
    lastName,
    title,
    phone,
    email,
  } = employer;

  return (
    <Container className={classes.container}>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Typography variant="h1" className={classes.heading1}>
            Your account information
          </Typography>
        </Grid>

        {_id && (
          <Grid item>
            <Typography variant="h6" color="primary" align="center">
              Company Information
            </Typography>
            <Grid
              container
              direction="column"
              className={classes.wrapper}
              alignItems={matchesXS ? 'center' : 'flex-end'}
            >
              {/* column 1 / 9 name */}
              <Grid item xs={12}>
                <Typography>{name}</Typography>
              </Grid>

              {/* column 2 / 9 address */}

              <Grid item xs={12}>
                <Typography>
                  {address.street1} {address.street2}
                </Typography>
              </Grid>

              {/* column 3 / 9 address */}

              <Grid item xs={12}>
                <Typography>
                  {address.city} {address.state} {address.zipcode}
                </Typography>
              </Grid>

              {/* column 4 / 9 general email */}

              <Grid item xs={12}>
                <Typography>{generalEmail}</Typography>
              </Grid>

              {/* column 5/ 9 website */}

              <Grid item xs={12}>
                <Typography>{website}</Typography>
              </Grid>
            </Grid>

            {/* column 6 / 9 contact information */}
            <Typography variant="h6" color="primary" align="center">
              Contact Informaition
            </Typography>
            <Grid
              container
              direction="column"
              className={classes.wrapper}
              alignItems={matchesXS ? 'center' : 'flex-end'}
            >
              <Grid item xs={12}>
                <Typography>
                  {firstName} {lastName}
                </Typography>
              </Grid>

              {/* column 7 / 9 email */}

              <Grid item xs={12}>
                <Typography>{email}</Typography>
              </Grid>

              {/* column 8 / 9 title */}

              <Grid item xs={12}>
                <Typography>{title}</Typography>
              </Grid>

              {/* column 8 / 9 phone */}

              <Grid item xs={12}>
                <Typography>{phone}</Typography>
              </Grid>
            </Grid>

            {/* column 9 / 9 button/dialog */}
            <Grid item className={classes.buttonColumn}>
              <Grid container justify="space-evenly">
                <Grid item>
                  <Button
                    onClick={accountClickOpen}
                    className={`${classes.button} ${classes.button1}`}
                  >
                    Update Account
                  </Button>
                  <Dialog
                    open={openAccount}
                    onClose={accountClose}
                    aria-labelledby="dialog-title"
                    className={classes.dialog}
                  >
                    <EditEmployerAccountForm
                      employer={employer}
                      history={history}
                      slug={slug}
                      setOpenAccount={setOpenAccount}
                    />
                  </Dialog>
                </Grid>

                <Grid item>
                  <Button
                    onClick={passwordClickOpen}
                    className={`${classes.button} ${classes.button2}`}
                  >
                    Update Password
                  </Button>
                  <Dialog
                    open={openPassword}
                    onClose={passwordClose}
                    aria-labelledby="dialog-title"
                    fullWidth
                    className={classes.dialog}
                  >
                    <ChangePasswordForm
                      history={history}
                      slug={slug}
                      setOpenPassword={setOpenPassword}
                    />
                  </Dialog>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};
// Employee.propTypes = {
//   loadEmployee: PropTypes.func.isRequired,
//   employeeId: PropTypes.string.isRequired,
// };

const mapStateToProps = (state) => {
  return {
    slug: state.auth.slug,
    employer: state.employer,
  };
};

export default connect(mapStateToProps, { loadEmployer })(EmployerAccount);
