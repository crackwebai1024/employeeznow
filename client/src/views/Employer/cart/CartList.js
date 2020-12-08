import React, { useEffect, useState } from 'react';
import { DataGrid, selectionStateSelector } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Card, CardContent, Grid, Box } from '@material-ui/core';
import { actions as employerActions } from '@store/employer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { getUser, getFilterID } from '@helpers/auth-helpers';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import IconButton from '@material-ui/core/IconButton';
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
  shift: {
    display: 'flex',
    fontSize: 16,
    color: 'gray'
  },
  isSelected: {
    background: theme.palette.common.hover_white,
    // borderLeft: '4px solid green'
  },
  nodata: {
    textAlign: 'center',
    fontSize: 30,
    color: 'gray'
  },
  cartContent: {
    height: 75,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    position: "relative",
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
  },
  content: {
    minHeight: '300px',
    maxHeight: '300px',
    overflowY: 'scroll',
    background: 'white',
    padding: '0.5rem'
  },
  cartActions: {
    textAlign: 'right',
    width: '100%'
  },
  employeezNowId: {
    fontSize: 18,
    fontWeight: 600
  },
  avaliableCount: {
    float: 'right',
    // width: '100%'
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

  const deleteCart = (key) => {
    let data = {
      id: user._id,
      employeeID: cartItems[key]._id
    }
    actions.removeCart(data)
  }

  const onItemClick = (e, key) => {
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
              EMPLOYEE PROFILES: {cartItems.length} / {selCount}
            </Box>
            <Box className={classes.avaliableCount}>
              {/* {freeNum} */}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box className={classes.content}>
            {
              cartItems.map((cart, key) => (
                <Card key={`cart_${key}`}
                  className={classes.cartContainer}
                >
                  <Box className={isSelected[key] && classes.isSelected}>
                    <CardContent className={classes.cartContent}>
                      <Grid>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="status"
                              checked={isSelected[key] ? true : false}
                              value={isSelected[key] ? true : false}
                              onClick={e => onItemClick(e, key)}
                            />
                          }
                          className={classes.checkboxText}
                        />
                      </Grid>
                      <Grid container item xs={12}>
                        <Grid item xs={12} className={classes.employeezNowId}>
                          ID: #{cart.employeezNowId}
                        </Grid>
                        <Grid item xs={12}>
                          {
                            cart.employeeskill.shift.length > 0 &&
                            <Box className={classes.shift}>
                              SHIFT : 
                              {cart.employeeskill.shift.map((sh, key) =>
                                <Box key={key}>&nbsp;&nbsp;{sh}</Box>
                              )}
                            </Box>
                          }
                        </Grid>
                        <Grid item xs={12}>
                          {
                            // cart.employeeskill
                          }
                        </Grid>
                      </Grid>
                      <Box className={classes.cartActions}>
                        <IconButton
                          className={classes.margin}
                          name="trash"
                          size="large"
                          onClick={e => deleteCart(key)}
                        >
                          <RestoreFromTrashIcon />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Box>
                </Card>
              ))
            }
            {
              !cartItems.length > 0 &&
              <Box className={classes.nodata}>
                There is no data
              </Box>
            }
          </Box>
          <Grid item xs={12}>
            <ChargeBalance actions={actions} count={selCount} />
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
