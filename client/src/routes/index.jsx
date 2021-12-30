import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { MainLayout, DashboardLayout } from '../layouts';
import { DashboardView, RegisterView, NotFoundView, LoginView } from '../views';

const routes = [
  {
    path: 'dashboard',
    element: <DashboardLayout />,
    children: [{ path: '', element: <DashboardView /> }],
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Navigate to="/signin" /> },
      { path: 'signin', element: <LoginView /> },
      { path: 'signup', element: <RegisterView /> },
      { path: '*', element: <NotFoundView /> },
    ],
  },
];

const Routes = () => {
  const routing = useRoutes(routes);

  return <div>{routing}</div>;
};

export default Routes;
