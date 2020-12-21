import React, { useEffect, useState } from "react";
import { Grid, Container, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { actions as employeeActions } from "@store/employee";
import { bindActionCreators } from "redux";
import BackupIcon from "@material-ui/icons/Backup";
import ContestHome from "./ContestHome";
import VideoUpload from "./VideoUpload";
import { getUser, getRole } from "@helpers/auth-helpers";
import VideoItems from "./VideoItems";
import SearchVideo from "./SearchVideo";

const useStyles = makeStyles((theme) => ({
  videoContainer: {
    textAlign: "center",
    marginTop: "2rem",
  },
  noResult: {
    fontSize: "36px",
    margin: "auto",
    color: theme.palette.common.gray,
  },
  uploadvideo: {
    maxWidth: "500px",
    width: "100%",
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
  resultContainer: {
    marginTop: "1rem",
    border: "1px solid gray",
  },
}));

const FoodContest = (props) => {
  const { actions, cockTailVideo, FoodSearchResult } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [videoName, setVideoUpload] = useState();

  const user = JSON.parse(getUser());
  const role = getRole();

  const uploadVideo = (photoType, sendPhoto, fileNames, title) => {
    const formData = new FormData();
    formData.append("id", user._id);
    formData.append("type", "food");
    formData.append("fname", sendPhoto.name);
    formData.append("content", sendPhoto);
    actions.uploadContestVideo(formData);
  };

  const deleteVideo = (photoType, sendPhoto, fileNames, title) => {
    const formData = new FormData();
    formData.append("id", user._id);
    formData.append("type", "food");
    actions.deleteContestVideo(formData);
  };

  useEffect(() => {
    const data = {
      id: user._id,
      type: "food",
    };
    actions.getContestVideo(data);
  }, []);

  const giveStarFunc = (value, id) => {
    const data = {
      videoID: id,
      id: user._id,
      role: role,
      stars: value,
    };
    actions.giveStar(data);
  };

  const searchFunction = (value) => {
    if (value === "") return;
    const data = {
      id: user._id,
      type: "food",
      lastName: value,
    };
    actions.searchVideo(data);
  };
  return (
    <Box>
      <ContestHome title="FOOD" />
      {role === "employee" && (
        <Container width="sm" className={classes.videoContainer}>
          <Grid container item xs={12}>
            <Grid item xs={12}>
              {cockTailVideo ? (
                <video controls className={classes.uploadvideo}>
                  <source
                    src={`${cockTailVideo.url}?${Date.now()}`}
                    alt="img"
                  />
                </video>
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
            <Grid item xs={12}>
              <hr className={classes.hr} />
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
      <Container Container width="sm" className={classes.videoContainer}>
        <SearchVideo searchFunc={searchFunction} />
        <Grid container item xs={12} className={classes.resultContainer}>
          {FoodSearchResult && FoodSearchResult.length > 0 ? (
            FoodSearchResult.map((result, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
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
  employee: { cockTailVideo, FoodSearchResult },
}) => ({
  cockTailVideo,
  FoodSearchResult,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...employeeActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FoodContest);
