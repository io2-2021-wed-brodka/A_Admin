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
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { getAllBikes } from "../api/bikes/getBikes";
import { Bike } from "../models/bike";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),      
      display: "flex",
      width: "100%",
    },
    table: {
      minWidth: 650,
    },
    addButton: {
      margin: theme.spacing(2),
    },
  })
);

const BikePage = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [rentedBikes, setRentedBikes] = useState<Bike[]>([]);

  useEffect(() => {
    getAllBikes().then((res) => {
      if (res.isError) {
        enqueueSnackbar("Could not get all bikes", { variant: "error" });
      } else {
        setRentedBikes(res.data || []);
      }
    });
  }, [enqueueSnackbar]);  

  return (
    <Grid container justify="center" alignItems="center" className={classes.content}>
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
                <TableCell>Bike</TableCell>
                <TableCell align="right">Station</TableCell>
                <TableCell align="right">User</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rentedBikes.map((bike) => (
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
};

export default BikePage;
