import React, {useRef, useState, useEffect, useContext} from 'react'
import { useSelector, useDispatch } from "react-redux";
import Swal from 'sweetalert2';
import { useHistory } from "react-router-dom"
const axios = require('axios');

const LOGIN_URL = 'http://localhost:5000/auth/signup';

const RegisterArea = () => {
    let dispatch = useDispatch();
    const history = useHistory()
    const userRef = useRef();
    const errRef = useRef();
    const [email, setEmail] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [tel, setTel] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    
    useEffect(() => {
        setErrMsg('');
    }, [email, password])


    // Add to cart
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email, password ,lastName ,firstName ,dateOfBirth ,tel }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
           
                setEmail('');
                setPassword('');
                setFirstName('');
                setLastName('');
                setTel('');
                setDateOfBirth('');

            
        
            dispatch({ type: "user/register", payload: { email, password } })
            
            Swal.fire({
                icon: 'success',
                title: 'Registration Sucessfull',
                text: 'Welcome Mr.'
            })
            history.push("/login");
        }
    catch (err) {
        if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 409) {
            setErrMsg('Username Taken');
        } else {
            setErrMsg('Registration Failed')
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
                                <h3>Register</h3>
                                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

                                <form onSubmit={handleSubmit}>
                                    
                                    <div className="default-form-box">
                                        <label>Email<span className="text-danger">*</span></label>
                                        <input type="email" className="form-control" value={email} ref={userRef} onChange={e => setEmail(e.currentTarget.value)} required/>
                                    </div>
                                    <div className="default-form-box">
                                        <label>firstName<span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" value={firstName} onChange={e => setFirstName(e.currentTarget.value)} required/>
                                    </div>
                                    <div className="default-form-box">
                                        <label>lastName<span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" value={lastName} onChange={e => setLastName(e.currentTarget.value)} required />
                                    </div>
                                    <div className="default-form-box">
                                        <label>telephone<span className="text-danger">*</span></label>
                                        <input type="number" className="form-control" value={tel} onChange={e => setTel(e.currentTarget.value)} required />
                                    </div>
                                    <div className="default-form-box">
                                        <label>date Of Birth<span className="text-danger">*</span></label>
                                        <input type="date" className="form-control" value={dateOfBirth} onChange={e => setDateOfBirth(e.currentTarget.value)} required />
                                    </div>
                                    <div className="default-form-box">
                                        <label>Passwords<span className="text-danger">*</span></label>
                                        <input type="password" className="form-control" value={password} onChange={e => setPassword(e.currentTarget.value)} required />
                                    </div>

                                    <div className="login_submit">
                                        <button className="theme-btn-one btn-black-overlay btn_md" type="submit">Register</button>
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

export default RegisterArea
