import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { actions as employerActions } from '@store/employer';
import { bindActionCreators } from 'redux';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { getUser, getFilterID } from '@helpers/auth-helpers';
import SearchForm from '../form/SearchForm';

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: '5rem',
  },
  companyName: {
    border: `1px solid ${theme.palette.grey[200]}`,
    boxShadow: `0px 7px 8px -4px rgba(96,152,224,0.2),0px 12px 17px 2px rgba(96,152,224,0.14),0px 5px 22px 4px rgba(96,152,224,0.12)`,
    padding: '1.8rem 3rem',
    marginTop: '1rem',
    marginBottom: '3rem',
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
  accountButton: {
    marginLeft: '1rem',
  },
  dialog: {
    marginTop: '5rem',
    zIndex: 1303, // larger than header and footer
  },
  filterTitleContainer: {
    marginTop: '2rem',
    marginBottom: '0.5rem',
  },
  filterButttonContainer: {
    marginTop: '0.5rem',
  },
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
        <Typography variant="h6" color="secondary">
          YOUR SAVED SEARCH FILTER
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="caption" component="div">
          Click the button to use the saved filter for your employee search.
        </Typography>
        <Typography variant="caption" component="div">
          If you want to create a new filter. Click NEW FILTER above.
        </Typography>
      </Grid>

      <Grid item>
        <Grid
          container
          className={classes.filterButttonContainer}
          spacing={1}
          justify="center"
        >
          {searchQueries.map((searchQuery, i) => (
            <Grid item key={searchQuery._id}>
              <Button
                type="submit"
                variant="outlined"
                color="secondary"
                size="small"
                startIcon={<SearchOutlinedIcon />}
                id={searchQuery._id}
                onClick={(e) => handleSubmit(e, i)}
              >
                {searchQuery.name}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );

  return (
    <Container className={classes.container}>
      <Grid container direction="column" alignItems="center">
        {name && (
          <Grid item className={classes.companyName}>
            <Typography variant="h1">{name}</Typography>
          </Grid>
        )}

        <Grid item>
          {/* only signed employer can see the button  - need to check later */}
          {localStorage.role === 'employer' ? (
            <Grid container>
              <Grid item>
                <Button
                  onClick={clickFormOpen}
                  variant="contained"
                  color="primary"
                  className={classes.searchButton}
                >
                  {searchQueries.length === 0
                    ? 'Create search filter'
                    : 'New Filter'}
                </Button>
                <Dialog
                  open={openSearchForm}
                  onClose={clickFormClose}
                  aria-labelledby="dialog-title"
                  fullWidth
                  className={classes.dialog}
                >
                  <SearchForm
                    employerId={employer._id}
                    // history={history}
                    slug={user.slug}
                    setOpenSearchForm={setOpenSearchForm}
                  />
                </Dialog>
              </Grid>

              <Grid item>
                {/* Employer account page */}
                <Button
                  component={Link}
                  to={`/employers/${user.slug}/account`}
                  variant="outlined"
                  color="primary"
                  className={classes.accountButton}
                >
                  Account
                </Button>
              </Grid>
            </Grid>
          ) : (
              ''
            )}
        </Grid>
        {queryButton}
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

