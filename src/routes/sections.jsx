import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const SupportPage = lazy(() => import('src/pages/support'));
export const Devices = lazy(() => import('src/pages/devices'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const LogoutPage = lazy(() => import('src/pages/logout'));
export const AddDevicePage = lazy(() => import('src/pages/add-device'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

function isAuthenticated() {
  return !!Cookies.get('token');
}

function PrivateRoute({ element }) {
  return isAuthenticated() ? element : <Navigate to="/login" replace />;
}

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <PrivateRoute element={<IndexPage />} />, index: true },
        { path: 'all-devices', element: <PrivateRoute element={<Devices />} /> },
        { path: 'add-device', element: <PrivateRoute element={<AddDevicePage />} /> },
        { path: 'support', element: <PrivateRoute element={<SupportPage />} /> },
        { path: 'logout', element: <PrivateRoute element={<LogoutPage />} /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
