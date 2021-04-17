import React from "react";
import { Drawer, makeStyles, createStyles, Toolbar } from "@material-ui/core";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

import { Theme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";
import BuildIcon from "@material-ui/icons/Build";
import BusinessIcon from "@material-ui/icons/Business";

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

const NavigationDrawer: React.FC = (props: any) => {
  const classes = useStyles();
  let history = useHistory();

  const handleBikesClick = () => {
    history.push("/bikes");
  };

  const handleTechsClick = () => {
    history.push("/techs");
  };

  const handleStationsClick = () => {
    history.push("/stations");
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
            <ListItem button key="bikes" onClick={handleBikesClick}>
              <ListItemIcon>
                <DirectionsBikeIcon />
              </ListItemIcon>
              <ListItemText primary="Bikes" />
            </ListItem>

            <ListItem button key="techs" onClick={handleTechsClick}>
              <ListItemIcon>
                <BuildIcon />
              </ListItemIcon>
              <ListItemText primary="Techs" />
            </ListItem>

            <ListItem button key="stations" onClick={handleStationsClick}>
              <ListItemIcon>
                <BusinessIcon />
              </ListItemIcon>
              <ListItemText primary="Stations" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default NavigationDrawer;