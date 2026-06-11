import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/signup";
import Home from "./components/Home";
import Jobs from './components/Jobs';
import Browse from './components/Browse';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';
import Companies from './components/admin/companies';
import CompanyCreate from './components/admin/CompaniesCreate';
import CompanySetup from './components/admin/CompanySetup';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminJobs from './components/admin/AdminJobs';
import PostJob from './components/admin/PostJob';
import Applicants from './components/admin/Applicants';
import EditJob from './components/admin/EditJob';
import useGetCurrentUser from './hooks/userGetCurrentUser';

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
path:"/description/:id",
element: <JobDescription/>
  },
  {
    path: "/browse",
    element: <Browse />
  },
  
  {
    path: "/profile",
    element: <Profile/>
  },
// for admin panel

{
    path:"/admin/companies",
    element: <ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path:"/admin/companies/create",
    element: <ProtectedRoute><CompanyCreate/></ProtectedRoute> 
  },
  {
    path:"/admin/companies/:id",
    element:<ProtectedRoute><CompanySetup/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs",
    element:<ProtectedRoute><AdminJobs/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs/create",
    element:<ProtectedRoute><PostJob/></ProtectedRoute> 
    
  },
  {
path:'/admin/jobs/:id',
element:<ProtectedRoute> <EditJob/> </ProtectedRoute>
  },
  {
  path:"/admin/jobs/:id",
  element:<ProtectedRoute><PostJob/></ProtectedRoute>
},
  {
    path:"/admin/jobs/:id/applicants",
    element:<ProtectedRoute><Applicants/></ProtectedRoute> 
  },

]);

function App() {
  useGetCurrentUser();
  return (
    <div>
    <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;