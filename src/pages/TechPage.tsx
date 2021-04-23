import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { Button, Grid } from "@material-ui/core";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { getAllTechs } from "../api/techs/getTechs";
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
        <Button
          className={classes.addButton}
          variant="contained"
          color="primary"
        >
          Add
        </Button>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left" width="100%">Name</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {techs.map((tech) => (
                <TableRow key={tech.id}>
                  <TableCell align="left">
                    {tech.name ?? "Nameless"}
                  </TableCell>
                  <TableCell align="center">
                    <Button                      
                      color="secondary"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
    </Grid>
  );
}


export default TechPage;
