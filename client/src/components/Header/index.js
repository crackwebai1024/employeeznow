import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import LineStyleOutlinedIcon from '@material-ui/icons/LineStyleOutlined';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import BusinessOutlinedIcon from '@material-ui/icons/BusinessOutlined';
import { getToken, getUser } from '@helpers/auth-helpers'
import { actions as authActions } from '@store/auth';
import { bindActionCreators } from 'redux';
import logo from '@assets/logo.svg';


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
    height: '6rem',
    paddingLeft: '4rem',
    paddingRight: '4rem',
    zIndex: theme.zIndex.modal + 1, //zIndex of modal default + 1
  },
  logoContainer: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  logo: {
    width: '100%',
  },
  tabContainer: {
    marginLeft: 'auto',
  },
  tab: {
    minWidth: 10,
  },
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '5rem',
  },
  drawerIconContainer: {
    marginLeft: 'auto',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  drawerIcon: {
    color: theme.palette.grey[900],
    height: '45px',
    width: '45px',
  },
  drawer: {
    width: '15rem',
    backgroundColor: theme.palette.background.paper,
  },
  drawerItem: {
    opacity: 0.7,
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
  history,
  value,
  setValue,
  isAuthenticated
  // setSelectedIndex,
}) => {
  //**  style **//
  const classes = useStyles();
  const slug = JSON.parse(getUser()) && JSON.parse(getUser()).slug
  // Tab
  //  const [value, setValue] = useState(false);

  // Drawer
  const [openDrawer, setOpenDrawer] = useState(false);

  const theme = useTheme();

  // Media Query - screen smaller than small breakpoints
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  //Swipeable drawer
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  // Click and Logout handler
  const handleLogout = (e) => {
    e.preventDefault();
    actions.logoutRequest();
    setValue(2);
    return window.location.pathname = "/"
  };

  // Route set up
  // 1) After Employee loggedin
  const employeeRoutes = [
    { name: 'Home', link: '/', activeIndex: 0, icon: <HomeOutlinedIcon /> },
    {
      name: 'About Us',
      link: '/about',
      activeIndex: 1,
      icon: <BusinessOutlinedIcon />,
    },
    {
      name: 'Dashboard',
      link: `/employees/${slug}`,
      activeIndex: 2,
      icon: <LineStyleOutlinedIcon />,
    },
    {
      name: 'Log Out',
      link: '#',
      onClick: handleLogout,
      activeIndex: 3,
      icon: <LockOutlinedIcon />,
    },
  ];

  // 2) After employer loggedin
  const employerRoutes = [
    { name: 'Home', link: '/', activeIndex: 0, icon: <HomeOutlinedIcon /> },
    {
      name: 'About Us',
      link: '/about',
      activeIndex: 1,
      icon: <BusinessOutlinedIcon />,
    },
    {
      name: 'Dashboard',
      link: `/employers/${slug}`,
      activeIndex: 2,
      icon: <LineStyleOutlinedIcon />,
    },
    {
      name: 'Log Out',
      link: '#!',
      onClick: (e) => handleLogout(e),
      activeIndex: 3,
      icon: <LockOutlinedIcon />,
    },
  ];

  // 3) No auth (public)
  const noAuthRoutes = [
    { name: 'Home', link: '/', activeIndex: 0, icon: <HomeOutlinedIcon /> },
    {
      name: 'About Us',
      link: '/about',
      activeIndex: 1,
      icon: <BusinessOutlinedIcon />,
    },
    {
      name: 'Log In',
      link: '/login',
      activeIndex: 2,
      icon: <LockOpenOutlinedIcon />,
    },
    {
      name: 'Sign Up',
      link: '/signup',
      activeIndex: 3,
      icon: <VpnKeyOutlinedIcon />,
    },
  ];

  // Loop routes(tab) - trigger tabs(routes) changes
  useEffect(() => {
    [...employeeRoutes, ...employerRoutes, ...noAuthRoutes].forEach((route) => {
      switch (window.location.pathname) {
        case `${route.link}`:
          if (value !== route.activeIndex) {
            setValue(route.activeIndex);
            // use selectedIndex when you added menu
            // if (route.selectedIndex && route.selectedIndex !== selectedIndex) {
            //   setSelectedIndex(route.selectedIndex);
            // }
          }
          break;
        default:
          break;
      }
    });
  }, [
    //thse dependecies cause infinite loop
    //value,
    // selectedIndex,
    // setSelectedIndex,
    employeeRoutes,
    employerRoutes,
    noAuthRoutes,
    setValue,
  ]);

  // Change tab value
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  // Setup Tabs render
  const tabs = (routes) => (
    <Tabs
      value={value}
      onChange={handleChange}
      className={classes.tabContainer}
    >
      {routes.map((route, index) => (
        <Tab
          key={`${route}${index}`}
          className={classes.tab}
          component={Link}
          to={route.link}
          label={route.name}
          // aria-owns={route.ariaOwns}
          // aria-haspopup={route.ariaPopup}
          onClick={route.onClick}
        />
      ))}
    </Tabs>
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
        <List disablePadding>
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
                onClick={route.onClick}
              >
                {route.name}
              </ListItemText>
            </ListItem>
          ))}
        </List>
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
        <AppBar position="fixed" color="inherit" className={classes.appbar}>
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

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...authActions,
  }, dispatch),
});

export default connect(null, mapDispatchToProps)(withRouter(Header));