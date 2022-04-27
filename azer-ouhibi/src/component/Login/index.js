import React, {useRef, useState, useEffect, useContext} from 'react'

import { Link } from 'react-router-dom'
import AuthContext from "./context/AuthProvider";
import { useHistory } from "react-router-dom"
import Swal from 'sweetalert2';
import { useDispatch } from "react-redux";




const axios = require('axios');


const LOGIN_URL = 'http://localhost:5000/auth/login';

const LoginArea = () => {
    const history = useHistory()
    const userRef = useRef(null);
    const errRef = useRef(null);


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();

    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email, password }),
{
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
                withCredentials: true


            }
               
            );
            console.log(JSON.stringify(response?.data.token))
            if (JSON.stringify(response?.data.token)){

                console.log(JSON.stringify(response?.data));
                //console.log(JSON.stringify(response));
               
                    setEmail('');
                    setPassword('');
                
            
                    Swal.fire({
                        icon: 'success',
                        title: 'Login Sucessfull',
                        text: 'Welcome'
    
                    })
                    history.push("/vendor-dashboard");
                    if (typeof window !== "undefined"){
                        localStorage.setItem("token", JSON.stringify(response?.data))
                    }
                
            } else{
                
                    setErrMsg('No Server Response');
            
                errRef.current.focus();
            }

    
           
        } catch (err) {
            if (!err?.response) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();

        }
    }

    return (
        <>
            <section id="login_area" className="ptb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3 col-md-12 col-sm-12 col-12">
                            <div className="account_form">
                                <h3>Login</h3>
                                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                                <form onSubmit={handleSubmit}>
                                <div className="default-form-box">
                                <label>Username or email<span className="text-danger">*</span></label>
                                <input type="text" className="form-control" required onChange={(e) => setEmail(e.target.value)}
                                value={email}                             ref={userRef}
                                />
                            </div>
                            <div className="default-form-box">
                                <label>Passwords<span className="text-danger">*</span></label>
                                <input type="password" className="form-control" required minLength="8"onChange={(e) => setPassword(e.target.value)}
                                value={password}/>
                            </div>
                            <div className="login_submit">
                                <button className="theme-btn-one btn-black-overlay btn_md" type="submit">login</button>
                            </div>
                            <div className="remember_area">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="materialUnchecked"/>
                                    <label className="form-check-label" htmlFor="materialUnchecked">Remember me</label>
                                </div>
                            </div>
                            <Link to="/register" className="active">Create Your Account?</Link>
                            <div>
                            <Link to="/reset" className="active">Forgot Your Password</Link>
                            </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LoginArea
