import React, { useState } from 'react';
import { connect } from 'react-redux';
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
import { loadSearchQuery } from '../../../store/actions/searchQuery';
import {
  loadProfessions,
  searchAndSavefilterProfessions,
} from '../../../store/actions/professions';
import CandidateList from './CandidateList';
import EditSearchForm from '../form/EditSearchForm';
import Sidebar from './Sidebar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: '15rem',
      flexShrink: 0,
    },
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

const SearchResults = ({
  professions,
  count,
  employer,
  history,
  loadProfessions,
  searchQueries,
  location,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  // Drawer
  const [mobileOpen, setMobileOpen] = useState(false);

  //Swipeable drawer
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  // Media Query - screen smaller than small breakpoints
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  // Define current searchQuery - index is from action
  const currentSearchQuery = searchQueries[location.index];
  return (
    <Container className={classes.root}>
      <nav aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

        {/* visible smaller than xs */}
        <Hidden mdUp implementation="css">
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
            <Sidebar
              searchQuery={currentSearchQuery}
              setMobileOpen={setMobileOpen}
              mobileOpen={mobileOpen}
            />
          </SwipeableDrawer>
        </Hidden>

        {/* visible greater than sm */}
        <Hidden smDown implementation="css">
          {/* Fixed drawer for larger than xs */}
          <Drawer
            classes={{
              paper: classes.drawer,
            }}
            variant="permanent"
            open
          >
            <div className={classes.toolbar} />
            <Sidebar searchQuery={currentSearchQuery} />
          </Drawer>
        </Hidden>
      </nav>

      <main className={classes.content}>
        {/* <div className={classes.toolbar} /> */}

        {/* open drawer in x-small screen */}
        <Hidden mdUp implementation="css">
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
                <Typography>EMPLOYEES SEARCH </Typography>
              </Grid>
              <Grid item>{count !== null ? `total: ${count}` : 0}</Grid>
              <Grid item>page 1</Grid>
            </Grid>
          </Grid>
          <Grid item>
            {/* search results - employee lists */}
            {count
              ? professions.map((profession) => (
                  <CandidateList
                    key={profession.results._id}
                    id={profession.results._id} // This _id is professionId
                    employeezNowId={profession.results.employeezNowId}
                    employeeId={profession.results.employeeId}
                    primaryTitle={profession.results.primaryJob.title}
                    primaryYears={profession.results.primaryJob.years}
                    secondaryTitle={profession.results.secondaryJob.title}
                    secondaryYears={profession.results.secondaryJob.years}
                    shift={profession.results.shift}
                    style={profession.results.style}
                    cuisine={profession.results.cuisine}
                    wineKnowledge={profession.results.wineKnowledge}
                    cocktailKnowledge={profession.results.cocktailKnowledge}
                    systems={profession.results.systems}
                  />
                ))
              : 'There are no search results. Pleast try with different search.'}
          </Grid>
        </Grid>
      </main>
    </Container>
  );
};

const mapStateToProps = (state) => {
  console.log(state.professions);
  return {
    count: state.professions.count,
    professions: state.professions.professions,
    employer: state.employer,
    searchQueries: state.searchQueries.searchQueries,
  };
};
export default connect(mapStateToProps, {
  loadSearchQuery,
  loadProfessions,
  searchAndSavefilterProfessions,
})(SearchResults);
