import {createStyles, makeStyles, Theme} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {useSnackbar} from "notistack";
import {Station} from "../models/station";
import {getAllStations} from "../api/stations/getStations";

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
        <div className={classes.content}>
            <ul>
                {stations.map((station) => (
                    <li>{station.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default StationPage;
