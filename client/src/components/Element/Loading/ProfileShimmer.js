import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box } from "@material-ui/core";
import cx from "classnames";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    padding: "20px",
  },
  title: {
    width: 300,
    height: 35,
  },
  content: {
    width: 250,
    height: 25,
  },
  button: {
    float: "right",
    height: 40,
    width: 150,
    marginRight: 10,
  },
}));

const ProfileShimmer = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Grid item container xs={12}>
        <Grid item xs={12}>
          <Box className={cx(classes.title, "shine")}></Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={cx(classes.content, "shine")}></Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={cx(classes.content, "shine")}></Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={cx(classes.button, "shine")}></Box>
          <Box className={cx(classes.button, "shine")}></Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfileShimmer;
