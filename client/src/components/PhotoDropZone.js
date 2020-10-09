import React, { useState } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
// import setAlert from '../../store/actions/alert';

// set styles - material-ui
const useStyles = makeStyles((theme) => ({
  dropzoneStyle: {},
  dropzoneContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    border: 'none',
    backgroundColor: theme.palette.secondary.main,
    outline: 'none',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
    '&:active': {
      backgroundColor: theme.palette.primary.light,
    },
  },
  avatarContainer: {
    width: 300,
    height: 300,
    zIndex: 1,
    overflow: 'hidden'
  },
  button: {
    marginLeft: "1rem"
  },
  avatar: {
    width: 300,
    marginLeft: '20px'
  },
  dropzoneText: {
    color: theme.palette.common.white,
    fontWeight: 700,
    textDecoration: 'underline',
    marginBottom: '1rem',
    cursor: 'pointer',
  },
  dropzoneTextSub: {
    fontSize: '0.5rem',
    color: theme.palette.error.main,
  },
  inputContainer: {
    margin: '0 auto 1rem auto',
  },
}));

// props are through parents
// fileNames is blob url
// connectFun varies by each function (connect to action)
// open and setOpen for dialog
const PhotoDropZone = ({
  fileNames,
  setFileNames,
  connectFunc,
  image,
  open,
  headerTitle,
  setOpen,
  photoType, //Photo type (profile/background/photo)
  // setAlert,
}) => {
  // style material-ui
  const classes = useStyles();

  // title for Photo
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('')
  const handleClose = () => {
    setOpen(false);
  };

  //const [dropzoneStyle, setDropzoneStyle] = useState();

  //sendPhoto is file data including buffer etc
  const [sendPhoto, setSendPhoto] = useState();

  const onDrop = (acceptedFiles) => {
    console.log(acceptedFiles[0], "acceptedfile");
    //setFileNames(acceptedFiles.map((file) => file.name));  -- when there is multiple pictures
    const imgName = acceptedFiles.map((file) => file.name);
    console.log(imgName);
    // setPhoto({ photo: imgName[0] });
    setFileNames({ file: URL.createObjectURL(acceptedFiles[0]) });
    //setDropzoneStyle('dropped');
    setSendPhoto(acceptedFiles[0]);
    // uploadPhoto(acceptedFiles[0]);  //if you want to send photo onDrop
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (photoType === 'portfolio' && !title) {
      return setTitleError("Please Input the Description")
    }
    connectFunc(photoType, sendPhoto, fileNames, title);
    handleClose()
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="dialog-title">
      <DialogTitle id="dialog-title">
        <Typography>
          {headerTitle}
        </Typography>
        {fileNames &&
          photoType === 'portfolio' &&
          'Almost there! Create image title and CONFIRM'}
        {fileNames &&
          photoType !== 'portfolio' &&
          'Almost there! Please click CONFIRM'}
      </DialogTitle>
      <DialogContent>
        <Grid item className={classes.avatarContainer}>
          <img
            src={fileNames ? fileNames.file : "data:image/jpeg;base64, " + image}
            // onClick={handleClickOpen}
            alt="profile"
            className={classes.avatar}
          />
        </Grid>
      </DialogContent>
      {photoType === 'portfolio' && (
        <div className={classes.inputContainer}>
          <TextField
            error={titleError === '' ? false : true}
            helperText={'Please add title'}
            label="Description"
            required
            fullWidth
            color="primary"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      )}
      {/* accept file max size 1MB (1048576 Bytes) */}
      <Dropzone onDrop={onDrop} accept="image/*" minSize={0}>

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
                    Drag and Drop or Select a file
                  </Typography>
                  <Typography className={classes.dropzoneTextSub}>
                    &#42;Max file size 1MB
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
                      If you want to change the photo, drag and drop again
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
            <Button className={classes.button}
              variant="outlined"
              color="primary"
            >
              Cancel
            </Button>
            <Button className={classes.button}
              type="submit"
              variant="contained"
              color="primary"
            >
              Confirm
            </Button>
          </form>
        </DialogActions>
      )
      }
    </Dialog >
  );
};

export default connect(null, null)(PhotoDropZone);
