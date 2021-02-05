import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import {
    Avatar, Button, CssBaseline, Link,
    Paper, Box, Grid, Typography, Backdrop,
    CircularProgress, TextField
} from '@material-ui/core';
import {
    AccountCircle, School, Mail,
    AssignmentInd, Lock, Translate
} from '@material-ui/icons';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { getUserInfo } from '../../../api/page/api';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 12),
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
    textArea: {
        padding: theme.spacing(1, 'auto'),
    },
}));

const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                NCNU IM
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const Register = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const isLogin = useSelector(state => state.isLogin);
    useEffect(() => {
        let isSubscribed = true
        setLoading(true);
        getUserInfo()
            .then(function (response) {
                const data = response.data;
                if (!isLogin && !data.user.is_anonymous) {
                    toast.info('登入成功', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                    });
                }
                if (isSubscribed) {
                    dispatch({ type: 'set', username: data.user.name });
                    dispatch({ type: 'set', isLogin: !data.user.is_anonymous });
                    if (isLogin) {
                        dispatch({ type: 'set', isAdmin: data.user.admin });
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
                toast.error('登入失敗', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }).finally(function () {
                if (isSubscribed) {
                    setLoading(false);
                }
            })
        return () => isSubscribed = false
    }, [isLogin, dispatch])
    if (isLogin) {
        return (
            <Redirect to="/" />
        )
    }
    return (
        <>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Grid container component="main" className={classes.root} >
                <CssBaseline />
                <Grid item xs={false} sm={3} md={5} className={classes.image} />
                <Grid item xs={12} sm={9} md={7} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            註冊
                        </Typography>
                        <form className={classes.form} noValidate >
                            <Grid container className={classes.textArea} alignItems="flex-end">
                                <Grid item xs={1} sm={1} md={1} >
                                    <School />
                                </Grid>
                                <Grid item xs={4} sm={6} md={6} >
                                    <TextField
                                        id="SchoolID"
                                        label="School ID"
                                        placeholder="NCNU"
                                        required />
                                </Grid>
                            </Grid>
                            <Grid container className={classes.textArea} alignItems="flex-end">
                                <Grid item xs={1} sm={1} md={1} >
                                    <AssignmentInd />
                                </Grid>
                                <Grid item xs={6} sm={6} md={6} >
                                    <TextField
                                        id="StudentID"
                                        label="Student ID"
                                        placeholder="107213023"
                                        required />
                                </Grid>
                            </Grid>
                            <Grid container className={classes.textArea} alignItems="flex-end">
                                <Grid item xs={1} sm={1} md={1} >
                                    <Mail />
                                </Grid>
                                <Grid item xs={6} sm={6} md={6}>
                                    <TextField
                                        id="Email"
                                        label="Email"
                                        required />
                                </Grid>
                            </Grid>
                            <Grid container className={classes.textArea} alignItems="flex-end">
                                <Grid item xs={1} sm={1} md={1}>
                                    <AccountCircle />
                                </Grid>
                                <Grid item xs={6} sm={6} md={6}>
                                    <TextField
                                        id="UserName"
                                        label="User Name"
                                        required />
                                </Grid>
                            </Grid>
                            <Grid container className={classes.textArea} alignItems="flex-end">
                                <Grid item xs={1} sm={1} md={1}>
                                    <Lock />
                                </Grid>
                                <Grid item xs={6} sm={6} md={6}>
                                    <TextField
                                        id="Password"
                                        label="Password"
                                        required />
                                </Grid>
                            </Grid>
                            <Grid container className={classes.textArea} alignItems="flex-end">
                                <Grid item xs={1} sm={1} md={1}>
                                    <Translate />
                                </Grid>
                                <Grid item xs={6} sm={6} md={6}>
                                    <TextField
                                        id="RealName"
                                        label="Real Name" />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                href="#login"
                                className={classes.submit}
                            >
                                註冊
              </Button>
                            <Box mt={5}>
                                <Copyright />
                            </Box>
                        </form>
                    </div>
                </Grid>
            </Grid>
        </>
    );
}

export default Register;