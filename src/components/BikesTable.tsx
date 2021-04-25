import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme, createStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { Bike } from '../models/bike';
import { deleteBike } from '../api/bikes/deleteBike';

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

export interface BikeTableProps {
  setBikes: (value: React.SetStateAction<Bike[]>) => void;  
  bikes: Bike[];
}

const BikeTable = (props: BikeTableProps) => {
    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar();
    const handleDelete = (id: string) => {
        const bikesCopy = [...props.bikes];
        props.setBikes((prev) => prev.filter(b => b.id !== id));

        deleteBike(id).then((response) => {
          if(response.isError)
          {            
            if(response.responseCode === 422)
            {
              enqueueSnackbar("Could not delete bike: bike not blocked", { variant: "error" });
            }
            else if(response.responseCode === 404)
            {
              enqueueSnackbar("Could not delete bike: bike not found", { variant: "error" });
            }
            else
            {
              enqueueSnackbar("Could not delete bike", { variant: "error" });
            }            
            props.setBikes(bikesCopy);
          }          
        });    
      };

  return (
    <TableContainer component={Paper}>
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Bike</TableCell>
          <TableCell align="right">Station</TableCell>
          <TableCell align="right">User</TableCell>
          <TableCell align="right">Status</TableCell>
          <TableCell align="center">Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.bikes.map((bike) => (
          <TableRow key={bike.id}>
            <TableCell component="th" scope="row">
              Bike {bike.id}
            </TableCell>
            <TableCell align="right">
              {bike.station?.name ?? "-"}
            </TableCell>
            <TableCell align="right">{bike.user?.name ?? "-"}</TableCell>
            <TableCell align="right">{bike.status}</TableCell>
            <TableCell align="center">
              <Button                      
                color="secondary"
                onClick={() => handleDelete(bike.id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  );
}

export default BikeTable;