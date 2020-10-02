import React from 'react';
import { connect } from 'react-redux';
import FileSaver from 'file-saver';
import { makeStyles, useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import { loadResume } from '../../../store/actions/document';

// set styles - material-ui
const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      marginTop: '2rem',
    },
  },
  avatar: {
    border: `1px solid ${theme.palette.secondary.main}`,
    backgroundColor: 'transparent',
    color: theme.palette.secondary.main,
    [theme.breakpoints.down('sm')]: {
      marginRight: '1rem',
    },
  },
}));

const EmployeeDocument = ({ loadResume }) => {
  const handleClick = (e) => {
    e.preventDefault();
    loadResume();
  };

  // style -material-ui
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid container direction="column" className={classes.root}>
      {/* document icon - diplay only md or up screen */}
      {matchesSM ? (
        ''
      ) : (
        <Grid item>
          <Avatar className={classes.avatar}>
            <DescriptionOutlinedIcon />
          </Avatar>
        </Grid>
      )}

      <Grid item container>
        {matchesSM ? (
          <Grid item>
            <Avatar className={classes.avatar}>
              <DescriptionOutlinedIcon />
            </Avatar>
          </Grid>
        ) : (
          ''
        )}
        <Grid item md={6}>
          <Button type="button" onClick={(e) => handleClick(e)}>
            Resume
          </Button>
        </Grid>

        <Grid item md={6}>
          <Button type="button" onClick={(e) => handleClick(e)}>
            Refarence
          </Button>
        </Grid>

        <Grid item md={6}>
          <Button type="button" onClick={(e) => handleClick(e)}>
            Work At Video
          </Button>
        </Grid>

        <Grid item md={6}>
          <Button type="button" onClick={(e) => handleClick(e)}>
            Diploma
          </Button>
        </Grid>

        <Grid item md={6}>
          <Button type="button" onClick={(e) => handleClick(e)}>
            Portfolio
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default connect(null, { loadResume })(EmployeeDocument);
