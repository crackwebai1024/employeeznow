import React, { Fragment, useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import {
  Dialog,
  DialogContentText,
  DialogContent,
  Checkbox,
  Icon,
} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import PhotoDropZone from "@components/PhotoDropZone";
import { getUser } from "@helpers/auth-helpers";
import { actions as employeeActions } from "@store/employee";
import { bindActionCreators } from "redux";
import CreateIcon from "@material-ui/icons/Create";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import { connect } from "react-redux";
import LoadingCircular from "@components/LoadingCircular";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.common.blue,
    borderColor: theme.palette.common.blue,
  },
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
  sequence: {
    padding: "2rem 4rem",
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

function Portfolio({ actions, portfolios, videoUpload }) {
  const user = JSON.parse(getUser());
  const classes = useStyles();
  const [fileNames, setFileNames] = useState();
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState();
  const [folioId, setFolioID] = useState();
  const [currentFolioImage, setCurrentFolioImage] = useState();
  const [sequence, setSequence] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const uploadPhoto = (photoType, sendPhoto, fileNames, title) => {
    const formData = new FormData();
    formData.append("id", user._id);
    formData.append("fname", sendPhoto.name.split(".")[0]);
    formData.append("type", photoType);
    formData.append("style", sendPhoto.type.split("/")[0]);
    formData.append("content", sendPhoto);
    formData.append("note", title);
    formData.append("folioID", uuidv4());
    actions.uploadPortfolioImage({ formData, photoType, id: user._id });
  };

  const updatePhoto = (photoType, sendPhoto, fileNames, title) => {
    const formData = new FormData();
    formData.append("id", user._id);
    formData.append("fname", sendPhoto.name.split(".")[0]);
    formData.append("type", photoType);
    formData.append("content", sendPhoto);
    formData.append("note", title);
    formData.append("folioID", folioId);
    actions.uploadPortfolioImage({ formData, photoType, id: user._id });
  };

  const handleClickOpen = () => {
    setConfirm(false);

    if (!portfolios || portfolios.length == 0) {
      return setSequence(true);
    }
    setOpen(true);
  };

  const handleUpdateOpen = (id, image, note, style) => {
    setUpdateOpen(true);

    setCurrentFolioImage({
      url: image,
      description: note,
      style: style,
    });
    setFolioID(id);
  };

  useEffect(() => {
    let data = {
      id: user._id,
    };
    actions.getPortfolioImage(data);
  }, []);

  const handleDeletePortfolio = (photoType, sendPhoto, fileNames, title) => {
    let data = {
      type: "portfolio",
      folioID: folioId,
      role: "delete",
      id: user._id,
    };
    actions.deletePortfolio(data);
  };

  const handleClose = () => {
    setSequence(false);
  };

  const onConfirm = () => {
    if (confirm) {
      setOpen(true);
      setSequence(false);
    }
  };

  const handleChange = () => {
    setConfirm(!confirm);
  };

  const [modalImageUrl, setModalImage] = useState();
  const [imageModal, openImageModal] = useState(false);

  const onImageClick = (image) => {
    setModalImage(image);
    openImageModal(true);
  };

  return (
    <Fragment>
      <Dialog
        open={imageModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <img src={modalImageUrl} className={classes.modalImage} />
        <IconButton
          className={classes.closeIcon}
          onClick={(e) => openImageModal(false)}
        >
          <HighlightOffIcon />
        </IconButton>
      </Dialog>
      {localStorage.role === "employee" && (
        <Fragment>
          <PhotoDropZone
            fileNames={fileNames}
            setFileNames={setFileNames}
            connectFunc={uploadPhoto}
            open={open}
            setOpen={setOpen}
            photoType="portfolio"
          />
          <PhotoDropZone
            fileNames={fileNames}
            image={currentFolioImage}
            setFileNames={setFileNames}
            connectFunc={updatePhoto}
            deleteFunc={handleDeletePortfolio}
            open={updateOpen}
            setOpen={setUpdateOpen}
            headerTitle="Upload Portfolio"
            photoType="portfolio"
          />
          <Dialog
            open={sequence}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className={classes.sequence}
          >
            <DialogContent>
              <DialogContentText
                id="alert-dialog-description"
                className={classes.sequenceTitle}
              >
                Remember to not include your name or any contact information in
                any video or picture you upload.
              </DialogContentText>
              <DialogContentText className={classes.sequenceDescription}>
                <div>
                  <Checkbox
                    checked={confirm}
                    onChange={handleChange}
                    color="secondary"
                    className={classes.checkbox}
                  />
                </div>
                <div>
                  I understand that any attempt or include any private/personal
                  contact information through video, pictures of other uploads
                  will result in my profile being cancelled.
                </div>
              </DialogContentText>
              <Button onClick={onConfirm} className={classes.confirmButton}>
                OK
              </Button>
            </DialogContent>
          </Dialog>
        </Fragment>
      )}
      <Card className={classes.section}>
        {videoUpload === "REQUEST" && <LoadingCircular />}
        <CardHeader
          action={
            <Button
              onClick={handleClickOpen}
              variant="outlined"
              size="small"
              className={classes.button}
            >
              Upload
            </Button>
          }
          title="Portfolio"
          subheader="for videos and photos : please remember to not say or show your name or any contact information"
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
                                  {p.style == "video" ? (
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
                                        onClick={(e) => onImageClick(p.url)}
                                      ></Box>
                                      <img
                                        src={p.url && `${p.url}?${Date.now()}`}
                                        className={classes.image}
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
                                  actionIcon={
                                    <IconButton
                                      onClick={(e) =>
                                        handleUpdateOpen(
                                          p.index,
                                          p.url,
                                          p.note,
                                          p.style
                                        )
                                      }
                                      aria-label={`star Morning`}
                                    >
                                      <CreateIcon className={classes.icon} />
                                    </IconButton>
                                  }
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
  );
}

const mapStateToProps = ({
  employee: { portfolios, reload, videoUpload },
}) => ({
  portfolios,
  reload,
  videoUpload,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      ...employeeActions,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
