import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import { getUser } from '@helpers/auth-helpers';
import { actions as employeeActions } from '@store/employee';
import { bindActionCreators } from 'redux';
import PhotoDropZone from '@components/PhotoDropZone';
import { AccordionActions } from '@material-ui/core';

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

const ProfilePhoto = ({ profile, actions, photo }) => {
  const user = JSON.parse(getUser());
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const uploadPhoto = (photoType, sendPhoto, fileNames, title) => {

    const formData = new FormData();
    formData.append("id", user._id)
    formData.append("type", photoType)
    formData.append("content", sendPhoto)
    actions.uploadProfilePhoto({formData, photoType})
  }

  const [fileNames, setFileNames] = useState();

  useEffect(() => {
    actions.getProfilePhoto({
      id : user._id,
      type : 'photo'
    })
  }, [])

  return (
    <Grid item container direction={matchesXS ? 'column-reverse' : 'column'}>

      {localStorage.role === 'employee' && (
        <PhotoDropZone
          fileNames={fileNames}
          setFileNames={setFileNames}
          connectFunc={uploadPhoto}
          open={open}
          setOpen={setOpen}
          photoType="photo"
        />
      )}

      <Grid item className={classes.avatarContainer}>
        <Avatar
          src={photo && "data:image/jpeg;base64, " + photo}
          onClick={handleClickOpen}
          alt="profile"
          className={classes.avatar}
        />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = ({
  employee: {
    skill, loading, photo
  },
}) => ({
  skill, loading, photo
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...employeeActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePhoto);
