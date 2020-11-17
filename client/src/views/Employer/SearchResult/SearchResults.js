import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@material-ui/core/Container';
import {
  Grid, Box, Dialog, DialogActions, DialogContent, Button,
  DialogContentText, DialogTitle, SwipeableDrawer, Typography
} from '@material-ui/core';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import { actions as employerActions } from '@store/employer';
import { bindActionCreators } from 'redux';
import { getUser, setFilterID } from '@helpers/auth-helpers';
import professions from './data';
import SearchForm from '../form/SearchForm';
import CandidateList from './CandidateList';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: '5rem',
    paddingBottom: '5rem',
  },
  title: {
    fontSize: 20,
  },
  swipeableButton: {
    width: '100%',
    background: theme.palette.common.white,
    fontSize: '20px',
    padding: '1rem',
    cursor: 'pointer',
    display: 'none',
    transition: '0.3s',
    '&:hover': {
      background: theme.palette.common.darkgray
    },
    [theme.breakpoints.down('xs')]: {
      display: "block"
    }
  },
  filterTitleContainer: {
    marginTop: '50px',
    marginBottom: '0.5rem',
  },
  filterTitle: {
    textAlign: 'center'
  },
  filterIcon: {
    position: 'relative',
    top: "0.5rem",
    margin: '0 0.5rem 0 0.5rem'
  },
  currentfilter: {
    background: "#00800010",
    borderLeft: "solid 3px green"
  },
  no_result: {
    fontSize: '20px',
    textAlign: 'center',
    paddingTop: '100px'
  },
  filterList: {
    width: '100%',
    listStyle: 'none',
    padding: '0.7rem 0 0.7rem 1rem',
    cursor: 'pointer',
    transition: '0.1s',
    '&:hover': {
      background: "#00800010",
      borderLeft: "solid 3px green"
    },
  },
  dialog: {
    marginTop: '5rem',
    zIndex: 13033, // larger than header and footer
  },
  removeIcon: {
    float: 'right',
    marginRight: '1rem',
    marginTop: "10px",
    fontSize: '20px'
  },
  editIcon: {
    float: 'right',
    marginRight: '10px',
    marginTop: '10px',
    fontSize: '20px'
  },
  drawerButton: {
    marginBottom: '2rem',
  },
  filterButttonContainer: {
    marginTop: '0.5rem',
  },
  content: {
    flexGrow: 1,
    marginLeft: '15rem', // push to right next to drawer
    padding: '2rem',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
      paddingRight: 0,
      flexGrow: 0,
      marginLeft: 0,
    },
  },
  rightSection: {
    width: '260px',
    boxShadow: "0 0 4px 0 rgba(0,0,0,.08), 0 2px 4px 0 rgba(0,0,0,.12)",
    float: 'right',
    background: theme.palette.common.white,
    marginBottom: '2rem',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.down('xs')]: {
      display: "none"
    }
  },
  leftSection: {
    alignItems: 'center',
    background: theme.palette.common.white,
    width: '100%',
    boxShadow: "0 0 4px 0 rgba(0,0,0,.08), 0 2px 4px 0 rgba(0,0,0,.12)",
    marginLeft: '2rem',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0rem'
    },
  },
  titleContainer: {
    marginLeft: '2%',
  },
  total_count: {
    marginLeft: '2rem',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0rem'
    }
  }
}));

const SearchResults = (props) => {
  const { actions, filter, match, filterResult, filterID, result } = props
  const classes = useStyles();
  const theme = useTheme();
  const { slug } = match.params
  const history = useHistory()

  const user = JSON.parse(getUser());
  const [openDelete, setOpenDelete] = useState(false)
  const [openSearchForm, setOpenSearchForm] = useState(false)
  const [searchFormData, setSearchFormdata] = useState({})
  const [removeData, setRemoveData] = useState({})

  const [searchQueries, setSearchQueries] = useState([])
  const [reload, setReload] = useState(false)
  const [openMobile, setOpenMobile] = useState(false);

  const clickFormClose = () => {
    setOpenSearchForm(false)
  }

  useEffect(() => {
    const data = { id: user._id }
    actions.getFilterListRequest(data)
    if (result) {
      const searchData = {
        filterID: slug,
      }
      return actions.getSearchResult(searchData)
    }
    const searchData = {
      ...data,
      filterID: slug,
    }
    actions.searchEmployee(searchData)
  }, [])

  useEffect(() => {
    if (filter) {
      setSearchQueries(filter.filters)
      setReload(!reload)
    }
  }, [filter])

  useEffect(() => {
    actions.initialLoading()
    console.log(filterResult)
    debugger
  }, [filterResult])

  useEffect(() => {
    if (filterID)
      history.push(`/search/${filterID}`)
    setFilterID(filterID)
  }, [filterID])

  const setFilterUpdate = (data) => {
    setOpenSearchForm(true)
    setSearchFormdata(data)
  }

  const onFilterClick = (e, id) => {
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
    const searchQuery = filter && filter.filters
    actions.removeFilter({ removeQuery, searchQuery })
    setOpenDelete(false)
  }

  const removeFilter = (data) => {
    setRemoveData(data)
    setOpenDelete(true)
  }
  // Render search query button
  const FilterLists = filter && filter.filters.length !== 0 && (
    <Box className={classes.filterTitleContainer}>
      <Grid item >
        <Typography variant="h6" color="secondary" className={classes.filterTitle}>
          SEARCH FILTERS
        </Typography>
      </Grid>

      <Grid item>
        <Grid
          container
          className={classes.filterButttonContainer}
          justify="center"
        >
          {filter.filters.map((searchQuery, i) => (
            <li key={searchQuery._id}
              onClick={e => onFilterClick(e, searchQuery._id)}
              className={`${classes.filterList} ${searchQuery._id === slug && classes.currentfilter}`}
            >
              <Typography>
                <SearchOutlinedIcon className={classes.filterIcon} /> {searchQuery.name}
                <DeleteIcon onClick={e => removeFilter(searchQuery)} className={`${classes.removeIcon}`} />
                <EditOutlinedIcon onClick={e => setFilterUpdate(searchQuery)} className={`${classes.editIcon} ${classes.green}`} />
              </Typography>
            </li>
          ))}
        </Grid>
      </Grid>
    </Box>
  );


  return (
    <Box>
      <Box>
        <Box
          onClick={e => setOpenMobile(true)}
          className={classes.swipeableButton}
        >Filter</Box>
        <SwipeableDrawer
          anchor="top"
          open={openMobile}
          onClose={e => setOpenMobile(false)}
          onOpen={e => setOpenMobile(true)}
        >
          {FilterLists}
        </SwipeableDrawer>
      </Box>
      <Container className={classes.container}>
        <Grid container justify="center">
          <Grid item sm={12} md={4}>
          </Grid>
          <Grid item sm={12} md={8}>
            <Box className={classes.total_count}>
              {filterResult.length}
            </Box>
          </Grid>
        </Grid>
        <Grid container justify="center" >
          <Grid item sm={12} md={4}>
            <Box className={classes.rightSection}>
              {FilterLists}
            </Box>
          </Grid>
          <Grid container item sm={12} md={8}>
            <Box className={classes.leftSection}>
              {
                filterResult.length > 0
                  ? filterResult.map((result) => (
                    <CandidateList
                      key={result._id}
                      id={result._id} // This _id is professionId
                      purchased={result.purchased}
                      employeezNowId={result.employeezNowId}
                      employeeId={result.employeeId}
                      primaryTitle={result.employeeskill.primaryJob.title}
                      primaryYears={result.employeeskill.primaryJob.years}
                      secondaryTitle={result.employeeskill.secondaryJob.title}
                      secondaryYears={result.employeeskill.secondaryJob.years}
                      shift={result.employeeskill.shift}
                      style={result.employeeskill.style}
                      cuisine={result.employeeskill.cuisine}
                      wineKnowledge={result.employeeskill.wineKnowledge}
                      cocktailKnowledge={result.employeeskill.cocktailKnowledge}
                      systems={result.employeeskill.systems}
                    />
                  ))
                  :
                  <Typography className={classes.no_result}>
                    There are no search results. Pleast try with different search.
                  </Typography>}
            </Box>
          </Grid>
        </Grid>
        <Dialog open={openSearchForm} onClose={clickFormClose} aria-labelledby="dialog-title"
          fullWidth className={classes.dialog}
        >
          <SearchForm employerId={user._id}
            searchFormData={searchFormData}
            slug={slug} setOpenSearchForm={setOpenSearchForm}
          />
        </Dialog>
      </Container>

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

    </Box>
  );
};

const mapStateToProps = ({
  employer: {
    employerData, filter, searchLoading, filterResult, filterID, result
  },
}) => ({
  employerData, filter, searchLoading, filterResult, filterID, result
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...employerActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
