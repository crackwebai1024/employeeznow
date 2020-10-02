import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import PhotoDropZone from '../../UI/PhotoDropzone';

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.common.blue,
    borderColor: theme.palette.common.blue,
  },
  galleryTextContainer: {
    marginBottom: '1rem',
  },
  gridListContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    '& p': {
      marginRight: 'auto',
      color: theme.palette.common.darkBlue,
    },
    '& li': {
      minWidth: '100%',
      minHeight: '100%',
      objectFit: 'cover',
    },
  },
  gridList: {
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    height: 'auto',
    overflow: 'auto',
    flexWrap: 'nowrap',
  },
  nocontentText: {
    textAlign: 'left',
  },
}));

// iterate over the picture = haven't set the picture yet
const Gallery = ({ uploadPhotos, photos, employee, slug }) => {
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

  return (
    <Grid container direction="column">
      <Grid item>
        <Grid container spacing={2} className={classes.galleryTextContainer}>
          <Grid item>
            <Typography variant="h6">GALLERY</Typography>
          </Grid>
          <Grid item>
            {photos.length !== 0 && (
              <Button
                component={Link}
                to={{
                  pathname: `/candidate-${employee.employeezNowId}/mygallery`,
                  data: { employee, slug },
                }}
                className={classes.button}
              >
                collection
              </Button>
            )}
          </Grid>
          <Grid item>
            <Button onClick={handleClickOpen} className={classes.button}>
              upload
            </Button>
          </Grid>

          {/* upload Photo */}
          {/* {localStorage.role === 'employee' && (
            <PhotoDropZone
              fileNames={fileNames}
              setFileNames={setFileNames}
              connectFunc={uploadPhotos}
              open={open}
              setOpen={setOpen}
              photoType="photo"
            />
          )} */}
        </Grid>

        <Grid item>
          <div className={classes.gridListContainer}>
            {photos.length === 0 && !fileNames && (
              <Typography>
                There is no content yet. Let&apos;s upload your work photos!
              </Typography>
            )}
            <GridList
              cols={matchesXS ? 1.5 : photos.length <= 1 ? 2 : 3.5}
              className={classes.gridList}
            >
              {/* display uploaded picture */}
              {fileNames && (
                <GridList cols={1}>
                  <img src={fileNames.file} alt="title" />
                </GridList>
              )}
              {/* Display max 6 photos */}
              {photos.length !== 0 &&
                photos.slice(0, 5).map((photo) => (
                  <GridListTile key={photo.id} cols={1}>
                    <img
                      src={photo.s3url}
                      alt={photo.title}
                      className={classes.image}
                    />
                  </GridListTile>
                ))}
            </GridList>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Gallery;
