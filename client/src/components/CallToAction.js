import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ReplayIcon from '@material-ui/icons/Replay';
import { actions as employerActions } from '@store/employer';
import { bindActionCreators } from 'redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { getFilterID } from '@helpers/auth-helpers';

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    textAlign: 'center',
    marginTop: '2rem',
  },
  button: {
    fontSize: '0.8rem',
    padding: '0.3rem 1.5rem',
    transition: '0.2s',
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
    marginLeft: '1rem',
  },
  button2: {
    border: `1px solid ${theme.palette.secondary.main}`,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    marginLeft: '1rem',
  },
}));

// Only employer can access
const CallToAction = ({ actions, onAskInterest, purchaseProfile, purchased }) => {
  const classes = useStyles();
  const history = useHistory()
  const filterID = getFilterID()

  const backToFilter = () => {
    actions.setReturn()
    history.push(`/search/${filterID}`)
  }

  return (
    <Grid container justify="space-evenly">
      <Grid item className={classes.buttonContainer}>
        {!purchased &&
          <Button className={`${classes.button} ${classes.button1}`} onClick={purchaseProfile}>
            PURCHASE THIS PROFILE
          </Button>
        }
      </Grid>

      <Grid item className={classes.buttonContainer}>
        <Button className={`${classes.button} ${classes.button2}`} onClick={onAskInterest}>
          ASK ABOUT INTEREST
        </Button>
      </Grid>
      <Grid item className={classes.buttonContainer}>
        <Button className={`${classes.button} ${classes.button1}`} onClick={backToFilter}>
          <ReplayIcon /> Back To Filter Page
        </Button>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = ({
  employer: {
    employerData, filter, searchLoading, filterResult, filterID
  },
}) => ({
  employerData, filter, searchLoading, filterResult, filterID
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...employerActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CallToAction);
