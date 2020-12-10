import React, { Fragment } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Card, Grid, CardHeader, GridList, GridListTile, CardContent, Box, Typography, GridListTileBar } from "@material-ui/core";

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
    height: 300,
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
    height: 300,
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
  const classes = useStyles()
  return (
    <Fragment>
      <Card className={classes.section}>
        <CardHeader
          title="Portfolio"
        />
        <CardContent>
          {portfolios && (
            <Grid item container xs={12}>
              {portfolios.map((p, i) => {
                return (
                  <Grid item xs={12} md={6} key={i}>
                    <Card className={classes.portfolio}>
                      <CardContent className={classes.content}>
                        <GridList
                          cellHeight={200}
                          spacing={1}
                          className={classes.gridList}
                        >
                          <GridListTile cols={2} rows={2}>
                            {p && (
                              <Fragment>
                                <Box className={classes.imagewrapper}>
                                  {p.style === "video" ? (
                                    <Fragment>
                                      <Box className={classes.videoBox}></Box>
                                      <video controls className={classes.video}>
                                        <source
                                          src={
                                            p.url && `${p.url}?${Date.now()}`
                                          }
                                          type="video/mp4"
                                        ></source>
                                      </video>
                                    </Fragment>
                                  ) : (
                                      <Fragment>
                                        <Box
                                          className={classes.imageBox}
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
                                <GridListTileBar
                                  title=""
                                  titlePosition="top"
                                  actionPosition="right"
                                  className={classes.titleBar}
                                />
                              </Fragment>
                            )}
                          </GridListTile>
                        </GridList>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </CardContent>
      </Card>
    </Fragment>
  )
}
