import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ReplayIcon from "@material-ui/icons/Replay";
import { actions as employerActions } from "@store/employer";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { getFilterID, getUser } from "@helpers/auth-helpers";
import { Typography, Box } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    textAlign: "center",
    marginTop: "2rem",
    marginBottom: "2rem",
  },
  button_explanation: {
    padding: "1rem",
  },
  button: {
    fontSize: "0.8rem",
    padding: "0.3rem 1.5rem",
    transition: "0.2s",
    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: theme.shadows[1],
      backgroundColor: "transparent",
      color: theme.palette.secondary.main,
      border: `1px solid ${theme.palette.secondary.main}`,

      "&::after": {
        transform: "scaleX(1.4) scaleY(1.6)",
        opacity: 0,
      },

      //focus for button
      "&:focus": {
        outline: "none", //for button element
        transform: "translateY(-1px)",
        boxShadow: "0 .5rem 1rem rgba(black,.2)",
      },
    },
  },
  cartButtons: {
    marginTop: "2rem",
  },
  button1: {
    border: `1px solid ${theme.palette.secondary.main}`,
    color: theme.palette.secondary.main,
    marginLeft: "1rem",
  },
  button2: {
    border: `1px solid ${theme.palette.secondary.main}`,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    marginLeft: "1rem",
  },
}));

// Only employer can access
const CallToAction = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const filterID = getFilterID();
  const user = JSON.parse(getUser());
  const {
    actions,
    onAskInterest,
    purchaseProfile,
    purchased,
    incart,
    purchasedEmployees,
    id,
  } = props;

  const backToFilter = () => {
    history.goBack();
  };

  const addToCart = () => {
    let data = {
      id: user._id,
      filterID: filterID,
      employeeID: id,
    };
    actions.addToCartRequest(data);
  };

  console.log(incart, "incart");
  return (
    <Grid container justify="space-evenly">
      {!purchased && (
        <Grid item className={classes.buttonContainer} xs={12} sm={4}>
          <Button
            className={`${classes.button} ${classes.button1}`}
            onClick={purchaseProfile}
          >
            PURCHASE THIS PROFILE
          </Button>
          <Typography className={classes.button_explanation}>
            Purchasing profiles will provide the candidate’s full contact
            information to take the next step in the hiring process
          </Typography>
        </Grid>
      )}
      {!purchased && (
        <Grid item className={classes.buttonContainer} xs={12} sm={4}>
          <Button
            className={`${classes.button} ${classes.button2}`}
            onClick={onAskInterest}
          >
            ASK ABOUT INTEREST
          </Button>
          <Typography className={classes.button_explanation}>
            We will message this candidate to find out if they would be
            interested in your employment opportunity. You will receive an email
            with their answer!
          </Typography>
        </Grid>
      )}
      <Grid item className={classes.buttonContainer} xs={12} sm={4}>
        <Button
          className={`${classes.button} ${classes.button1}`}
          onClick={backToFilter}
        >
          <ReplayIcon /> Return
        </Button>
        <Box className={classes.cartButtons}>
          {!purchased && incart && (
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              className={`${classes.button} ${classes.button1}`}
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
              className={`${classes.button} ${classes.button1}`}
            >
              <ShoppingCartIcon />
              Add To Cart
            </Button>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = ({
  employer: { employerData, filter, searchLoading, filterResult, filterID },
}) => ({ employerData, filter, searchLoading, filterResult, filterID });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...employerActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CallToAction);
