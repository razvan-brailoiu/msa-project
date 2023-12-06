import React, {useState} from "react";
import PropTypes from "prop-types";


export const Register = (props) => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [fname, setFName] = useState('');
    const [lname, setLName] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email)
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor={"fname"}> First Name </label>
                <input value={fname} name="name" id={"name"} placeholder={"First Name"}/>
                <label htmlFor={"lname"}> Last Name </label>
                <input value={lname} name="name" id={"name"} placeholder={"First Name"}/>
                <label htmlFor={"email"}>email</label>
                <input value = {email} onChange={(e) => setEmail(e.target.value)} type={"email"} placeholder={"youremail@mail.com"} id={"email"} name={"email"}/>
                <label htmlFor={"password"}>password</label>
                <input value = {pass} onChange={(e) => setPass(e.target.value)} type={"password"} placeholder={"******"} id={"password"} name={"password"}/>
                <button>Log In</button>
            </form>
            <button onClick={() => props.onFormSwitch('login')}> Already signed up ? Log in Here </button>
        </>
    )
}
