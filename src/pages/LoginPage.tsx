import { Button, Container, CssBaseline, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router';
import { login } from '../api/login/login';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export interface LoginPageProps {
    setToken: (newToken: string) => void;
    setUserName: (userName: string) => void;
}

const LoginPage = (props: LoginPageProps) => {
    const classes = useStyles();
    const history = useHistory()

    const { enqueueSnackbar } = useSnackbar();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        login(username, password).then(r => {
            if (r.isError) {
                enqueueSnackbar(`Login failed: ${r.errorMessage}`, { variant: "error" });
            }
            else if(r.data?.role !== "admin")
            {
                enqueueSnackbar(`Login failed: you are not an administrator`, { variant: "error" });
            }
            else {
                props.setToken(r.data?.token || '');
                props.setUserName(username);
                history.push("/");
            }
        });
    }

    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography id='signin-header' component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} onSubmit={handleFormSubmit}>
                        <TextField
                            id="username-field"
                            label={"Login"}
                            value={username}
                            onChange={handleUsernameChange}
                            autoComplete="username"
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            autoFocus
                        />
                        <TextField
                            id="password-field"
                            label={"Password"}
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            autoComplete="current-password"
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                        />

                        <Button
                            id="sign-in-button"
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                         </Button>
                    </form>
                </div>
            </Container>
        </>
    )
}

export default LoginPage;