import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { actions as employeeActions } from '@store/employee';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import { getUser } from '@helpers/auth-helpers';
import _ from 'lodash'
// import { loadEmployee } from '../../../store/actions/employee';
import EditEmployeeAccountForm from '../form/EditEmployeeAccountForm';
import ChangePasswordForm from '../../Auth/Password/ChangePasswordForm';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '95vh',
  },
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
    width: 300,
  },
  item: {
    textAlign: 'right',
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
const EmployeeAccount = ({ employeeData, history, actions }) => {
  // useEffect(() => {
  //   loadEmployee();
  // }, []);

  // material-ui
  const classes = useStyles();
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
  const user = JSON.parse(getUser())
  useEffect(() => {
    if (_.isEmpty(employeeData)) {
      let data = {
        id: user._id
      }
      actions.getUserDataRequest(data)
    }
  }, [])

  const passwordClickOpen = () => {
    setOpenPassword(true);
  };


  return (
    !_.isEmpty(employeeData) ?
    <Container className={classes.container}>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Typography variant="h1" className={classes.heading1}>
            Your account information
          </Typography>
        </Grid>

        {employeeData.basic._id && (
          <Grid item>
            <Grid container justify="flex-start" className={classes.wrapper}>
              {/* column 1 / 6 name */}
              <Grid item xs={3}>
                <Typography>Name</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography className={classes.item}>
                  {' '}
                  {employeeData.basic.firstName} 
                  {employeeData.basic.middleName} 
                  {employeeData.basic.lastName}
                </Typography>
              </Grid>
            </Grid>

            {/* column 2 / 6 email */}
            <Grid
              item
              container
              justify="flex-start"
              className={classes.wrapper}
            >
              <Grid item xs={3}>
                <Typography>Email</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography className={classes.item}>{employeeData.basic.email}</Typography>
              </Grid>
            </Grid>

            {/* column 3 / 6 mobile */}
            <Grid
              item
              container
              justify="flex-start"
              className={classes.wrapper}
            >
              <Grid item xs={3}>
                <Typography>Mobile</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography className={classes.item}>{employeeData.basic.cell}</Typography>
              </Grid>
            </Grid>

            {/* column 4 / 6 address */}
            <Grid
              item
              container
              justify="flex-start"
              className={classes.wrapper}
            >
              <Grid item xs={3}>
                <Typography>Address</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography className={classes.item}>
                  {employeeData.basic.address.street1} 
                  {employeeData.basic.address.street2}
                </Typography>
              </Grid>
            </Grid>

            {/* column 5 / 6 address */}
            <Grid
              item
              container
              justify="flex-start"
              className={classes.wrapper}
            >
              <Grid item xs={3} />
              <Grid item xs={9}>
                <Typography className={classes.item}>
                  {employeeData.basic.address.city}
                  {employeeData.basic.address.state}
                  {employeeData.basic.address.zipcode}
                </Typography>
              </Grid>
            </Grid>

            {/* column 6 / 6 button/dialog */}
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
                    <EditEmployeeAccountForm
                      employee={employeeData.basic}
                      history={history}
                      slug={employeeData.basic.slug}
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
                      slug={employeeData.basic.slug}
                      setOpenPassword={setOpenPassword}
                    />
                  </Dialog>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Container>:
    <Fragment></Fragment>
  );
};

const mapStateToProps = ({
  employee: {
    employeeData
  },
}) => ({
  employeeData
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...employeeActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeAccount);