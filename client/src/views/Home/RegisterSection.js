import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DesktopMacIcon from "@material-ui/icons/DesktopMac";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";

const useStyles = makeStyles((theme) => ({
  employer: {
    borderRadius: 0,
    textAlign: "center",
    background: "#0f1427",
    width: "100%",
    color: "white",
    height: "300px",
    padding: "50px",
  },
  button1: {
    height: "50px",
    borderRadius: "15px",
    background: "#f36968",
    marginTop: "20px",
    "&:hover": {
      background: "#f25755",
    },
  },
  button2: {
    height: "50px",
    borderRadius: "15px",
    background: "#1f73be",
    marginTop: "20px",
    "&:hover": {
      background: "#116aba",
    },
  },
  employee: {
    borderRadius: 0,
    textAlign: "center",
    background: "#EEEEEE",
    color: "black",
    width: "100%",
    height: "300px",
    padding: "50px",
  },
  orButton: {
    background: "red",
    width: "50px",
    height: "50px",
    transform: "rotate(45deg)",
    borderRadius: "15px",
    margin: "auto",
    position: "relative",
    top: -180,
    zIndex: 1,
    [theme.breakpoints.down("sm")]: {
      top: -325,
    },
  },
  orString: {
    position: "relative",
    top: -215,
    color: "white",
    fontWeight: 900,
    [theme.breakpoints.down("sm")]: {
      top: -360,
    },
    zIndex: 2,
  },
  icon1: {
    fontSize: 60,
    color: "red",
  },
  icon2: {
    fontSize: 60,
    color: "black",
  },
  bar: {
    width: "50px",
  },
  title: {
    fontSize: "26px",
    fontWeight: 800,
  },
}));

export default function RegisterSection() {
  const classes = useStyles();
  return (
    <Fragment>
      <Grid item xs={12} md={6}>
        <Paper elevation={0} className={classes.employer}>
          <Typography>
            <DesktopMacIcon className={classes.icon1} />
          </Typography>
          <Typography className={classes.title}>EMPLOYERS</Typography>
          <Typography>
            <img
              className={classes.bar}
              src={`${process.env.PUBLIC_URL}/img/test/bar.png`}
              alt="chef"
            />
          </Typography>
          {/* <Typography>
            Signed in companies are able to searching for Ideal candidated...
          </Typography> */}
          <Button
            variant="contained"
            color="primary"
            className={classes.button1}
            component={Link}
            to="/signup/employer"
            startIcon={<AddCircleIcon />}
          >
            Register as company
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={0} className={classes.employee}>
          <Typography>
            <PeopleOutlineIcon className={classes.icon2} />
          </Typography>
          <Typography className={classes.title}>EMPLOYEES</Typography>
          <Typography>
            <img
              className={classes.bar}
              src={`${process.env.PUBLIC_URL}/img/test/bar.png`}
              alt="chef"
            />
          </Typography>
          {/* <Typography>
            Submit your resume and start your next chapter
          </Typography> */}
          <Button
            variant="contained"
            color="primary"
            component={Link}
            className={classes.button2}
            to="/signup/employee"
            startIcon={<AddCircleIcon />}
          >
            Register as employee
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={12} md={12} style={{ textAlign: "center" }}>
        <Box className={classes.orButton}></Box>
        <Box className={classes.orString}>OR</Box>
      </Grid>
    </Fragment>
  );
}
