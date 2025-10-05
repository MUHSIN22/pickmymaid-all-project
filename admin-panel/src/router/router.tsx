import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout/AppLayout';
import Login from '../pages/Login/Login';
import ManageTeam from '../pages/ManageTeam/ManageTeam';
import ManageMaids from '../pages/ManageMaids/ManageMaids';
import JobApplications from '../pages/JobApplicatioins/JobApplications';
import ApproovedMaids from '../pages/ApprovedMaids/ApprovedMaids';
import PasswordProtectedRoute from './ProtectedRoute/PasswordProtectedRoute';
import ContactSupport from '../pages/Contact Support/ContactSupport';
import ManageCustomer from '../pages/ManageCustomers/ManageCustomer';
import FindAJob from '../pages/FindAJob/FindAJob';
import Dashboard from '../pages/Dashboard/Dashboard';
import ManagePayments from '../pages/ManagePayments/ManagePayments';
import ManageBlogs from '../pages/ManageBlogs/ManageBlogs';
import EditBlog from '../pages/EditBlog/EditBlog';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        element: <PasswordProtectedRoute />,
        children: [
          {
            path: '/',
            element: <Dashboard />,
          },
          {
            path: '/manage-team',
            element: <ManageTeam />,
          },
          {
            path: '/manage-customers',
            element: <ManageCustomer />,
          },
          {
            path: '/manage-maids',
            element: <ManageMaids />,
          },
          {
            path: '/job-applications',
            element: <JobApplications />,
          },
          {
            path: '/find-a-job',
            element: <FindAJob />,
          },
          {
            path: '/approved-maid',
            element: <ApproovedMaids />,
          },
          {
            path: '/contact-support',
            element: <ContactSupport />,
          },
          {
            path: '/payments',
            element: <ManagePayments />,
          },
          {
            path: '/manage-blogs',
            element: <ManageBlogs />
          },
          {
            path: '/add-blog',
            element: <EditBlog />
          },
          {
            path: '/edit-blog/:blogId',
            element: <EditBlog />
          }
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);
