import { createStyles, makeStyles, Toolbar } from "@material-ui/core";
import { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import React from "react";
import NavigationDrawer from "./layout/NavigationDrawer";
import Topbar from "./layout/Topbar";
import ProtectedRoute from "./layout/ProtectedRoute";
import BikePage from "./pages/BikePage";
import LoginPage from "./pages/LoginPage";
import StationPage from "./pages/StationPage";
import TechPage from "./pages/TechPage";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
    },
  })
);

const Pages = () => {
  const classes = useStyles();

  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");
    if (token && userName) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, []);

  const setToken = (newToken: string | undefined) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
      setLogged(true);
    } else {
      localStorage.removeItem("token");
      setLogged(false);
    }
  };

  const setUserName = (userName: string) => {
    localStorage.setItem("userName", userName);
  };

  return (
    <BrowserRouter>
      <div className={classes.root}>
        <Topbar />        
        { logged && <NavigationDrawer />}        
        <div>
          <Toolbar />
          <Switch>                    
            <Route exact path="/">
              <Redirect to="/bikes" />
            </Route>
            <ProtectedRoute path="/bikes" component={() => <BikePage />} isAuthenticated={logged} redirectPath="/login" />
            <ProtectedRoute path="/techs" component={() => <TechPage />} isAuthenticated={logged} redirectPath="/login" />
            <ProtectedRoute path="/stations" component={() => <StationPage />} isAuthenticated={logged} redirectPath="/login" />
            <ProtectedRoute path="/login" component={() => (
                <LoginPage setToken={setToken} setUserName={setUserName} />
              )} isAuthenticated={!logged} redirectPath="/" />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Pages;
