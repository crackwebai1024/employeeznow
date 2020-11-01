import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import { makeStyles } from '@material-ui/styles';
import styled from "styled-components";
import cx from 'classnames';
import styles from './Button.module.css';

const useStyles = makeStyles((theme) => ({
  LinkItem: {
    color: theme.palette.common.black,
    padding: '0 1rem 0 1rem',
    width: 'fit-content',
    fontFamily :'Nunito Sans',
    fontWeight: 500,
    '&:hover': {
      color: theme.palette.primary.extra
    },
    '&:focus': {
      color: theme.palette.primary.extra
    }
  },
}))

const LinkTab = ({ to, title }) => {
  const classes = useStyles()
  return (
    <Fragment>
      <Link to={to} className={styles.link_item}>
        <div className={cx(classes.LinkItem, styles.LinkItem)}>
          {title}
        </div>
        <div className={styles.link_item_bottom}></div>
      </Link>
    </Fragment>
  )
}

export default CSSModules(LinkTab, styles);