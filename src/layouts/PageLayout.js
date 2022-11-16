import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "../components/AppBar";
import ScrollTop from "../components/ScrollTop";
import MenuUsers from "../components/MenuUsers";
import MenuListCard from "../components/MenuCardList";

const useStyles = makeStyles(theme => ({
  main: {},
  scrolltop: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  list: {
    width: 350
  },
  fullList: {
    width: "auto"
  }
}));

const PageLayout = props => {
  const [isLeftDrawerOpen, toggleLeftDrawer] = useState(false);
  const [isRightDrawerOpen, toggleRightDrawer] = useState(false);
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
    right: false
  });

  const {
    title,
    renderAppBarMenu,
    renderSideBarLeft,
    renderSideBarRight,
    children
  } = props;

  const toggleDrawer = (anchor, open) => {
    setState({ ...state, [anchor]: open });
  };

  return (
    <div className={classes.root}>
      <AppBar
        id="back-to-top-anchor"
        isLeftDrawerOpen={state["left"]}
        isRightDrawerOpen={state["right"]}
        title={title}
        toggleDrawer={toggleDrawer}
      >
        {renderAppBarMenu()}
      </AppBar>
      {["left", "right"].map(anchor => (
        <div key={anchor}>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={() => toggleDrawer(anchor, false)}
            onOpen={() => toggleDrawer(anchor, true)}
          >
            {anchor === "left" ? (
              <MenuUsers toggleDrawer={() => toggleDrawer(anchor, false)} />
            ) : (
              <MenuListCard toggleDrawer={() => toggleDrawer(anchor, false)} />
            )}
          </SwipeableDrawer>
        </div>
      ))}

      <main
        className={clsx(classes.main, {
          [classes.mainShift]: isLeftDrawerOpen
        })}
      >
        <div className={classes.drawerHeader} />
        <div className={classes.container}>{children}</div>
      </main>
      <ScrollTop {...props} />
    </div>
  );
};

PageLayout.propTypes = {
  title: PropTypes.string,
  renderSideBarMenu: PropTypes.func,
  renderAppBarMenu: PropTypes.func,
  children: PropTypes.node
};

PageLayout.defaultProps = {
  title: "",
  renderSideBarMenu: () => {},
  renderAppBarMenu: () => {},
  children: undefined
};

export default PageLayout;