import './App.css';
import React, {useState} from 'react';
import {BrowserRouter, Redirect, Route, Router, Routes} from 'react-router-dom';
import {LoginComp} from "../Login/Login";
import {Register} from "../Register/Register";
import {HomePage} from "../HomePage/HomePage";
import {WorkoutPage} from "../WorkoutPage/WorkoutPage";
import CalendarComp from "../Calendar/CalendarComp";
import Dashboard from "../Dashboard/Dashboard";
import {AuthProvider} from "../AuthProvider/AuthProvider";


function App() {
    const [currentForm, setCurrentForm] = useState('login');
    const toggleForm = (formName) => {
        setCurrentForm(formName)
    }
  return (
    <div className="App">
        <AuthProvider>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={<LoginComp />} />
                <Route path='/register' element={<Register />} />
                <Route path='/workout' element={<WorkoutPage />} />
                <Route path='/calendar' element={<CalendarComp/> } />
                <Route path ='/dashboard' element={<Dashboard/> } />
            </Routes>
        </BrowserRouter>
        </AuthProvider>

    </div>
  );
}

export default App;
