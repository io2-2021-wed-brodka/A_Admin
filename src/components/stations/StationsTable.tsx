import { Station } from "../../models/station";
import React from "react";
import {
    Button,
    createStyles,
    makeStyles,
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import { deleteStation } from "../../api/stations/deleteStation";

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
        }
    })
);

export interface StationTableProps {
    stations: Station[];
    setStations: (value: React.SetStateAction<Station[]>) => void;
}

const StationsTable = (props: StationTableProps) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const handleDelete = (id: string) => {
        deleteStation(id).then((response) => {
            if (response.isError) {
                enqueueSnackbar(`Failed to delete station: ${response.errorMessage}`, { variant: "error" });
            } else
                props.setStations((prev) => prev.filter(s => s.id !== id));
        });
    };

    return <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="left">Station name</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Active bikes</TableCell>
                    <TableCell align="center" colSpan={2}>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.stations.map((station) => (
                    <TableRow key={station.id}>
                        <TableCell component="th" scope="row">
                            Station {station.name}
                        </TableCell>
                        <TableCell align="right">
                            {station.status}
                        </TableCell>
                        <TableCell align="right">
                            {station.activeBikesCount}
                        </TableCell>
                        <TableCell align="right">
                            {station.status === "active" ?
                                <Button className={classes.blockButton}>Block</Button> :
                                <Button className={classes.unblockButton}>Unblock</Button>
                            }
                        </TableCell>
                        <TableCell align="center">
                            <Button color="secondary" onClick={() => handleDelete(station.id)}>
                                Delete
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
};

export default StationsTable;
