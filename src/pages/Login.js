import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Form } from 'react-bootstrap'
import { LOGIN_ERROR } from "../constants/error"
import TextInput from "../components/TextInput"
import { startAuth } from "../utils/auth"

export default function Login({ setLoggedIn }) {
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loginError, setLoginError] = useState(false)

    const navigate = useNavigate()
    const { LOGIN_FAIL } = LOGIN_ERROR
    
    async function login() {
        //validation
        if (!email || !password){
            setLoginError(true)
        } else {
            const response = await startAuth(email, password)
            if (response.status === 200) {           
                setLoggedIn(true)
                navigate('/profile')
            } else {
                setLoginError(true)
            }
        }
    }

    const inputClass = "form-input bg-transparent rounded-0 "
    const errorClass = loginError ? "error" : ""

    return (
        <React.Fragment>
            <div className="login-page bg">
                <div className="login header-content">
                    <div className="page-overlay d-flex justify-content-center">
                        <div className="cta login mx-4 w-100 d-flex flex-column shadow-lg">
                            <p className="text-center page-title-large mb-2">Welcome</p>
                            <p className="text-center page-subtitle mb-1">Login with your account details.</p>
                            <Form className="my-4">
                                <TextInput
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={inputClass + errorClass}
                                    placeholder="Email"
                                    errorState={loginError}
                                    errorMessage={LOGIN_FAIL.errorMessage}
                                />
                                <TextInput
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={"mt-3 " + inputClass + errorClass}
                                    placeholder="Password"
                                    errorState={loginError}
                                    errorMessage={LOGIN_FAIL.errorMessage}
                                />
                                <div className="d-grid mt-4">
                                    <button className="signin-btn text-uppercase" type="button" onClick={login}>Login</button>
                                </div>
                            </Form>
                            <hr></hr>
                            <p className="mt-3 text-center page-subtitle">Not our registered customer?</p>
                            <div className="d-grid">
                                <button className="card-btn btn text-uppercase" type="button" onClick={()=>{navigate('/register')}}>Register</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>

    )
}