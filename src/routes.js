import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Advisers from './pages/Advisers';
import Advises from './pages/Advises';
import NewAdvises from './pages/NewAdvises';
import SubjectsX from './pages/SubjectsX';
import ResetPassword from './pages/ResetPassword';
import EndUserAgreement from './pages/EndUserAgreement'
import PrivacyPolicy from './pages/PrivacyPolicy';
import DashboardApp from './pages/DashboardApp';
import User from './pages/User';
import NewUser from './pages/NewUser';
import UserEdit from './pages/UserEdit';
import MyProfile from './pages/MyProfile';
import Reports from './pages/Reports';
import NotFound from './pages/Page404';
import { AdvisorProfile } from './components/_dashboard/advisers';
import Next from './pages/Next';
import Calendar from './pages/Calendar';

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
        { path: 'user-edit/:userID', element: <UserEdit /> },
        { path: 'adviser', element: <Advisers /> },
        { path: 'adviser-profile/:adviserID', element: <AdvisorProfile /> },
        { path: 'advises', element: <Advises /> },
        { path: 'new-advises', element: <NewAdvises /> },
        { path: 'subject', element: <SubjectsX /> },
        { path: 'my-profile', element: <MyProfile /> },
        { path: 'reports', element: <Reports /> },
        { path: 'calendar', element: <Calendar /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

export default Router;