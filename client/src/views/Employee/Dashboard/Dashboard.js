import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AccordionActions, Container } from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
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
import BackgroundPhoto from './BackgroundPhoto';
import Portfolio from './Portfolio';
import VideoGallery from './VideoGallery';
import { Link } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Profession from './Profession'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: 'white'
  },
  container: {
    maxWidth: 1100,
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
  right: {
    float: "right"
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
  name: {
    marginLeft: '1rem',
    width: '100%',
    color: 'RGB(23,41, 64)',
    fontSize: '2rem',
    fontWeight: 600
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
  },
  jobtitle: {
    fontSize: 20,
    fontWeight: 600,
    color: 'RGB(23,41, 64)'
  },
  company: {
    fontWeight: 450
  },
  jobPeriod: {
    color: "gray",
    fontWeight: 300,
    marginBottom: 40
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
  const {
    skill,
    experience
  } = employeeData
  console.log(employeeData, "payload")
  return (
    !_.isEmpty(employeeData) ?
      <Fragment>
        <Container className={classes.container}>
          <Grid className={classes.header}>
            <BackgroundPhoto />
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
                <Grid container direction="row">
                  <Grid item xs={3}>
                    Primary Job :
                      {employeeData.skill.primaryJob.title}
                    {employeeData.skill.primaryJob.years} Years
                    </Grid>
                  <Grid item xs={6}>
                    <Typography>

                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent className={classes.moreSkills}>
                  <Typography>
                    <Profession profession={employeeData.skill} />
                  </Typography>
                </CardContent>
              </Collapse>
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
                <Grid item container xs={12}>
                  <Grid item xs={12} md={6}>
                    <Typography className={classes.jobtitle}>
                      {skill && skill.primaryJob.title}
                    </Typography>
                    <Typography className={classes.company}>
                      {experience && experience.primaryJob.company}
                    </Typography>
                    <Typography className={classes.jobPeriod}>
                      {experience && experience.primaryJob.startDate}&nbsp;~ &nbsp;
                      {experience && experience.primaryJob.current ? "Present" :
                        experience.primaryJob.endDate}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography className={classes.jobtitle}>
                      {employeeData.skill && employeeData.skill.secondaryJob.title}
                    </Typography>
                    <Typography className={classes.company}>
                      {experience && experience.secondaryJob.company}
                    </Typography>
                    <Typography className={classes.jobPeriod}>
                      {experience && experience.secondaryJob.startDate}&nbsp;~ &nbsp;
                      {experience && experience.secondaryJob.endDate}
                    </Typography>
                  </Grid>
                </Grid>

                {/* {employeeData.experience && employeeData.experience.employee} */}

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
            <Portfolio />
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
