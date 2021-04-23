import {
    Button,
    createStyles,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle, makeStyles, TextField
} from "@material-ui/core";
import {Theme} from "@material-ui/core/styles";
import {Station} from "../../models/station";
import React from "react";
import {useSnackbar} from "notistack";
import {addStation} from "../../api/stations/addStation";

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
    })
);

export interface AddStationDialogProps {
    setStations: (value: React.SetStateAction<Station[]>) => void;
}

const AddBikeDialog = (props: AddStationDialogProps) => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState("Unnamed station");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleSubmitName = (event: React.FormEvent<HTMLInputElement>) => {
        let name = event.currentTarget.textContent;
        if (name !== null)
            setName(name);
    }

    const handleSubmit = () => {
        const station = addStation(name);
        station.then(response => {
            if (response.isError)
                enqueueSnackbar("Failed to add station", {variant: "error"});
            else
                props.setStations(prev => response.data ? prev = [...prev, response.data] : prev);
        });
        setOpen(false);
    };

    const {enqueueSnackbar} = useSnackbar();

    return (
        <div>
            <Button className={classes.addButton} variant="contained" color="primary" onClick={handleClickOpen}>
                Add
            </Button>
            <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create station</DialogTitle>
                <DialogContent>
                    <TextField label="Name" onSubmit={handleSubmitName}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddBikeDialog;