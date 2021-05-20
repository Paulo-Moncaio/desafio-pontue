import { useState } from 'react';
import './Login.css';
import loginAuth from "../../services/loginAuth";
import { Redirect, useHistory } from 'react-router';
import IsAuthenticated from '../../services/auth';
import logo from '../../img/logo-full-white.png'
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { CardMedia, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        padding: 8,
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
        backgroundColor: ''
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    logo: {
        marginTop: theme.spacing(8),
        width: '75%',
        alignContent: 'center',
        margin: "auto",
    }
}));

export default function Login() {
    const classes = useStyles();
    const [autenticado, setautenticado] = useState(IsAuthenticated())
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    let history = useHistory()

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await loginAuth(email, password);
            history.push('/Dashboard')
        } catch (error) {
            setError('Erro na autenticaçao')
        }
    }


    return (
        autenticado ? (
            <Redirect to={{ pathname: '/Dashboard' }} />
        ) : (
            <Container component='backgroud' className="Backgroud" maxWidth="false">

                <Container component="main" maxWidth="xs" >


                    <CardMedia
                        className={classes.logo}
                        component="img"
                        alt="logo"
                        height="100%"
                        alignSelf='center'
                        image={logo}

                    />

                    <Paper className={classes.paper} elevation={3}>
                        <form className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={(e) => handleSubmit(e)}
                            >
                                Entrar
                        </Button>
                        </form>
                    </Paper>
                </Container>
            </Container>
        )
    );
}

