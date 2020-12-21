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
  totalStar: {
    fontSize: "18px",
    padding: "1rem",
    textAlign: "right",
    fontWeight: 600,
  },
}));

const VideoItems = (props) => {
  const { result, giveStarFunc, stars } = props;
  const classes = useStyles();
  const [value, setValue] = useState(stars);
  const changeStar = (e, value) => {
    if (value) {
      setValue(value);
      giveStarFunc(value, result._id);
    }
  };

  return (
    <Box className={classes.videoWrapper}>
      <Card>
        <Box className={classes.totalStar}>
          Total Score: {result.stars} stars
        </Box>
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
