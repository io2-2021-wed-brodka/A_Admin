import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

const StationPage = () => {
  const classes = useStyles();
  return <div className={classes.content}>Station</div>;
};

export default StationPage;
