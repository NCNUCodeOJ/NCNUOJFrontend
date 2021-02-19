import React from 'react';
import { useSelector } from 'react-redux';
import {
  List, ListItem, Collapse,
  ListItemIcon, ListItemText,
} from '@material-ui/core';
import {
  ExpandLess, ExpandMore, PersonRounded,
  Info, Note
} from '@material-ui/icons/';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChalkboardTeacher, faPlus, faUserShield
} from '@fortawesome/free-solid-svg-icons';


const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const ListItemLink = (props) => {
  return <ListItem button component="a" {...props} />;
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
  const [ApplyClassOpen, setApplyClassOpen] = React.useState(false);
  const handleApplyClassClick = () => {
    setApplyClassOpen(!ApplyClassOpen);
  };
  const [InfoClassOpen, setInfoClassOpen] = React.useState(false);
  const handleInfoClassClick = () => {
    setInfoClassOpen(!InfoClassOpen);
  };
  if (!isLogin) {
    return null;
  }
  return (
    <>
      {isAdmin && <AdminLink />}
      <ListItem button onClick={handleApplyClassClick}>
        <ListItemIcon>
          <FontAwesomeIcon icon={faChalkboardTeacher} />
        </ListItemIcon>
        <ListItemText primary="開設公開觀課" />
        {ApplyClassOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={ApplyClassOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemLink className={classes.nested} href="#applynewclass/create">
            <ListItemIcon>
              < FontAwesomeIcon icon={faPlus} />
            </ListItemIcon>
            <ListItemText primary="新增" />
          </ListItemLink>
        </List>
      </Collapse>
      <ListItem button onClick={handleInfoClassClick}>
        <ListItemIcon>
          <FontAwesomeIcon icon={faChalkboardTeacher} />
        </ListItemIcon>
        <ListItemText primary="相關資訊設定" />
        {InfoClassOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={InfoClassOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemLink className={classes.nested} href="#profile/Profile">
            <ListItemIcon>
              <PersonRounded />
            </ListItemIcon>
            <ListItemText primary="個人資訊" />
          </ListItemLink>
          {/* <ListItemLink className={classes.nested} href="#profile/Info">
            <ListItemIcon>
              <Info />
            </ListItemIcon>
            <ListItemText primary="系統資訊" />
          </ListItemLink> */}
        </List>
      </Collapse>
      <ListItemLink href="#test/TestList">
        <ListItemIcon>
          <Note />
        </ListItemIcon>
        <ListItemText primary="測驗" />
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
