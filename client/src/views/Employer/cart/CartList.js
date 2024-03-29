import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Card, CardContent, Grid, Box } from "@material-ui/core";
import { actions as employerActions } from "@store/employer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { getUser } from "@helpers/auth-helpers";
import RestoreFromTrashIcon from "@material-ui/icons/RestoreFromTrash";
import IconButton from "@material-ui/core/IconButton";
import Payment from "./Payment";
import ChargeBalance from "./ChargeBalance";
import LoadingCircular from "@components/LoadingCircular";

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: 1200,
    marginBottom: "2rem",
  },
  cartContainer: {
    borderRadius: "0px",
    boxShadow: "none",
    borderBottom: "1px solid lightgray",
    "&:hover": {
      background: theme.palette.common.hover_white,
    },
    "&:selected": {
      background: theme.palette.common.hover_white,
    },
  },
  shift: {
    display: "flex",
    fontSize: 16,
    color: "gray",
  },
  isSelected: {
    background: theme.palette.common.hover_white,
    height: "100%",
  },
  nodata: {
    textAlign: "center",
    fontSize: 30,
    paddingTop: "3rem",
    height: 440,
  },
  cartContent: {
    minHeight: "75px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    position: "relative",
    margin: "1rem",
  },
  flexR: {
    width: "100%",
    textAlign: "right",
    marginRight: "30px",
  },
  headerTitle: {
    // height: 70,
    padding: "1rem",
    width: "100%",
    background: "#fafafa",
    fontWeight: 600,
    fontSize: 20,
    display: "flex",
    alignItems: "center",
    paddingLeft: "2rem",
    marginBottom: "1rem",
  },
  content: {
    minHeight: "440px",
    maxHeight: "440px",
    overflowY: "auto",
    background: "#fafafa",
    position: "relative",
  },
  cartActions: {
    textAlign: "right",
    width: "100%",
  },
  employeezNowId: {
    fontSize: 18,
    fontWeight: 600,
  },
  avaliableCount: {
    float: "right",
    // width: '100%'
  },
}));

const CartList = (props) => {
  const classes = useStyles();
  const { actions, cartItems, charging } = props;
  const [freeNum, setFreeNum] = useState(0);
  const user = JSON.parse(getUser());
  const [isSelected, setIsSelected] = useState({});
  const [selCount, setSelCount] = useState(0);
  const [buyCount, setBuyCount] = useState(0);

  useEffect(() => {
    const data = {
      id: user._id,
    };
    actions.loadCartList(data);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (props.freeNum !== undefined) setFreeNum(props.freeNum);
    let selCount = 0;
    for (let select in isSelected) {
      if (isSelected[select]) {
        cartItems.forEach((cart) => {
          if (cart._id === select) selCount++;
        });
      }
    }
    setSelCount(selCount);
    if (props.freeNum - selCount >= 0) {
      setFreeNum(props.freeNum - selCount);
      setBuyCount(0);
    } else {
      setBuyCount(selCount - props.freeNum);
    }
  }, [cartItems, props.freeNum, charging]);

  const deleteCart = (key, selected) => {
    let data = {
      id: user._id,
      employeeID: cartItems[key]._id,
    };
    actions.removeCart(data);
    if (selected) setSelCount(selCount - 1);
  };

  const onItemClick = (key) => {
    isSelected[key] = !isSelected[key];
    setIsSelected(isSelected);
    let selCount = 0;
    for (let select in isSelected) {
      if (isSelected[select]) {
        cartItems.forEach((cart) => {
          if (cart._id === select) selCount++;
        });
      }
    }
    setSelCount(selCount);
    if (props.freeNum - selCount >= 0) {
      setFreeNum(props.freeNum - selCount);
      setBuyCount(0);
    } else {
      setBuyCount(selCount - props.freeNum);
    }
  };

  return (
    <Container width="sm" className={classes.container}>
      <Grid item container xs={12} md={12}>
        <Grid container item xs={12} className={classes.headerTitle}>
          <Grid item xs={12} sm={6}>
            EMPLOYEE PROFILES: {cartItems.length} / {selCount}
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={6}
            className={classes.avaliableCount}
          >
            <Grid item xs={12} md={6}>
              Available Free Count : {freeNum}
            </Grid>
            <Grid item xs={12} md={6}>
              Buy Count : {buyCount}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={8}>
          <Box className={classes.content} id="cartList">
            {charging && <LoadingCircular height="440px" />}
            {cartItems.map((cart, key) => (
              <Card
                key={`cart_${key}`}
                className={`${classes.cartContainer} ${
                  isSelected[cart._id] ? classes.isSelected : ""
                }`}
              >
                <Box className={isSelected[cart._id] ? classes.isSelected : ""}>
                  <CardContent className={classes.cartContent}>
                    <Grid>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="status"
                            checked={isSelected[cart._id] ? true : false}
                            value={isSelected[cart._id]}
                            onClick={(e) => onItemClick(cart._id)}
                          />
                        }
                        className={classes.checkboxText}
                      />
                    </Grid>
                    <Grid container item xs={12}>
                      <Grid item xs={12} className={classes.employeezNowId}>
                        ID: #{cart.employeezNowId}
                      </Grid>
                      <Grid item xs={12} className={classes.shift}>
                        {cart.employeeskill.primaryJob &&
                          "PRIMARY JOB :" +
                            cart.employeeskill.primaryJob.years +
                            "years of " +
                            cart.employeeskill.primaryJob.title}
                      </Grid>
                      <Grid item xs={12}>
                        {cart.employeeskill.shift.length > 0 && (
                          <Box className={classes.shift}>
                            SHIFT :
                            {cart.employeeskill.shift.map((sh, key) => (
                              <Box key={key}>&nbsp;&nbsp;{sh}</Box>
                            ))}
                          </Box>
                        )}
                      </Grid>
                    </Grid>
                    <Box className={classes.cartActions}>
                      <IconButton
                        className={classes.margin}
                        name="trash"
                        size="medium"
                        onClick={(e) => deleteCart(key, isSelected[key])}
                      >
                        <RestoreFromTrashIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Box>
              </Card>
            ))}
            {!cartItems.length > 0 && (
              <Box className={classes.nodata}>There is no data</Box>
            )}
          </Box>
          <Grid item xs={12}>
            <ChargeBalance actions={actions} count={selCount} />
          </Grid>
        </Grid>

        <Grid item xs={12} md={4}>
          <Payment
            items={cartItems}
            selected={isSelected}
            buyCount={buyCount}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = ({ employer: { cartItems, freeNum, charging } }) => ({
  cartItems,
  freeNum,
  charging,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...employerActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartList);
