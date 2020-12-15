import React from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Grid, Button, Box } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { getUser, getFilterID, setReturnPage } from "@helpers/auth-helpers";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  itemsContainer: {
    borderRadius: "0px",
    marginTop: "0.5rem",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "2.5rem",
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: 0,
    },
  },
  wrapper: {
    borderRadius: "0px",
    borderBottom: `1px solid ${theme.palette.common.white}`,
    cursor: "pointer",
    color: "gray",
    "&:hover": {
      background: theme.palette.common.hover_white,
      "& $button": {
        color: theme.palette.common.green,
      },
    },
  },
  subtitle: {
    color: "gray",
    fontSize: "0.875rem",
    minWidth: "5rem",
    fontWeight: 600,
    [theme.breakpoints.down("sm")]: {
      textAlign: "left",
    },
  },
  itemSpan: {
    paddingRight: "0.5rem",
  },
  buttonContainer: {
    padding: "0 20px 10px 30px",
    marginLeft: "auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "fit-content",
    float: "right",
  },
  viewMore: {
    marginLeft: "1rem",
    color: theme.palette.common.blue,
  },
  button: {
    cursor: "pointer",
    color: "#222222",
    textDecoration: "none",
    fontSize: "1.1rem",
    fontWeight: 600,
    fontFamily: "Nunito sans",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  cartButtons: {
    display: "flex",
  },
  dataSection: {
    marginLeft: "1rem",
    width: "100%",
  },
  avatar: {
    width: "60px",
    height: "60px",
  },
  cartContent: {
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      padding: "0.5rem",
    },
  },
  icon: {
    width: "1rem",
    height: "1rem",
  },
  checkIcon: {
    color: "#14bff4",
    display: "flex",
    paddingLeft: "15px",
    fontWeight: 600,
    alignItems: "center",
  },
}));
const CandidateList = (props) => {
  const {
    primaryJob,
    shift,
    style,
    cuisine,
    // wineKnowledge, cocktailKnowledge, systems
  } = props.result.employeeskill;
  // const key = props.result._id;
  const id = props.result._id;
  const {
    purchased,
    incart,
    employeeId,
    employeeimg,
    firstName,
    lastName,
  } = props.result;
  const { actions, purchasedEmployees } = props;
  const classes = useStyles();
  // Media Query - screen smaller than small breakpoints
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const user = JSON.parse(getUser());
  const filterID = getFilterID();
  const history = useHistory();
  const addToCart = () => {
    let data = {
      id: user._id,
      filterID: filterID,
      employeeID: id,
    };
    actions.addToCartRequest(data);
  };

  return (
    <Card key={id} className={classes.wrapper}>
      <CardContent className={classes.cartContent}>
        <Box>
          <Avatar
            alt="M"
            src={employeeimg && employeeimg[0] && employeeimg[0].photo.url}
            className={classes.avatar}
          />
        </Box>
        <Box className={classes.dataSection}>
          <Grid item container xs={12}>
            <Grid item xs={12} sm={6} style={{ display: "flex" }}>
              <Typography variant="h6" color="primary">
                <Link
                  to={{
                    pathname: `/candidate/${id}`,
                    data: { professionId: id, employeeId },
                  }}
                  className={classes.button}
                >
                  {purchased ? (
                    <>
                      {firstName} {lastName}
                    </>
                  ) : (
                    <>EmployeezNow Candidate</>
                  )}
                </Link>
              </Typography>
            </Grid>
          </Grid>
          <Grid container direction="column" className={classes.itemsContainer}>
            <Grid item>
              {primaryJob ? (
                <Grid container>
                  <Grid item>
                    <Typography className={classes.subtitle}>
                      Primary:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">
                      {primaryJob.title} for {primaryJob.years} years
                    </Typography>
                  </Grid>
                </Grid>
              ) : (
                ""
              )}
            </Grid>

            <Grid item>
              {shift.length !== 0 ? (
                <Grid container>
                  <Grid item>
                    <Typography className={classes.subtitle}>Shift:</Typography>
                  </Grid>
                  {shift.map((sh, i) => (
                    <Grid item key={`${sh}${i}`}>
                      <Typography
                        component="span"
                        variant="body2"
                        key={sh}
                        className={classes.itemSpan}
                      >
                        {sh}
                        {i !== shift.length - 1 ? "," : ""}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                ""
              )}
            </Grid>
            {style.length !== 0 ? (
              <Grid item>
                <Grid container>
                  <Grid item>
                    <Typography className={classes.subtitle}>Style:</Typography>
                  </Grid>
                  <Grid item>
                    <Grid
                      item
                      container
                      direction={matchesSM ? "column" : "row"}
                    >
                      {style.slice(0, 2).map((st, i) => (
                        <Grid item key={st._id}>
                          <Typography
                            variant="body2"
                            className={classes.itemSpan}
                          >
                            {st.type} for {st.years} years
                            {i !== style.length - 1 ? "," : ""}
                          </Typography>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              ""
            )}
            {cuisine.length !== 0 ? (
              <Grid item>
                <Grid container>
                  <Grid item>
                    <Typography className={classes.subtitle}>
                      Cuisine:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Grid
                      item
                      container
                      direction={matchesSM ? "column" : "row"}
                    >
                      {cuisine.slice(0, 2).map((cu, i) => (
                        <Grid item key={cu._id}>
                          <Typography
                            variant="body2"
                            className={classes.itemSpan}
                          >
                            {cu.type} for {cu.years} years
                            {i !== cuisine.length - 1 ? "," : ""}
                          </Typography>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              ""
            )}
          </Grid>
        </Box>
      </CardContent>

      {/* Link to candidtate details page */}
      <Grid item xs={12}>
        {purchased && (
          <Box className={classes.checkIcon}>
            <CheckCircleIcon className={classes.icon} /> &nbsp;&nbsp;&nbsp;
            <span style={{ color: "gray" }}>Purchased</span>
          </Box>
        )}
        <div className={classes.buttonContainer}>
          <Box className={classes.cartButtons}>
            {!purchased && incart && (
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                onClick={(e) => history.push("/carts")}
              >
                In Cart
              </Button>
            )}
            {!purchased && !incart && !purchasedEmployees && (
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                onClick={addToCart}
              >
                <ShoppingCartIcon />
                Add To Cart
              </Button>
            )}
            <Button
              size="small"
              onClick={(e) => {
                history.push(`/candidate/${id}`);
              }}
              className={classes.viewMore}
            >
              View
            </Button>
          </Box>
        </div>
      </Grid>
    </Card>
  );
};

export default CandidateList;
