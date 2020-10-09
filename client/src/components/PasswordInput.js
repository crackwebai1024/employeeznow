import { InputAdornment, withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';

const styles = theme => ({
  eye: {
    cursor: 'pointer',
  },
});

export default function PasswordInput(props) {
  const [passwordIsMasked, setPasswordIsMasked] = useState(true)

  const togglePasswordMask = () => {
    setPasswordIsMasked(!passwordIsMasked)
  };
  const { classes } = props;

  return (
    <TextField
      type={passwordIsMasked ? 'password' : 'text'}
      required
      fullWidth
      margin="normal"
      variant="outlined"
      autoComplete="password"
      {...props}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {passwordIsMasked ?
              <VisibilityIcon
                className={classes.eye}
                onClick={togglePasswordMask} /> :
              <VisibilityOffIcon
                className={classes.eye}
                onClick={togglePasswordMask} />}
          </InputAdornment>
        ),
      }}
    />
  );
}

PasswordInput.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
};

PasswordInput = withStyles(styles)(PasswordInput);
