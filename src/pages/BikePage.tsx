import { Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { getAllBikes } from "../api/bikes/getBikes";
import AddBikeDialog from "../components/AddBikeDialog";
import BikeTable from "../components/BikesTable";
import { Bike } from "../models/bike";
import React from "react";

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

const BikePage = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [bikes, setBikes] = useState<Bike[]>([]);

  useEffect(() => {
    getAllBikes().then((res) => {
      if (res.isError) {
        enqueueSnackbar("Could not get all bikes", { variant: "error" });
      } else {
        setBikes(res.data || []);
      }
    });
  }, [enqueueSnackbar]);  

  return (
    <Grid container className={classes.content}>
      <div>
        <AddBikeDialog setBikes={setBikes} />
        <BikeTable setBikes={setBikes} bikes={bikes} />
      </div>
    </Grid>
  );
};

export default BikePage;
