import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

const TechPage = () => {
  const classes = useStyles();
  return <div className={classes.content}>Tech</div>;
};

export default TechPage;
