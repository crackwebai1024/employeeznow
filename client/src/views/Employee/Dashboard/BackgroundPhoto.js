import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
// import PhotoDropZone from '../../UI/PhotoDropzone';
// import { uploadPhoto } from '../../../store/actions/employeePhoto';

// set styles - material-ui
const useStyles = makeStyles((theme) => ({
  imageContainer: {
    maxHeight: 300,
    //border: '2px solid red', //just for debug
    position: 'relative',
  },
  image: {
    width: '100%',
    maxHeight: 300,
    objectFit: 'cover',
  },
  openButton: {
    display: 'inline-block',
    position: 'absolute',
    top: '0.6rem',
    right: '1rem',
  },
  openIcon: {
    //border: `1px solid ${theme.palette.common.white}`,
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.blue,
    width: 28,
    height: 28,
  },
}));

// props from parent - Dashboard
const BackgourndPhoto = ({ background, uploadPhoto }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  // Dialog
  const [open, setOpen] = useState(false);

  // Dialog open and close Funtdion
  const handleClickOpen = () => {
    setOpen(true);
  };

  //fileNames is blob url - pass to dropzone, assign there, and display here
  const [bgfileNames, setbgFileNames] = useState();

  return (
    <Grid
      item
      container
      direction={matchesXS ? 'column-reverse' : 'column'}
      className={classes.imageContainer}
    >
      {/* column 1 / 2 open dialog(modal) button */}

      {/* upload Photo */}
      {/* {localStorage.role === 'employee' && (
        <PhotoDropZone
          fileNames={bgfileNames}
          setFileNames={setbgFileNames}
          // connectFunc={uploadPhoto}
          open={open}
          setOpen={setOpen}
          photoType="background"
        />
      )} */}

      {/* actual image should be passed from parent */}
      <Grid item className={classes.image}>
        {!bgfileNames ? (
          //* display current picture
          <img
            src={background}
            alt="profile background"
            className={classes.image}
          />
        ) : (
            //* display uploaded picture */
            <img
              src={bgfileNames.file}
              alt="profile background"
              className={classes.image}
            />
          )}
        <div className={classes.openButton}>
          <Avatar className={classes.openIcon}>
            <AddIcon onClick={handleClickOpen} />
          </Avatar>
        </div>
      </Grid>
    </Grid>
  );
};

// export default connect(null, { uploadPhoto })(BackgourndPhoto);
export default connect(null, null)(BackgourndPhoto);
