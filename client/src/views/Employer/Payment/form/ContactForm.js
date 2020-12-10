import React from "react";
import { TextField, Grid, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { actions as employerActions } from "@store/employer";
import { bindActionCreators } from "redux";

const ContactForm = ({ formValues, actions }) => {
  const inputHandle = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    let newFormValues = {
      ...formValues,
      [key]: value,
    };
    actions.setFormValues(newFormValues);
  };

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h6">Contact information</Typography>
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="First Name"
          name="firstname"
          type="text"
          value={formValues.firstname}
          variant="outlined"
          onChange={inputHandle}
          required
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Last Name"
          name="lastname"
          type="text"
          value={formValues.lastname}
          onChange={inputHandle}
          variant="outlined"
          required
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Email Address"
          name="email"
          type="email"
          value={formValues.email}
          onChange={inputHandle}
          variant="outlined"
          required
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Street Address 1"
          name="line1"
          type="text"
          value={formValues.line1}
          onChange={inputHandle}
          variant="outlined"
          required
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Street Address 2 (optional)"
          name="line2"
          type="text"
          value={formValues.line2}
          onChange={inputHandle}
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Postal Code"
          name="postal_code"
          type="text"
          value={formValues.postal_code}
          onChange={inputHandle}
          variant="outlined"
          required
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="City"
          name="city"
          type="text"
          value={formValues.city}
          onChange={inputHandle}
          variant="outlined"
          required
          fullWidth
        />
      </Grid>
    </>
  );
};

const mapStateToProps = ({ employer: { formValues } }) => ({
  formValues,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      ...employerActions,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
