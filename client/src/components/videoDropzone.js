import React, { useState } from "react";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

// set styles - material-ui
const useStyles = makeStyles((theme) => ({
  dropzoneStyle: {},
  dropzoneContainer: {
    justifyContent: "center",
    alignSelf: "center",
    textAlign: "center",
    border: "none",
    backgroundColor: theme.palette.secondary.main,
    outline: "none",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
    "&:active": {
      backgroundColor: theme.palette.primary.light,
    },
  },
  dropzoneText: {
    color: theme.palette.common.white,
    fontWeight: 700,
    textDecoration: "underline",
    marginBottom: "1rem",
    cursor: "pointer",
  },
  inputContainer: {
    margin: "0 auto 1rem auto",
  },
}));

// props are through parents
// fileNames is blob url
// connectFun varies by each function (connect to action)
// open and setOpen for dialog
const VideoDropzone = ({
  fileNames,
  setFileNames,
  connectFunc,
  open,
  setOpen,
}) => {
  // style material-ui
  const classes = useStyles();

  // title for Photo
  const [title, setTitle] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const [sendVideo, setSendVideo] = useState();

  const onDrop = (acceptedFiles) => {
    console.log(acceptedFiles[0]);
    const imgName = acceptedFiles.map((file) => file.name);
    console.log(imgName);
    setFileNames({ file: URL.createObjectURL(acceptedFiles[0]) });
    setSendVideo(acceptedFiles[0]);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(fileNames);
    connectFunc(sendVideo, fileNames);
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="dialog-title">
      <DialogTitle id="dialog-title">
        {!fileNames && "Upload Video"}
        {fileNames && "Almost there! Please click CONFIRM"}
      </DialogTitle>

      <Dropzone onDrop={onDrop} accept="video/*">
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps({ className: `dropzoneStyle` })}
            onDragOver={(e) => onDragOver(e)}
            // onDragLeave={(e) => onDragLeave(e)}
            multiple={false}
          >
            <input {...getInputProps()} />
            {!fileNames ? (
              <div className={classes.dropzoneContainer}>
                <DialogContent>
                  <Typography
                    variant="caption"
                    className={classes.dropzoneText}
                  >
                    Drag and Drop or Select a video file
                  </Typography>
                </DialogContent>
              </div>
            ) : (
              <div className={classes.dropzoneContainer}>
                <DialogContent>
                  <Typography
                    variant="caption"
                    className={classes.dropzoneText}
                  >
                    If you want to change the file, drag and drop again
                  </Typography>
                </DialogContent>
              </div>
            )}
          </div>
        )}
      </Dropzone>

      {fileNames && (
        <DialogActions>
          <form onSubmit={(e) => onSubmit(e)}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleClose}
            >
              Confirm
            </Button>
          </form>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default connect(null, null)(VideoDropzone);
