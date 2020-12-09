import React, { useEffect } from 'react';
import { Container, Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { actions as employerActions } from '@store/employer';
import { bindActionCreators } from 'redux';
import { getUser } from '@helpers/auth-helpers';
import CandidateList from '../SearchResult/CandidateList';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '900px'
  }
}))

const PurchasedEmployees = (props) => {
  const classes = useStyles();
  const { actions, purchasedEmployees } = props;
  const user = JSON.parse(getUser())

  useEffect(() => {
    const data = {
      id: user._id
    }
    actions.getPurchaseEmployees(data)
  }, [])

  return (
    <Container width="sm" className={classes.container}>
      {
        purchasedEmployees.map((item, i) => {
          return <CandidateList
            result={item}
            actions={actions}
            purchasedEmployees={true}
          />
        })
      }
    </Container>
  )
}

const mapStateToProps = ({ employer: { purchasedEmployees } }) => ({
  purchasedEmployees
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...employerActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PurchasedEmployees);
