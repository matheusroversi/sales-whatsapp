import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  actions: {}
}));

const HeaderPage = ({ title, actions }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1>{title}</h1>
      {actions && <div className={classes.actions}>{actions}</div>}
    </div>
  );
};

export default HeaderPage;
