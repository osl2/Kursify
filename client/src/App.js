import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CourseOverview from './Pages/CourseOverview'
import Course from './Pages/CourseEditor'
import Login from './Pages/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Test from './Components/CourseEditorComponents/FixComponents/Test';
import PixabayTestPage from './Pages/PixabayTest/PixabayTestPage';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/kursuebersicht' element={<CourseOverview />} />
          <Route path='/kurs' element={<Course />} />
          <Route path='/pixabay' element={<PixabayTestPage />}/>
          <Route path='/login' element={<Login />} />
          <Route path='/test' element={<Test />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}


export default App;
