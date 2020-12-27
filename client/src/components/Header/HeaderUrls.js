import React from "react";
import { getUser } from "@helpers/auth-helpers";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import LineStyleOutlinedIcon from "@material-ui/icons/LineStyleOutlined";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import BusinessOutlinedIcon from "@material-ui/icons/BusinessOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";

const slug = JSON.parse(getUser()) && JSON.parse(getUser()).slug;

export const employeeRoutes = [
  { name: "Home", link: "/", activeIndex: 0, icon: <HomeOutlinedIcon /> },
  {
    name: "Learn More",
    link: "/about",
    activeIndex: 1,
    icon: <BusinessOutlinedIcon />,
  },
  {
    name: "CockTail Contest",
    link: "/cocktail_contest",
    activeIndex: 2,
  },
  {
    name: "Food Contest",
    link: "/food_contest",
    activeIndex: 3,
  },
  {
    name: "Dashboard",
    link: `/employees/${slug}`,
    activeIndex: 4,
    icon: <LineStyleOutlinedIcon />,
  },
  {
    name: "Log Out",
    link: "/",
    onClick: "handleLogout",
    activeIndex: 5,
    icon: <LockOutlinedIcon />,
  },
  {
    name: "Contact Us",
    link: "/contactus",
    activeIndex: 6,
    icon: <LockOutlinedIcon />,
  },
];

// 2) After employer loggedin
export const employerRoutes = [
  { name: "Home", link: "/", activeIndex: 0, icon: <HomeOutlinedIcon /> },
  {
    name: "About Us",
    link: "/about",
    activeIndex: 1,
    icon: <BusinessOutlinedIcon />,
  },
  {
    name: "Dashboard",
    link: `/employers/${slug}`,
    activeIndex: 2,
    icon: <LineStyleOutlinedIcon />,
  },
  {
    name: "Log Out",
    link: "/",
    onClick: "handleLogout",
    activeIndex: 3,
    icon: <LockOutlinedIcon />,
  },
  {
    name: "Contact Us",
    link: "/contactus",
    activeIndex: 4,
    icon: <ContactPhoneIcon />,
  },
  {
    name: "My Cart",
    link: "/carts",
    activeIndex: 5,
    icon: <ShoppingCartIcon />,
  },
];

// 3) No auth (public)
export const noAuthRoutes = [
  { name: "Home", link: "/", activeIndex: 0, icon: <HomeOutlinedIcon /> },
  {
    name: "Learn More",
    link: "/about",
    activeIndex: 1,
    icon: <BusinessOutlinedIcon />,
  },
  { name: "Contest", link: "/contest", activeIndex: 2 },
  {
    name: "Log In",
    link: "/login",
    activeIndex: 3,
    icon: <LockOpenOutlinedIcon />,
  },
  {
    name: "Sign Up",
    link: "/signup",
    activeIndex: 4,
    icon: <VpnKeyOutlinedIcon />,
  },
  {
    name: "Contact Us",
    link: "/contactus",
    activeIndex: 5,
    icon: <LockOutlinedIcon />,
  },
];

export const voterRoutes = [
  { name: "Home", link: "/", activeIndex: 0, icon: <HomeOutlinedIcon /> },
  {
    name: "Learn More",
    link: "/about",
    activeIndex: 1,
    icon: <BusinessOutlinedIcon />,
  },
  {
    name: "CockTail Contest",
    link: "/cocktail_contest",
    activeIndex: 2,
  },
  {
    name: "Food Contest",
    link: "/food_contest",
    activeIndex: 3,
  },
  {
    name: "Log Out",
    link: "/",
    onClick: "handleLogout",
    activeIndex: 5,
    icon: <LockOutlinedIcon />,
  },
  {
    name: "Contact Us",
    link: "/contactus",
    activeIndex: 6,
    icon: <LockOutlinedIcon />,
  },
];
