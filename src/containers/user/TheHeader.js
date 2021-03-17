import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import {
  AppBar, Toolbar, Typography, Button,
  IconButton, Hidden
} from '@material-ui/core';
import { getUserInfo, logout } from '../../api/page/api';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import Brightness5Icon from '@material-ui/icons/Brightness5';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  white: {
    color: "white"
  }
}));

const Logout = (dispatch, history) => {
  const options = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
  };
  logout()
    .then(function (rs) {
      dispatch({ type: 'set', isLogin: false });
      dispatch({ type: 'set', isAdmin: false });
      dispatch({ type: 'set', username: '' });
      const data = rs.data;
      toast.info(data.message, options);
      history.push('/');
    })
    .catch(function (error) {
      const data = error.response.data;
      toast.error(data.message, options);
    })
}

const ButtonList = () => {
  const isLogin = useSelector(state => state.isLogin);
  const username = useSelector(state => state.username);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleLogout = () => {
    Logout(dispatch, history);
  }
  if (isLogin) {
    return (
      <>
        <Hidden xsDown>
          <Typography>
            {username}
          </Typography>
          <Button color="inherit" onClick={handleLogout}>登出</Button>
        </Hidden>
        <Hidden smUp>
          <Button color="inherit" onClick={handleLogout}>登出</Button>
        </Hidden>
      </>
    )
  } else {
    return (
      <>
        <Button color="inherit" href="#login">登入</Button>
        <Button color="inherit" href="#register/Register">註冊</Button>
      </>
    )
  }
}

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.isLogin);
  const defaultShowOn = useSelector(state => state.sidebarShow);
  const darkTheme = useSelector(state => state.theme);
  const toggleSidebar = () => {
    dispatch({ type: 'set', sidebarShow: !defaultShowOn })
  }
  const changeTheme = () => {
    dispatch({ type: 'set', theme: !darkTheme })
  }
  useEffect(() => {
    let isSubscribed = true
    getUserInfo()
      .then((response) => {
        const data = response.data;
        if (isSubscribed) {
          dispatch({ type: 'set', username: data.user.name });
          dispatch({ type: 'set', isLogin: !data.user.is_anonymous });
          if (isLogin) {
            dispatch({ type: 'set', isAdmin: data.user.admin });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      })
    return () => isSubscribed = false
  }, [isLogin, dispatch])
  return (
    <>
      <AppBar position="sticky" className={classes.root}>
        <Toolbar>
          <Hidden xsDown>
            <IconButton
              edge="start" onClick={toggleSidebar}
              className={clsx(classes.menuButton, defaultShowOn && classes.hide)}
              color="inherit" aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Hidden smUp>
            <IconButton
              edge="start" onClick={toggleSidebar}
              className={clsx(classes.menuButton, !defaultShowOn && classes.hide)}
              color="inherit" aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Hidden xsDown>
            <Typography variant="h6" className={classes.title}>
              TTSH 公開觀課系統
            </Typography>
          </Hidden>
          <Hidden smUp>
            <Typography variant="h6" className={classes.title}>
              ttsh
          </Typography>
          </Hidden>
          <ButtonList />
          <IconButton aria-label="change theme" onClick={changeTheme} color="inherit">
            {darkTheme ? <Brightness3Icon /> : <Brightness5Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
