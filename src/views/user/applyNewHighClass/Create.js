import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import {
  Paper, Typography, Grid, TextField, Button
} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookOpen, faSchool, faCalendarDay, faClock
} from '@fortawesome/free-solid-svg-icons';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import zhTW from 'date-fns/locale/zh-TW'
import {
  MuiPickersUtilsProvider,
  TimePicker, DatePicker
} from '@material-ui/pickers';
import { Alert, AlertTitle } from '@material-ui/lab';
import { newApplyNewHighClass } from '../../../api/user/api';
import { toast } from 'react-toastify';


const CTimePicker = (props) => {
  return (
    <Grid
      item xs={12} md={4} justify='center'
      container alignItems="flex-end" spacing={1}
    >
      <Grid item xs='auto'>
        <FontAwesomeIcon icon={faClock} size="lg" />
      </Grid>
      <Grid item xs={10}>
        <TimePicker
          clearable
          ampm={false}
          fullWidth
          minutesStep={5}
          id={props.id}
          invalidDateMessage="格式錯誤"
          label={props.label}
          value={props.value}
          onChange={props.onChange}
        />
      </Grid>
    </Grid>
  );
}


const useStyles = makeStyles((theme) => ({
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
    textAlign: 'center',
  }
}));

const Create = () => {
  const classes = useStyles();
  const history = useHistory();
  const [classDate, setClassDate] = useState(new Date());
  const [className, setClassName] = useState("");
  const [classroom, setClassroom] = useState("");
  const [classStartTime, setClassStartTime] = useState(new Date());
  const [classEndTime, setClassEndTime] = useState(new Date());
  const [errorMsg, setErrorMsg] = useState("");
  const [errorComponent, setErrorComponent] = useState([]);
  const isLogin = useSelector(state => state.isLogin);
  const ErrorMsg = () => {
    if (errorMsg === "")
      return null;
    return (
      <Alert severity='error'>
        <AlertTitle>請注意</AlertTitle>
        {errorMsg}
      </Alert>
    );
  }
  if (!isLogin) {
    return (
      <Redirect to="/" />
    )
  }
  const submit = () => {
    const options = {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
    };
    const errorList = [];
    let errorMsg = "";
    let errorOccurred = false;
    if (className === "") {
      errorMsg += "未填寫課程名稱 ";
      errorList.push("className");
      errorOccurred = true;
    }
    if (classroom === "") {
      errorMsg += "未填寫上課教室 ";
      errorList.push("classroom");
      errorOccurred = true;
    }
    if (classStartTime >= classEndTime) {
      errorMsg += "結束時間大於開始時間";
      errorOccurred = true;
    }
    setErrorMsg(errorMsg);
    setErrorComponent(errorList);
    if (errorOccurred)
      return;
    const start = classStartTime.getHours() + ":" + classStartTime.getMinutes();
    const end = classEndTime.getHours() + ":" + classEndTime.getMinutes();
    const month = parseInt(classDate.getMonth())
    const date = classDate.getFullYear() + "-" + String(month+1) + "-" + classDate.getDate()
    newApplyNewHighClass(date, start, end, className, classroom)
      .then((rs) => {
        const data = rs.data;
        toast.info(data.message, options);
        history.push('/');
      })
      .catch((err) => {
        const data = err.response.data;
        toast.error(data.message, options);
      })
  }
  return (
    <>
      <Paper className={classes.paper}>
        <Typography component="h4" variant="h4" align="center">
          新增公開觀課
        </Typography>
        <ErrorMsg />
        <div className={classes.box}>
          <Grid container spacing={3} justify='center'>

            <Grid
              container item xs={12} md={6}
               alignItems="flex-end" spacing={1}
            >
              <Grid item xs='auto'>
                <FontAwesomeIcon icon={faBookOpen} size="lg" />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  id="className"
                  error={errorComponent.includes("className")}
                  value={className}
                  onChange={(event) => setClassName(event.target.value)}
                  label="課程名稱"
                />
              </Grid>
            </Grid>
            <Grid
              item xs={12} md={6} justify='center'
              container alignItems="flex-end" spacing={1}
            >
              <Grid item xs='auto'>
                <FontAwesomeIcon icon={faSchool} size="lg" />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  id="classroom"
                  error={errorComponent.includes("classroom")}
                  value={classroom}
                  onChange={(event) => setClassroom(event.target.value)}
                  label="上課教室"
                />
              </Grid>
            </Grid>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={zhTW}>
              <Grid
                item xs={12} md={4} justify='center'
                container alignItems="flex-end" spacing={1}
              >
                <Grid item xs='auto'>
                  <FontAwesomeIcon icon={faCalendarDay} size="lg" />
                </Grid>
                <Grid item xs={10}>
                  <DatePicker
                    id="classDate"
                    label="上課日期"
                    fullWidth
                    disablePast
                    invalidDateMessage="格式錯誤"
                    format="yyyy/MM/dd"
                    value={classDate}
                    onChange={setClassDate}
                  />
                </Grid>
              </Grid>
              <CTimePicker
                id="classStartTime"
                label="上課開始時間"
                value={classStartTime}
                onChange={setClassStartTime}
              />
              <CTimePicker
                id="classEndTime"
                label="上課結束時間"
                error
                value={classEndTime}
                onChange={setClassEndTime}
              />
            </MuiPickersUtilsProvider>
            <Grid
              item xs={12} md={4} justify='center'
              container alignItems="flex-end" spacing={1}
            >
              <Button
                fullWidth
                onClick={submit}
                variant="contained"
                color="primary"
              >
                提交
              </Button>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </>
  )
}

export default Create
