// 1) After Employee loggedin
import React from 'react';
import { getToken, getUser } from '@helpers/auth-helpers';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import LineStyleOutlinedIcon from '@material-ui/icons/LineStyleOutlined';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import BusinessOutlinedIcon from '@material-ui/icons/BusinessOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';

const slug = JSON.parse(getUser()) && JSON.parse(getUser()).slug

export const employeeRoutes = [
  { name: 'Home', link: '/', activeIndex: 0, icon: <HomeOutlinedIcon /> },
  { name: 'Learn More', link: '/about', activeIndex: 1, icon: <BusinessOutlinedIcon /> },
  { name: 'Dashboard', link: `/employees/${slug}`, activeIndex: 2, icon: <LineStyleOutlinedIcon /> },
  { name: 'Log Out', link: '/', onClick: "handleLogout", activeIndex: 3, icon: <LockOutlinedIcon /> },
];

// 2) After employer loggedin
export const employerRoutes = [
  { name: 'Home', link: '/', activeIndex: 0, icon: <HomeOutlinedIcon /> },
  { name: 'About Us', link: '/about', activeIndex: 1, icon: <BusinessOutlinedIcon /> },
  { name: 'Dashboard', link: `/employers/${slug}`, activeIndex: 2, icon: <LineStyleOutlinedIcon /> },
  { name: 'Log Out', link: '/', onClick: "handleLogout", activeIndex: 3, icon: <LockOutlinedIcon /> },
];

// 3) No auth (public)
export const noAuthRoutes = [
  { name: 'Home', link: '/', activeIndex: 0, icon: <HomeOutlinedIcon /> },
  { name: 'Learn More', link: '/about', activeIndex: 1, icon: <BusinessOutlinedIcon /> },
  { name: 'Log In', link: '/login', activeIndex: 2, icon: <LockOpenOutlinedIcon /> },
  { name: 'Sign Up', link: '/signup', activeIndex: 3, icon: <VpnKeyOutlinedIcon /> },
];