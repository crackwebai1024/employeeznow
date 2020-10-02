import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Badge from '@material-ui/core/Badge';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import { loadVideos, deleteVideo } from '../../../store/actions/employeeVideo';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '8rem',
    marginBottom: '5rem',
    minHeight: 800,
  },
  gridList: {
    transform: 'translateZ(0)',
    height: 'auto',
    overflow: 'auto',

    '& img': {
      minWidth: '100%',
      minHeight: '100%',
      objectFit: 'cover',
    },
  },
  badge: {
    marginRight: '0.5rem',
  },
  title: {
    color: theme.palette.common.white,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  dialog: {
    marginTop: '5rem',
  },
  dialogImage: {
    width: '80%',
  },
  spinner: {
    ...theme.spinner,
  },
}));

const VideoGalleryDetails = ({
  location: { data },
  loadVideos,
  videos,
  deleteVideo,
  history,
  slug,
}) => {
  useEffect(() => {
    loadVideos(data.employee._id);
  }, [data.employee._id]);

  // style material-ui
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  // title for edit image title
  const [title, setTitle] = useState('');

  // pop-upped single image data
  const [currentImage, setCurrentImage] = useState({});

  // Dialog - open dropzone
  const [open, setOpen] = useState(false);
  const [oepnEdit, setOpenEdit] = useState(false);
  const [oepnDelete, setOpenDelete] = useState(false);

  // Dialog open and close - image
  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  // Dialog open and close - delete alert
  const handleEditOpen = () => {
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  // Dialog open and close - delete alert
  const handleDeleteOpen = () => {
    setOpenDelete(true);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  // Submit edit title
  const editSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      return;
    }

    // edit image title through backend
    //updatevideoTitle(title, currentImage.id, history, data.slug);
    //close all dialogs - would not necessary since it is redirect to dashboard
    handleClickClose();
    handleDeleteClose();
    handleEditClose();
  };

  const deleteSubmit = (e) => {
    e.preventDefault();
    console.log('deletesubmit');
    // delete the image through backend
    deleteVideo(currentImage.id, history, data.slug);
    // close all dialogs
    // handleClickClose();
    // handleDeleteClose();
    // handleEditClose();
  };

  // cols for grid list. nestedlooping cause rendering multiple images
  //const columns = [2, 1, 1, 2, 3, 2, 1, 1, 2, 2, 1];

  return videos.loading ? (
    <CircularProgress color="secondary" className={classes.spinner} />
  ) : (
    <Container className={classes.root}>
      <Grid container justify="space-around">
        <GridList
          cellHeight={matchesSM ? 200 : 250}
          cols={matchesXS ? 2 : videos.length === 1 ? 2 : 6}
          className={classes.gridList}
        >
          {videos.map((video, i) => (
            <GridListTile key={video.id} cols={2}>
              <video controls muted>
                <source type="video/mp4" src={video.s3url} alt={video.title} />
              </video>

              <GridListTileBar
                title={video.title}
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
                actionIcon={
                  <IconButton>
                    <Badge
                      badgeContent={4}
                      color="secondary"
                      className={classes.badge}
                    >
                      <StarBorderIcon className={classes.title} />
                    </Badge>{' '}
                    <OpenInNewIcon
                      onClick={(e) => {
                        handleClickOpen(e);
                        setCurrentImage({
                          src: video.s3url,
                          title: video.title,
                          id: video.id,
                        });
                      }}
                      className={classes.title}
                    />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </Grid>

      {/* popup - individual image, edit/delete */}
      <Dialog
        open={open}
        fullWidth
        onClose={handleClickClose}
        aria-labelledby="image-dialog"
        className={classes.dialog}
      >
        <DialogTitle>{currentImage.title}</DialogTitle>
        <DialogContent id="image-dialog">
          <video controls muted>
            <source
              type="video/mp4"
              src={currentImage.src}
              alt={currentImage.title}
              className={classes.dialogImage}
            />
          </video>
          <DialogActions>
            {/* put actual number of like in badgeConent */}
            {/* <IconButton onClick={() => addLike(currentImage.id, history, slug)}>
              <ThumbUpAltOutlinedIcon />
            </IconButton> */}
            <IconButton>
              <EditOutlinedIcon onClick={handleEditOpen} />
            </IconButton>
            <IconButton>
              <DeleteOutlineOutlinedIcon onClick={handleDeleteOpen} />
            </IconButton>
          </DialogActions>
        </DialogContent>
      </Dialog>

      {/* edit popup - edit tite */}
      {/* <Dialog
        open={oepnEdit}
        onClose={handleEditClose}
        aria-labelledby="edit-dialog"
      >
        <DialogContent id="edit-dialog">
          <Typography>Update Image Title</Typography>
          <div className={classes.inputContainer}>
            <TextField
              error={title === '' ? true : false}
              helperText={'Please add title'}
              label="Title"
              required
              color="primary"
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <DialogActions>
            <form onSubmit={(e) => editSubmit(e)}>
              <Button type="submit">Confirm</Button>
            </form>
          </DialogActions>
        </DialogContent>
      </Dialog> */}

      {/* delete popup */}
      <Dialog
        open={oepnDelete}
        onClose={handleDeleteClose}
        aria-labelledby="delete-dialog"
      >
        <DialogContent id="delete-dialog">
          <Typography>Are you sure you want to deliete the image ?</Typography>
          <DialogActions>
            <form onSubmit={(e) => deleteSubmit(e)}>
              <Button type="submit">Confirm</Button>
            </form>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    slug: state.auth.slug,
    videos: state.employeeVideo.videos,
  };
};

export default connect(mapStateToProps, {
  loadVideos,
  deleteVideo,
})(VideoGalleryDetails);
