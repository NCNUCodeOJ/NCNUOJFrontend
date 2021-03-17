import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  Paper, Typography, Grid, Button,
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
  },
  button: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(1),
  },
  text: {
    textAlign: 'center'
  }
}));

const HomeWorkList = () => {
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
        作業清單
      </Typography>
      <Paper className={classes.paper}>
        <div className={classes.box}>
          <Grid flexWrap="wrap" spacing={3} justify='center' >
            <p className={classes.text}>剩餘時間</p>
            <Button
              className={classes.button}
              fullWidth
              variant="contained"
              color="primary"
              href="#/homework/homeWorkPage"
            >
              HW 1 : Hello World
            </Button>
            <Button
              className={classes.button}
              fullWidth
              variant="contained"
              color="primary"
            >
              HW 2 : 判斷閏年
            </Button>
            <Button
              className={classes.button}
              fullWidth
              variant="contained"
              color="primary"
            >
              HW 3 : 八皇后
            </Button>
          </Grid>
        </div>
      </Paper>
    </>
  )
}

// export default ExamList
