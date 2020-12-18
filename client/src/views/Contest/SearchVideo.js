import React, { useState } from "react";
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
}));

const SearchVideo = (props) => {
  const { searchFunc } = props;
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");

  const searchVideo = (e) => {
    e.preventDefault();
    if (e.target.value !== "") searchFunc(searchValue);
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <Box>
      <Grid container item xs={12} className={classes.container}>
        <Grid xs={12} item>
          <Typography className={classes.title}>
            VOTE FOR VIDEOS BELOW
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={(e) => searchVideo(e)} className={classes.form}>
            <span className={classes.subtitle}>
              search for videos by last name:
            </span>
            <TextField
              label=""
              size="small"
              onChange={handleChange}
              value={searchValue}
              variant="outlined"
            />
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchVideo;
