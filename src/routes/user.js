import React from 'react';

const Dashboard = React.lazy(() => import('../views/user/dashboard/Dashboard'));
const Profile = React.lazy(() => import('../views/user/profile/Profile'))
const Register = React.lazy(() => import('../views/user/register/Register'))
const HomeWorkList = React.lazy(() => import('../views/user/homework/HomeWorkList'))
const ForgetPassword = React.lazy(() => import('../views/pages/forgetPassword/ForgetPassword'))
const TestList = React.lazy(() => import('../views/user/quize/TestList'))
const ContestList = React.lazy(() => import('../views/user/contest/ContestList'))
const QuestionList = React.lazy(() => import('../views/user/contest/QuestionList'))
const StatusPage = React.lazy(() => import('../views/user/contest/StatusPage'))
const RankPage = React.lazy(() => import('../views/user/contest/RankPage'))
const QAList = React.lazy(() => import('../views/user/contest/QAList'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: '首頁', component: Dashboard },
  { path: '/settings/profile', exact: true, name: '個人資訊', component: Profile },
  { path: '/register', exact: true, name: '註冊頁面', component: Register },
  { path: '/homework/HomeworkList', exact: true, name: '作業清單', component: HomeWorkList },
  { path: '/login/forgetpassword', exact: true, name: '忘記密碼', component: ForgetPassword},
  { path: '/quize/testList', exact: true, name: '測驗清單', component: TestList },
  { path: '/contest/ContestList', exact: true, name: '比賽清單', component: ContestList},
  { path: '/contest/QuestionList', exact: true, name: '題目清單', component: QuestionList},
  { path: '/contest/statusPage', exact: true, name: '比賽狀態', component: StatusPage},
  { path: '/contest/rankPage', exact: true, name: '比賽排行榜', component: RankPage},
  { path: '/contest/qalist', exact: true, name: '比賽Q&A', component: QAList},
];

export default routes;
