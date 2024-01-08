import React, {useState} from "react";
import PropTypes from "prop-types";
import {loginUser} from "../../api";
import {json, useNavigate} from 'react-router-dom';
import {useAuth} from "../AuthProvider/AuthProvider";

export const LoginComp = (props) => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {login} = useAuth()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = {
            "email": email,
            "password": pass,
        }
        const loginResponse = await loginUser(formData)
        if (loginResponse.ok){
         localStorage.setItem("authenticated", "true");
         let json_response = await loginResponse.json();
         localStorage.setItem("token", json_response.token);
         login(json_response.token)
         navigate("/dashboard");
        } else {
         setError("Failed to authenticate")
        }
    }

    const goNext = (e) => {
        navigate("/register")
    }

    return (
        <div className={"auth-form"}>
            <h2>Login</h2>
           <form className={"login-form"} onSubmit={handleSubmit} noValidate={true}>
               <label htmlFor={"email"}>email</label>
               <input value = {email} onChange={(e) => setEmail(e.target.value)} type={"email"} placeholder={"youremail@mail.com"} id={"email"} name={"email"}/>
               <label htmlFor={"password"}>password</label>
               <input value = {pass} onChange={(e) => setPass(e.target.value)} type={"password"} placeholder={"******"} id={"password"} name={"password"}/>
               <button type={"submit"} onClick={handleSubmit}>Log In</button>
               {error?<label color={'red'} >{error}</label>:null}
           </form>
           <button className={"link-btn"} onClick={goNext}> Register here </button>
        </div>
    )
}
