import React from 'react';
import { useSelector } from 'react-redux';
import {
  List, ListItem, Collapse,
  ListItemIcon, ListItemText,
} from '@material-ui/core';
import {
  ExpandLess, ExpandMore, Note, Book
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
      {/* 測驗 */}
      <ListItemLink href="#test/testList">
        <ListItemIcon>
          <Note />
        </ListItemIcon>
        <ListItemText primary="測驗" />
      </ListItemLink>
      {/* 作業 */}
      <ListItemLink href="#homework/homeWorkList">
        <ListItemIcon>
          <Book />
        </ListItemIcon>
        <ListItemText primary="作業" />
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