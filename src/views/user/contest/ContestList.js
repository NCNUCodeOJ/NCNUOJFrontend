import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch} from 'react-redux';
import {
  Grid, Typography,
  Accordion, AccordionSummary, AccordionDetails, Button
} from '@material-ui/core/';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookOpen, faClock
} from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: '10px'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const Item = (props) => {
  const x = props.item
  const dispatch = useDispatch();
  const handleEnterContestClick = () => {
    dispatch({ type: 'set', isEnterContest: true});
  };

  return (
    <>
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        id={x.id}
      >
        <Typography className={props.className}>
          <FontAwesomeIcon icon={faBookOpen} />
          {` ${x.homeWorkName} ----- 剩餘時間 : ${x.remainingTime}`}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={5}>
          <Grid item md={4} xs={12}>
            <Typography align="center">
              <FontAwesomeIcon icon={faClock} />
              {"開始時間：" + x.startTime}
            </Typography>
          </Grid>
          <Grid item md={4} xs={12}>
            <Typography align="center">
              <FontAwesomeIcon icon={faClock} />
              {"到期時間：" + x.endTime}
            </Typography>
          </Grid>
          <Grid item md={4} xs={12}>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              href="#contest/ContestIntro"
              onClick={handleEnterContestClick}
            >
              進入
            </Button>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
    </>
  );
}


const ContestList = () => {
  const classes = useStyles();
  const [allClass, setAllClass] = useState([])
  useEffect(() => {
    setAllClass([
      {
          "id": 15,
          "homeWorkName": "第一單元",
          "department": "dev",
          "remainingTime": "21小時",
          "startTime": "2021-02-28 00:00",
          "endTime": "2021-03-03 23:59",
      },
      {
          "id": 12,
          "homeWorkName": "第二單元",
          "department": "dev",
          "remainingTime": "2天",
          "startTime": "2021-02-29 00:00",
          "endTime": "2021-03-05 00:00",
      },
      {
          "id": 13,
          "homeWorkName": "第三單元",
          "department": "dev",
          "remainingTime": "7天",
          "startTime": "2021-02-29 09:44",
          "endTime": "2021-02-29 23:44:00",
      },
      {
          "id": 10,
          "homeWorkName": "第四單元",
          "department": "dev",
          "remainingTime": "13天",
          "startTime": "2021-02-29 16:29:00",
          "endTime": "2021-02-29 23:29:00",
      },
      {
          "id": 11,
          "homeWorkName": "第五單元",
          "department": "dev",
          "remainingTime": "28天",
          "startTime": "2021-02-29 11:30:00",
          "endTime": "2021-02-29 23:30:00",
      }
  ]);
  }, []);
  return (
    <>
      <Typography align="center" variant="h4">
        比賽清單
      </Typography>
      <div className={classes.root}>
        {
          allClass.map((x) => (
            <Item key={x.id} item={x} className={classes.heading} />
          ))
        }
      </div>
    </>
  );
}

export default ContestList
