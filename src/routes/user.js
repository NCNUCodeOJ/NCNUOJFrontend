import React from 'react';

const Dashboard = React.lazy(() => import('../views/user/dashboard/Dashboard'));
const ApplyNewClassCreate = React.lazy(() => import('../views/user/applyNewHighClass/Create'))
const Profile = React.lazy(() => import('../views/user/profile/Profile'))
const ProfileInfo = React.lazy(() => import('../views/user/profile/Info'))
const Register = React.lazy(() => import('../views/user/register/Register'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: '首頁', component: Dashboard },
  { path: '/applynewclass/create', exact: true, name: '新增公開觀課', component: ApplyNewClassCreate },
  { path: '/profile/Profile', exact: true, name: '個人資訊', component: Profile },
  { path: '/profile/Info', exact: true, name: '系統資訊', component: ProfileInfo },
  { path: '/register/Register', exact: true, name: '註冊頁面', component: Register },


];

export default routes;
