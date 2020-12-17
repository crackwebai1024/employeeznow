import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Grid, Container, Typography, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { actions as employeeActions } from "@store/employee";
import { bindActionCreators } from "redux";
import BackupIcon from "@material-ui/icons/Backup";
import VideoUpload from "./VideoUpload";
import { getUser } from "@helpers/auth-helpers";

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: "center",
  },
  videoContainer: {
    textAlign: "center",
    marginTop: "2rem",
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
  arizonaWrapper: {
    width: "100%",
    textAlign: "center",
    background: "#c00000",
    marginTop: "-3rem",
    paddingTop: "1rem",
    paddingBottom: "3rem",
  },
  arizonaContainer: {
    maxWidth: "1100px",
    margin: "auto",
  },
  link: {
    // textDecoration: "none",
    color: theme.palette.common.black,
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
  uploadIcon: {
    color: theme.palette.common.gray,
    width: "100%",
    height: "100%",
  },
  subTitle: {
    fontFamily: "Roboto !important",
    fontWeight: 600,
    lineHeight: "1.4",
    marginTop: "2rem",
    fontSize: "26px",
  },
  content: {
    fontSize: "18px",
    fontWeight: 600,
    lineHeight: "1",
  },
  arizona: {
    color: "white",
    fontSize: "42px",
  },
  lineHeight: {
    lineHeight: "1.3 !important",
  },
  font20: {
    color: "white",
    fontSize: "22px",
    fontWeight: 600,
  },
  section1: {
    marginTop: "1rem",
  },
  white: {
    color: "white",
    fontWeight: 500,
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
  const { actions, cockTailVideo } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [videoName, setVideoUpload] = useState();
  const user = JSON.parse(getUser());

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
    };
    actions.getContestVideo(data);
  }, []);

  return (
    <Box>
      <Box className={classes.arizonaWrapper}>
        <Grid container item xs={12} className={classes.arizonaContainer}>
          <Grid item xs={12} className={classes.section1}>
            <Typography
              className={`${classes.lineHeight} ${classes.content} ${classes.white}`}
            >
              CAN YOU MAKE
            </Typography>
            <Typography
              className={`copper_font ${classes.arizona} ${classes.lineHeight}`}
            >
              THE BEST COCKTAIL
            </Typography>
            <Typography
              className={`${classes.lineHeight} ${classes.content} ${classes.white}`}
            >
              IN THE PHOENIX AREA?
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.section1}>
            <Typography className={`copper_font ${classes.arizona}`}>
              WINNER GETS $2500
            </Typography>
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={12} sm={6}>
              <Typography className={classes.font20}>
                SECOND PLAGE: $1500
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography className={classes.font20}>
                THIRD PLACE: $750
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Container width="sm" className={classes.container}>
        <Grid item xs={12}>
          <Typography className={classes.subTitle}>
            LET US KNOW HOW YOU ARE
          </Typography>
          <Typography className={classes.content}>
            To be eligible to win,
            <br />
            you must complete your profile's&nbsp;
            <span>
              <Link className={classes.link}>Personal/Preferences</Link>&nbsp;
            </span>
            & &nbsp;
            <span>
              <Link className={classes.link}>Experiences</Link> sections
            </span>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.subTitle}>ENTER YOUR VIDEO</Typography>
          <Typography className={classes.content}>
            Upload a video of you making/pouring your cocktail (no longer than 1
            minute)
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.subTitle}>THEME</Typography>
          <Typography className={classes.content}>
            The cocktail that best represents Arizona
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.subTitle}>
            WINNER CHOSEN BY THE PUBLIC
          </Typography>
          <Typography className={classes.content}>
            Anyone can vote, just enter through ‘employee’ sign up and verify
            your cell phone
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.subTitle}>
            THE MOST STARS WINS
          </Typography>
          <Typography className={classes.content}>
            Voters select 1,2 or 3 stars for the videos the choose to vote on
          </Typography>
        </Grid>
      </Container>

      <Container width="sm" className={classes.videoContainer}>
        <Grid container item xs={12}>
          <Grid item xs={12}>
            {cockTailVideo ? (
              <video controls className={classes.uploadvideo}>
                <source src={`${cockTailVideo.url}?${Date.now()}`} alt="img" />
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
    </Box>
  );
};

const mapStateToProps = ({ employee: { cockTailVideo } }) => ({
  cockTailVideo,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...employeeActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CockTailContest);
