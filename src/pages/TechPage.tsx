import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { getAllTechs } from "../api/techs/getTechs";
import TechTable from "../components/TechsTable";
import AddTechDialog from "../components/AddTechDialog"
import { User } from "../models/user";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),      
      display: "flex",
      width: "100%",
      justify: "center", 
      alignItems: "center",        
    },
    table: {
      minWidth: 650,
    },
    addButton: {
      margin: theme.spacing(2),
    },
  })
);

const TechPage = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [techs, setTechs] = useState<User[]>([]);

  useEffect(() => {
    getAllTechs().then((res) => {
      if (res.isError) {
        enqueueSnackbar("Could not get all techs", { variant: "error" });
      } else {
        setTechs(res.data || []);
      }
    });
  }, [enqueueSnackbar]);  

  return (
    <Grid className={classes.content}>
      <div>
        <AddTechDialog setTechs={setTechs} />
        <TechTable setTechs={setTechs} techs={techs} />
        </div>
    </Grid>
  );
};

export default TechPage;
