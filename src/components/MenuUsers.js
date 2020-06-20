import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import GoogleButton from "./google-button";
import { connect } from "react-redux";
import { AppActions } from "../core";
import Avatar from "@material-ui/core/Avatar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";

const SERVER_ADDRESS =
  process.env.API_SERVER_ADDRESS || "http://localhost:8080";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    width: "100%",
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200,
      },
    },
  },
  avatar: {
    marginRight: "8px",
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  avatarContainer: {
    background: theme.palette.primary.main,
    color: "#fff",
  },
}));

const MenuUsers = (props) => {
  const [logged, setLogged] = useState(false);
  const { user, toggleDrawer } = props;
  const theme = useTheme();
  const classes = useStyles();

  useEffect(() => {
    setLogged(!!user && !!user.name);
  });

  return (
    <>
      <div className={classes.drawerHeader}>
        <IconButton onClick={toggleDrawer}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      {!logged && (
        <List
          className={classes.avatarContainer}
          subheader={
            <ListSubheader className={classes.avatarContainer}>
              Login
            </ListSubheader>
          }
        >
          <ListItem button key="">
            <GoogleButton
              handleClick={() => {
                document.location = `https://numenu-backend.herokuapp.com/auth/google`;
              }}
            />
          </ListItem>
        </List>
      )}

      {logged && (
        <>
          <List
            className={classes.avatarContainer}
            subheader={
              <ListSubheader className={classes.avatarContainer}>
                Perfil
              </ListSubheader>
            }
          >
            <ListItem button key="">
              <ListItemIcon>
                <Avatar
                  alt="Remy Sharp"
                  src={user.imageUrl}
                  className={classes.avatar}
                />
              </ListItemIcon>
              <ListItemText primary={user.name} />
            </ListItem>
          </List>
          <Divider />
          <List>
            {logged && (
              <ListItem button key="logout">
                <ListItemIcon>
                  <ContactPhoneIcon />
                </ListItemIcon>
                <ListItemText primary={"Meus dados"} />
              </ListItem>
            )}
          </List>
          <Divider />
          {/* <List>
            {logged && (
              <ListItem button key="logout">
                <ListItemIcon>
                  <LocationOnIcon />
                </ListItemIcon>
                <ListItemText primary={"Endereço"} />
              </ListItem>
            )}
          </List>
          <Divider /> */}
          <List>
            {logged && (
              <ListItem
                button
                key="logout"
                onClick={() =>
                  (document.location = `https://numenu-backend.herokuapp.com/auth/logout`)
                }
              >
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary={"Sair"} />
              </ListItem>
            )}
          </List>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.AppReducer,
  };
};
export default connect(mapStateToProps, {
  ...AppActions,
})(MenuUsers);
