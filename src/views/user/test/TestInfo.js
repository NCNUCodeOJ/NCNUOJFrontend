import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
    Paper, Typography, Grid,
    TextField, Button, 
} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import 'date-fns';


const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
    },
    paper: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(1),
            padding: theme.spacing(3),
        },
    },
    box: {
        textAlign: 'left',
    }
}));

const Create = () => {
    const classes = useStyles();
    const isLogin = useSelector(state => state.isLogin);
    if (!isLogin) {
        return (
            <Redirect to="/" />
        )
    }

    return (
        <>
            <Typography component="h4" variant="h4" align="center">
                TEST1
        </Typography>
            <Paper className={classes.paper}>
                <div className={classes.box}>
                    <Grid flexWrap="wrap" spacing={3} justify='center' >
                        
                    </Grid>

                </div>
            </Paper>
        </>
    )
}

export default Create
