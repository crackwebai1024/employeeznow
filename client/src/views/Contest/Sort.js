import React from "react";
import { Box, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const sortlist = [
  { value: "new", label: "Newest to Oldest" },
  { value: "old", label: "Oldest to Newest" },
  { value: "most", label: "Stars- Most to Least" },
  { value: "least", label: "Stars- Least to most" },
];

const useStyles = makeStyles((theme) => ({
  sortContainer: {
    textAlign: "left",
    maxWidth: 1000,
    margin: "0.5rem auto",
    display: "flex",
    alignItems: "center",
  },
  label: {
    marginRight: "1rem",
    color: theme.palette.common.blue,
  },
}));

const Sort = ({ value, onChange }) => {
  const classes = useStyles();

  const onhandleChange = (val) => {
    onChange(val);
  };

  return (
    <Box className={classes.sortContainer}>
      <Typography className={classes.label}>Sort</Typography>
      <TextField
        id="standard-select-currency-native"
        select
        value={value}
        onChange={onhandleChange}
        SelectProps={{
          native: true,
        }}
      >
        {sortlist.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </TextField>
    </Box>
  );
};

export default Sort;
