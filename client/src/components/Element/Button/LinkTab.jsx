import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import CSSModules from "react-css-modules";
import { makeStyles } from "@material-ui/styles";
import cx from "classnames";
import styles from "./Button.module.css";

const useStyles = makeStyles((theme) => ({
  badge: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    right: "0px",
    top: "15px",
    background: "green",
    color: "white",
    position: "absolute",
    textAlign: "center",
  },
  LinkItem: {
    color: theme.palette.common.black,
    padding: "0 1rem 0 1rem",
    width: "fit-content",
    fontFamily: "Nunito Sans",
    fontWeight: 500,
    "&:hover": {
      color: theme.palette.primary.extra,
    },
    "&:focus": {
      color: theme.palette.primary.extra,
    },
  },
}));

const LinkTab = ({ to, title, badge }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <Link to={to} className={styles.link_item}>
        {title === "My Cart" && (
          <div className={badge !== undefined ? classes.badge : ""}>
            {badge}
          </div>
        )}
        <div className={cx(classes.LinkItem, styles.LinkItem)}>{title}</div>
        <div className={styles.link_item_bottom}></div>
      </Link>
    </Fragment>
  );
};

export default CSSModules(LinkTab, styles);
