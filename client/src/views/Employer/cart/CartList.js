import React, { useEffect, useState } from 'react';
import { DataGrid, selectionStateSelector } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Card, CardContent, Grid, Box } from '@material-ui/core';
import { actions as employerActions } from '@store/employer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUser, getFilterID } from '@helpers/auth-helpers';
import Payment from './Payment';
import ChargeBalance from './ChargeBalance';
const useStyles = makeStyles(theme => ({
  container: {
    maxWidth: 1200,
    marginBottom: '2rem'
  },
  cartContainer: {
    borderRadius: '0px',
  },
  isSelected: {
    background: theme.palette.common.hover_white,
    borderLeft: '4px solid green'
  },
  cartContent: {
    height: 75,
    cursor: 'pointer',
    '&:hover': {
      background: theme.palette.common.hover_white,
    },
    '&:selected': {
      background: theme.palette.common.hover_white
    }
  },
  flexR: {
    width: '100%',
    textAlign: 'right',
    marginRight: '30px'
  },
  headerTitle: {
    height: 70,
    width: '100%',
    background: 'white',
    fontWeight: 600,
    fontSize: 20,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '2rem',
    marginBottom: '1rem'
  }
}))

const CartList = (props) => {
  const classes = useStyles();
  const { actions, cartItems, freeNum } = props;
  const user = JSON.parse(getUser());
  const filterID = getFilterID();
  const [isSelected, setIsSelected] = useState([]);
  const [selCount, setSelCount] = useState(0);

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
    let selCount = 0
    isSelected.forEach(item => {
      if (item)
        selCount++;
    })
    setSelCount(selCount)
  }

  return (
    <Container width="sm" className={classes.container}>
      <Grid item container xs={12} md={12}>
        <Grid item xs={12}>
          <Box className={classes.headerTitle}>
            <Box>
              EMPLOYEE PROFILES: {selCount}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          {
            cartItems.map((cart, key) => (
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
                            {cart.employeeskill.shift.map((sh, key) =>
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
            ))
          }
          {
            !cartItems.length > 0 &&
            <Box >
              There is no data
          </Box>
          }
          <Grid item xs={12}>
            <ChargeBalance actions={actions}/>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Payment items={cartItems} selected={isSelected} />
        </Grid>
      </Grid>
    </Container >
  );
}

const mapStateToProps = ({ employer: { cartItems, freeNum } }) => ({
  cartItems, freeNum
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...employerActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartList);
