import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, Button, Paper,
  TextField, CssBaseline, Box
} from '@material-ui/core/';
import {
  Photo, AccountCircle, School,
  AssignmentInd, Lock, Translate,
  Mail
} from '@material-ui/icons/';
import { getHighClass } from '../../../api/page/api'

const useStyles = makeStyles((theme) => ({
  textArea: {
    padding: theme.spacing(1, 'auto'),
  },
  paper: {
    width: '100%',
    textAlign: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(1),
      padding: theme.spacing(3),
    },
  }
}));



const Profile = () => {
  const classes = useStyles();
  const [allClass, setAllClass] = useState([])
  useEffect(() => {
    getHighClass()
      .then(function (rs) {
        setAllClass(rs.data.class);
      })
      .catch(function (err) {
        const data = err;
        console.log(data)
      })
  }, []);
  return (
    <Grid container component={Paper} className={classes.paper}>

      <CssBaseline />
      <Grid item xs={4} sm={5} md={5}>
        <Photo />
      </Grid>
      <Grid item xs={8} sm={7} md={7} >
        <Grid container className={classes.textArea} alignItems="flex-end">
          <Grid item xs={1} sm={2} md={1} >
            <School />
          </Grid>
          <Grid item xs={4} sm={6} md={6} >
            <Grid container className={classes.textArea} alignItems="flex-end">
              <TextField
                fullWidth
                id="SchoolID"
                label="School ID"
                placeholder="NCNU"
                required />
            </Grid>
          </Grid>
        </Grid>
        <Grid container className={classes.textArea} alignItems="flex-end">
          <Grid item xs={1} sm={2} md={1} >
            <AssignmentInd />
          </Grid>
          <Grid item xs={4} sm={6} md={6} >
            <TextField
              fullWidth
              id="StudentID"
              label="Student ID"
              placeholder="107213023"
              required />
          </Grid>
        </Grid>
        <Grid container className={classes.textArea} alignItems="flex-end">
          <Grid item xs={1} sm={2} md={1} >
            <Mail />
          </Grid>
          <Grid item xs={4} sm={6} md={6}>
            <TextField
              fullWidth
              id="Email"
              label="Email"
              required />
          </Grid>
        </Grid>
        <Grid container className={classes.textArea} alignItems="flex-end">
          <Grid item xs={1} sm={2} md={1}>
            <AccountCircle />
          </Grid>
          <Grid item xs={4} sm={6} md={6}>
            <TextField
              fullWidth
              id="UserName"
              label="User Name"
              required />
          </Grid>
        </Grid>
        <Grid container className={classes.textArea} alignItems="flex-end">
          <Grid item xs={1} sm={2} md={1}>
            <Lock />
          </Grid>
          <Grid item xs={4} sm={6} md={6}>
            <TextField
              fullWidth
              id="Password"
              label="Password"
              required />
          </Grid>
        </Grid>
        <Grid container className={classes.textArea} alignItems="flex-end">
          <Grid item xs={1} sm={2} md={1}>
            <Translate />
          </Grid>
          <Grid item xs={4} sm={6} md={6}>
            <TextField
              fullWidth
              id="RealName"
              label="Real Name" />
          </Grid>
        </Grid>

      </Grid>
      <Box mx={"auto"} my={2}>
        <Grid
          item xs={12} md={6} justify='center'
          container alignItems="center" spacing={1}
        >
          <Button
            fullWidth
            // onClick={submit}
            variant="contained"
            color="primary"
          >
            修改
              </Button>
        </Grid>
      </Box>
    </Grid>
  );
}

export default Profile
