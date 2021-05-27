import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, Theme, createStyles, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { addBike } from '../api/bikes/addBike';
import { Bike } from '../models/bike';
import { getAllStations } from '../api/stations/getStations';
import { Station } from '../models/station';

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

export interface AddBikeDialogProps {
  setBikes: (value: React.SetStateAction<Bike[]>) => void;  
}

const AddBikeDialog = (props: AddBikeDialogProps) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  
  const [stations, setStations] = useState<Station[]>([]);  
  const [stationId, setStationId] = useState<string>('');

  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStationId(event.target.value as string);
  };

  const handleSubmit = () => {
    const bike = addBike(stationId);
    bike.then(response => {
      if(response.isError)
      {
        enqueueSnackbar("Could not add bike", { variant: "error" });
      }
      else if(response.data)
      {
        const data = response.data;
        props.setBikes(prev => [...prev, data])        
      }        
    });        
    
    setOpen(false);
  };

  useEffect(() => {
    getAllStations().then(res => {
      if (res.isError) {
          enqueueSnackbar("Could not retrive stations", { variant: "error" });
          return;
      }
      setStations(res.data?.stations || []);
    });
  }, [enqueueSnackbar]);

  return (
    <div>      
      <Button
          id="add-bike-button"
          className={classes.addButton}
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
        >
          Add
        </Button>
      <Dialog id="add-bike-dialog" open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create bike</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select a station to assign the bike to.
          </DialogContentText>
          <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Station</InputLabel>
        <Select
          id="station-select"
          value={stationId}
          onChange={handleChange}
        >
          {
            stations.map((station) => 
              <MenuItem id="selectable-station" value={station.id}>{station.name}</MenuItem>
            )
          }
        </Select>
      </FormControl>
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
}

export default AddBikeDialog;
