import {
    Button,
    createStyles,
    Dialog,
    DialogContent,
    DialogTitle, makeStyles, TextField
} from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import React, { ChangeEvent, FormEvent, FormEventHandler, useState } from "react";
import { addStation } from "../../api/stations/addStation";
import { Station } from "../../models/station";

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
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        form: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly"
        },
        buttons: {
            display: "flex",
            justifyContent: "flex-end"
        },
        button: {
            marrgin: "0.5em"
        }
    })
);

export interface AddStationDialogProps {
    setStations: (value: React.SetStateAction<Station[]>) => void;
}

const AddBikeDialog = (props: AddStationDialogProps) => {
    const classes = useStyles()
    const [open, setOpen] = useState<boolean>(false);
    const [name, setName] = useState<string>("Unnamed station");
    const [bikeLimit, setBikeLimit] = useState<number>(10);
    const [limitError, setLimitError] = useState<boolean>(false);
    const {enqueueSnackbar} = useSnackbar();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleBikeLimitChange = (event: ChangeEvent<HTMLInputElement>) => {
        let tmpString = event.target.value;
        let tmp = parseInt(tmpString);
        if (isNaN(tmp)) {
            setLimitError(true);
            return;
        }

        setLimitError(false);
        setBikeLimit(tmp);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        addStation(name, bikeLimit).then(response => {
            if (response.isError)
                enqueueSnackbar("Failed to add station", {variant: "error"});
            else if (response.data) {
                const addedStation = response.data;
                props.setStations(prev => [...prev, addedStation]);
            }
        });
        setOpen(false);
    };

    return (
        <div>
            <Button id='add-station-button' className={classes.addButton} variant="contained" color="primary"
                    onClick={handleClickOpen}>
                Add
            </Button>
            <Dialog id='add-station-dialog' open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create station</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit} className={classes.form}>
                        <TextField
                            id='station-name-field'
                            label="Name"
                            onChange={handleNameChange}/>
                        <TextField
                            id='station-limit-field'
                            label="Bike limit"
                            error={limitError}
                            onChange={handleBikeLimitChange}
                            defaultValue={bikeLimit.toString()}/>
                        <div className={classes.buttons}>
                            <Button className={classes.button} onClick={handleCancel} color="primary">
                                Cancel
                            </Button>
                            <Button className={classes.button} type="submit" color="primary">
                                Add
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddBikeDialog;