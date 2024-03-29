import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import { getUser } from "@helpers/auth-helpers";
import { actions as employeeActions } from "@store/employee";
import { bindActionCreators } from "redux";
import PhotoDropZone from "@components/PhotoDropZone";

// set styles - material-ui
const useStyles = makeStyles((theme) => ({
  openButton: {
    marginLeft: "auto",
    marginTop: "0.5rem",
    [theme.breakpoints.down("xs")]: {
      marginTop: "-1rem",
    },
  },
  avatarContainer: {
    border: `3px solid ${theme.palette.common.blue}`,
    borderRadius: "50%",
    background: "white",
    width: 166,
    zIndex: 1,
  },
  avatar: {
    width: 160,
    height: 160,
    border: "3px solid white",
  },
  openIcon: {
    border: `1px solid ${theme.palette.common.blue}`,
    backgroundColor: "transparent",
    color: theme.palette.common.blue,
    width: 28,
    height: 28,
  },
  dropzoneContainer: {
    justifyContent: "center",
    alignSelf: "center",
    textAlign: "center",
  },
  dropzoneText: {
    color: theme.palette.secondary.main,
    fontWeight: 700,
    textDecoration: "underline",
    marginBottom: "1rem",
    cursor: "pointer",
  },
}));

const ProfilePhoto = ({ profile, actions, photo, employer }) => {
  const user = JSON.parse(getUser());
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const uploadPhoto = (photoType, sendPhoto, fileNames, title) => {
    const formData = new FormData();
    formData.append("id", user._id);
    formData.append("type", photoType);
    formData.append("content", sendPhoto);
    formData.append("fname", sendPhoto.name);
    actions.uploadProfilePhoto({ formData, photoType });
  };

  const deletePhoto = (photoType, sendPhoto, fileNames, title) => {
    const formData = new FormData();
    formData.append("id", user._id);
    formData.append("type", photoType);
    formData.append("content", "");
    actions.deleteProfilePhoto({ formData, photoType });
  };

  const [fileNames, setFileNames] = useState();

  useEffect(() => {
    actions.getProfilePhoto({
      id: user._id,
      type: "photo",
    });
  }, []);

  console.log(photo, "profile photo")

  return (
    <Grid item container direction={matchesXS ? "column-reverse" : "column"}>
      {localStorage.role === "employee" && (
        <PhotoDropZone
          fileNames={fileNames}
          setFileNames={setFileNames}
          connectFunc={uploadPhoto}
          deleteFunc={deletePhoto}
          image={photo}
          open={open}
          headerTitle="Upload Profile Photo"
          setOpen={setOpen}
          photoType="photo"
        />
      )}

      <Grid item className={classes.avatarContainer}>
        <Avatar
          src={photo && `${photo.url}?${Date.now()}`}
          onClick={handleClickOpen}
          alt={photo && photo.fname}
          className={classes.avatar}
        />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = ({ employee: { skill, loading, photo } }) => ({
  skill,
  loading,
  photo,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      ...employeeActions,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePhoto);
