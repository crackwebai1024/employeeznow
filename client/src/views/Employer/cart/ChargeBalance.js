import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import MainButton from "@components/Element/Button/MainButton";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "2rem",
  },
  topic: {
    fontSize: 30,
    textAlign: "center",
    margin: "auto",
    marginBottom: "1rem",
    marginTop: "1rem",
  },
  buyCommand: {
    fontSize: 20,
    margin: "0.5rem 0",
    textAlign: "center",
    fontWeight: 600,
  },
  details: {
    textAlign: "center",
  },
}));

const ChargeBalance = (props) => {
  const classes = useStyles();
  const { actions, count } = props;

  return (
    <>
      <Grid item container xs={12} className={classes.container}>
        <Grid container item xs={12} className={classes.buyCommand}>
          <Grid sm={12} md={8}>
            Buy Selections
          </Grid>
          <Grid sm={12} md={4}>
            {count > 0 && (
              <MainButton
                background="dodgerBlue"
                pd={10}
                fontSize={16}
                label={"Purchase"}
                width="150px"
                bd={5}
                hoverBack="#1e80ff"
                border="dodgerBlue"
                onClick={(e) => actions.getEvent("BUY_SELECT")}
                color="white"
                hoverColor="white"
              ></MainButton>
            )}
          </Grid>
        </Grid>
        <Typography className={classes.topic}>
          <i>How about adding a bundle to your cart?</i>
        </Typography>

        <Grid container item xs={12} className={classes.buyCommand}>
          <Grid xs={12} sm={12} md={8}>
            Buy 10 profiles now... Get 4 Free
          </Grid>
          <Grid xs={12} sm={12} md={4}>
            <MainButton
              background="dodgerBlue"
              pd={10}
              fontSize={16}
              label={"$89.90 Pay"}
              width="150px"
              hoverBack="#1e80ff"
              bd={5}
              border="dodgerBlue"
              onClick={(e) => actions.getEvent("BUY_10")}
              color="white"
              hoverColor="white"
            ></MainButton>
          </Grid>
        </Grid>

        <Grid container item xs={12} className={classes.buyCommand}>
          <Grid item xs={12} sm={12} md={8}>
            Buy 20 profiles now... Get 10 Free
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <MainButton
              background="dodgerBlue"
              pd={10}
              fontSize={16}
              label={"$179.80 Pay"}
              bd={5}
              width="150px"
              hoverBack="#1e80ff"
              border="dodgerBlue"
              onClick={(e) => actions.getEvent("BUY_20")}
              color="white"
              hoverColor="white"
            ></MainButton>
          </Grid>
        </Grid>

        <Grid container item xs={12} className={classes.buyCommand}>
          <Grid xs={12} sm={12} md={8}>
            Buy 50 profiles now... Get 25 Free
          </Grid>
          <Grid xs={12} sm={12} md={4}>
            <MainButton
              background="dodgerBlue"
              pd={10}
              fontSize={16}
              label={"$449.50 Pay"}
              bd={5}
              width="150px"
              hoverBack="#1e80ff"
              border="dodgerBlue"
              onClick={(e) => actions.getEvent("BUY_50")}
              color="white"
              hoverColor="white"
            ></MainButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item xs={12}>
        <Typography className={classes.details}>
          For the Lifetime Unlimited Profiles Package, Email
          Scott@EmployeezNow.com.
          <br /> The price is so low, you won’t believe it!
        </Typography>
      </Grid>
    </>
  );
};

export default ChargeBalance;
