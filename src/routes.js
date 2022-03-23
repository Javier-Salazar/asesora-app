import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Advisers from './pages/Advisers';
import Advises from './pages/Advises';
import Subjects from './pages/Subjects';
import ResetPassword from './pages/ResetPassword';
import EndUserAgreement from './pages/EndUserAgreement'
import PrivacyPolicy from './pages/PrivacyPolicy';
import DashboardApp from './pages/DashboardApp';
import User from './pages/User';
import NewUser from './pages/NewUser';
import UserEdit from './pages/UserEdit'
import MyProfile from './pages/Myprofile'
import NotFound from './pages/Page404';
import { AdvisorProfile } from './components/_dashboard/advisers';
import Next from './pages/Next';

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
        { path: 'comming', element: <Next /> },
        { path: '/', element: <Navigate to="/login" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    {
      path: '/legal',
      children: [
        { element: <Navigate to="/legal/end-user-agreement" replace /> },
        { path: 'end-user-agreement', element: <EndUserAgreement /> },
        { path: 'privacy-policy', element: <PrivacyPolicy /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'new-user', element: <NewUser /> },
        { path: 'user-edit', element: <UserEdit /> },
        { path: 'adviser', element: <Advisers /> },
        { path: 'adviser-profile/:adviserID', element: <AdvisorProfile /> },
        { path: 'advises', element: <Advises /> },
        { path: 'subject', element: <Subjects /> },
        { path: 'my-profile', element: <MyProfile /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

export default Router;