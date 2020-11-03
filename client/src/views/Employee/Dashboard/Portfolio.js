import React, { Fragment, useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PhotoDropZone from "@components/PhotoDropZone";
import { getUser } from "@helpers/auth-helpers";
import { actions as employeeActions } from "@store/employee";
import { bindActionCreators } from "redux";
import CreateIcon from "@material-ui/icons/Create";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Box from "@material-ui/core/Box";
import { connect } from "react-redux";
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
  imageBox: {
    position: "absolute",
    top: "0px",
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
    height: 230,
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
  icon: {
    color: "white",
    "&:hover": {
      color: "#333333",
    },
  },
}));

function Portfolio({ actions, portfolios }) {
  const user = JSON.parse(getUser());
  const classes = useStyles();
  const [fileNames, setFileNames] = useState();
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState();
  const [folioId, setFolioID] = useState();
  const [currentFolioImage, setCurrentFolioImage] = useState();

  const uploadPhoto = (photoType, sendPhoto, fileNames, title) => {
    const formData = new FormData();
    formData.append("id", user._id);
    formData.append("fname", sendPhoto.name.split(".")[0]);
    formData.append("type", photoType);
    formData.append("content", sendPhoto);
    formData.append("note", title);
    formData.append("folioID", uuidv4());
    actions.uploadPortfolioImage({ formData, photoType, id: user._id });
  };

  const updatePhoto = (photoType, sendPhoto, fileNames, title) => {
    const formData = new FormData();
    console.log("sendphoto ==> ", sendPhoto);
    formData.append("id", user._id);
    formData.append("fname", sendPhoto.name.split(".")[0]);
    formData.append("type", photoType);
    formData.append("content", sendPhoto);
    formData.append("note", title);
    formData.append("folioID", folioId);
    actions.uploadPortfolioImage({ formData, photoType, id: user._id });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleUpdateOpen = (id, image) => {
    setUpdateOpen(true);
    setCurrentFolioImage(image);
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

  return (
    <Fragment>
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
        </Fragment>
      )}
      <Card className={classes.section}>
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
          subheader=""
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
                            {p.image && (
                              <Fragment>
                                <img
                                  src={
                                    p.image &&
                                    "data:image/jpeg;base64, " + p.image
                                  }
                                  className={classes.image}
                                ></img>
                                <Box className={classes.imageBox}></Box>
                                <Typography className={classes.note}>
                                  {p.note}
                                </Typography>
                                <GridListTileBar
                                  title=""
                                  titlePosition="top"
                                  actionIcon={
                                    <IconButton
                                      onClick={(e) =>
                                        handleUpdateOpen(p.index, p.image)
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

const mapStateToProps = ({ employee: { portfolios, reload } }) => ({
  portfolios,
  reload,
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
