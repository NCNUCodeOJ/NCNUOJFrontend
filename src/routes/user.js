import React from 'react';

const Dashboard = React.lazy(() => import('../views/user/dashboard/NewDashboard'));
const Profile = React.lazy(() => import('../views/user/profile/Profile'))
const Register = React.lazy(() => import('../views/user/register/Register'))
const ExamList = React.lazy(() => import('../views/user/exam/ExamList'))
const ExamInfo = React.lazy(() => import('../views/user/exam/ExamInfo'))
const HomeworkInfo = React.lazy(() => import('../views/user/homework/HomeWorkInfo'))
const HomeWorkList = React.lazy(() => import('../views/user/homework/HomeWorkList'))
const ForgetPassword = React.lazy(() => import('../views/pages/forgetPassword/ForgetPassword'))
const TestList = React.lazy(() => import('../views/user/quize/TestList'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: '首頁', component: Dashboard },
  { path: '/settings/profile', exact: true, name: '個人資訊', component: Profile },
  { path: '/register', exact: true, name: '註冊頁面', component: Register },
  { path: '/exam/ExamList', exact: true, name: '測驗清單', component: ExamList },
  { path: '/exam/ExamInfo', exact: true, name: '測驗內容', component: ExamInfo },
  { path: '/homework/HomeWorkInfo', exact: true, name: '作業內容', component: HomeworkInfo },
  { path: '/homework/HomeworkList', exact: true, name: '作業清單', component: HomeWorkList },
  { path: '/login/forgetpassword', exact: true, name: '忘記密碼', component: ForgetPassword},
  { path: '/quize/testList', exact: true, name: '測驗清單', component: TestList },
];

export default routes;
