import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Grid, Box, Dialog, Button, Typography } from '@material-ui/core';
import { actions as employerActions } from '@store/employer';
import { bindActionCreators } from 'redux';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { getUser, getFilterID } from '@helpers/auth-helpers';
import SearchForm from '../form/SearchForm';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: '5rem',
    marginBottom: '5rem',
  },
  companyName: {
    border: `1px solid ${theme.palette.grey[200]}`,
    textAlign: 'center',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  title: {
    marginTop: '3rem',
    marginBottom: '0.5rem',
  },
  generalEmail: {
    marginTop: '0.5rem',
  },
  link: {
    color: theme.palette.common.black,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.common.darkBlue,
    },
    '&:visited': {
      color: theme.palette.common.black,
      textDecoration: 'none',
    },
  },
  leftSection: {
    boxShadow: "0 0 4px 0 rgba(0,0,0,.08), 0 2px 4px 0 rgba(0,0,0,.12)",
    padding: '2rem'
  },
  accountButton: {
    marginLeft: '1rem',
  },
  dialog: {
    marginTop: '5rem',
    zIndex: 1303, // larger than header and footer
  },
  filterTitleContainer: {
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
  },
  filterTitle: {
    textAlign: 'center'
  },
  filterButttonContainer: {
    marginTop: '0.5rem',
  },
  rightSection: {
    maxWidth: '260px',
    width: '260px',
    boxShadow: "0 0 4px 0 rgba(0,0,0,.08), 0 2px 4px 0 rgba(0,0,0,.12)",
    float: 'right',
    paddingBottom: '2rem'
  },
  description: {
    textAlign: 'center',
    fontSize: '12rem'
  },
  filterIcon: {
    position: 'relative',
    top: "0.5rem",
    margin: '0 0.5rem 0 0.5rem'
  },
  searchButton: {
    width: '90%',
    marginLeft: '5%',
    height: '26px'
  },
  filterList: {
    width: '100%',
    listStyle: 'none',
    padding: '0.7rem 0 0.7rem 1rem',
    cursor: 'pointer',
    transition: '0.1s',
    '&:hover': {
      background: theme.palette.common.white,
      borderLeft: "solid 3px green"
    },

  }
}));

const DashboardEmployer = ({ employerData, actions, filter, searchLoading }) => {

  const classes = useStyles();
  //open dialog(modal) - sarch form modal
  const [openSearchForm, setOpenSearchForm] = useState(false);
  const [searchQueries, setSearchQueries] = useState([])
  const [employer, getEmployer] = useState({})
  const [reload, setReload] = useState(false)

  const [currentSearchId, setCurrentSearchId] = useState()

  const { name, address, generalEmail, website, firstName, lastName, title, phone, email } = employerData;

  const user = JSON.parse(getUser());
  const history = useHistory();

  useEffect(() => {
    let data = {
      id: user._id
    }
    actions.getEmployerData(data);
    actions.getFilterListRequest(data)
  }, [])

  useEffect(() => {
    if (filter) {
      setSearchQueries(filter.filters)
      setReload(!reload)
    }
  }, [filter])

  useEffect(() => {
    if (searchLoading === "SUCCESS") {
      actions.initialLoading()
      history.push(`/search/${currentSearchId}`)
    } else if (searchLoading === "REQUEST") {

    }
  }, [searchLoading])

  //update state when open/close dialog
  const clickFormOpen = () => {
    setOpenSearchForm(true);
  };

  const clickFormClose = () => {
    setOpenSearchForm(false);
  };

  // search professions with saved search query
  const handleSubmit = (e, index) => {
    e.preventDefault();
    const formData = searchQueries[index];
    const data = {
      id: user._id,
      filterID: formData._id
    }
    setCurrentSearchId(formData._id)
    actions.searchEmployee(data)
  };

  // Render search query button
  const queryButton = searchQueries.length !== 0 && (
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
          {searchQueries.map((searchQuery, i) => (
            <li item key={searchQuery._id}
              onClick={(e) => handleSubmit(e, i)}
              className={classes.filterList}
            >
              <Typography>
                <SearchOutlinedIcon className={classes.filterIcon} /> {searchQuery.name}
              </Typography>
              {/* <Button 
                  type="submit" variant="outlined"
                  color="secondary" size="small"
                  startIcon={<SearchOutlinedIcon />}
                  id={searchQuery._id} 
                >
                  {searchQuery.name}
                </Button> */}
            </li>
          ))}
        </Grid>
      </Grid>
    </>
  );

  return (
    <Container width="sm" className={classes.container}>
      <Grid container justify="center" spacing={4}>
        <Grid item xs={12} sm={4}>
          <Box className={classes.rightSection}>
            {name && (
              <Grid item className={classes.companyName}>
                <Typography variant="h5">{name}</Typography>
              </Grid>
            )}
            <Button onClick={clickFormOpen} variant="outlined" color="secondary"
              className={classes.searchButton}
            >
              {searchQueries.length === 0
                ? 'Create search filter'
                : 'New Filter'}
            </Button>
            {queryButton}
          </Box>
        </Grid>

        <Grid item xs={12} sm={8}>
          <Box item className={classes.leftSection}>
            <Grid item>
              {/* only signed employer can see the button  - need to check later */}
              {localStorage.role === 'employer' ? (
                <Grid container>
                  <Grid item>
                    <Dialog open={openSearchForm} onClose={clickFormClose} aria-labelledby="dialog-title"
                      fullWidth className={classes.dialog}
                    >
                      <SearchForm
                        employerId={employer._id}
                        // history={history}
                        slug={user.slug}
                        setOpenSearchForm={setOpenSearchForm}
                      />
                    </Dialog>
                  </Grid>
                </Grid>
              ) : (
                  ''
                )}
            </Grid>
            {name && (
              <Grid item>
                <Typography variant="h6" className={classes.title}>
                  COMPANY INFORMATION
            </Typography>
                <Typography>
                  {address.street1} {address.street2}
                </Typography>
                <Typography>
                  {address.city} {address.state} {address.zipcode}
                </Typography>

                <Typography className={classes.generalEmail}>
                  Email: {generalEmail}
                </Typography>

                <Typography>
                  Website:{' '}
                  <a href="{website}" target="_blank" className={classes.link}>
                    {website}
                  </a>
                </Typography>

                <Typography>Phone: {phone}</Typography>

                <Typography variant="h6" className={classes.title}>
                  CONTACT PERSON
            </Typography>

                <Typography>
                  {firstName} {lastName}
                </Typography>

                <Typography>{title}</Typography>
                <Typography>Email: {email}</Typography>
              </Grid>
            )}
            <Grid item>
              {/* Employer account page */}
              <Button component={Link}
                to={`/employers/${user.slug}/account`}
                variant="outlined" color="primary" className={classes.accountButton}
              >
                Account
              </Button>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12} className={classes.description}>
          <Typography>
            Click the button to use the saved filter for your employee search.
            </Typography>
          <Typography>
            If you want to create a new filter. Click NEW FILTER above.
            </Typography>
        </Grid>

      </Grid>
    </Container>
  );
};

const mapStateToProps = ({
  employer: {
    employerData, filter, searchLoading
  },
}) => ({
  employerData, filter, searchLoading
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...employerActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardEmployer);

