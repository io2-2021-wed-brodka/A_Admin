import React, {  } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme, createStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { ExtendedUser } from '../models/extendedUser';
import { blockUser } from '../api/users/blockUser';
import { unblockUser } from '../api/users/unblockUser';

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
    blockButton: {
      color: "#ee6002"
    },
    unblockButton: {
        color: "#09af00"
    },
  })
);

export interface UserTableProps {
    setUsers: (value: React.SetStateAction<ExtendedUser[]>) => void;
    users: ExtendedUser[];
}

const UserTable = (props: UserTableProps) => {
    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar();


    const handleBlock = (id: string) => {
      blockUser(id).then((response) => {
        if (response.isError) {
          enqueueSnackbar(`Failed to block bike: ${response.errorMessage}`, { variant: "error" });
        } else {
          props.setUsers(prev => prev.map(b => b.id === id ? {id: b.id, name: b.name, blocked: true} : b));
        }
      });
    };

    const handleUnblock = (id: string) => {
      unblockUser(id).then((response) => {
        if (response.isError) {
          enqueueSnackbar(`Failed to unblock bike: ${response.errorMessage}`, { variant: "error" });
        } else {
          props.setUsers(prev => prev.map(b => b.id === id ? {id: b.id, name: b.name, blocked: false} : b));
        }
      });
    };

    return (
        <TableContainer component={Paper}>
          <Table id="users-table" className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left" width="100%">Name</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell align="left">
                    {user.name ?? "Nameless"}
                  </TableCell>
                  <TableCell align="center">
                    {!user.blocked ?
                      <Button className={classes.blockButton} onClick={() => handleBlock(user.id)}>
                          Block
                      </Button> :
                      <Button className={classes.unblockButton} onClick={() => handleUnblock(user.id)}>
                          Unblock
                      </Button>
                    } 
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    )
}

export default UserTable;
