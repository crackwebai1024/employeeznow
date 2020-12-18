import React, { useState } from "react";
import { Box, CardContent, Card, CardActions } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles((theme) => ({
  videoWrapper: {
    cursor: "pointer",
    padding: "0 1rem",
    margin: "1rem 0",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: 230,
    cursor: "pointer",
  },
  // videoBox: {
  //   cursor: "pointer",
  //   boxShadow: "inset 0 0 15px",
  //   width: "90%",
  //   position: "absolute",
  //   height: 230,
  // },
}));

const VideoItems = (props) => {
  const { result, giveStarFunc } = props;
  console.log(result, "result");
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const changeStar = (e, value) => {
    if (value) {
      setValue(value);
      giveStarFunc(value, result._id);
    }
  };

  return (
    <Box className={classes.videoWrapper}>
      <Card>
        <CardContent>
          <video className={classes.video} src={result.url} controls></video>
          <Rating max={3} value={value} onChange={changeStar} size="large" />
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </Box>
  );
};

export default VideoItems;
