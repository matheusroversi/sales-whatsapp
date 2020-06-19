import React, { useState, Component } from "react";
import { connect } from "react-redux";
import { AppActions } from "../core";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import UIAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import InputBase from "@material-ui/core/InputBase";
import { drawerWidth } from "./Drawer";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Badge from "@material-ui/core/Badge";
import IconMenuCard from "./IconMenuCard";
import SearchAppBar from "./SearchAppBar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbar: {
    minHeight: "64px",
    background: theme.palette.primary.main,
    color: "white",
  },
  appBar: {
    boxShadow: "none",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: "none",
  },
  closeIcon: {
    position: "absolute",
    zIndex: "9",
    bottom: "16px",
    right: "88px",
    color: "gray",
  },
  search: {
    marginTop: "8px",
  },
}));

const AppBar = (props) => {
  const classes = useStyles();
  const {
    toggleDrawer,
    isLeftDrawerOpen,
    isRightDrawerOpen,
    children,
    card,
  } = props;
  const { id, me } = props;

  function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  }

  return (
    <div id={id} className={classes.root}>
      <CssBaseline>
        <HideOnScroll {...props}>
          <UIAppBar
            position="fixed"
            className={clsx(classes.appBar)}
            color="inherit"
          >
            <Toolbar className={classes.toolbar}>
              <IconButton
                edge="start"
                className={clsx(
                  classes.menuButton,
                  isLeftDrawerOpen && classes.hide
                )}
                color="inherit"
                aria-label="Menu"
                onClick={() => {
                  toggleDrawer("left", true);
                }}
              >
                <MenuIcon />
              </IconButton>
              {children}
              <Typography variant="h6" className={classes.title}>
                {!!me && !!me.name && me.name}
              </Typography>
              <SearchAppBar />
              <IconMenuCard toggleDrawer={toggleDrawer} />
            </Toolbar>
          </UIAppBar>
        </HideOnScroll>
      </CssBaseline>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.AppReducer,
  };
};
export default connect(mapStateToProps, {
  ...AppActions,
})(AppBar);
