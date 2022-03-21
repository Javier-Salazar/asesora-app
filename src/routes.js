import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Advisers from './pages/Advisers';
import ResetPassword from './pages/ResetPassword';
import EndUserAgreement from './pages/EndUserAgreement'
import PrivacyPolicy from './pages/PrivacyPolicy';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import UserEdit from './pages/UserEdit'
import MyProfile from './pages/Myprofile'
import NotFound from './pages/Page404';

function Router() {
  return useRoutes([
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/login" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    {
      path: '/legal',
      children: [
        { element: <Navigate to="/legal/end-user-agreement" replace /> },
        { path: 'end-user-agreement', element: <EndUserAgreement /> },
        { path: 'privacy-policy', element: <PrivacyPolicy /> }
      ]
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'user-edit', element: <UserEdit /> },
        { path: 'adviser', element: <Advisers /> },
        { path: 'my-profile', element: <MyProfile /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

export default Router;