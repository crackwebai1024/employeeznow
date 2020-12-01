import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  imageWrapper: {
    maxWidth: '500px',
    margin: 'auto',
    width: '100%'
  },
  container: {
    width: '100%',
    textAlign: 'center',
    marginTop: '4rem',
    marginBottom: '4rem'
  },
  title: {
    padding: "30px",
    fontSize: "26px",
  },
  details: {
    paddingBottom: '1rem',
    fontSize: '16px' 
  }
}))

export default function ExampleProfile() {
  const classes = useStyles()
  return (
    <Box className={classes.container}>
      <Typography className={classes.title}>
        EXAMPLE PROFILE
      </Typography>
      <Typography className={classes.details}>
        (from the employer's view)
      </Typography>
      <img 
        className={classes.imageWrapper}
        src={`${process.env.PUBLIC_URL}/img/test/img6.png`}
      />
    </Box>
  )
}
