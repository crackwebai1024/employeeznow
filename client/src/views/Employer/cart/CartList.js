import React, { useEffect, useState } from 'react';
import { DataGrid, selectionStateSelector } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Card, CardContent, Grid, Box } from '@material-ui/core';
import { actions as employerActions } from '@store/employer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUser, getFilterID } from '@helpers/auth-helpers';
import Payment from './Payment'

const useStyles = makeStyles(theme => ({
  container: {
    maxWidth: 1200,
    marginBottom: '2rem'
  },
  cartContainer: {
    borderRadius: '0px'
  },
  isSelected: {
    background: theme.palette.common.hover_white,
    borderLeft: '2px solid green'
  },
  cartContent: {
    cursor: 'pointer',
    '&:hover': {
      background: theme.palette.common.hover_white,
    },
    '&:selected': {
      background: theme.palette.common.hover_white
    }
  },
}))

const CartList = (props) => {
  const classes = useStyles();
  const { actions, cartItems } = props;
  const user = JSON.parse(getUser());
  const filterID = getFilterID();
  const [isSelected, setIsSelected] = useState([]);

  useEffect(() => {
    const data = {
      id: user._id,
    }
    actions.loadCartList(data)
  }, [])

  useEffect(() => {

  }, [cartItems])

  const onItemClick = (key) => {
    isSelected[key] = isSelected[key] ? false : true;
    setIsSelected([...isSelected]);
  }

  console.log(cartItems, "isSelected")
  return (
    <Container width="sm" className={classes.container}>
      <Grid item container xs={12} md={12} spacing={2}>
        <Grid item xs={12} md={8}>
          {
            cartItems.map((cart, key) => (
              // !cart.purchased ?
              <Card key={`cart_${key}`}
                className={classes.cartContainer}
                onClick={e => onItemClick(key)}
              >
                <Box className={isSelected[key] && classes.isSelected}>
                  <CardContent className={classes.cartContent}>
                    ID: #{cart.employeezNowId}
                    <Grid item container xs={12}>
                      <Grid item xs={4}>
                        {
                          cart.employeeskill.shift.length > 0 &&
                          <Box style={{ display: 'flex' }}>
                            shift
                            {cart.employeeskill.shift.map((sh,key) =>
                            <Box key={key}>&nbsp;&nbsp;{sh}</Box>
                          )}
                          </Box>
                        }
                      </Grid>
                      <Grid item xs={4}>

                      </Grid>
                      <Grid item xs={4}>

                      </Grid>
                    </Grid>
                  </CardContent>
                </Box>
              </Card>
              // : <>There is</>
            ))
          }
          {
            !cartItems.length > 0 &&
            <Box >
              There is no data
          </Box>
          }
        </Grid>
        <Grid item xs={12} md={4}>
          <Payment items={cartItems} selected={isSelected} />
        </Grid>
      </Grid>
    </Container >
  );
}

const mapStateToProps = ({ employer: { cartItems } }) => ({
  cartItems
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...employerActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartList);
