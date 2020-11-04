import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowUpOutlinedIcon from '@material-ui/icons/KeyboardArrowUpOutlined';
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
  dialog: {
    marginTop: '5rem',
    zIndex: 13033, // larger than header and footer
  },
  drawerButton: {
    marginBottom: '2rem',
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
  // Drawer
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSearchForm, setOpenSearchForm] = useState(false)
  const [searchFormData, setSearchFormdata] = useState({})
  //Swipeable drawer
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  // Media Query - screen smaller than small breakpoints
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  // Define current searchQuery - index is from action
  // const currentSearchQuery = searchQueries[location.index];
  const [searchQueries, setSearchQueries] = useState([])
  const [reload, setReload] = useState(false)

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
  console.log(openSearchForm, "searchFormData")
  return (
    <Container className={classes.root}>
      <nav aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

        {/* visible smaller than xs */}
        <Hidden xsUp implementation="css">
          <SwipeableDrawer
            anchor="top"
            disableBackdropTransition={!iOS}
            disableDiscovery={iOS}
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            onOpen={() => setMobileOpen(true)}
            classes={{
              paper: classes.drawerMobile,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <div className={classes.toolbar} />
            {/* <Sidebar
              searchQuery={searchQueries}
              setMobileOpen={setMobileOpen}
              mobileOpen={mobileOpen}
              setFilterUpdate={setFilterUpdateHandle}
              slug={slug}
            /> */}
          </SwipeableDrawer>
        </Hidden>
      </nav>

      <main className={classes.content}>
        {/* <div className={classes.toolbar} /> */}

        {/* open drawer in x-small screen */}
        <Hidden xsUp implementation="css">
          <Button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={classes.drawerButton}
          >
            <KeyboardArrowUpOutlinedIcon />
            <Typography>FILTER</Typography>
          </Button>
        </Hidden>

        <Grid container direction="column">
          {/* header */}
          <Grid item>
            <Grid container className={classes.titleContainer}>
              <Grid item>
                <Typography className={classes.title}>EMPLOYEES SEARCH </Typography>
              </Grid>
              {/* <Grid item>{count !== null ? `total: ${count}` : 0}</Grid> */}
              {/* <Grid item>page 1</Grid> */}
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            {/* search results - employee lists */}
            <Grid item xs={12} sm={4}>
              {/* visible greater than sm */}
              <Hidden xDown implementation="css">
                {/* Fixed drawer for larger than xs */}
                <Drawer
                  classes={{
                    paper: classes.drawer,
                  }}
                  variant="permanent"
                  open
                >
                  <div className={classes.toolbar} />
                  <FilterList searchQuery={searchQueries} slug={slug} setFilterUpdate={setFilterUpdateHandle} />
                </Drawer>
              </Hidden>
            </Grid>
            <Grid item xs={12} sm={8}>
              {
                filterResult.length > 0
                  ? filterResult.map((result) => (
                    <CandidateList
                      key={result._id}
                      id={result._id} // This _id is professionId
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
      </main>
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
