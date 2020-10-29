import React from 'react';
import { TextField, Grid, Typography } from "@material-ui/core";
import { connect } from 'react-redux';
import { actions as employerActions } from '@store/employer';
import { bindActionCreators } from 'redux';

const ServiceForm = ({ formValues, actions }) => {

  const inputHandle = (e) => {
    let key = e.target.name;
    let value = e.target.value
    let newFormValues = {
      ...formValues,
      [key]: value
    }
    actions.setFormValues(newFormValues)
  }

  return <>
    <Grid item xs={12}>
      <Typography variant="h6">Additional data</Typography>
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        type="date"
        label="date"
        value={formValues.date}
        name="date"
        onChange={inputHandle}
        variant="outlined"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Service"
        name="service"
        onChange={inputHandle}
        value={formValues.service}
        variant="outlined"
        fullWidth
      />
    </Grid>
    <Grid item xs={12}>
      <Typography variant="h6">Social Network?</Typography>
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="facebook"
        name="facebook"
        type="link"
        onChange={inputHandle}
        value={formValues.facebook}
        variant="outlined"
        fullWidth
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="twitter"
        name="twitter"
        type="link"
        onChange={inputHandle}
        value={formValues.twitter}
        variant="outlined"
        fullWidth
      />
    </Grid>
  </>
}

const mapStateToProps = ({
  employer: {
    formValues
  },
}) => ({
  formValues
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...employerActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ServiceForm);
