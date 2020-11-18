import React from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import MainButton from '@components/Element/Button/MainButton'

const useStyles = makeStyles((theme) => ({
  container: {

  },
  title: {
    textAlign: 'center',
    fontSize: "30px"
  }
}))
export default function Empty() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Box className={classes.wrapper}>
      <Container width="sm" className={classes.container}>
        <Typography className={classes.title}>
          PAGE NOT FOUND
        </Typography>
        <MainButton
          label="GO BACK HOME"
          background="green"
          border="green"
          pd={60}
          bd={30}
          hoverColor="white"
          hoverBack="#007000"
          color="white"
          fontSize={16}
          onClick={e => history.push("/")}
        >
        </MainButton>
      </Container>
    </Box>
  )
}
