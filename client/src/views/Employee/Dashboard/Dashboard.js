import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AccordionActions, Container } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import Collapse from '@material-ui/core/Collapse';
import { getUser } from '@helpers/auth-helpers';
import { connect } from 'react-redux';
import { actions as employeeActions } from '@store/employee';
import { bindActionCreators } from 'redux';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import clsx from 'clsx';
import _ from 'lodash';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ProfilePhoto from './ProfilePhoto';
import { Link } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import image from '@assets/back.jpg'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: 'white'
  },
  container: {
    width: 1100,
  },
  header: {
    background: 'white',
    paddingBottom: '1rem',
    marginBottom: '1rem',
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    margin: theme.spacing(1),
    background: theme.palette.common.blue,
  },
  profilePhoto: {
    width: 100,
    textAlign: 'center',
    marginLeft: '3rem',
    marginTop: -100,
    padding: 0,
    cursor: "pointer"
  },
  gridList: {
    height: 300,
    overflow: "hidden",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background: 'none'
  },
  name: {
    marginLeft: '1rem',
    width: '100%',
    color: 'RGB(23,41, 64)',
    fontSize: '2rem',
    fontWeight: 600
  },
  icon: {
    color: 'RGB(23,41, 64)',
    background: 'white',
    top: "10px",
    margin: "10px",
    '&:hover': {
      background: "white",
    },
  },
  section: {
    color: 'RGB(23,41, 64)',
    marginBottom: 20,
    paddingBottom: 0,
    borderRadius: '0px'
  },
  accountButton: {
    color: theme.palette.common.blue,
    borderColor: theme.palette.common.blue,
    marginLeft: 50
  },
  button: {
    color: theme.palette.common.blue,
    borderColor: theme.palette.common.blue,
  },
  moreSkills: {
    background: "RGB(245, 245, 245)"
  },
  card: {
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
  }
}));

function Dashboard(props) {
  const { actions, employeeData } = props
  const user = JSON.parse(getUser())
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    let data = {
      id: user._id
    }
    actions.getUserDataRequest(data)
  }, [])

  // const theme = useTheme();
  // const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
  return (
    !_.isEmpty(employeeData) ?
      <Fragment>
        <Container className={classes.container}>
          <Grid className={classes.header}>
            <GridList cellHeight={200} spacing={1} className={classes.gridList}>
              <GridListTile cols={2} rows={2}>
                <img src={image} alt="alt" classes />
                <GridListTileBar
                  title=""
                  titlePosition="top"
                  actionIcon={
                    <IconButton aria-label={`star Morning`} className={classes.icon}>
                      <CameraAltIcon />
                    </IconButton>
                  }
                  actionPosition="right"
                  className={classes.titleBar}
                />
              </GridListTile>
            </GridList>
            <Grid className={classes.profilePhoto}>
              <ProfilePhoto />
            </Grid>
            <Grid className={classes.section}>
              <Grid className={classes.name}>
                {employeeData.basic &&
                  employeeData.basic.lastName + " " + employeeData.basic.firstName
                }
                <Button
                  component={Link}
                  to={`/employee/${user && user.slug}/account`}
                  variant="outlined"
                  size="small"
                  className={classes.accountButton}
                >
                  Account
              </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid className={classes.section}>
            <Card className={classes.section}>
              <CardHeader
                action={
                  <Button
                    component={Link}
                    to={`/skills`}
                    variant="outlined"
                    size="small"
                    className={classes.button}
                  >
                    {employeeData.skill ? "Update Skills" : "Add Skills"}
                  </Button>
                }
                title="Skills"
                subheader=""
              />
              <CardContent>
                <Grid container spacing={3}>

                </Grid>
                <Grid item xs={12}>
                  <CardActions>
                    <IconButton
                      className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                      })}
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </CardActions>
                </Grid>
              </CardContent>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent className={classes.moreSkills}>
                  <Typography>
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>

          <Grid className={classes.section}>
            <Card className={classes.section}>
              <CardHeader
                action={
                  <Button
                    component={Link}
                    to={`/professiondetails-form`}
                    variant="outlined"
                    size="small"
                    className={classes.button}
                  >
                    {employeeData.preference ? "Update Personal Preference" : "Add Personal Preference"}
                  </Button>
                }
                title="Personal Preference"
                subheader=""
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {employeeData.preference &&
                    employeeData.preference.employee
                  }
                  {/* "preference": {
        "idealSalary": {
            "amount": 25,
            "unit": "hourly"
        },
        "planningToMove": {
            "planning": false,
            "location": "seatle",
            "dateToMove": "2020-09-11T16:00:00.000Z"
        },
        "newOpportunity": {
            "availability": true,
            "title": "Director of Ops"
        },
        "veteran": {
            "status": true,
            "veteranId": "68797980"
        },
        "randomShift": true,
        "randomShiftRole": [
            "Line Cook AM",
            "Barback"
        ],
        "_id": "5f750f6190dcaa40b8b3981c",
        "employee": "5f6e2b06014b084f7496ecf9",
        "createdAt": "2020-09-30T23:06:09.886Z",
        "__v": 1,
        "employmentStatus": "Unemployed and looking for" */}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid className={classes.section}>
            <Card className={classes.section}>
              <CardHeader
                action={
                  <Button
                    component={Link}
                    to={`/work-experience`}
                    variant="outlined"
                    size="small"
                    className={classes.button}
                  >
                    {employeeData.experience ? "Update My Work Experience" : "Add My Work Experience"}
                    
              </Button>
                }
                title="Work Experience"
                subheader=""
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {employeeData.experience && employeeData.experience.employee}
                {/* "experience": {
        "primaryJob": {
            "current": false,
            "company": "EmployeezNow",
            "address": "seatle",
            "title": "fullstack web developer",
            "startDate": "1990-06-25T15:00:00.000Z",
            "endDate": "1994-07-30T16:00:00.000Z"
        },
        "secondaryJob": {
            "company": "Employeess",
            "address": "seatle",
            "title": "fullstack web developer",
            "startDate": "1990-06-25T15:00:00.000Z",
            "endDate": "1994-07-30T16:00:00.000Z"
        },
        "_id": "5f750b6590dcaa40b8b39819",
        "employee": "5f6e2b06014b084f7496ecf9",
        "otherJob": [
            {
                "_id": "5f750e0e90dcaa40b8b3981a",
                "company": "EmployeezNow",
                "address": "seatle",
                "title": "fullstack web developer"
            },
            {
                "_id": "5f750e0e90dcaa40b8b3981b",
                "company": "EmployeezNow",
                "address": "seatle",
                "title": "fullstack web developer"
            }
        ],
        "createdAt": "2020-09-30T22:49:09.343Z", */}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid className={classes.section}>
            <Card className={classes.section}>
              <CardHeader
                action={
                  <Button
                    variant="outlined"
                    size="small"
                    className={classes.button}
                  >
                    Upload
              </Button>
                }
                title="Work Video"
                subheader=""
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">

                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid className={classes.section}>
            <Card className={classes.section}>
              <CardHeader
                action={
                  <Button
                    variant="outlined"
                    size="small"
                    className={classes.button}
                  >
                    Upload
              </Button>
                }
                title="Portfolio"
                subheader=""
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">

                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Container>
      </Fragment> :
      <Fragment>

      </Fragment>
  )
}

const mapStateToProps = ({
  employee: {
    employeeData
  },
}) => ({
  employeeData
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...employeeActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
