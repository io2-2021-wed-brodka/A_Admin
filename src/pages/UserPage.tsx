import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { ExtendedUser } from "../models/extendedUser"
import UserTable from "../components/UserTable";
import { getAllUsers } from "../api/users/getUsers";
import { getBlockedUsers } from "../api/users/getBlockedUsers";


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

const UserPage = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [users, setUsers] = useState<ExtendedUser[]>([]);

  useEffect(() => {
    getAllUsers().then((res) => {
      if (res.isError) {
        enqueueSnackbar("Could not get all users", { variant: "error" });
      } else {
        getBlockedUsers().then((blockedRes) => {
          if (res.isError) {
            enqueueSnackbar("Could not get blocked users", { variant: "error" });
            return;
          } else {
            const extendedUsers: ExtendedUser[] = res.data?.users.filter(u => !blockedRes.data?.users.some(u2 => u.id === u2.id ))
                                                    .map(u => { return { id: u.id, name: u.name, blocked: false} })
                                                    .concat(blockedRes.data?.users.map(u => { return { id: u.id, name: u.name, blocked: true} } ) ?? []) ?? [];
            setUsers(extendedUsers);
          }
        });        
      }
    });
  }, [enqueueSnackbar]);  

  return (
    <Grid className={classes.content}>
      <div>
        <UserTable setUsers={setUsers} users={users} />
      </div>
    </Grid>
  );
};

export default UserPage;
