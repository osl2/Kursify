import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CourseOverview from './Pages/CourseOverview'
import Course from './Pages/Course'
import Login from './Pages/Login'
import LogoutTest from './Pages/LogoutTest'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Test from './Components/Test';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/kursuebersicht' element={<CourseOverview />} />
          <Route path='/kurs' element={<Course />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<LogoutTest />} />
          <Route path='/test' element={<Test />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}


export default App;
