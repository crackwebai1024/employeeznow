import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { makeStyles, useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { actions as employerActions } from '@store/employer';
import { bindActionCreators } from 'redux';
import { getUser } from '@helpers/auth-helpers';
import { connect } from 'react-redux';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginLeft: '0.5rem'
  },
  red: {
    color: 'red'
  },
  green: {
    color: 'green'
  },
  dialog: {
    borderRadius: '0px'
  }
}));

const Sidebar = ({ searchQuery, mobileOpen, setMobileOpen, actions, slug, setFilterUpdate }) => {
  const classes = useStyles();
  const theme = useTheme();
  const user = JSON.parse(getUser());
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  const [openDelete, setOpenDelete] = useState(false)
  const [removeData, setRemoveData] = useState({})

  const onFilterClick = (id) => {
    const searchData = {
      filterID: id,
      id: user._id
    }
    actions.searchEmployee(searchData)
  }

  const clickClose = () => {
    setOpenDelete(false)
  }

  const onDeleteFilter = () => {
    const removeQuery = {
      id: user._id,
      filterID: removeData._id
    }
    actions.removeFilter({ removeQuery, searchQuery })
    setOpenDelete(false)
  }

  const removeFilter = (data) => {
    setRemoveData(data)
    setOpenDelete(true)
  }

  return (
    <div>
      {matchesSM && (
        <Button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={classes.drawerButton}
        >
          <KeyboardArrowDownOutlinedIcon />
        </Button>
      )}

      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Search Filter
          </ListSubheader>
        }
      >
        {searchQuery.map((searchQuery, i) =>
          <ListItem button onClick={e => onFilterClick(searchQuery._id)} key={i}>
            <ListItemText primary={searchQuery.name} secondary={searchQuery._id === slug ? "Current Filter" : ""} />
            <ListItemIcon>
              <EditOutlinedIcon onClick={e => setFilterUpdate(searchQuery)} className={`${classes.icon} ${classes.green}`} />
              <DeleteIcon onClick={e => removeFilter(searchQuery)} className={`${classes.icon} ${classes.red}`} />
            </ListItemIcon>
          </ListItem>
        )}
      </List>
      <Dialog open={openDelete} onClose={clickClose}
        fullWidth className={classes.dialog}
      >
        <DialogTitle id="alert-dialog-title">{"Delete Search Filter"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you really delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={clickClose} color="primary" autoFocus>
            CANCEL
          </Button>
          <Button onClick={onDeleteFilter} color="primary" >
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = ({
  employer: {
    employerData, filter, searchLoading, filterResult
  },
}) => ({
  employerData, filter, searchLoading, filterResult
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...employerActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
