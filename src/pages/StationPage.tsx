import {
    Button,
    createStyles,
    Grid,
    makeStyles,
    Theme
} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {useSnackbar} from "notistack";
import {Station} from "../models/station";
import {getAllStations} from "../api/stations/getStations";
import StationsTable from "../components/StationsTable";

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
                <StationsTable stations={stations} setStations={setStations}/>
            </div>
        </Grid>
    );
};

export default StationPage;
