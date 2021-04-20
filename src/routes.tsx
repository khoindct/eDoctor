import { Navigate } from 'react-router-dom';

import DashboardLayout from './layouts/DashboardLayout';
import MainLayout from './layouts/MainLayout';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/auth/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import CustomerPage from './pages/CustomerPage';
import MapPage from './pages/MapPage';
import CalendarPage from './pages/CalendarPage';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'customers', element: <CustomerPage /> },
      { path: 'map', element: <MapPage /> },
      { path: 'calendar', element: <CalendarPage /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: '404', element: <NotFoundPage /> },
    ],
  },
];

export default routes;
