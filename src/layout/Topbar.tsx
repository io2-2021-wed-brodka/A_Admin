import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const Topbar = () => {
  const classes = useStyles();

  return (
    <div>
      <AppBar className={classes.toolbar}>
        <Toolbar>
          <Typography variant="h6" display={"inline"}>
            Bikes admin
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Topbar;
