import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Grid, Box, Typography } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import logo from '@assets/white-logo.svg';
import { Container } from '@material-ui/core';
import { getUser } from "@helpers/auth-helpers"

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.common.gray,
    //width: 'auto',
    zIndex: 1300,
    position: 'relative',
    // bottom: 0,
    //width: '100%',
    color: theme.palette.common.white,
    ...theme.typography,
    padding: '3rem 7rem 1rem 7rem',
    [theme.breakpoints.down('sm')]: {
      padding: '3rem 2rem 1rem 2rem',
    },
  },
  col_center: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '2rem'
  },
  copyright: {
    ...theme.typography.caption,
    textAlign: 'center',
  },
  Facebook: {
    color: '#3c579d'
  },
  Linkedin: {
    color: '#1179b5'
  },
  logoContainer: {
    // width: '20rem',
    marginLeft: '-5rem',
    marginRight: 'auto',
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
    },
  },
  logo: {
    width: '100%',
  },
  mainLinks: {
    // width: '15rem',
  },
  link: {
    textDecoration: 'none',
    cursor: 'pointer',
    color: theme.palette.common.white,
    margin: '1rem',
  },
  marginCenter: {
    margin: 'auto',
  },
  center: {
    textAlign: "center",
    width: 'fit-content'
  },
  image: {
    margin: 'auto',
    width: "100%",
    maxWidth: '300px'
  },
  iconBack: {
    background: 'white'
  },
  iconsBack: {
    background: 'white',
    width: '3.33rem',
    marginTop: '0.6rem',
    borderRadius: '5px',
    marginLeft: '0.6rem',
    height: '3.33rem',
    position: 'absolute',
    zIndex: -1
  },
  iconsLayout: {
    margin: 'auto',
    width: 'fit-content',
    display: 'flex'
  },
  socialIcon: {
    width: '4.5rem',
    height: '4.5rem',
    [theme.breakpoints.down('xs')]: {
      // width: '2.5rem',
      // height: '2.5rem',
    },
  },
}));

export default function Footer({ isAuthenticated, value, setValue }) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  const user = JSON.parse(getUser())
  /** value/setValue is connected with value of Nav(Header) If eigther Nav/Footer change the order, value has to be matched */
  return (
    <footer className={classes.footer}>
      <Container>
        <Grid container item xs={12}>
          <Grid item xs={12} md={6} className={classes.col_center}>
            <img src={logo} className={classes.image} />
          </Grid>
          <Grid container item xs={12} md={6} >
            <Grid item xs={12} sm={6} className={classes.col_center}>
              <Box className={classes.marginCenter}>
                
                <Typography>
                  <Typography component={'a'} target="_blank" href="https://www.freeprivacypolicy.com/live/81d3c0ae-c684-4e56-be84-bc57cada9962" className={classes.link}>
                    Privacy policy
                  </Typography>
                </Typography>

                <Typography>
                  <Typography component={Link} to="/" className={classes.link}>
                    Home
                  </Typography>
                </Typography>

                <Typography>
                  <Typography component={Link} to="/about" className={classes.link}>
                    Learn More
                  </Typography>
                </Typography>
                {
                  !user && <Typography>
                    <Typography component={Link} to="/login" className={classes.link}>
                      Log In
                  </Typography>
                  </Typography>
                }
                {
                  !user && <Typography>
                    <Typography component={Link} to="/signup" className={classes.link}>
                      Sign Up
                  </Typography>
                  </Typography>
                }
                <Typography>
                  <Typography component={Link} to="/contactus" className={classes.link}>
                    Contact Us
                  </Typography>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box className={`${classes.center} ${classes.marginCenter}`}>
                <Typography>
                  Question@EmployeezNow.com
                </Typography>
                <Typography>
                  (888) 66EZ-NOW
                </Typography>
                <Box className={classes.iconsLayout}>
                  <Box>
                    <Box className={classes.iconsBack}></Box>
                    <Box component={'a'} target="_blank"
                      href="https://www.facebook.com/pages/category/Internet-Company/EmployeezNow-113933870291852"
                    >
                      <FacebookIcon className={`${classes.socialIcon} ${classes.Facebook}`} />
                    </Box>
                  </Box>
                  <Box>
                    <Box className={classes.iconsBack}></Box>
                    <Box component={'a'} target="_blank"
                      href="https://www.linkedin.com/company/employeeznow/"
                    >
                      <LinkedInIcon className={`${classes.socialIcon} ${classes.Linkedin}`} />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}