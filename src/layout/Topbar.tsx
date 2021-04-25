import { AppBar, Button, makeStyles, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  logoutButton: {    
    marginLeft: "auto",
    color: "#fff",
  },
}));

export interface TopbarProps {
  logged: boolean;
  setToken: (newToken: string | undefined) => void;
}

const Topbar = (props: TopbarProps) => {
  const classes = useStyles();

  const history = useHistory();

  const handleLogoutClick = () => {
      props.setToken(undefined);
      history.push("/");
  }

  return (
    <div>
      <AppBar className={classes.toolbar}>
        <Toolbar>
          <Typography variant="h6" display={"inline"}>
            Bikes admin
          </Typography>

          {!props.logged ||
            <Button className={classes.logoutButton} onClick={handleLogoutClick}>Log out</Button>}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Topbar;
