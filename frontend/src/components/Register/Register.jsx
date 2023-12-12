import React, {useState} from "react";
import PropTypes from "prop-types";
import {loginUser, registerUser} from "../../api";
import {Link, useNavigate} from "react-router-dom";


export const Register = (props) => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [fname, setFName] = useState('');
    const [lname, setLName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(email)
        try {
            const formData = {
                "firstName": fname,
                "lastName": lname,
                "email": email,
                "password": pass,
            }
            const registerResponse = await registerUser(formData)
            navigate("/login")
        } catch (error) {
            console.error(`Sign up for ${email} failed`)
        }


    }


    const goNext = (e) => {
        navigate("/login")
    }

    return (
        <div className={"auth-form"}>
            <h2>Register</h2>
            <form className={"register-form"} onSubmit={handleSubmit}>
                <label htmlFor={"fname"}> First Name </label>
                <input value={fname} onChange={(e) => setFName(e.target.value)} name="fname" id={"fname"} placeholder={"First Name"}/>
                <label htmlFor={"lname"}> Last Name </label>
                <input value={lname} onChange={(e) => setLName(e.target.value)} name="lname" id={"lname"} placeholder={"Last Name"}/>
                <label htmlFor={"email"}>email</label>
                <input value = {email} onChange={(e) => setEmail(e.target.value)} type={"email"} placeholder={"youremail@mail.com"} id={"email"} name={"email"}/>
                <label htmlFor={"password"}>password</label>
                <input value = {pass} onChange={(e) => setPass(e.target.value)} type={"password"} placeholder={"******"} id={"password"} name={"password"}/>
                <button>Sign Up</button>
            </form>
            <button className={"link-btn"} onClick={goNext}> Already signed up ? Log in Here </button>
            <Link to="/login">Log-in</Link>
        </div>
    )
}
