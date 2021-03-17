import React from 'react';

const Dashboard = React.lazy(() => import('../views/user/dashboard/NewDashboard'));
const ApplyNewClassCreate = React.lazy(() => import('../views/user/applyNewHighClass/Create'))
const ForgetPassword = React.lazy(() => import('../views/pages/forgetPassword/ForgetPassword'))
const TestList = React.lazy(() => import('../views/user/quize/TestList'))
const HomeWorkList = React.lazy(() => import('../views/user/homework/HomeWorkList'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: '首頁', component: Dashboard },
  { path: '/applynewclass/create', exact: true, name: '新增公開觀課', component: ApplyNewClassCreate},
  { path: '/login/forgetpassword', exact: true, name: '忘記密碼', component: ForgetPassword},
  { path: '/quize/testList', exact: true, name: '測驗清單', component: TestList },
  { path: '/homework/homeWorkList', exact: true, name: '作業清單', component: HomeWorkList },
];

export default routes;