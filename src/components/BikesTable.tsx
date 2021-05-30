import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme, createStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { Bike } from '../models/bike';
import { deleteBike } from '../api/bikes/deleteBike';
import { blockBike } from '../api/bikes/blockBike';
import { unblockBike } from '../api/bikes/unblockBike';

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
      minWidth: 700,
    },
    blockButton: {
      color: "#ee6002"
    },
    unblockButton: {
        color: "#09af00"
    },
    addButton: {
      margin: theme.spacing(2),
    },
  })
);

export interface BikeTableProps {
  setBikes: (value: React.SetStateAction<Bike[]>) => void;  
  bikes: Bike[];
  noAction?: boolean;
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

    const updateBikeStatus = (bike: Bike, status: string): Bike => {
        bike.status = status;
        return bike;
    };
    const handleBlock = (id: string) => {
        blockBike(id).then((response) => {
            if (response.isError) {
                enqueueSnackbar(`Failed to block bike: ${response.errorMessage}`, { variant: "error" });
            } else {
                props.setBikes(prev => prev.map(b => b.id === id ? updateBikeStatus(b, "blocked") : b));
            }
        });
    };

    const handleUnblock = (id: string) => {
        unblockBike(id).then((response) => {
            if (response.isError) {
                enqueueSnackbar(`Failed to unblock bike: ${response.errorMessage}`, { variant: "error" });
            } else {
                props.setBikes(prev => prev.map(b => b.id === id ? updateBikeStatus(b, "available") : b));
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
          {props.noAction !== true ? <TableCell align="center" colSpan={2}>Action</TableCell> : ''}
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
            {props.noAction !== true ? <TableCell align="right">
                            {bike.status !== "blocked" ?
                                <Button className={classes.blockButton} disabled={ bike.status!=="available" } onClick={() => handleBlock(bike.id)}>
                                    Block
                                </Button> :
                                <Button className={classes.unblockButton} onClick={() => handleUnblock(bike.id)}>
                                    Unblock
                                </Button>
                            } 
                        </TableCell> :''}
            {props.noAction !== true ? <TableCell align="center">
              <Button                      
                color="secondary"
                onClick={() => handleDelete(bike.id)}
              >
                Delete
              </Button>
            </TableCell>  : ''}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  );
}

export default BikeTable;
