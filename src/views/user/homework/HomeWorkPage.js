import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, Typography, Link,
  Accordion, AccordionSummary, AccordionDetails, AccordionActions, Button
} from '@material-ui/core/';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookOpen,
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
          {" " + x.title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          <Grid item md={10} xs={12}>
            <Typography align="center">
              {x.content}
            </Typography>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}


const HomeWorkPage = () => {
  const classes = useStyles();
  const [allClass, setAllClass] = useState([])
  useEffect(() => {
    setAllClass([
      {
        "id": 15,
        "title": "作業難度",
        "content": "***(用 icon 代替)"
      },
      {
        "id": 12,
        "title": "作業說明",
        "content": "在 cmd 上印出 Hello World 字樣rjwoeijroewihtlkugtkliuwhlerjqljejlkwjwueoruskdfnsdkfjgnakslfjwirgtowerpodkfsdjglrjhejitjoehgsdjgjlekj jlrekjwltijje jwlekrjlwd fjglkfjiwpertjwejgkrjwrjk3ejgeot05jor9ugesidgjkwigjw;oekgjdkljslgkjlk",
      },
      {
        "id": 13,
        "title": "規定輸入",
        "content": "please print Hello World",
      },
      {
        "id": 10,
        "title": "規定輸出",
        "content": "Hello World",
      },
      {
        "id": 11,
        "title": "評分標準",
        "content": "輸入成功 50 %、輸出成功 50 %"
      },
      {
        "id": 16,
        "title": "評分標準",
        "content": "輸入成功 50 %、輸出成功 50 %"
      },
    ]);
  }, []);
  return (
    <div className={classes.root}>
      {
        allClass.map((x) => (
          <Item key={x.id} item={x} className={classes.heading} />
        ))
      }
      <Button variant="contained" color="primary">
        提交
      </Button>
    </div>
  );
}

export default HomeWorkPage

// 1. id 在哪裡設的 2. 為甚麼 div 不能再接一個下去 (要包甚麼父程序) 3. 動態改變左邊 4. return 結構 5. 管理員狀態改變