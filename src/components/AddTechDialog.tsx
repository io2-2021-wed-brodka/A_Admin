import React, {  useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, Theme, createStyles, FormControl, Grid } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { addTech } from '../api/techs/addTech';
import { User } from '../models/user';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {     
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    addButton: {
      margin: theme.spacing(2),
    },
    formControl: {
        minWidth: 160,
    },
  })
);

export interface AddTechDialogProps {
  setTechs: (value: React.SetStateAction<User[]>) => void;
}

const AddTechDialog = (props: AddTechDialogProps) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
    setSubmitted(false);
  }

  const handleClickClose = () => {
    setOpen(false);

    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setSubmitted(false);
  }

  const { enqueueSnackbar } = useSnackbar();

  const handleUsernameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUsername(event.target.value as string);
  };

  const errorUsername = () => {
    return username === '';
  }

  const handlePasswordChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPassword(event.target.value as string);
  };

  const errorPassword = () => {
    console.log("Password: " + password)
    return password === '';
  }

  const handleConfirmPasswordChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setConfirmPassword(event.target.value as string);
  };

  const errorConfirmPassword = () => {
    return confirmPassword === '' || password !== confirmPassword;
  }

  const errorForm = () => {
    return errorUsername() || errorPassword() || errorConfirmPassword();
  }

  const handleSubmit = () => {
    setSubmitted(true);
    if (errorForm()) return;
    const tech = addTech(username, password);
    tech.then(response => {
        if(response.isError)
        {
          enqueueSnackbar("Could not add tech", { variant: "error" });
        }
        else if(response.data)
        {
          props.setTechs(prev => 
            response.data ? 
            prev = [...prev, response.data]
            :          
            prev
          )
        } 
    });

    setSubmitted(false);
    setOpen(false);
  };

  return (
    <div>
      <Button
          className={classes.addButton}
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
      >
        Add
      </Button>
      <Dialog open={open} onClose={handleClickClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Create new tech</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter new tech's username and password.
          </DialogContentText>
          <Grid className={classes.form}>
            <FormControl className={classes.formControl}>
              <TextField 
                required
                error={submitted ? errorUsername() : false} 
                id="username" 
                onChange={handleUsernameChange} 
                label="Username"
                helperText={submitted && errorUsername() ? "Username is required." : " "}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField 
                required 
                error={submitted ? errorPassword() : false} 
                id="password" 
                type="password" 
                onChange={handlePasswordChange} 
                label="Password" 
                helperText={submitted && errorPassword() ? "Password is required." : " "}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField 
                required 
                error={submitted ? errorConfirmPassword() : false} 
                id="confirmPassword" 
                type="password" 
                onChange={handleConfirmPasswordChange} 
                label="Confirm password" 
                helperText={submitted && errorConfirmPassword() ? "Passwords must match." : " "}
              />
            </FormControl>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div> 
  )
}

export default AddTechDialog;
