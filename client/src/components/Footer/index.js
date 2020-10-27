import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import logo from '../../assets/logo-white.svg';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    //width: 'auto',
    zIndex: 1300,
    position: 'relative',
    // bottom: 0,
    //width: '100%',
    color: theme.palette.common.white,
    ...theme.typography,
    padding: '3rem 7rem 1rem 7rem',
    [theme.breakpoints.down('sm')]: {
      paddingRight: '3rem',
    },
  },
  copyright: {
    ...theme.typography.caption,
    textAlign: 'center',
  },

  logoContainer: {
    width: '20rem',
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
    width: '15rem',
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.common.white,
    margin: '1rem',
  },
  socialIcon: {
    color: theme.palette.common.white,
    width: '4.5rem',
    height: '4.5rem',
    [theme.breakpoints.down('xs')]: {
      width: '2.5rem',
      height: '2.5rem',
    },
  },
}));

export default function Footer({ isAuthenticated, value, setValue }) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  /** value/setValue is connected with value of Nav(Header) If eigther Nav/Footer change the order, value has to be matched */
  return (
    <footer className={classes.footer}>
      <Grid
        container
        direction="column"
        alignItems={matchesXS ? 'center' : undefined}
        style={{ width: '100%' }}
      >
        {/* column 1-1 */}
        <Grid item>
          {/* nested row */}
          {/* row 1-1 */}
          <Grid
            container
            justify={matchesXS ? 'center' : 'space-evenly'}
            alignItems="center"
            direction={matchesXS ? 'column' : 'row'}
          >
            <Grid
              item
              className={classes.logoContainer}
              onClick={() => setValue(0)}
            >
              <img src={logo} alt="company logo" className={classes.logo} />
            </Grid>
            <Hidden smDown>
              {/* company links */}
              <Grid item className={classes.mainLinks}>
                <Grid container>
                  <Grid
                    item
                    component={Link}
                    to="/"
                    onClick={() => setValue(0)}
                    className={classes.link}
                  >
                    Home
                  </Grid>
                  <Grid
                    item
                    component={Link}
                    to="/"
                    onClick={() => setValue(1)}
                    className={classes.link}
                  >
                    About
                  </Grid>
                </Grid>
              </Grid>
            </Hidden>
            {/* row 1-2 */}
            <Grid item>
              <Grid container justify="flex-end" alignItems="flex-end">
                <Grid
                  item
                  component={'a'}
                  href="https://www.facebook.com/pages/category/Internet-Company/EmployeezNow-113933870291852"
                  rel="noopener noreferrer"
                  target="_blank"
                  className={classes.sociallink}
                >
                  <FacebookIcon className={classes.socialIcon} />
                </Grid>
                <Grid
                  item
                  component={'a'}
                  href="https://www.linkedin.com/company/employeeznow/"
                  rel="noopener noreferrer"
                  target="_blank"
                  className={classes.sociallink}
                >
                  <LinkedInIcon className={classes.socialIcon} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* column 1-2 */}
        <Grid item className={classes.copyright}>
          &#169; 2020 EmployeezNow All Rights Resered
        </Grid>
      </Grid>
    </footer>
  );
}