import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Button from '@material-ui/core/Button';
import LinkTab from '@components/Element/Button/LinkTab';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { actions as authActions } from '@store/auth';
import { bindActionCreators } from 'redux';
import {
  employeeRoutes,
  employerRoutes,
  noAuthRoutes
} from './HeaderUrls'
import logo from '@assets/logo2.png';
import { Typography } from '@material-ui/core';
import { Router } from '@material-ui/icons';


// Nav Bar Elevation
function ElevationScroll(props) {
  const { children } = props;
  // trigger event(scroll)
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

// Custom style setup
const useStyles = makeStyles((theme) => ({
  appbar: {
    height: '5rem',
    paddingRight: '1rem',
    backgroundColor: "#FDFDFD",
    color: theme.palette.common.black,
    zIndex: theme.zIndex.modal + 1, //zIndex of modal default + 1
  },
  logoContainer: {
    width: "25rem",
    paddingTop: "15px",
    padding: '0rem',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  logo: {
    width: '70%',
  },
  bottomEffect: {
    width: "100%",
    height: '1px',
    background: theme.palette.common.green
  },
  tabContainer: {
    marginLeft: 'auto',
    display: 'flex'
  },
  list: {
    paddingLeft: '0px'
  },
  tab: {
    minWidth: 10,
    listStyleType: 'none',
    cursor: 'pointer',
    fontSize: 16,
    fontWeight: 300,
  },
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '1rem',
  },
  drawerIconContainer: {
    marginLeft: 'auto',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  drawerIcon: {
    color: theme.palette.grey[900],
    height: '35px',
    width: '35px',
  },
  drawer: {
    width: '15rem',
    backgroundColor: "theme.palette.background.paper",
  },
  drawerItem: {
    opacity: 1,
  },
  drawerItemSelected: {
    '& .MuiListItemText-root': {
      opacity: 1,
    },
  },
}));

// Nav Function
const Header = ({
  actions,
  value,
  badge,
  setValue,
  isAuthenticated
}) => {
  //**  style **//
  const classes = useStyles();

  // Drawer
  const [openDrawer, setOpenDrawer] = useState(false);

  const theme = useTheme();

  // Media Query - screen smaller than small breakpoints
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  //Swipeable drawer
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent) || window.innerWidth < 1024;
  console.log(iOS, "iOS")
  // Click and Logout handler
  const handleLogout = (e) => {
    e.preventDefault();
    actions.logoutRequest();
    setValue(2);
    return window.location.pathname = "/"
  };

  // Loop routes(tab) - trigger tabs(routes) changes
  useEffect(() => {
    [ ...employeeRoutes, 
      ...employerRoutes, 
      ...noAuthRoutes
    ].forEach((route) => {
      switch (window.location.pathname) {
        case `${route.link}`:
          if (value !== route.activeIndex) {
            setValue(route.activeIndex);
          }
          break;
        default:
          break;
      }
    });
  }, [employeeRoutes, employerRoutes, noAuthRoutes, setValue]);

  // Change tab value
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  // Setup Tabs render
  const [badges, setBadges] = useState()
  useEffect(() => {
    setBadges(badge)
  }, [badge])
  const tabs = (routes) => (
    <ul
      value={value}
      onChange={handleChange}
      className={classes.tabContainer}
    >
      {routes.map((route, index) => (
        <li
          key={`${route}${index}`}
          className={classes.tab}
          onClick={route.onClick && handleLogout}
        >
          <LinkTab
            to={route.link}
            title={route.name}
            badge={badges}
          >
          </LinkTab>
        </li>
      ))}
    </ul>
  );

  // create each tabs
  const employeeTabs = tabs(employeeRoutes);
  const employerTabs = tabs(employerRoutes);
  const noAuthTabs = tabs(noAuthRoutes);

  // Setup drawer (drawer is visible in small screen with humberger icon)
  const drawer = (routes) => (
    <>
      {/* Swipeable for mobile screen */}
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        {/* add sae margin as navigation bar so that drawer is pushed down under the logo */}
        <div className={classes.toolbarMargin} />
        {/* disablePadding - there is a tiny padding and remove that */}
        <ul disablePadding className={classes.list}>
          {routes.map((route) => (
            <ListItem
              key={`${route}${route.activeIndex}`}
              divider
              button
              component={Link}
              to={route.link}
              selected={value === route.activeIndex}
              classes={{ selected: classes.drawerItemSelected }}
              onClick={() => {
                setOpenDrawer(false);
                setValue(route.activeIndex);
              }}
            >
              <ListItemIcon>{route.icon}</ListItemIcon>
              <ListItemText
                className={classes.drawerItem}
                onClick={route.onClick && handleLogout}
              >
                <Typography>{route.name}</Typography>
              </ListItemText>
            </ListItem>
          ))}
        </ul>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </>
  );

  const employeeDrawer = drawer(employeeRoutes);
  const employerDrawer = drawer(employerRoutes);
  const noAuthDrawer = drawer(noAuthRoutes);

  return (
    <>
      <ElevationScroll>
        <AppBar className={classes.appbar}>
          <Toolbar disableGutters>
            <Button
              component={Link}
              to="/"
              onClick={() => setValue(0)}
              disableRipple
              className={classes.logoContainer}
            >
              <img src={logo} alt="company logo" className={classes.logo} />
            </Button>

            {/* Employee Tab/Drawer */}
            {isAuthenticated &&
              localStorage.getItem('role') === 'employee' &&
              !matches &&
              employeeTabs}

            {isAuthenticated &&
              localStorage.getItem('role') === 'employee' &&
              matches &&
              employeeDrawer}

            {/* Employer Tab/Drawer */}
            {isAuthenticated &&
              localStorage.getItem('role') === 'employer' &&
              !matches &&
              employerTabs}

            {isAuthenticated &&
              localStorage.getItem('role') === 'employer' &&
              matches &&
              employerDrawer}

            {/* No Auth Tab/Drawer */}
            {!isAuthenticated && matches ? noAuthDrawer : null}
            {!isAuthenticated && !matches ? noAuthTabs : null}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      {/* Components text starts below navigation bar */}
      <div className={classes.toolbarMargin} />
    </>
  );
};

const mapStateToProps = ({
  employer: {
    formValues, paid, payEvent, badge
  },
}) => ({
  formValues, paid, payEvent, badge
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...authActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));