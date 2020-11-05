import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@material-ui/core/Container';
import { Grid, Box } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { actions as employerActions } from '@store/employer';
import { bindActionCreators } from 'redux';
import { getUser, setFilterID } from '@helpers/auth-helpers';
import professions from './data';
import SearchForm from '../form/SearchForm';
import CandidateList from './CandidateList';
import Dialog from '@material-ui/core/Dialog';
import EditSearchForm from '../form/EditSearchForm';
import FilterList from './FilterList';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '95vh',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  title: {
    fontSize: 20,
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: '15rem',
      flexShrink: 0,
    },
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
  drawerButton: {
    marginBottom: '2rem',
  },
  filterButttonContainer: {
    marginTop: '0.5rem',
  },
  toolbar: {
    ...theme.mixins.toolbar,
    marginTop: '5rem',
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
  titleContainer: {
    marginLeft: '2%',
  },
}));

const SearchResults = (props) => {
  const { actions, filter, match, filterResult, filterID, result } = props
  const classes = useStyles();
  const theme = useTheme();
  const { slug } = match.params
  const history = useHistory()

  const user = JSON.parse(getUser());
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSearchForm, setOpenSearchForm] = useState(false)
  const [searchFormData, setSearchFormdata] = useState({})

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
  }, [filterResult])

  useEffect(() => {
    if (filterID)
      history.push(`/search/${filterID}`)
    setFilterID(filterID)
  }, [filterID])

  const setFilterUpdateHandle = (data) => {
    setOpenSearchForm(true)
    setSearchFormdata(data)
  }
  console.log(filter, "searchFormData")

  // Render search query button
  const FilterLists = filter && filter.filters.length !== 0 && (
    <>
      <Grid item className={classes.filterTitleContainer}>
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
            <li item key={searchQuery._id}
              // onClick={(e) => handleSubmit(e, i)}
              className={classes.filterList}
            >
              <Typography>
                <SearchOutlinedIcon className={classes.filterIcon} /> {searchQuery.name}
              </Typography>
            </li>
          ))}
        </Grid>
      </Grid>
    </>
  );


  return (
    <Container className={classes.root}>
      <Grid container direction="column">
        <Grid container item xs={12}>
          <Grid item xs={12} sm={4}>
            <Button onClick={e => setOpenMobile(true)}>Filter</Button>
            <SwipeableDrawer
              anchor="top"
              open={openMobile}
              onClose={e => setOpenMobile(false)}
              onOpen={e => setOpenMobile(true)}
            >
              {FilterLists}
            </SwipeableDrawer>
            {/* {
              filterResult.length > 0 && filterResult.map(filter => {
                return (
                  <FilterList />
                )
              })
            } */}
          </Grid>
          <Grid item xs={12} sm={8}>
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
                : 'There are no search results. Pleast try with different search.'}
          </Grid>
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
