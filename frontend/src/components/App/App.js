import './App.css';
import React, {useState} from 'react';
import {BrowserRouter, Redirect, Route, Router, Routes} from 'react-router-dom';
import {LoginComp} from "../Login/Login";
import {Register} from "../Register/Register";
import {HomePage} from "../HomePage/HomePage";
import {WorkoutPage} from "../WorkoutPage/WorkoutPage";


function App() {
    const [currentForm, setCurrentForm] = useState('login');
    const toggleForm = (formName) => {
        setCurrentForm(formName)
    }
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={<LoginComp />} />
                <Route path='/register' element={<Register />} />
                <Route path='/workout' element={<WorkoutPage />} />
            </Routes>
        </BrowserRouter>


        {/*<Router>*/}
        {/*    <Switch>*/}
        {/*        <Route path={"login"}> <LoginComp onFormSwitch={toggleForm}/> </Route>*/}
        {/*        <PrivateRoute path = "/homepage" component={HomePage} />*/}
        {/*        <Redirect from={'/'} to={"/login"} />*/}
        {/*    </Switch>*/}
        {/*</Router>*/}

        {/*<BrowserRouter>*/}
        {/*    <Routes>*/}
        {/*        <Route path="/homepage" element={<HomePage />} />*/}
        {/*    </Routes>*/}
        {/*</BrowserRouter>*/}
    </div>
  );
}

export default App;
