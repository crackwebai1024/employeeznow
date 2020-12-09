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
import VideoDropZone from '@components/videoDropzone';

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
    height: 250,
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

// props from parents
const VideoGallery = ({videos = [], employee, slug }) => {
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

  const uploadVideo = (a,v,b,c) => {
    
  }

  //fileNames is blob url
  const [fileNames, setFileNames] = useState();

  return (
    <Grid container direction="column">
      <Grid item>
        <Grid container spacing={2} className={classes.galleryTextContainer}>
          <Grid item>
            <Typography variant="h6">WORK VIDEO</Typography>
          </Grid>
          <Grid item>
            {videos.length !== 0 && (
              <Button
                component={Link}
                to={{
                  pathname: `/candidate-${employee.employeezNowId}/myvideogallery`,
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

          {/* upload Video */}
          {localStorage.role === 'employee' && (
            <VideoDropZone
              fileNames={fileNames}
              setFileNames={setFileNames}
              connectFunc={uploadVideo}
              open={open}
              setOpen={setOpen}
            />
          )}
        </Grid>

        <Grid item>
          <div className={classes.gridListContainer}>
            {videos.length === 0 && !fileNames && (
              <Typography>There is no content yet</Typography>
            )}
            <GridList
              cols={matchesXS ? 1.5 : videos.length <= 1 ? 2 : 2.5}
              className={classes.gridList}
            >
              {/* display uploaded video */}
              {fileNames && (
                <GridList cols={1}>
                  <video controls muted>
                    <source type="video/mp4" src={fileNames.file} alt="title" />
                  </video>
                </GridList>
              )}

              {videos.length !== 0 &&
                videos.slice(0, 6).map((video) => (
                  <GridListTile key={video.id} cols={1}>
                    <video controls muted>
                      <source
                        type="video/mp4"
                        src={video.s3url}
                        alt={video.title}
                      />
                    </video>
                  </GridListTile>
                ))}
            </GridList>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default VideoGallery;
