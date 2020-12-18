import React from "react";
import { Box, TextField, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: "2rem",
    maxWidth: "1100px",
    margin: "auto",
  },
  form: {
    display: "flex",
    alignItems: "center",
    width: "fit-content",
    float: "right",
    textAlign: "right",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  title: {
    fontSize: "24px",
    fontWeight: 600,
  },
  subtitle: {
    fontSize: "18px",
    marginRight: "1rem",
  },
  noResult: {
    fontSize: "36px",
    color: theme.palette.common.gray,
  },
  resultContainer: {
    marginTop: "1rem",
    border: "1px solid gray",
    padding: "1rem 0",
  },
}));

const SearchVideo = (props) => {
  const { searchResult } = props;
  const classes = useStyles();

  return (
    <Box>
      <Grid container item xs={12} className={classes.container}>
        <Grid xs={12} item>
          <Typography className={classes.title}>
            VOTE FOR VIDEOS BELOW
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <form className={classes.form}>
            <span className={classes.subtitle}>
              search for videos by last name:
            </span>
            <TextField label="" size="small" variant="outlined" />
          </form>
        </Grid>
        <Grid item xs={12} className={classes.resultContainer}>
          {searchResult ? (
            <Box></Box>
          ) : (
            <Box className={classes.noResult}>There is not result</Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchVideo;
