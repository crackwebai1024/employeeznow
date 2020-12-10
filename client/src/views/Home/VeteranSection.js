import React from 'react'
import { Grid, Container, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const listData = [
  "All registered U.S Military Veteran's profiles will be FREE to purchase.",
  "EmployeezNow is the only site that can offer a completely FREE process to hire a Veteran. Some sites claim the same, but they change employees to post jobs or to view resumes."
]

const useStyles = makeStyles((theme) => ({
  wrapper: {
    background: "#FAFAFA",
    padding: '5rem 0 5rem 0',
  },
  center: {
    textAlign: 'center'
  },
  arrowIcon: {
    height: '16px',
    marginTop: '7px',
    marginRight: '20px',
    marginLeft: '1rem'
  },
  font14: {
    fontSize: "16px",
    padding: '0.3rem 0 0.3rem 0',
    color: theme.palette.common.darkgray
  },
  subTitle: {
    color: theme.palette.common.green,
    fontSize: '20px',
    padding: '2rem 0 2rem 0'
  },
  title: {
    fontSize: "26px"
  },
  image: {
    maxWidth: "372px",
    width: "100%",
    marginBottom: '2rem',
    boxShadow: "0 10px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)"
  },
  titleDetail: {
    padding: '9px 0 9px 0',
    fontSize: '16px'
  },
  col_center: {
    display: 'flex',
    alignItems: 'center'
  }
}))

const VeteranSection = () => {
  const classes = useStyles()
  return (
    <Grid className={classes.wrapper}>
      <Container width="md">
        <Grid item container xs={12}>
          <Grid item xs={12}>
            <Typography className={`${classes.center} ${classes.subTitle}`}>
              Thank you for your service
            </Typography>
            <Typography className={`${classes.center} ${classes.title}`}>
              EmployeezNow is absolutely FREE to hire a US Veteran
            </Typography>
            <Typography className={`${classes.center} ${classes.titleDetail}`}>
              EmployeezNow wants to thank veterans for their service, as we know none of this would be possible without them!
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} className={classes.center}>
            <img src={`${process.env.PUBLIC_URL}/img/test/img5.svg`} alt="img5" className={classes.image}/>
          </Grid>
          <Grid item xs={12} sm={6} className={classes.col_center}>
            <Box>
              {
                listData.map((list, key) => {
                  return <Box key = {key} style={{ display: 'flex' }}>
                    <img src={`${process.env.PUBLIC_URL}/img/test/arrow.svg`} alt="arrow" className={classes.arrowIcon} />
                    <div dangerouslySetInnerHTML={{ __html: list }} className={classes.font14}>
                    </div>
                  </Box>
                })
              }
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  )
}

export default VeteranSection
