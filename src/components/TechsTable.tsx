import React, {  } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme, createStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { deleteTech } from '../api/techs/deleteTech';
import { User } from '../models/user';

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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
  })
);

export interface TechTableProps {
    setTechs: (value: React.SetStateAction<User[]>) => void;
    techs: User[];
}

const TechTable = (props: TechTableProps) => {
    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar();
    const handleDelete = (id: string) => {
        deleteTech(id).then((response) => {
          if(response.isError)
          {
            enqueueSnackbar("Could not delete tech", { variant: "error" });
          }
          else
          {
            props.setTechs((prev) => prev.filter(b => b.id !== id))
          }        
        });    
      };

    return (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left" width="100%">Name</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.techs.map((tech) => (
                <TableRow key={tech.id}>
                  <TableCell align="left">
                    {tech.name ?? "Nameless"}
                  </TableCell>
                  <TableCell align="center">
                    <Button                      
                      color="secondary"
                      onClick={() => handleDelete(tech.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    )
}

export default TechTable;
