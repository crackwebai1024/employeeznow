import React, { useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Card, CardContent, Typography, CardActionArea } from '@material-ui/core';
import { actions as employerActions } from '@store/employer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUser, getFilterID } from '@helpers/auth-helpers';

const useStyles = makeStyles(theme => ({
  container: {
    maxWidth: 600,
    marginBottom: '2rem'
  },
  cartContainer: {
    borderRadius: '0px'
  }
}))

const CartList = (props) => {
  const classes = useStyles();
  const { actions, cartItems } = props;
  const user = JSON.parse(getUser());
  const filterID = getFilterID();

  useEffect(() => {
    const data = {
      id: user._id,
    }
    actions.loadCartList(data)
  }, [])

  useEffect(() => {
    console.log(cartItems, "cartItems")
  }, [cartItems])

  console.log(cartItems)
  return (
    <Container width="sm" className={classes.container}>
      {
        cartItems.map(cart => (
          !cart.purchased ?
          <Card className={classes.cartContainer}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Lizard
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                  across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card> : <></>
        ))
      }
    </Container>
  );
}

const mapStateToProps = ({ employer: { cartItems } }) => ({
  cartItems
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...employerActions }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartList);