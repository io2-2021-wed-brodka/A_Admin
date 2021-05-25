import {
    Button,
    createStyles,
    makeStyles,
    Typography
} from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { getAllBikes } from "../../api/bikes/getBikes";
import { getMalfunctions } from "../../api/malfunctions/getMalfunctions";
import { getStation } from "../../api/stations/getStation";
import { Bike } from "../../models/bike";
import { Malfunction } from "../../models/malfunctions";
import { Station } from "../../models/station";
import BikeTable from "../BikesTable";
import MalfunctionsTable from "../MalfunctionsTable";

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
        inlineHeader: {
            display: "flex",
            justifyContent:"space-between"
        },
        information: {
            display: "flex",
            justifyContent:"space-evenly"
        }
    })
);

export interface StationTableChildProps {
    stationId: string
}

const StationsTableChild = (props: StationTableChildProps) => {
    const classes = useStyles();
    const {enqueueSnackbar} = useSnackbar();
    const [bikes, setBikes] = useState<Bike[]>([]);
    const [station, setStation] = useState<Station>();
    const [malfunctions, setMalfunctions] = useState<Malfunction[]>([]);
    useEffect(() => {
        getStation(props.stationId).then((response) => {
            if (response.isError) {
                enqueueSnackbar("Could not get station datails", {variant: "error"});
            } else {
                setStation(response.data);
            }
        });

        getAllBikes().then((response) => {
            if (response.isError) {
                enqueueSnackbar("Could not get station bikes", {variant: "error"});
            } else {
                setBikes(response.data?.bikes.filter(bike => bike.station?.id === props.stationId) || []);
            }
        });
        getMalfunctions().then((response) => {
            if (response.isError) {
                enqueueSnackbar("Could not get malfunctions", {variant: "error"});
            } else {
                let bikesIds = bikes.map(bike => bike.id);
                setMalfunctions(response.data?.malfunctions.filter(m => bikesIds.includes(m.bikeId)) || []);
            }
        });
    }, [enqueueSnackbar, props.stationId, bikes]);

    return (<React.Fragment>
        <div className={classes.inlineHeader}>
            <Typography variant="h6" gutterBottom>
            Station details:
            </Typography>
            <Button color="primary" disabled>
                Edit
            </Button>
        </div>
        <div className={classes.information}>
            <div id={"child_status_"+station?.id}> Status: {station?.status} </div>
            <div id={"child_active_"+station?.id}>Active bikes: {station?.activeBikesCount}</div>
            <div id={"child_name_"+station?.id}>Name: {station?.name}</div>
        </div>
        <div>
            <Typography variant="subtitle1" gutterBottom>
            All Bikes:
            </Typography>
            <BikeTable setBikes={setBikes} bikes={bikes} noAction={true}/>
        </div>
        <div>
            <Typography variant="subtitle1" gutterBottom>
            Malfuncions:
            </Typography>
            <MalfunctionsTable setMalfunctions={setMalfunctions} malfunctions={malfunctions}/>
        </div>
    </React.Fragment>);
};

export default StationsTableChild;
