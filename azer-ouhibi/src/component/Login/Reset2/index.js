import React, {useRef, useState, useEffect, useContext} from 'react'

import { Link } from 'react-router-dom'
import AuthContext from "../context/AuthProvider";
import { useHistory,useParams } from "react-router-dom"
import Swal from 'sweetalert2';
import { useDispatch } from "react-redux";




const axios = require('axios');


const LOGIN_URL = 'http://localhost:5000/user/new-password';

const Reset2 = () => {
    const history = useHistory()
    



    const [password, setPassword] = useState('');
    const {token} = useParams()
    

    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL
                ,JSON.stringify({ password , token }),
{
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
                withCredentials: true


            }
               
            );
            console.log(JSON.stringify(response?.data))
            
                //console.log(JSON.stringify(response));
               
                    setPassword('');
                
            
                    Swal.fire({
                        icon: 'success',
                        title: 'Done ',
                        text: 'Sign in now'
    
                    })
                    history.push("/login");
             


        } catch (err) {
            

        }
    }

    return (
        <>
            <section id="login_area" className="ptb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3 col-md-12 col-sm-12 col-12">
                            <div className="account_form">
                                <h3>Change your password</h3>
                                <form onSubmit={handleSubmit}>
                                
                            <div className="default-form-box">
                                <label>Passwords<span className="text-danger">*</span></label>
                                <input type="password" className="form-control" required minLength="8"onChange={(e) => setPassword(e.target.value)}
                                value={password}/>
                            </div>
                            <div className="login_submit">
                                <button className="theme-btn-one btn-black-overlay btn_md" type="submit">Change Password</button>
                            </div>
                            
                            <Link to="/login" className="active">try login again ?</Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Reset2
