import React, {useState} from "react";
import {loginUser} from "../../api";
import "bootstrap/dist/css/bootstrap.min.css";
import {useNavigate} from 'react-router-dom';
import { Alert, Button } from 'react-bootstrap';
import {useAuth} from "../AuthProvider/AuthProvider";


export const LoginComp = () => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [error, setError] = useState('');
    const [showDangerAlert, setshowDangerAlert] = useState(false);
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
            setshowDangerAlert(true)
         setError("Failed to authenticate")
        }
    }

    const goNext = (e) => {
        navigate("/register")
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

                <h2 className={"text-center"}>Login</h2>
                <form className={"login-form"} onSubmit={handleSubmit} noValidate={true}>
                <label htmlFor={"email"} className={"text-lg-start"}>Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type={"email"}
                       placeholder={"youremail@mail.com"} id={"email"} name={"email"}/>
                <label htmlFor={"password"}>Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type={"password"} placeholder={"******"}
                       id={"password"} name={"password"}/>
                <div style={{marginTop: '1em'}} className="row">
                    <div className="col-sm">
                        <button className="btn btn-success btn-lg" type={"submit"} onClick={handleSubmit}>Sign In</button>
                    </div>
                    <div className="col-sm">
                        <button className="btn btn-primary btn-lg" type={"submit"} onClick={goNext}>Register</button>
                    </div>
                </div>
            </form>
        </div>
        </div>
    )
}
