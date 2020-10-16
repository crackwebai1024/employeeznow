import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  employer: {
    borderRadius: 0,
    textAlign: "center",
    background: '#0f1427',
    width: '100%',
    color: 'white',
    height: '300px',
    padding: '30px'
  },
  employee: {
    borderRadius: 0,
    textAlign: "center",
    background: 'white',
    color: 'black',
    width: '100%',
    height: '300px',
    padding: '30px'
  },
  orButton: {
    background: "red",
    width: '50px',
    margin: "auto",
    position: 'relative',
    top : -150,
    zIndex: 1,
  }
}));

export default function RegisterSection() {
  const classes = useStyles()
  return (
    <Fragment>
      <Grid item xs={12} md={6}>
        <Paper elevation={0} className={classes.employer}>
          <Typography>
            I'm Employer
          </Typography>
          <Typography>
            Signed in companies are able to searching for Ideal candidated...
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/signup"
          >
            Register as company
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={0} className={classes.employee}>
          <Typography>
            I'm Employee
          </Typography>
          <Typography>
            Submit your resume and start your next chapter
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/signup"
          >
            Register candidate
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={12} md={12} style={{ textAlign: 'center' }}>
        <Box className={classes.orButton}>
          OR
        </Box>
        </Grid>
    </Fragment>
  )
}
