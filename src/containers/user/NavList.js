import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  List, ListItem, Collapse,
  ListItemIcon, ListItemText,
} from '@material-ui/core';
import {
  ExpandLess, ExpandMore, PersonRounded,
  LaptopMac, Note, ArrowBack, GpsFixedOutlined,
} from '@material-ui/icons/';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChalkboardTeacher, faUserShield
} from '@fortawesome/free-solid-svg-icons';


const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const ListItemLink = (props) => {
  return <ListItem button component="a" {...props} />;
}

// contest
const ContestList = () => {
  const [ContestListClose, setContestListClose] = React.useState(false);
  const dispatch = useDispatch();
  const handleContestClick = () => {
    setContestListClose(!ContestListClose);
    dispatch({ type: 'set', isEnterContest: false});
  };
  if (ContestListClose) {
    return <LoginItem />;
  }
  return (
    <>
      <ListItem button onClick={handleContestClick} >
        <ListItemIcon>
          <ArrowBack />
        </ListItemIcon>
        <ListItemText primary="返回" />
      </ListItem>

      <ListItemLink href="#contest/ContestIntro">
        <ListItemIcon>
          <LibraryBooksIcon />
        </ListItemIcon>
        <ListItemText primary="簡介" />
      </ListItemLink>

      <ListItemLink href="#contest/QuestionList">
        <ListItemIcon>
          <MenuBookIcon />
        </ListItemIcon>
        <ListItemText primary="題目" />
      </ListItemLink>

      <ListItemLink href="#contest/statusPage">
        <ListItemIcon>
          <GpsFixedOutlined />
        </ListItemIcon>
        <ListItemText primary="狀態" />
      </ListItemLink>

      <ListItemLink href="#contest/qalist">
        <ListItemIcon>
          <QuestionAnswerIcon />
        </ListItemIcon>
        <ListItemText primary="Q&A" />
      </ListItemLink>

      <ListItemLink href="#contest/rankPage">
        <ListItemIcon>
          <EqualizerIcon />
        </ListItemIcon>
        <ListItemText primary="排行榜" />
      </ListItemLink>
    </>
  )
}

const CourseList = () => {
  const [CourseListClose, setCourseListClose] = React.useState(false);
  const handleICourseClick = () => {
    setCourseListClose(!CourseListClose);
  };
  if (CourseListClose) {
    return <LoginItem />;
  }
  return (
    <>
      <ListItem button onClick={handleICourseClick} >
        <ListItemIcon>
          <ArrowBack />
        </ListItemIcon>
        <ListItemText primary="返回" />
      </ListItem>
      <ListItemLink href="#exam/ExamInfo">
        <ListItemIcon>
          <Note />
        </ListItemIcon>
        <ListItemText primary="測驗" />
      </ListItemLink>
      <ListItemLink href="#homework/HomeWorkList">
        <ListItemIcon>
          <LaptopMac />
        </ListItemIcon>
        <ListItemText primary="作業" />
      </ListItemLink>
    </>
  )
}

const AdminLink = () => {
  return (
    <ListItemLink href="/admin/">
      <ListItemIcon>
        < FontAwesomeIcon icon={faUserShield} />
      </ListItemIcon>
      <ListItemText primary="管理員介面" />
    </ListItemLink>
  )
}

const LoginItem = () => {
  const classes = useStyles();
  const isLogin = useSelector(state => state.isLogin);
  const isAdmin = useSelector(state => state.isAdmin);
  const isEnterContest = useSelector(state => state.isEnterContest);
  const [InfoClassOpen, setInfoClassOpen] = React.useState(false);
  const [CourseListOpen, setCourseListOpen] = React.useState(false);
  const handleInfoClassClick = () => setInfoClassOpen(!InfoClassOpen);
  const handleICourseClick = () => setCourseListOpen(!CourseListOpen);
  if (!isLogin) {
    return null;
  }
  if (CourseListOpen) {
    return <CourseList />;
  }
  console.log(isEnterContest)
  if (isEnterContest) {
    return <ContestList />;
  }
  return (
    <>
      {isAdmin && <AdminLink />}
      <ListItem button onClick={handleInfoClassClick}>
        <ListItemIcon>
          <FontAwesomeIcon icon={faChalkboardTeacher} />
        </ListItemIcon>
        <ListItemText primary="相關資訊設定" />
        {InfoClassOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={InfoClassOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemLink className={classes.nested} href="#settings/profile">
            <ListItemIcon>
              <PersonRounded />
            </ListItemIcon>
            <ListItemText primary="個人資訊" />
          </ListItemLink>
        </List>
      </Collapse>
      <ListItem button onClick={handleICourseClick}>
        <ListItemIcon>
          <LaptopMac />
        </ListItemIcon>
        <ListItemText primary="課程" />
      </ListItem>
      <ListItemLink href="#contest/ContestList">
        <ListItemIcon>
          <EmojiEventsIcon />
        </ListItemIcon>
        <ListItemText primary="比賽" />
      </ListItemLink>

    </>
  )
}

const NavList = () => {
  return (
    <>
      <List>
        <ListItemLink href="#dashboard">
          <ListItemIcon>
            <FontAwesomeIcon icon={faChalkboardTeacher} />
          </ListItemIcon>
          <ListItemText primary="首頁" />
        </ListItemLink>
        <LoginItem />
      </List>
    </>
  );
}

export default NavList;
