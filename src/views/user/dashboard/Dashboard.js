import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, Typography, Link,
  Accordion, AccordionSummary, AccordionDetails
} from '@material-ui/core/';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getHighClass } from '../../../api/page/api'
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
