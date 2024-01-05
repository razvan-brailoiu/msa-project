import React, {useState} from "react";
import PropTypes from "prop-types";
import {loginUser, registerUser} from "../../api";
import {Link, useNavigate} from "react-router-dom";


export const Register = (props) => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [firstName, setFName] = useState('');
    const [lastName, setLName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "password": pass,
        }
        const registerResponse = await registerUser(formData)
        if (registerResponse.ok){
            const json_response = await registerResponse.json()
            localStorage.setItem("authenticated", "true");
            localStorage.setItem("token", json_response.token)
            navigate("/dashboard");
        }
        else {
            setError(`Sign up for ${email} failed`)
        }

    }


    const goNext = (e) => {
        navigate("/login")
    }

    return (
        <div className={"auth-form"}>
            <h2>Register</h2>
            <form className={"register-form"} onSubmit={handleSubmit}>
                <label htmlFor={"firstName"}> First Name </label>
                <input value={firstName} onChange={(e) => setFName(e.target.value)} name="fname" id={"fname"} placeholder={"First Name"}/>
                <label htmlFor={"lastName"}> Last Name </label>
                <input value={lastName} onChange={(e) => setLName(e.target.value)} name="lname" id={"lname"} placeholder={"Last Name"}/>
                <label htmlFor={"email"}>email</label>
                <input value = {email} onChange={(e) => setEmail(e.target.value)} type={"email"} placeholder={"youremail@mail.com"} id={"email"} name={"email"}/>
                <label htmlFor={"password"}>password</label>
                <input value = {pass} onChange={(e) => setPass(e.target.value)} type={"password"} placeholder={"******"} id={"password"} name={"password"}/>
                <button>Sign Up</button>
                {error?<label color={'red'} >{error}</label>:null}
            </form>
            <button className={"link-btn"} onClick={goNext}> Already signed up ? Log in Here </button>
            <Link to="/login">Log-in</Link>
        </div>
    )
}
