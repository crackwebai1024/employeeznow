import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import Container from "@material-ui/core/Container";
import {
  Grid,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  DialogContentText,
  DialogTitle,
  SwipeableDrawer,
  Typography,
} from "@material-ui/core";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import { actions as employerActions } from "@store/employer";
import { bindActionCreators } from "redux";
import { getUser, setFilterID } from "@helpers/auth-helpers";
import SearchForm from "../form/SearchForm";
import CandidateList from "./CandidateList";
import ProfileShimmer from "@components/Element/Loading/ProfileShimmer";
import { successMessage, errorMessage } from "@helpers/utils";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingBottom: "5rem",
  },
  title: {
    fontSize: 20,
  },
  filterInfo: {
    height: 75,
    background: "white",
    float: "right",
    marginBottom: "1rem",
    width: "calc(100%)",
  },
  swipeableButton: {
    width: "100%",
    background: theme.palette.common.white,
    fontSize: "20px",
    padding: "1rem",
    cursor: "pointer",
    marginTop: "-2.5rem",
    display: "none",
    transition: "0.3s",
    "&:hover": {
      background: theme.palette.common.darkgray,
    },
    [theme.breakpoints.down("xs")]: {
      display: "block",
    },
  },
  filterTitleContainer: {
    marginTop: "50px",
    marginBottom: "0.5rem",
  },
  filterTitle: {
    textAlign: "center",
  },
  filterIcon: {
    position: "relative",
    top: "0.5rem",
    margin: "0 0.5rem 0 0.5rem",
  },
  currentfilter: {
    background: "#00800010",
    borderLeft: "solid 3px green",
  },
  center: {
    textAlign: "center",
  },
  hr: {
    width: "90%",
    margin: "auto",
    marginTop: "2rem",
    border: `1px solid ${theme.palette.grey[200]}`,
  },
  no_result: {
    fontSize: "20px",
    textAlign: "center",
    paddingTop: "100px",
  },
  filterList: {
    width: "100%",
    listStyle: "none",
    padding: "0.7rem 0 0.7rem 1rem",
    cursor: "pointer",
    transition: "0.1s",
    "&:hover": {
      background: "#00800010",
      borderLeft: "solid 3px green",
    },
  },
  dialog: {
    marginTop: "5rem",
    zIndex: 13033, // larger than header and footer
  },
  removeIcon: {
    float: "right",
    marginRight: "1rem",
    marginTop: "10px",
    fontSize: "20px",
  },
  editIcon: {
    float: "right",
    marginRight: "10px",
    marginTop: "10px",
    fontSize: "20px",
  },
  drawerButton: {
    marginBottom: "2rem",
  },
  filterButttonContainer: {
    marginTop: "0.5rem",
  },
  content: {
    flexGrow: 1,
    marginLeft: "15rem", // push to right next to drawer
    padding: "2rem",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 0,
      paddingRight: 0,
      flexGrow: 0,
      marginLeft: 0,
    },
  },
  rightSection: {
    width: "260px",
    boxShadow: "0 0 4px 0 rgba(0,0,0,.08), 0 2px 4px 0 rgba(0,0,0,.12)",
    float: "right",
    background: theme.palette.common.white,
    marginBottom: "2rem",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  leftSection: {
    alignItems: "center",
    height: "fit-content",
    background: theme.palette.common.white,
    width: "100%",
    boxShadow: "0 0 4px 0 rgba(0,0,0,.08), 0 2px 4px 0 rgba(0,0,0,.12)",
    marginLeft: "2rem",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0rem",
    },
  },
  titleContainer: {
    marginLeft: "2%",
  },
  total_count: {
    marginLeft: "2rem",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0rem",
    },
  },
  searchButton: {
    width: "90%",
    marginLeft: "5%",
    height: "26px",
    marginTop: "1rem",
  },
}));

const SearchResults = (props) => {
  const {
    actions,
    filter,
    match,
    filterResult,
    result,
    addCartSuccess,
    searchLoading,
  } = props;
  const classes = useStyles();
  const { slug } = match.params;
  const history = useHistory();

  const user = JSON.parse(getUser());
  const [openDelete, setOpenDelete] = useState(false);
  const [openSearchForm, setOpenSearchForm] = useState(false);
  const [searchFormData, setSearchFormdata] = useState({});
  const [removeData, setRemoveData] = useState({});

  const [openMobile, setOpenMobile] = useState(false);

  const clickFormClose = () => {
    setOpenSearchForm(false);
  };

  useEffect(() => {
    const data = { id: user._id };
    actions.getFilterListRequest(data);
    if (result) {
      const searchData = {
        filterID: slug,
      };
      return actions.getSearchResult(searchData);
    }
    const searchData = {
      ...data,
      filterID: slug,
    };
    actions.searchEmployee(searchData);
  }, []);

  useEffect(() => {
    if (addCartSuccess === "SUCCESS") {
      successMessage("Add to cart");
      actions.initCartSuccess();
    } else if (addCartSuccess === "FAILURE") {
      errorMessage("Add to cart failed!");
    }
  }, [addCartSuccess]);

  const setFilterUpdate = (data) => {
    setOpenSearchForm(true);
    setSearchFormdata(data);
  };

  const createNewSearch = (data) => {
    setOpenSearchForm(true);
    setSearchFormdata(undefined);
  };

  const onFilterClick = (e, id) => {
    const searchData = {
      filterID: id,
      id: user._id,
    };
    setFilterID(id);
    history.push(`/search/${id}`);
    actions.searchEmployee(searchData);
  };

  const clickClose = () => {
    setOpenDelete(false);
  };

  const onDeleteFilter = () => {
    const removeQuery = {
      id: user._id,
      filterID: removeData._id,
    };
    const searchQuery = filter && filter.filters;
    actions.removeFilter({ removeQuery, searchQuery });
    setOpenDelete(false);
  };

  const removeFilter = (data) => {
    setRemoveData(data);
    setOpenDelete(true);
  };

  // Render search query button
  const FilterLists = filter && filter.filters.length !== 0 && (
    <Box className={classes.filterTitleContainer}>
      <Grid item className={classes.center}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={(e) => history.push("/purchased")}
        >
          Purchased Employees
        </Button>
      </Grid>
      <hr className={classes.hr} />
      <Grid item>
        <Typography
          variant="h6"
          color="secondary"
          className={classes.filterTitle}
        >
          MY FILTERS
        </Typography>
      </Grid>
      <Button
        onClick={createNewSearch}
        variant="outlined"
        color="secondary"
        className={classes.searchButton}
      >
        + Create New Search
      </Button>
      <Grid item>
        <Grid
          container
          className={classes.filterButttonContainer}
          justify="center"
        >
          {filter.filters.map((searchQuery, i) => (
            <li
              key={searchQuery._id}
              onClick={(e) => onFilterClick(e, searchQuery._id)}
              className={`${classes.filterList} ${
                searchQuery._id === slug && classes.currentfilter
              }`}
            >
              <Typography>
                <SearchOutlinedIcon className={classes.filterIcon} />{" "}
                {searchQuery.name}
                <DeleteIcon
                  onClick={(e) => removeFilter(searchQuery)}
                  className={`${classes.removeIcon}`}
                />
                <EditOutlinedIcon
                  onClick={(e) => setFilterUpdate(searchQuery)}
                  className={`${classes.editIcon} ${classes.green}`}
                />
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
          onClick={(e) => setOpenMobile(true)}
          className={classes.swipeableButton}
        >
          Filter
        </Box>
        <SwipeableDrawer
          anchor="top"
          open={openMobile}
          onClose={(e) => setOpenMobile(false)}
          onOpen={(e) => setOpenMobile(true)}
        >
          {FilterLists}
        </SwipeableDrawer>
      </Box>
      <Container className={classes.container}>
        <Grid item container justify="center">
          {/* <Grid item xs ={4}></Grid> */}
          <Grid item xs={12}>
            {/* <Box className={classes.filterInfo}>

            </Box> */}
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Grid item sm={12} md={4}>
            <Box className={classes.rightSection}>{FilterLists}</Box>
          </Grid>
          <Grid container item sm={12} md={8}>
            <Box className={classes.leftSection}>
              {searchLoading === "REQUEST" ? (
                <Box>
                  <ProfileShimmer />
                  <ProfileShimmer />
                </Box>
              ) : filterResult.length > 0 ? (
                filterResult.map((result) => (
                  <CandidateList actions={actions} result={result} />
                ))
              ) : (
                <Typography className={classes.no_result}>
                  There is no search result. Pleast try with different search.
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
        <Dialog
          open={openSearchForm}
          onClose={clickFormClose}
          aria-labelledby="dialog-title"
          fullWidth
          className={classes.dialog}
        >
          <SearchForm
            employerId={user._id}
            searchFormData={searchFormData}
            slug={slug}
            setOpenSearchForm={setOpenSearchForm}
          />
        </Dialog>
      </Container>

      <Dialog
        open={openDelete}
        onClose={clickClose}
        fullWidth
        className={classes.dialog}
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Search Filter"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you really delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={clickClose} color="primary" autoFocus>
            CANCEL
          </Button>
          <Button onClick={onDeleteFilter} color="primary">
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const mapStateToProps = ({
  employer: {
    employerData,
    filter,
    searchLoading,
    filterResult,
    result,
    addCartSuccess,
  },
}) => ({
  employerData,
  filter,
  searchLoading,
  filterResult,
  result,
  addCartSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      ...employerActions,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
