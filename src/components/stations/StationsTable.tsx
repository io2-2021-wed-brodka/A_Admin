import {
    Box,
    Button,
    Collapse,
    createStyles,
    IconButton,
    makeStyles,
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { blockStation } from "../../api/stations/blockStation";
import { deleteStation } from "../../api/stations/deleteStation";
import { unblockStation } from "../../api/stations/unblockStation";
import { Station } from "../../models/station";
import StationsTableChild from "./StationsTableChild";


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
        child: {
            maxWidth: "100%"
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
    const [open, setOpen] = useState<boolean[]>([]);
    const handleDelete = (id: string) => {
        deleteStation(id).then((response) => {
            if (response.isError) {
                enqueueSnackbar(`Failed to delete station: ${response.errorMessage}`, { variant: "error" });
            } else
                props.setStations((prev) => prev.filter(s => s.id !== id));
                setOpen(props.stations.map(s => false) || []);
        });
    };

    const updateStationStatus = (station: Station, status: string): Station => {
        station.status = status;
        return station;
    };

    const handleBlock = (id: string) => {
        blockStation(id).then((response) => {
            if (response.isError) {
                enqueueSnackbar(`Failed to block station: ${response.errorMessage}`, { variant: "error" });
            } else {
                props.setStations(prev => prev.map(s => s.id === id ? updateStationStatus(s, "blocked") : s));
            }
        });
    };

    const handleUnblock = (id: string) => {
        unblockStation(id).then((response) => {
            if (response.isError) {
                enqueueSnackbar(`Failed to unblock station: ${response.errorMessage}`, { variant: "error" });
            } else {
                props.setStations(prev => prev.map(s => s.id === id ? updateStationStatus(s, "active") : s));
            }
        });
    };
    const handleClickOpen = (index: number) => {

        setOpen( prev => {
            let tmp = [...prev];
            tmp[index] = !tmp[index];
            return tmp;
        });
    };
    return <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell />
                    <TableCell align="left">Station name</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Active bikes</TableCell>
                    <TableCell align="center" colSpan={2}>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.stations.map((station, index) => {
                    return (<React.Fragment>
                    <TableRow key={station.id}>
                        <TableCell>
                            <IconButton aria-label="expand row" size="small" onClick={() => handleClickOpen(index)}>
                                {open[index] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </IconButton>
                        </TableCell>
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
                                <Button className={classes.blockButton} onClick={() => handleBlock(station.id)}>
                                                                        Block
                                </Button> :
                                <Button className={classes.unblockButton} onClick={() => handleUnblock(station.id)}>
                                    Unblock
                                </Button>}
                        </TableCell>
                        <TableCell align="center">
                            <Button color="secondary" onClick={() => handleDelete(station.id)}>
                                Delete
                            </Button>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                            <Collapse in={open[index]} timeout="auto" unmountOnExit>
                                <Box margin={1} className={classes.child}>
                                    <StationsTableChild stationId={station.id} />
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow>
                    </React.Fragment>
                    );
                })}
            </TableBody>
        </Table>
    </TableContainer>
};

export default StationsTable;
