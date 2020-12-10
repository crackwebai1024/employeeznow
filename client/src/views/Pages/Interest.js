import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { actions as emailActions } from "@store/email";
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { bindActionCreators } from "redux";
import LoadingCircular from '@components/LoadingCircular';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    marginTop: '3rem',
    position: 'relative',
  },
  title: {
    fontSize: '24px',
    textAlign: 'center'
  }
}))

function Interest(props) {
  const { match, email, actions } = props;
  const { slug } = match.params;
  const { interestSuccess } = email;
  const classes = useStyles()

  useEffect(() => {
    if (slug) {
      const slugArray = slug.split("_")
      const data = {
        employerID: slugArray[0],
        filterID: slugArray[1],
        employeeID: slugArray[2]
      }
      actions.sendInterestRequest(data);
    }
  }, [])

  return (
    <Box className={classes.wrapper}>
      {
        interestSuccess === "SUCCESS" &&
        <Typography className={classes.title}>
          Successfully sent the message
        </Typography>
      }
      {
        interestSuccess === "REQUEST" &&
        <LoadingCircular />
      }
      {
        interestSuccess === "FAILURE" &&
        <Typography className={classes.title}>
          Sorry!
        </Typography>
      }
    </Box>

  )
}

const mapStateToProps = ({ email }) => ({ email });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      ...emailActions,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Interest);