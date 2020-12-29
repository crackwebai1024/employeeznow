import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Dialog } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import {
  Card,
  Grid,
  CardHeader,
  GridList,
  GridListTile,
  CardContent,
  Box,
  Typography,
  GridListTileBar,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  note: {
    fontSize: 20,
    color: "RGB(23,41, 64)",
    padding: 10,
    fontWeight: 500,
  },
  videoBox: {
    cursor: "pointer",
    boxShadow: "inset 0 0 15px",
    width: "100%",
    height: 230,
  },
  imageBox: {
    position: "absolute",
    top: "0px",
    cursor: "pointer",
    boxShadow: "inset 0 0 15px",
    width: "100%",
    height: 230,
  },
  portfolio: {
    color: "RGB(23,41, 64)",
    marginBottom: 20,
    margin: 10,
    border: "solid 1px gray",
    paddingBottom: 0,
    borderRadius: "0px",
  },
  image: {
    width: "100%",
    // height: 230,
  },
  sequence: {
    maxWidth: "1000px",
    padding: "2rem 4rem",
  },
  gridList: {
    // height: 300,
    overflow: "hidden",
    transform: "translateZ(0)",
  },
  titleBar: {
    background: "rgba(0, 0, 0, 0.1)",
    transition: "0.3s",
    "&:hover": {
      icon: {
        color: "black",
      },
      background: "rgba(0, 0, 0, 0.5)",
    },
  },
  video: {
    width: "100%",
    maxHeight: "230px",
    position: "absolute",
    top: "0px",
    cursor: "pointer",
  },
  imagewrapper: {
    height: 230,
    overflow: "hidden",
    position: "relative",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  icon: {
    color: "white",
    "&:hover": {
      color: "#333333",
    },
  },
  section: {
    borderRadius: "0px",
    position: "relative",
  },
  modalImage: {
    width: "100%",
  },
  confirmButton: {
    float: "right",
  },
  sequenceTitle: {
    fontSize: "20px",
  },
  sequenceDescription: {
    fontSize: "12px",
    display: "flex",
  },
  checkbox: {
    marginRight: "0.5rem",
  },
  closeIcon: {
    width: "40px",
    height: "40px",
    position: "absolute",
    right: "10px",
    top: "10px",
    background: "white",
  },
}));

export default function Portfolio(props) {
  const { portfolios } = props;
  const classes = useStyles();

  const [modalImageUrl, setModalImage] = useState();
  const [imageModal, openImageModal] = useState(false);

  const onImageClick = (image) => {
    setModalImage(image);
    openImageModal(true);
  };

  return (
    <Fragment>
      <Dialog fullWidth={true} maxWidth="md" open={imageModal}>
        <img
          className={classes.modalImage}
          src={`${modalImageUrl}?${Date.now()}`}
          alt="img"
        />
        <IconButton
          className={classes.closeIcon}
          onClick={(e) => openImageModal(false)}
        >
          <HighlightOffIcon />
        </IconButton>
      </Dialog>
      <Card className={classes.section}>
        <CardHeader title="Portfolio" />
        <CardContent>
          {portfolios && (
            <Grid
              item
              container
              xs={12}
              spacing={1}
              style={{ marginLeft: "0px" }}
            >
              {portfolios.map((p, i) => {
                return (
                  <Grid item xs={12} md={6} key={i}>
                    <Card className={classes.portfolio}>
                      {p && (
                        <Fragment>
                          <Box className={classes.imagewrapper}>
                            {p.style === "video" ? (
                              <Fragment>
                                <Box className={classes.videoBox}></Box>
                                <video controls className={classes.video}>
                                  <source
                                    src={p.url && `${p.url}?${Date.now()}`}
                                    type="video/mp4"
                                  ></source>
                                </video>
                              </Fragment>
                            ) : (
                              <Fragment>
                                <Box
                                  className={classes.imageBox}
                                  onClick={(e) => onImageClick(p.url)}
                                ></Box>
                                <img
                                  src={p.url && `${p.url}?${Date.now()}`}
                                  className={classes.image}
                                  alt="img"
                                />
                              </Fragment>
                            )}
                          </Box>

                          <Typography className={classes.note}>
                            {p.note}
                          </Typography>
                        </Fragment>
                      )}
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </CardContent>
      </Card>
    </Fragment>
  );
}
