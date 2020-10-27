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
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import DraftsIcon from '@material-ui/icons/Drafts';
import InboxIcon from '@material-ui/icons/Inbox';
import Checkbox from '@material-ui/core/Checkbox';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { actions as employerActions } from '@store/employer';
import { bindActionCreators } from 'redux';
import { getUser } from '@helpers/auth-helpers';
import { connect } from 'react-redux';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';

const useStyles = makeStyles((theme) => ({}));

const Sidebar = ({ searchQuery, mobileOpen, setMobileOpen, actions, slug, setFilterUpdate }) => {
  const classes = useStyles();
  const theme = useTheme();
  const user = JSON.parse(getUser());
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  const onFilterClick = (id) => {
    const searchData = {
      filterID: id,
      id: user._id
    }
    actions.searchEmployee(searchData)
  }

  console.log(slug, "slug--")
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
          <ListItem button onClick={e => onFilterClick(searchQuery._id)}>
            <ListItemText primary={searchQuery.name} secondary={searchQuery._id === slug ? "Current Filter" : ""} />
            <ListItemIcon>
              <EditOutlinedIcon onClick={e => setFilterUpdate(searchQuery)} />
              <DeleteIcon />
            </ListItemIcon>
          </ListItem>
        )}
      </List>
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
