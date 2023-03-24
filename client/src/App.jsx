import React from 'react'
import {Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Landing,
  Error,
  Register,
  ProtectedRoute
} from './pages';
import {
  AddJob, AllJobs, Profile, Stats, SharedLayout,
} from "./pages/DashBoard";

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={
          <ProtectedRoute>
            <SharedLayout />
          </ProtectedRoute>
        } >
          <Route index element={<Stats />} />
          <Route path='all-jobs' element={<AllJobs />}></Route>
          <Route path='add-job' element={<AddJob />}></Route>
          <Route path='profile' element={<Profile />}></Route>
        </Route>
        <Route path="/landing" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer position='top-center' />
    </>
  );
};

export default App
