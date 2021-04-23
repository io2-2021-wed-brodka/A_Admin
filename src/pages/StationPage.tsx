import {
    Button,
    createStyles,
    Grid,
    makeStyles,
    Paper,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead, TableRow,
    Theme
} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {useSnackbar} from "notistack";
import {Station} from "../models/station";
import {getAllStations} from "../api/stations/getStations";
import {deleteStation} from "../api/stations/deleteStation";

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
        addButton: {
            margin: theme.spacing(2),
        },
        blockButton: {
            color: "#ee6002"
        },
        unblockButton: {
            color: "#09af00"
        }
    })
);

const StationPage = () => {
    const classes = useStyles();
    const {enqueueSnackbar} = useSnackbar();
    const [stations, setStations] = useState<Station[]>([]);

    const handleDelete = (id: string) => {
        deleteStation(id).then((response) => {
            if (response.isError)
                enqueueSnackbar("Failed to delete station", {variant: "error"});
            else
                setStations((prev) => prev.filter(s => s.id != id));
        });
    };

    useEffect(() => {
        getAllStations().then((response) => {
            if (response.isError) {
                enqueueSnackbar("Could not get all stations", {variant: "error"});
            } else {
                setStations(response.data || []);
            }
        });
    }, [enqueueSnackbar]);

    return (
        <Grid container className={classes.content}>
            <div>
                <Button className={classes.addButton} variant="contained" color="primary">
                    Add
                </Button>
                <TableContainer component={Paper}>
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
                            {stations.map((station) => (
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
            </div>
        </Grid>
    );
};

export default StationPage;
