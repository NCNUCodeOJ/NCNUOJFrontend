import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, Typography, Link,
  Accordion, AccordionSummary, AccordionDetails
} from '@material-ui/core/';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookOpen, faSchool, faCalendarDay, faClock
} from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const Item = (props) => {
  const x = props.item
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        id={x.id}
      >
        <Typography className={props.className}>
          <FontAwesomeIcon icon={faBookOpen} />
          {" " + x.date + " " + x.teacherName + " " + x.className}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          <Grid item md={4} xs={12}>
            <Typography align="center">
              <FontAwesomeIcon icon={faSchool} />
              {" 授課教室：" + x.classroom}
            </Typography>
          </Grid>
          <Grid item md={4} xs={12}>
            <Typography align="center">
              <FontAwesomeIcon icon={faClock} />
              {" 時間：" + x.startTime.slice(0, 5) + " ~ " + x.endTime.slice(0, 5)}
            </Typography>
          </Grid>
          <Grid item md={4} xs={12}>
            <Link
              href={x.calendarLink} target="_blank"
              color='inherit' rel="noopener" underline="none"
            >
              <Typography align="center">
                <FontAwesomeIcon icon={faCalendarDay} />
                {" 新增google行事曆"}
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}


const Dashboard = () => {
  const classes = useStyles();
  const [allClass, setAllClass] = useState([])
  useEffect(() => {
    setAllClass([
      {
          "id": 15,
          "teacherName": "vincentinttsh",
          "department": "dev",
          "className": "jskalsd",
          "classroom": "kdajsdla",
          "date": "2021-05-14",
          "startTime": "17:26:00",
          "endTime": "22:26:00",
          "calendarLink": "http://www.google.com/calendar/event?action=TEMPLATE&text=公開授課（vincentinttsh）&dates=20210514T172600/20210514T222600&details=devjskalsd公開授課%0A授課老師：vincentinttsh&location=kdajsdla&trp=false"
      },
      {
          "id": 12,
          "teacherName": "vincentinttsh",
          "department": "dev",
          "className": "sadasdsd",
          "classroom": "Assad",
          "date": "2021-05-28",
          "startTime": "03:37:00",
          "endTime": "23:37:00",
          "calendarLink": "http://www.google.com/calendar/event?action=TEMPLATE&text=公開授課（vincentinttsh）&dates=20210528T033700/20210528T233700&details=devsadasdsd公開授課%0A授課老師：vincentinttsh&location=Assad&trp=false"
      },
      {
          "id": 13,
          "teacherName": "vincentinttsh",
          "department": "dev",
          "className": "adds",
          "classroom": "adasd",
          "date": "2021-06-19",
          "startTime": "09:44:00",
          "endTime": "23:44:00",
          "calendarLink": "http://www.google.com/calendar/event?action=TEMPLATE&text=公開授課（vincentinttsh）&dates=20210619T094400/20210619T234400&details=devadds公開授課%0A授課老師：vincentinttsh&location=adasd&trp=false"
      },
      {
          "id": 10,
          "teacherName": "vincentinttsh",
          "department": "dev",
          "className": "kjljkj",
          "classroom": "l/ml",
          "date": "2021-11-11",
          "startTime": "16:29:00",
          "endTime": "23:29:00",
          "calendarLink": "http://www.google.com/calendar/event?action=TEMPLATE&text=公開授課（vincentinttsh）&dates=20211111T162900/20211111T232900&details=devkjljkj公開授課%0A授課老師：vincentinttsh&location=l/ml&trp=false"
      },
      {
          "id": 11,
          "teacherName": "vincentinttsh",
          "department": "dev",
          "className": "kjlkjlkj",
          "classroom": "hjkhkjhk",
          "date": "2021-11-13",
          "startTime": "11:30:00",
          "endTime": "23:30:00",
          "calendarLink": "http://www.google.com/calendar/event?action=TEMPLATE&text=公開授課（vincentinttsh）&dates=20211113T113000/20211113T233000&details=devkjlkjlkj公開授課%0A授課老師：vincentinttsh&location=hjkhkjhk&trp=false"
      }
  ]);
  }, []);
  return (
    <div className={classes.root}>
      {
        allClass.map((x) => (
          <Item key={x.id} item={x} className={classes.heading} />
        ))
      }
    </div>
  );
}

export default Dashboard