import React from 'react';

const Dashboard = React.lazy(() => import('../views/user/dashboard/Dashboard'));
const ApplyNewClassCreate = React.lazy(() => import('../views/user/applyNewHighClass/Create'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: '首頁', component: Dashboard },
  { path: '/applynewclass/create', exact: true, name: '新增公開觀課', component: ApplyNewClassCreate},
];

export default routes;
