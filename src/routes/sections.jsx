import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import { jwtDecode } from 'jwt-decode';
import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import AdminLayout from 'src/layouts/admin';
import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const SupportPage = lazy(() => import('src/pages/support'));
export const Devices = lazy(() => import('src/pages/devices'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const LogoutPage = lazy(() => import('src/pages/logout'));
export const AddDevicePage = lazy(() => import('src/pages/add-device'));
export const SignUpPage = lazy(() => import('src/pages/signup'));
export const EditDevicePage = lazy(() => import('src/pages/edit-device'));
export const CreditHistoryPage = lazy(() => import('src/pages/credit-history'));
export const AdminUserPage = lazy(() => import('src/admin-pages/user'));
export const AdminCreditHistoryPage = lazy(() => import('src/admin-pages/credit-history'));
export const AdminDevicePage = lazy(() => import('src/admin-pages/devices'));
export const AdminNotificationPage = lazy(() => import('src/admin-pages/notification'));
export const AdminProductPAge = lazy(() => import('src/admin-pages/product'));
export const ResetPasswordPage = lazy(() => import('src/pages/resetpassword'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

function isAuthenticated() {
  return !!Cookies.get('token');
}

function isAdmin() {
  const token = Cookies.get('token');
  if (!token) return false;
  const decoded = jwtDecode(token);
  return decoded.user.isAdmin;
}

function AdminPrivateRoute({ element }) {
  return isAuthenticated() && isAdmin() ? element : <Navigate to="/login" replace />;
}

AdminPrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

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
        { path: 'credit-history', element: <PrivateRoute element={<CreditHistoryPage />} /> },
        { path: 'add-device', element: <PrivateRoute element={<AddDevicePage />} /> },
        { path: 'edit-device/:id', element: <PrivateRoute element={<EditDevicePage />} /> },
        { path: 'support', element: <PrivateRoute element={<SupportPage />} /> },
        { path: 'logout', element: <PrivateRoute element={<LogoutPage />} /> },
      ],
    },
    {
      path: 'admin',
      element: (
        <AdminLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </AdminLayout>
      ),
      children: [
        { path: '', element: <Navigate to="devices" replace /> },
        {
          path: 'users',
          element: <AdminPrivateRoute element={<AdminUserPage />} />,
        },
        {
          path: 'credit-history',
          element: <AdminPrivateRoute element={<AdminCreditHistoryPage />} />,
        },
        {
          path: 'devices',
          element: <AdminPrivateRoute element={<AdminDevicePage />} />,
        },
        {
          path: 'set-notification',
          element: <AdminPrivateRoute element={<AdminNotificationPage />} />,
        },
        {
          path: 'product',
          element: <AdminPrivateRoute element={<AdminProductPAge />} />,
        },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'signup',
      element: <SignUpPage />,
    },
    { path: 'reset-password/:token', element: <ResetPasswordPage /> },

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
