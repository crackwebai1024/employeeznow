import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Grid, Container, Typography, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { actions as employeeActions } from "@store/employee";
import { bindActionCreators } from "redux";
import BackupIcon from "@material-ui/icons/Backup";
import ContestHome from "./ContestHome";
import VideoUpload from "./VideoUpload";
import VideoItems from "./VideoItems";
import { getUser, getRole } from "@helpers/auth-helpers";
import SearchVideo from "./SearchVideo";
import Sort from "./Sort";

const useStyles = makeStyles((theme) => ({
  videoContainer: {
    textAlign: "center",
    marginTop: "2rem",
  },
  uploadvideo: {
    maxWidth: "500px",
    width: "100%",
    maxHeight: "400px",
    minHeight: "400px",
  },
  hr: {
    borderWidth: "3px",
    borderColor: "#002060",
  },
  uploadvideoBlank: {
    maxWidth: "500px",
    border: "1px solid black",
    margin: "auto",
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "300px",
  },
  uploadIcon: {
    color: theme.palette.common.gray,
    width: "100%",
    height: "100%",
  },
  resultContainer: {
    margin: "1rem auto",
    maxWidth: 700,
  },
  noResult: {
    fontSize: "36px",
    margin: "auto",
    color: theme.palette.common.gray,
  },
  button: {
    margin: "1rem",
    background: "#002060",
    color: "white",
    lineHeight: "1.2",
    fontFamily: "Roboto !important",
    fontSize: "20px",
    paddingTop: "0.7rem",
    paddingBottom: "0.7rem",
    width: "250px",
  },
}));

const CockTailContest = (props) => {
  const { actions, cockTailVideo, cockTailSearchResult, sortCocktail } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [videoName, setVideoUpload] = useState();
  const [sortValue, setSortValue] = useState();
  const user = JSON.parse(getUser());
  const role = getRole();

  const uploadVideo = (photoType, sendPhoto, fileNames, title) => {
    const formData = new FormData();
    formData.append("id", user._id);
    formData.append("type", "cocktail");
    formData.append("fname", sendPhoto.name);
    formData.append("content", sendPhoto);
    actions.uploadContestVideo(formData);
  };

  const deleteVideo = (photoType, sendPhoto, fileNames, title) => {
    const formData = new FormData();
    formData.append("id", user._id);
    formData.append("type", "cocktail");
    actions.deleteContestVideo(formData);
  };

  useEffect(() => {
    const data = {
      id: user._id,
      type: "cocktail",
      sort: sortCocktail,
    };
    actions.getContestVideo(data);
  }, []);

  const searchFunction = (value) => {
    // if (value === "") return;
    const data = {
      id: user._id,
      type: "cocktail",
      lastName: value,
      sort: sortCocktail,
    };
    actions.searchVideo(data);
  };

  const giveStarFunc = (value, id) => {
    const data = {
      videoID: id,
      id: user._id,
      role: role,
      stars: value,
    };
    actions.giveStar(data);
  };

  const setSortCocktail = (e) => {
    const data = {
      value: e.target.value,
      type: "cocktail",
      data: cockTailSearchResult,
    };
    actions.setSortCocktail(data);
  };

  return (
    <Box>
      <ContestHome title="COCKTAIL" />
      {role === "employee" && (
        <Container width="sm" className={classes.videoContainer}>
          <Grid container item xs={12}>
            <Grid item xs={12}>
              {cockTailVideo ? (
                <video
                  controls
                  src={`${cockTailVideo.url}?${Date.now()}`}
                  className={classes.uploadvideo}
                ></video>
              ) : (
                <div className={classes.uploadvideoBlank}>
                  <BackupIcon className={classes.uploadIcon} />
                </div>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={(e) => setOpen(true)}
              >
                UPLOAD YOUR <br /> VIDEO
              </Button>
            </Grid>
          </Grid>
          <VideoUpload
            open={open}
            fileNames={videoName}
            image={cockTailVideo && cockTailVideo.url}
            deleteFunc={deleteVideo}
            photoType="cocktail"
            setFileNames={setVideoUpload}
            setOpen={(e) => setOpen(e)}
            connectFunc={uploadVideo}
            headerTitle="Upload Contest Video"
          />
        </Container>
      )}
      <Container width="sm" className={classes.videoContainer}>
        <Grid item xs={12}>
          <hr className={classes.hr} />
        </Grid>
      </Container>
      <Container width="sm" className={classes.videoContainer}>
        <SearchVideo searchFunc={searchFunction} />
        <Sort value={sortCocktail} onChange={setSortCocktail} />
        <Grid container item xs={12} className={classes.resultContainer}>
          {cockTailSearchResult && cockTailSearchResult.length > 0 ? (
            cockTailSearchResult.map((result, index) => (
              <Grid item xs={12} key={index}>
                <VideoItems
                  result={result}
                  key={index}
                  stars={
                    result.voters.filter(
                      (voter) => voter.voterID === user._id
                    )[0] &&
                    result.voters.filter(
                      (voter) => voter.voterID === user._id
                    )[0].stars
                  }
                  giveStarFunc={giveStarFunc}
                />
              </Grid>
            ))
          ) : (
            <Box className={classes.noResult}>There is no result</Box>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

const mapStateToProps = ({
  employee: { cockTailVideo, cockTailSearchResult, sortCocktail },
}) => ({
  cockTailVideo,
  cockTailSearchResult,
  sortCocktail,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...employeeActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CockTailContest);
