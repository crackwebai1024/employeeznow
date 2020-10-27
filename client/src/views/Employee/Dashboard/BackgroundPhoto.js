import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import PhotoDropZone from '@components/PhotoDropZone';
import { getUser } from '@helpers/auth-helpers';
import { actions as employeeActions } from '@store/employee';
import { bindActionCreators } from 'redux';
import image from '@assets/back.jpg';

// set styles - material-ui
const useStyles = makeStyles((theme) => ({
  imageContainer: {
    maxHeight: 300,
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
  gridList: {
    height: 300,
    overflow: "hidden",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background: 'none'
  },
  icon: {
    color: 'RGB(23,41, 64)',
    background: 'white',
    top: "10px",
    margin: "10px",
    '&:hover': {
      background: "white",
    },
  },
}));

// props from parent - Dashboard
const BackgourndPhoto = ({ background, actions }) => {
  const classes = useStyles();
  const theme = useTheme();
  const user = JSON.parse(getUser())
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  // Dialog
  const [open, setOpen] = useState(false);

  // Dialog open and close Funtdion
  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    let data = {
      id: user._id,
      type: "background"
    }
    actions.getBackgroundImage(data)
  }, [])

  const uploadPhoto = (photoType, sendPhoto, fileNames, title) => {
    const formData = new FormData();
    formData.append("id", user._id)
    formData.append("type", photoType)
    formData.append("content", sendPhoto)
    actions.uploadProfilePhoto({ formData, photoType })
  }
  //fileNames is blob url - pass to dropzone, assign there, and display here
  const [bgfileNames, setbgFileNames] = useState();

  return (
    <Fragment>
      {localStorage.role === 'employee' && (
        <PhotoDropZone
          fileNames={bgfileNames}
          setFileNames={setbgFileNames}
          connectFunc={uploadPhoto}
          open={open}
          image={background}
          headerTitle="Upload BackGround Image"
          setOpen={setOpen}
          photoType="background"
        />
      )}
      <GridList cellHeight={200} spacing={1} className={classes.gridList}>
        <GridListTile cols={2} rows={2}>
          <img src={background ? "data:image/jpeg;base64, " + background : image} alt="alt" />
          {localStorage.role === 'employee' &&
            <GridListTileBar
              title=""
              titlePosition="top"
              actionIcon={
                <IconButton onClick={handleClickOpen} aria-label={`star Morning`} className={classes.icon}>
                  <CameraAltIcon />
                </IconButton>
              }
              actionPosition="right"
              className={classes.titleBar}
            />
          }
        </GridListTile>
      </GridList>
    </Fragment>
  );
};

const mapStateToProps = ({
  employee: {
    skill, loading, background
  },
}) => ({
  skill, loading, background
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...employeeActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BackgourndPhoto);
