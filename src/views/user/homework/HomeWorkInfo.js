import React, { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Redirect, useHistory } from 'react-router-dom';
import {
  Paper, Typography, TextField,
  Button, Grid, FormControl,
  InputLabel, NativeSelect
} from '@material-ui/core/';
import {
  Star, StarHalf, StarBorder,
  FileCopy,
  FileCopyOutlined
} from '@material-ui/icons/';
import { makeStyles } from '@material-ui/core/styles';
import 'date-fns';
import grey from '@material-ui/core/colors/grey';
import { Alert, AlertTitle } from '@material-ui/lab';
import { newHomeWorkSubmition } from '../../../api/user/api';


const whiteGrey = grey[50];
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
    textAlign: 'left',
  },
  filezone: {
    minWidth: 300,
    minHeight: 100,
    background: whiteGrey,
  },
  filebutton: {
    margin: 'auto',
    marginTop: 25,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));
function countHomeWorkStar(difficulty) {
  var stars = [];
  var i = 0;
  while (i < difficulty) {
    if (difficulty - i !== 0.5) {
      stars.push(<Star />);
    } else {
      stars.push(<StarHalf />);
    }
    i++;
  }
  if (i !== 5) {
    var remainDifficulty = 5 - i;
    for (var i = 0; i < remainDifficulty; i++) {
      stars.push(<StarBorder />);
    }
  }
  return stars;
}

// const CopyArea = () => {
//   let copyAreaRef = useRef([]);
//   const [allTestData, setTestData] = useState([]);
//   useEffect(() => {
//     setTestData([
//       {
//         "id": "1",
//         "inputvalue": "1 1",
//         "outputvalue": "2"

//       }, {
//         "id": "2",
//         "inputvalue": "1 2",
//         "outputvalue": "3"
//       }]);
//   }, []);
//   copyAreaRef.current = allTestData.map(
//     (ref, index) => copyAreaRef.current[index] = React.createRef()
//   )
//   const onCopyClick = (e) => {
//     // console.log(e);
//     // let d = document.getElementById(e.target.id+"in")
//     // d.focus()
//     // d.select()
//     // document.execCommand("copy");
//   };
//   return (
//     allTestData.map((value) => {
//       return (
//         <>
//           <Grid item sx={12} md={6}>
//             <Typography variant="h6" >
//               標準輸入:
//               <Button>
//                 <FileCopyOutlined id={value.id} onClick={onCopyClick} />
//               </Button>
//             </Typography>
//             <TextField
//               id={value.id + "in"}
//               defaultValue={value.inputvalue}
//               ref={copyAreaRef.current[Object.keys(value)[1]]}
//               InputProps={{
//                 readOnly: true,
//               }}
//               variant="outlined"
//             />
//           </Grid>
//           <Grid item sx={12} md={6}>
//             <Typography variant="h6" >
//               標準輸出:
//               <Button>
//                 <FileCopyOutlined onClick={onCopyClick(this)} />
//               </Button>
//             </Typography>
//             <TextField
//               id={value.id + "out"}
//               defaultValue={value.outputvalue}
//               ref={copyAreaRef.current[Object.keys(value)[2]]}
//               InputProps={{
//                 readOnly: true,
//               }}
//               variant="outlined"
//             />
//           </Grid>
//         </>
//       );
//     })
//   );
// }

const Info = () => {
  const classes = useStyles();
  const history = useHistory();
  const isLogin = useSelector(state => state.isLogin);
  var difficulty = 3.5;
  const difficultyStars = countHomeWorkStar(difficulty);
  const [state, setState] = React.useState({
    language: '',
    name: 'hai',
  });
  const handleChange = (event) => {
    const language = event.target.name;
    setState({
      ...state,
      [language]: event.target.value,
    });
  };
  const [errorMsg, setErrorMsg] = useState("");
  const [errorComponent, setErrorComponent] = useState([]);
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
    setErrorMsg(errorMsg);
    setErrorComponent(errorList);
    if (errorOccurred)
      return;
    newHomeWorkSubmition()
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
      <Typography component="h4" variant="h4" align="left">
        HW1: Hello World!
      </Typography>
      <Paper className={classes.paper}>
        <Typography variant="h6"  >
          難度:
          {difficultyStars}
        </Typography>
        <Typography variant="h6" color="error">
          剩餘時間:
        </Typography>
        <div className={classes.box}>
          <Typography variant="h6" >
            說明:
          </Typography>
          <Typography variant="h6" >
            輸入:
          </Typography>
          <Typography variant="h6" >
            輸出:
          </Typography>
          <Grid container spacing={3}>
            {/* <CopyArea /> */}
          </Grid>
          <Grid item sx={12} md={10}>
            <Typography variant="h6" >
              評分標準:
            </Typography>
          </Grid>
        </div>
        <Grid container spacing={1} alignItems="center">
          <Grid container item xs={3} md={1} >
            <Typography variant="h6">
              繳交區:
            </Typography>
          </Grid>
          <Grid container item xs={10} md={5} >
            <FormControl className={classes.formControl}>
              <InputLabel shrink htmlFor="age-native-label-placeholder">
                Language
              </InputLabel>
              <NativeSelect
                value={state.language}
                onChange={handleChange}
                name='language'
              >
                <option value="C">C</option>
                <option value="PHP">PHP</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
              </NativeSelect>
            </FormControl>

          </Grid>
          <Grid item xs={12} md={10} spacing={3}
            alignItems="center">
            <Paper variant="outlined" className={classes.filezone} align="center">
              <TextField
                id="ShortAnswer"
                rows={8}
                variant="outlined"
                multiline
                fullWidth
              // onChange={(event) => setShortAnswer(event.target.value)}
              // error={errorComponent.includes("ShortAnswer")}
              />
            </Paper>
          </Grid>
        </Grid >
        <Grid
          container spacing={1} justify="center">
          <Grid item xs={6} md={4}>
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
      </Paper >

    </>
  )
}

export default Info
