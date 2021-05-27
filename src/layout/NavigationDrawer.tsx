import React from "react";
import { Drawer, makeStyles, createStyles, Toolbar } from "@material-ui/core";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

import { Theme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";
import BuildIcon from "@material-ui/icons/Build";
import BusinessIcon from "@material-ui/icons/Business";
import PersonIcon from '@material-ui/icons/Person';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: "auto",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

const NavigationDrawer = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleBikesClick = () => {
    history.push("/bikes");
  };

  const handleTechsClick = () => {
    history.push("/techs");
  };

  const handleStationsClick = () => {
    history.push("/stations");
  };

  const handleUsersClick = () => {
    history.push("/users");
  };

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem id="bikes-navigation" button key="bikes" onClick={handleBikesClick}>
              <ListItemIcon>
                <DirectionsBikeIcon />
              </ListItemIcon>
              <ListItemText primary="Bikes" />
            </ListItem>

            <ListItem id="techs-navigation" button key="techs" onClick={handleTechsClick}>
              <ListItemIcon>
                <BuildIcon />
              </ListItemIcon>
              <ListItemText primary="Techs" />
            </ListItem>

            <ListItem id="stations-navigation" button key="stations" onClick={handleStationsClick}>
              <ListItemIcon>
                <BusinessIcon />
              </ListItemIcon>
              <ListItemText primary="Stations" />
            </ListItem>

            <ListItem id="user-navigation" button key="users" onClick={handleUsersClick}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default NavigationDrawer;
