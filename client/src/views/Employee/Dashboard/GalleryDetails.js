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
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import {
  loadPhotos,
  updatePhotoTitle,
  deletePhoto,
  addLike,
} from '../../../store/actions/employeePhotos';

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

const GalleryDetails = ({
  location: { data },
  loadPhotos,
  photos,
  updatePhotoTitle,
  deletePhoto,
  addLike,
  history,
  slug,
}) => {
  useEffect(() => {
    loadPhotos(data.employee._id);
  }, [data.employee._id]);

  // style material-ui
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  // title for edit image title
  const [title, setTitle] = useState('');

  // pop-upped single iamge data
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
    updatePhotoTitle(title, currentImage.id, history, data.slug);
    //close all dialogs - would not necessary since it is redirect to dashboard
    handleClickClose();
    handleDeleteClose();
    handleEditClose();
  };

  const deleteSubmit = (e) => {
    e.preventDefault();
    console.log('deletesubmit');
    // delete the image through backend
    deletePhoto(currentImage.id, history, data.slug);
    // close all dialogs
    // handleClickClose();
    // handleDeleteClose();
    // handleEditClose();
  };

  // cols for grid list. nestedlooping cause rendering multiple images
  //const columns = [2, 1, 1, 2, 3, 2, 1, 1, 2, 2, 1];

  return photos.loading ? (
    <CircularProgress color="secondary" className={classes.spinner} />
  ) : (
    <Container className={classes.root}>
      <Grid container justify="space-around">
        <GridList
          cellHeight={matchesSM ? 200 : 250}
          cols={matchesXS ? 2 : photos.length === 1 ? 2 : 6}
          className={classes.gridList}
        >
          {photos.map((photo, i) => (
            <GridListTile key={photo.id} cols={2}>
              <img
                src={photo.s3url}
                alt={photo.title}
                onClick={(e) => {
                  handleClickOpen(e);
                  setCurrentImage({
                    src: photo.s3url,
                    title: photo.title,
                    id: photo.id,
                    likes: photo.likes,
                  });
                }}
              />

              <GridListTileBar
                title={photo.title}
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
                actionIcon={
                  <IconButton aria-label={`star ${photo.title}`}>
                    <Badge
                      badgeContent={!photo.likes ? 0 : photo.likes.length}
                      color="secondary"
                    >
                      <StarBorderIcon className={classes.title} />
                    </Badge>
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
          <img
            src={currentImage.src}
            alt={currentImage.title}
            className={classes.dialogImage}
          />
          <DialogActions>
            {/* put actual number of like in badgeConent */}
            <IconButton onClick={() => addLike(currentImage.id, history, slug)}>
              <ThumbUpAltOutlinedIcon />
            </IconButton>
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
      <Dialog
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
      </Dialog>

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
    photos: state.employeePhotos.photos,
  };
};

export default connect(mapStateToProps, {
  loadPhotos,
  updatePhotoTitle,
  deletePhoto,
  addLike,
})(GalleryDetails);
