import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import styles from "./index.module.css";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "8px",
    padding: "8px",
    background: "#4285F4",
    color: "#fff",
    textTransform: "none",
    fontWeight: "600",
    fontSize: "16px",
    height: "38px",
    textShadow: "1px 1px 1px rgba(0,0,0,0.16)",
  },
  icon: {
    width: "32px",
    backgroundColor: "#fff",
    padding: "4px",
  },
}));

const GoogleButton = (props) => {
  let { href } = props;
  console.log(href);
  const classes = useStyles();
  return (
    <Button
      startIcon={
        <img className={classes.icon} src={"/images/google-button/logo.png"} />
      }
      variant="contained"
      className={classes.button}
      onClick={() => {
        document.location = `${href}`;
      }}
    >
      Logar com Google
    </Button>
  );
};

export default GoogleButton;
/* const GoogleButton = () => (
  <a
    role="button"
    aria-label="Logar com Google"
    className={clsx(styles.GoogleButton)}
    tabIndex={0}
    href="http://localhost:8080/auth/google"
  >
    Entrar com Google
  </a>
); */
