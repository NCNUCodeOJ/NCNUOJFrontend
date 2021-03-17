import React from 'react';

const Dashboard = React.lazy(() => import('../views/user/dashboard/Dashboard'));
const ApplyNewClassCreate = React.lazy(() => import('../views/user/applyNewHighClass/Create'))
const Profile = React.lazy(() => import('../views/user/profile/Profile'))
const Register = React.lazy(() => import('../views/user/register/Register'))
const ExamList = React.lazy(() => import('../views/user/exam/ExamList'))
const ExamInfo = React.lazy(() => import('../views/user/exam/ExamInfo'))
const HomeworkInfo = React.lazy(() => import('../views/user/homework/HomeWorkInfo'))
const HomeWorkList = React.lazy(() => import('../views/user/homework/HomeWorkList'))



const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: '首頁', component: Dashboard },
  { path: '/applynewclass/create', exact: true, name: '新增公開觀課', component: ApplyNewClassCreate },
  { path: '/profile/Profile', exact: true, name: '個人資訊', component: Profile },
  { path: '/register/Register', exact: true, name: '註冊頁面', component: Register },
  { path: '/exam/ExamList', exact: true, name: '測驗清單', component: ExamList },
  { path: '/exam/ExamInfo', exact: true, name: '測驗內容', component: ExamInfo },
  { path: '/homework/HomeWorkInfo', exact: true, name: '作業內容', component: HomeworkInfo },
  { path: '/homework/HomeworkList', exact: true, name: '作業清單', component: HomeWorkList },
];

export default routes;
