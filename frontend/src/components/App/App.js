import './App.css';
import React, {useState} from 'react';
import Header from '../Header';
import HomePage from "../HomePage/HomePage";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {LoginComp} from "../Login/Login";
import {Register} from "../Register/Register";


function App() {
    const [currentForm, setCurrentForm] = useState('login');
    const toggleForm = (formName) => {
        setCurrentForm(formName)
    }
  return (
    <div className="wrapper">
        { currentForm === "login" ? <LoginComp onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm}/>}
        <h1>Application</h1>
        {/*<BrowserRouter>*/}
        {/*    <Routes>*/}
        {/*        <Route path="/homepage" element={<HomePage />} />*/}
        {/*    </Routes>*/}
        {/*</BrowserRouter>*/}
    </div>
  );
}

export default App;
