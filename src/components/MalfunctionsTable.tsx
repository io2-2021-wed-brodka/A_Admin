import { createStyles, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme } from '@material-ui/core';
import React from 'react';
import { Malfunction } from '../models/malfunctions';


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
      minWidth: 750,
    },
    blockButton: {
      color: "#ee6002"
    },
    unblockButton: {
        color: "#09af00"
    },
    widerCell:{
      minWidth: '4em'
    },
    widestCell:{
      minWidth: '15em',
      maxWidth: '20em'
    },
    addButton: {
      margin: theme.spacing(2),
    },
  })
);

export interface MalfunctionsTableProps {
  setMalfunctions: (value: React.SetStateAction<Malfunction[]>) => void;  
  malfunctions: Malfunction[];
}

const MalfunctionsTable = (props: MalfunctionsTableProps) => {
    const classes = useStyles()
   
  return (
    <TableContainer component={Paper}>
    <Table id='malfunctions-table' className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Malfunction</TableCell>
          <TableCell align="right" className={classes.widerCell}>User Id</TableCell>
          <TableCell align="right" className={classes.widerCell}>Bike Id</TableCell>
          <TableCell align="left" className={classes.widestCell}>Description</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.malfunctions.map((malf) => (
          <TableRow key={malf.id}>
            <TableCell component="th" scope="row">
              No. {malf.id}
            </TableCell>
            <TableCell align="right">{malf.reportingUserId}</TableCell>
            <TableCell align="right">
              {malf.bikeId}
            </TableCell>
            <TableCell align="left" className={classes.widestCell}>{malf.description ?? "-"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  );
}

export default MalfunctionsTable;
