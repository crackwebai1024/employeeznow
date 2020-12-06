import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Grid, Box, Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { getUser, getFilterID } from '@helpers/auth-helpers';

const useStyles = makeStyles((theme) => ({
  itemsContainer: {
    borderRadius: '0px',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '2.5rem',
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 0,
    },
  },
  wrapper: {
    borderRadius: '0px',
    borderBottom: `1px solid ${theme.palette.common.white}`,
    cursor: 'pointer',
    transition: '0.2s',
    '&:hover': {
      background: theme.palette.common.hover_white
    }
  },
  subtitle: {
    color: theme.palette.common.blue,
    fontSize: '0.875rem',
    minWidth: '5rem',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'left',
    },
  },
  itemSpan: {
    paddingRight: '0.5rem',
  },
  buttonContainer: {
    marginLeft: 'auto',
  },
  button: {
    display: 'inline-block',
    marginRight: '2rem',
    marginBottom: '0.5rem',
    color: theme.palette.common.darkBlue,
    textDecoration: 'none',
    fontSize: '1rem',
    '&:hover': {
      color: theme.palette.common.blue,
    },
  },
  purchased: {
    background: theme.palette.common.green,
    width: 'fit-content',
    float: 'right',
    color: 'white',
    padding: '0 20px',
    borderRadius: '15px'
  }
}));
const CandidateList = (props) => {
  const {
    primaryTitle, primaryYears, secondaryTitle, secondaryYears, shift,
    style, cuisine, wineKnowledge, cocktailKnowledge, systems
  } = props.result.employeeskill
  const key = props.result._id;
  const id = props.result._id;
  const { purchased, incart, employeezNowId, employeeId } = props.result;
  const { actions } = props
  const classes = useStyles();
  // Media Query - screen smaller than small breakpoints
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const user = JSON.parse(getUser());
  const filterID = getFilterID()
  const history = useHistory()

  const addToCart = () => {
    let data = {
      id: user._id,
      filterID: filterID,
      employeeID: id
    }
    actions.addToCartRequest(data)
  }

  return (
    <Card key={id} className={classes.wrapper}>
      <CardContent>
        <Grid item container xs={12}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" color="primary">
              Candidate ID: {employeezNowId}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" color="secondary" className={classes.purchased}>
              {purchased && "purchased"}
            </Typography>
          </Grid>
        </Grid>
        <Grid container direction="column" className={classes.itemsContainer}>
          <Grid item>
            {primaryTitle ? (
              <Grid container>
                <Grid item>
                  <Typography className={classes.subtitle}>Primary:</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2">
                    {primaryTitle} for {primaryYears} years
                  </Typography>
                </Grid>
              </Grid>
            ) : (
                ''
              )}
          </Grid>

          <Grid item>
            {secondaryTitle ? (
              <Grid container>
                <Grid item>
                  <Typography className={classes.subtitle}>
                    Secondary:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2">
                    {secondaryTitle} for {secondaryYears} years
                  </Typography>
                </Grid>
              </Grid>
            ) : (
                ''
              )}
          </Grid>

          <Grid item>
            {shift ? (
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
                      {i !== shift.length - 1 ? ',' : ''}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            ) : (
                ''
              )}
          </Grid>

          <Grid item>
            <Grid container>
              <Grid item>
                <Typography className={classes.subtitle}>Style:</Typography>
              </Grid>
              <Grid item>
                <Grid item container direction={matchesSM ? 'column' : 'row'}>
                  <Grid item>
                    <Typography
                      variant="body2"
                      className={classes.itemSpan}
                    >
                      {style.type} for {style.years} years
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {cuisine.length !== 0 ? (
            <Grid item>
              <Grid container>
                <Grid item>
                  <Typography className={classes.subtitle}>Cuisine:</Typography>
                </Grid>
                <Grid item>
                  <Grid item container direction={matchesSM ? 'column' : 'row'}>
                    {cuisine.map((cu, i) => (
                      <Grid item key={cu._id}>
                        <Typography
                          variant="body2"
                          className={classes.itemSpan}
                        >
                          {cu.type} for {cu.years} years
                          {i !== cuisine.length - 1 ? ',' : ''}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : (
              ''
            )}
        </Grid>
      </CardContent>

      {/* Link to candidtate details page */}
      <CardActions>
        <div className={classes.buttonContainer}>
          <Link
            to={{
              pathname: `/candidate/${id}`,
              data: { professionId: id, employeeId },
            }}
            className={classes.button}
          >
            VIEW THIS PROFILE
          </Link>
          {incart &&
            <Button
              variant="outlined"
              color="secondary"
              onClick={e => history.push('/carts')}
            >
              In Cart
              </Button>
          }
          {!incart &&
            <Button
              variant="outlined"
              color="secondary"
              onClick={addToCart}
            >
              <ShoppingCartIcon />
            Add To Cart
          </Button>
          }
        </div>
      </CardActions>

    </Card>
  );
};

export default CandidateList;
