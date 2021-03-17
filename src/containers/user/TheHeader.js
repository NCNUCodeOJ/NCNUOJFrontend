import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import {
  AppBar, Toolbar, Typography, Button,
  IconButton, Hidden, Dialog, Grid, TextField
} from '@material-ui/core';
import {
  AccountCircle, Lock
} from '@material-ui/icons';
import { getUserInfo, logout } from '../../api/page/api';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import Brightness5Icon from '@material-ui/icons/Brightness5';

import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';


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
  },
  submit: {
    // margin: theme.spacing(3, 0, 2),
    // padding: theme.spacing(1, 5, 1),
  },
  textArea: {
    marginRight: '20px'
  },
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

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.droot} {...other}>
      <Typography variant="h6">{children}</Typography>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const ButtonList = () => {
  const isLogin = useSelector(state => state.isLogin);
  const username = useSelector(state => state.username);
  const history = useHistory();
  const dispatch = useDispatch();
  // 登入的彈跳視窗
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const handlePrivacyOpen = () => setPrivacyOpen(true);
  const handlePrivacyClose = () => setPrivacyOpen(false);
  const classes = useStyles();
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
        <Button type="submit" color="inherit" onClick={handlePrivacyOpen}>登入</Button>
        <Button color="inherit" href="#register"> 註冊 </Button>
        <Dialog onClose={handlePrivacyClose} aria-labelledby="privacy-title" open={privacyOpen}>
          <DialogTitle id="privacy-title" onClose={handlePrivacyClose} className={classes.title}>
            Welcome to NCNU_IM !
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              歡迎蒞臨國立暨南國際大學教學輔助系統
              <Grid container className={classes.textArea} alignItems="flex-end">
                  <Grid item xs={1} sm={1} md={3} >
                      <AccountCircle/>
                  </Grid>
                  <Grid item xs={4} sm={6} md={6} >
                      <TextField id="standard-basic" label="Username" placeholder="Tom" required />
                  </Grid>
              </Grid>
              <Grid container className={classes.textArea} alignItems="flex-end">
                  <Grid item xs={1} sm={1} md={3} >
                      < Lock/>
                  </Grid>
                  <Grid item xs={4} sm={6} md={6} >
                      <TextField id="standard-basic" label="Password" placeholder="Password" required />
                  </Grid>
              </Grid>
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              variant="contained"
              onClick={handlePrivacyClose}
              color="primary"
              fullWidth
              className={classes.submit}
            >
              登入
            </Button>
          </DialogActions>
          <Button
            variant="contained"
            href="#login/forgetpassword"
          >
            忘記密碼 ?
          </Button>
        </Dialog>
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
              國立暨南國際大學教學輔助系統
            </Typography>
          </Hidden>
          <Hidden smUp>
            <Typography variant="h6" className={classes.title}>
              NCNU
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
