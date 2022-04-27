import React, {useRef, useState, useEffect, useContext} from 'react'

import { Link } from 'react-router-dom'
import AuthContext from "../context/AuthProvider";
import { useHistory } from "react-router-dom"
import Swal from 'sweetalert2';
import { useDispatch } from "react-redux";




const axios = require('axios');


const LOGIN_URL = 'http://localhost:5000/user/reset-password';

const Reset = () => {
    const history = useHistory()
    



    const [email, setEmail] = useState('');
    

    useEffect(() => {
        

    }, [])

    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL
                ,JSON.stringify({ email }),
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
               
                    setEmail('');
                
            
                    Swal.fire({
                        icon: 'success',
                        title: 'check ',
                        text: 'your mail'
    
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
                                <h3>Reset password</h3>
                                <form onSubmit={handleSubmit}>
                                
                            <div className="default-form-box">
                                <label>Email<span className="text-danger">*</span></label>
                                <input type="email" className="form-control" required minLength="8"onChange={(e) => setEmail(e.target.value)}
                                value={email}/>
                            </div>
                            <div className="login_submit">
                                <button className="theme-btn-one btn-black-overlay btn_md" type="submit">Reset</button>
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

export default Reset
