import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Container, Button, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {

  }
}))

const ChargeBalance = (props) => {
  const classes = useStyles();
  const { actions } = props;

  return <>
    How about adding a bundle to your cart?
    <Grid item container xs={12}>
      <Grid item xs={12}>
        Buy 10 profiles now... Get 4 Free
        <Button
          onClick={e => actions.getEvent("BUY_10")}
        >
          ADD TO CART
        </Button>
      </Grid>
      <Grid item xs={12}>
        Buy 20 profiles now... Get 10 Free
        <Button
          onClick={e => actions.getEvent("BUY_20")}
        >
          ADD TO CART
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          For the
          Lifetime Unlimited Profiles Package,
          Email Scott@EmployeezNow.com. The price is
          so low, you won’t believe it!
        </Typography>
      </Grid>
    </Grid>
  </>
}

export default ChargeBalance;