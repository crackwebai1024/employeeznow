import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Grid, Box, Button, Typography } from "@material-ui/core";
import { actions as employerActions } from "@store/employer";
import { bindActionCreators } from "redux";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import { getUser, setFilterID } from "@helpers/auth-helpers";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import EmailIcon from "@material-ui/icons/Email";
import LanguageIcon from "@material-ui/icons/Language";
import PhoneIcon from "@material-ui/icons/Phone";
import PersonIcon from "@material-ui/icons/Person";
import ContactMailIcon from "@material-ui/icons/ContactMail";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: "5rem",
    marginBottom: "5rem",
  },
  hr: {
    width: "90%",
    margin: "auto",
    marginTop: "2rem",
    border: `1px solid ${theme.palette.grey[200]}`,
  },
  companyName: {
    border: `1px solid ${theme.palette.grey[200]}`,
    textAlign: "center",
    margin: "0.5rem",
    cursor: "pointer",
    padding: "1rem 3rem",
    width: "fit-content",
    margin: "auto",
  },

  title: {
    marginTop: "3rem",
    marginBottom: "0.5rem",
  },
  generalEmail: {
    marginTop: "0.5rem",
    paddingBottom: "0.5rem",
    display: "flex",
  },
  link: {
    color: theme.palette.common.black,
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.common.darkBlue,
    },
    "&:visited": {
      color: theme.palette.common.black,
      textDecoration: "none",
    },
  },
  leftSection: {
    background: theme.palette.common.white,
    boxShadow: "0 0 4px 0 rgba(0,0,0,.08), 0 2px 4px 0 rgba(0,0,0,.12)",
    padding: "2rem",
  },
  subWrapper: {
    width: "fit-content",
    margin: "auto",
  },
  accountButton: {
    width: "200px",
    marginTop: "2rem",
  },
  // dialog: {
  //   marginTop: '5rem',
  //   zIndex: 1303, // larger than header and footer
  // },
  filterTitleContainer: {
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
  },
  filterTitle: {
    textAlign: "center",
  },
  filterButttonContainer: {
    marginTop: "0.5rem",
  },
  rightSection: {
    width: "260px",
    paddingTop: "2rem",
    boxShadow: "0 0 4px 0 rgba(0,0,0,.08), 0 2px 4px 0 rgba(0,0,0,.12)",
    float: "right",
    background: theme.palette.common.white,
    paddingBottom: "2rem",
    [theme.breakpoints.down("sm")]: {
      float: "left",
      width: "100%",
    },
  },
  center: {
    textAlign: "center",
  },
  // description: {
  //   textAlign: 'center',
  //   fontSize: '12rem'
  // },
  filterIcon: {
    position: "relative",
    top: "0.5rem",
    margin: "0 0.5rem 0 0.5rem",
  },
  col_center: {
    display: "flex",
    alignItems: "center",
    paddingRight: "1rem",
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
}));

const DashboardEmployer = ({ employerData, actions, filter }) => {
  const classes = useStyles();
  const [searchQueries, setSearchQueries] = useState([]);
  const {
    name,
    address,
    generalEmail,
    website,
    firstName,
    lastName,
    title,
    phone,
    email,
  } = employerData;

  const user = JSON.parse(getUser());
  const history = useHistory();

  useEffect(() => {
    let data = {
      id: user._id,
    };
    actions.getEmployerData(data);
    actions.getFilterListRequest(data);
  }, []);

  useEffect(() => {
    if (filter) {
      setSearchQueries([...filter.filters]);
    }
  }, [filter]);

  // search professions with saved search query
  const handleSubmit = (e, index) => {
    e.preventDefault();
    const formData = searchQueries[index];
    setFilterID(formData._id);
    history.push(`/search/${formData._id}`);
  };

  // Render search query button
  const queryButton = searchQueries.length !== 0 && (
    <>
      <Grid item className={classes.filterTitleContainer}>
        <Typography
          variant="h6"
          color="secondary"
          className={classes.filterTitle}
        >
          MY FILTERS
        </Typography>
      </Grid>

      <Grid item>
        <Grid
          container
          className={classes.filterButttonContainer}
          justify="center"
        >
          {searchQueries.map((searchQuery, i) => (
            <li
              item
              key={searchQuery._id}
              onClick={(e) => handleSubmit(e, i)}
              className={classes.filterList}
            >
              <Typography>
                <SearchOutlinedIcon className={classes.filterIcon} />{" "}
                {searchQuery.name}
              </Typography>
            </li>
          ))}
        </Grid>
      </Grid>
    </>
  );

  return (
    <Container width="sm" className={classes.container}>
      <Grid container justify="center" spacing={4}>
        <Grid item xs={12} md={4}>
          <Box className={classes.rightSection}>
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

            {queryButton}
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <Box item className={classes.leftSection}>
            {name && (
              <Grid item className={classes.companyName}>
                <Typography variant="h5">{name}</Typography>
              </Grid>
            )}
            {name && (
              <Grid container item spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box className={classes.subWrapper}>
                    <Typography variant="h6" className={classes.title}>
                      COMPANY INFORMATION
                    </Typography>
                    <Box style={{ display: "flex" }}>
                      <Box className={classes.col_center}>
                        <LocationOnIcon />
                      </Box>
                      <Box>
                        <Typography>
                          {address.street1} {address.street2}
                        </Typography>
                        <Typography>
                          {address.city} {address.state} {address.zipcode}
                        </Typography>
                      </Box>
                    </Box>

                    <Typography className={classes.generalEmail}>
                      <span className={classes.col_center}>
                        <EmailIcon />
                      </span>
                      Email: {generalEmail}
                    </Typography>

                    <Typography className={classes.generalEmail}>
                      <span className={classes.col_center}>
                        <LanguageIcon />
                      </span>
                      Website:{" "}
                      <a
                        href="{website}"
                        target="_blank"
                        className={classes.link}
                      >
                        {website}
                      </a>
                    </Typography>

                    <Typography className={classes.generalEmail}>
                      <span className={classes.col_center}>
                        <PhoneIcon />
                      </span>
                      Phone: {phone}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box className={classes.subWrapper}>
                    <Typography variant="h6" className={classes.title}>
                      CONTACT PERSON
                    </Typography>

                    <Typography className={classes.generalEmail}>
                      <span className={classes.col_center}>
                        <PersonIcon />
                      </span>
                      {firstName} {lastName}
                    </Typography>

                    <Typography>{title}</Typography>
                    <Typography className={classes.generalEmail}>
                      <span className={classes.col_center}>
                        <ContactMailIcon />
                      </span>
                      Email: {email}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            )}
            <Grid item xs={12} className={classes.center}>
              {/* Employer account page */}
              <Button
                component={Link}
                to={`/employers/${user.slug}/account`}
                variant="contained"
                color="secondary"
                className={classes.accountButton}
              >
                Account
              </Button>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = ({
  employer: { employerData, filter, searchLoading },
}) => ({
  employerData,
  filter,
  searchLoading,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      ...employerActions,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardEmployer);
