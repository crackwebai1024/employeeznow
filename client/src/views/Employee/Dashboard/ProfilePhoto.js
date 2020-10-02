import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
// import { uploadPhoto } from '../../../store/actions/employeePhoto';
// import PhotoDropZone from '../../UI/PhotoDropzone';

// set styles - material-ui
const useStyles = makeStyles((theme) => ({
  openButton: {
    marginLeft: 'auto',
    marginTop: '0.5rem',
    [theme.breakpoints.down('xs')]: {
      marginTop: '-1rem',
    },
  },
  avatarContainer: {
    border: `3px solid ${theme.palette.common.blue}`,
    borderRadius: '50%',
    width: 166,
    zIndex: 1,
  },
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    border: '3px solid white',
  },
  openIcon: {
    border: `1px solid ${theme.palette.common.blue}`,
    backgroundColor: 'transparent',
    color: theme.palette.common.blue,
    width: 28,
    height: 28,
  },
  dropzoneContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
  },
  dropzoneText: {
    color: theme.palette.secondary.main,
    fontWeight: 700,
    textDecoration: 'underline',
    marginBottom: '1rem',
    cursor: 'pointer',
  },
}));

const ProfilePhoto = ({ profile, uploadPhoto }) => {
  // style material-ui
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  // Dialog - open dropzone
  const [open, setOpen] = useState(false);

  // Dialog open and close Funtdion
  const handleClickOpen = () => {
    setOpen(true);
  };

  //fileNames is blob url
  const [fileNames, setFileNames] = useState();

  // *** this page is shared both employee and employer.
  //     visibility for employer is limited  *** ////
  return (
    <Grid item container direction={matchesXS ? 'column-reverse' : 'column'}>
      {/* column 1 / 2 open dialog(modal) button */}
      {localStorage.role === 'employee' && (
        <Grid item className={classes.avatarContainer}>
          <Avatar onClick={handleClickOpen} className={classes.avatar}/>
        </Grid>
      )}

      {/* upload Photo */}
      {/* {localStorage.role === 'employee' && (
        <PhotoDropZone
          fileNames={fileNames}
          setFileNames={setFileNames}
          // connectFunc={uploadPhoto}
          open={open}
          setOpen={setOpen}
          photoType="profile"
        />
      )} */}

      {/* dislplay profile picture */}
      {/* {!fileNames && (
        <Grid item className={classes.avatarContainer}>
          <Avatar src={profile} alt="profile" className={classes.avatar} />
        </Grid>
      )} */}

      {/* display uploaded picture */}
      {/* {fileNames && (
        <Grid item className={classes.avatarContainer}>
          <Avatar
            src={fileNames.file}
            alt="profile"
            className={classes.avatar}
          />
        </Grid>
      )} */}
    </Grid>
  );
};

ProfilePhoto.propTypes = {
  uploadPhoto: PropTypes.func.isRequired,
};

// export default connect(null, { uploadPhoto })(ProfilePhoto);
export default connect(null, null )(ProfilePhoto);
// dropzone => moved to PhotoDropZone
// dialog(modal) for dropzone
//       {/* {localStorage.role === 'employee' && (
//         <Dialog
//           open={open}
//           onClose={handleClose}
//           aria-labelledby="dialog-title"
//         >
//           <DialogTitle id="dialog-title">
//             {!fileNames ? 'Upload Profile Picture' : 'Upload Success!'}
//           </DialogTitle>

//           <Dropzone onDrop={onDrop} accept="image/*">
//             {({ getRootProps, getInputProps }) => (
//               <div
//                 {...getRootProps({ className: `${dropzoneStyle}` })}
//                 // onDragOver={(e) => onDragOver(e)}
//                 // onDragLeave={(e) => onDragLeave(e)}
//                 multiple={false}
//               >
//                 <input {...getInputProps()} />
//                 {!fileNames ? (
//                   <div className={classes.dropzoneContainer}>
//                     <DialogContent>
//                       <Typography
//                         variant="caption"
//                         className={classes.dropzoneText}
//                       >
//                         Drag and Drop or Select a file
//                       </Typography>
//                     </DialogContent>
//                   </div>
//                 ) : (
//                   <div className={classes.dropzoneContainer}>
//                     <DialogContent>
//                       <Typography
//                         variant="caption"
//                         className={classes.dropzoneText}
//                       >
//                         If you want to change the photo, drag and drop again
//                       </Typography>
//                     </DialogContent>
//                   </div>
//                 )}
//               </div>
//             )}
//           </Dropzone>
//           {fileNames && (
//             <DialogActions>
//               <form onSubmit={(e) => onSubmit(e)}>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   color="primary"
//                   onClick={handleClose}
//                 >
//                   Confirm
//                 </Button>
//               </form>
//             </DialogActions>
//           )}
//         </Dialog>
//       )}
