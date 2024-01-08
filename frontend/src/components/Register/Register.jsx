import React, {useState} from "react";
import PropTypes from "prop-types";
import {loginUser, registerUser} from "../../api";
import {Link, useNavigate} from "react-router-dom";
import {Alert, Button} from "react-bootstrap";


export const Register = (props) => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [firstName, setFName] = useState('');
    const [lastName, setLName] = useState('');
    const [error, setError] = useState('');
    const [showDangerAlert, setshowDangerAlert] = useState(false);
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
        const json_response = await registerResponse.text()
        if (registerResponse.ok){
            localStorage.setItem("authenticated", "true");
            localStorage.setItem("token", json_response.token)
            navigate("/dashboard");
            console.log("Register failed")
        }
        else {
            setshowDangerAlert(true)
            setError(json_response)
        }

    }


    const goNext = (e) => {
        navigate("/login")
    }

    return (
        <div>
            <Alert
                show={showDangerAlert}
                variant="danger"
                className="mb-0"
            >
                {error}
                <div className="d-flex justify-content-end">
                    <Button className={"btn-close"}  onClick={() => setshowDangerAlert(false)} >
                    </Button>
                </div>
            </Alert>
        <div className={"auth-form"}>
            <h2 className={"text-center"}>Register</h2>
            <form className={"register-form"} onSubmit={handleSubmit}>
                <label htmlFor={"firstName"}> First Name </label>
                <input value={firstName} onChange={(e) => setFName(e.target.value)} name="fname" id={"fname"} placeholder={"First Name"}/>
                <label htmlFor={"lastName"}> Last Name </label>
                <input value={lastName} onChange={(e) => setLName(e.target.value)} name="lname" id={"lname"} placeholder={"Last Name"}/>
                <label htmlFor={"email"}>email</label>
                <input value = {email} onChange={(e) => setEmail(e.target.value)} type={"email"} placeholder={"youremail@mail.com"} id={"email"} name={"email"}/>
                <label htmlFor={"password"}>password</label>
                <input value = {pass} onChange={(e) => setPass(e.target.value)} type={"password"} placeholder={"******"} id={"password"} name={"password"}/>
                <div style={{marginTop: '1em'}} className="row">
                    <div className="col-sm">
                        <button className="btn btn-success btn-lg" type={"submit"} onClick={handleSubmit}>Save
                        </button>
                    </div>
                    <div className="col-sm">
                        <Link className={"btn btn-primary btn-lg"} to="/login">Log-in</Link>
                    </div>
                </div>
            </form>

        </div>
        </div>
    )
}
