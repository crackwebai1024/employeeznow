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
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';

const useStyles = makeStyles((theme) => ({}));

const Sidebar = ({ searchQuery, mobileOpen, setMobileOpen }) => {
  const classes = useStyles();
  const theme = useTheme();

  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

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
            Searcn Filter
          </ListSubheader>
        }
      >
        <ListItem button>
          <ListItemIcon>
            <EditOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={searchQuery.name} secondary="current Filter" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
