import {
    createStyles,
    Grid,
    makeStyles,
    Theme
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { getAllStations } from "../api/stations/getStations";
import AddStationDialog from "../components/stations/AddStationDialog";
import StationsTable from "../components/stations/StationsTable";
import { Station } from "../models/station";

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
        },
        drawer: {
            minHeight:"10em",
            height:"40em"
        }
    })
);

const StationPage = () => {
    const classes = useStyles();
    const {enqueueSnackbar} = useSnackbar();
    const [stations, setStations] = useState<Station[]>([]);
    useEffect(() => {
        getAllStations().then((response) => {
            if (response.isError) {
                enqueueSnackbar("Could not get all stations", {variant: "error"});
            } else {
                setStations(response.data?.stations || []);
            }
        });
    }, [enqueueSnackbar]);

    return (
        <Grid container className={classes.content}>
            <div>
                <AddStationDialog setStations={setStations}/>
                <StationsTable stations={stations} setStations={setStations}/>
            </div>
        </Grid>
    );
};

export default StationPage;
