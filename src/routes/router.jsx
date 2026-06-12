import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import AdminRoute from './AdminRoute'
import PrivateRoute from './PrivateRoute'
import AdvisorDetails from '../pages/AdvisorDetails'
import AdvisorsPage from '../pages/AdvisorsPage'
import CommitteeDetails from '../pages/CommitteeDetails'
import CommitteesPage from '../pages/CommitteesPage'
import Dashboard from '../pages/Admin/Dashboard'
import DashboardHome from '../pages/Admin/DashboardHome'
import NoticesSection from '../pages/Admin/Notices/NoticesSection'
import AdvisorsSection from '../pages/Admin/Advisors/AdvisorsSection'
import CommitteeSection from '../pages/Admin/Committee/CommitteeSection'
import AlumniSection from '../pages/Admin/Alumni/AlumniSection'
import BlogsSection from '../pages/Admin/Blogs/BlogsSection'
import MembershipSection from '../pages/Admin/Membership/MembershipSection'
import ErrorPage from '../pages/ErrorPage'
import EventDetails from '../pages/EventDetails'
import EventsPage from '../pages/EventsPage'
import ForgotPassword from '../pages/ForgotPassword'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import Signup from '../pages/Signup'
import { adminService } from '../services/adminService'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'events', element: <EventsPage /> },
      { path: 'events/:eventId', element: <EventDetails /> },
      { path: 'advisors', element: <AdvisorsPage /> },
      { path: 'advisors/:advisorId', element: <AdvisorDetails /> },
      { path: 'committees', element: <CommitteesPage /> },
      { path: 'committees/:committeeId', element: <CommitteeDetails /> },
      { path: 'profile', element: <PrivateRoute><Profile /></PrivateRoute> },
    ],
  },
  {
    path: '/admin',
    element: <AdminRoute><Dashboard /></AdminRoute>,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <DashboardHome /> },
      { 
        path: 'notices', 
        element: <NoticesSection />,
        loader: async () => {
          try {
            return await adminService.fetchSegment('/api/notices');
          } catch {
            return [];
          }
        }
      },
      { 
        path: 'advisors', 
        element: <AdvisorsSection />,
        loader: async () => {
          try {
            return await adminService.fetchSegment('/api/advisors');
          } catch {
            return [];
          }
        }
      },
      { 
        path: 'committee', 
        element: <CommitteeSection />,
        loader: async () =>  await fetch('http://localhost:5000/committee'),
      },
      { 
        path: 'alumni', 
        element: <AlumniSection />,
        loader: async () => {
          try {
            return await adminService.fetchSegment('/api/alumni');
          } catch {
            return [];
          }
        }
      },
      { 
        path: 'blogs', 
        element: <BlogsSection />,
        loader: async () => {
          try {
            return await adminService.fetchSegment('/api/blogs');
          } catch {
            return [];
          }
        }
      },
      { 
        path: 'membership', 
        element: <MembershipSection />,
        loader: async () => {
          try {
            return await adminService.fetchSegment('/api/membership');
          } catch {
            return [];
          }
        }
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  { path: '*', element: <ErrorPage /> },
])


