import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { AppBar } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Icon from "@material-ui/core/Icon";

const Sidebar = () => {
  return (
    <div>
      <h2>
        <Link to="/">
          Logo
          <Icon>star</Icon>
        </Link>
      </h2>
      <List component="nav">
        <li>
          <Link to="/todos">Todos</Link>
        </li>
        <li>
          <Link to="/contacts">Contacts</Link>
        </li>
      </List>
    </div>
  );
};

export default Sidebar;
