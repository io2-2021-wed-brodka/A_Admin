import { createStyles, makeStyles, Theme, Toolbar } from "@material-ui/core";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import NavigationDrawer from "./layout/NavigationDrawer";
import Topbar from "./layout/Topbar";
import BikePage from "./pages/BikePage";
import StationPage from "./pages/StationPage";
import TechPage from "./pages/TechPage";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
  })
);

const Pages = () => {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <div className={classes.root}>
        <Topbar />
        <NavigationDrawer />
        <div>
          <Toolbar />
          <Switch>
            <Route exact path="/">
              <Redirect to="/bikes" />
            </Route>
            <Route path="/bikes" component={() => <BikePage />} />
            <Route path="/techs" component={() => <TechPage />} />
            <Route path="/stations" component={() => <StationPage />} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Pages;
