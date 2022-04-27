import React, {useRef, useState, useEffect, useContext} from 'react'
import { useSelector, useDispatch } from "react-redux";
import Swal from 'sweetalert2';
import { useHistory , Link } from "react-router-dom"
const axios = require('axios');

const LOGIN_URL = 'http://localhost:5000/auth/update';



const AccountDetailsEdit = () => {
const history = useHistory();

let dispatch = useDispatch();
    const userRef = useRef();
    const errRef = useRef();
    const [email, setEmail] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [tel, setTel] = useState('')
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    
    useEffect(() => {
        setErrMsg('');
    }, [email])


    // Add to cart
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(LOGIN_URL,
                JSON.stringify({ email ,lastName ,firstName ,dateOfBirth ,tel }),
                {
                    method: 'PUT',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
    
    
                }
            );

            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
           
                setEmail('');
                setFirstName('');
                setLastName('');
                setTel('');
                setDateOfBirth('');

            
        
            dispatch({ type: "user/register", payload: { email } })
            
            Swal.fire({
                icon: 'success',
                title: 'update Sucessfull',
                text: 'Welcome'
            })
            history.push("/vendor-dashboard");
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


const routeChange = () => {
    history.goBack()
  };
    return (
        <>
    <section id="account_edit" className="pt-100 pb-100">
        <div className="container">
            <div className="row">
            <div className="col-lg-6">
                    <div className="back_btn">
                       <Link to="/" onClick={routeChange}><i className="fa fa-arrow-left"></i>Back to Dashboard</Link>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-3">
                    <div className="account_thumd">
                        <div className="account_thumb_img">
                            <img src="" alt="img" />
                            <div className="fixed_icon"><input type="file" /><i className="fa fa-camera"></i></div>
                        </div>
                        <h4>Robert Downey JR. </h4>
                        <p>UX/UI Designer</p>
                    </div>
                </div>
                <div className="col-lg-9">
                    <div className="account_setting">
                        <div className="account_setting_heading">
                            <h2>Account Details</h2>
                            <p>Edit your account settings</p>
                            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

                        </div>
                        <form id="account_info_form" onSubmit={handleSubmit} >
                            
                            <div className="form-group">
                                <label htmlFor="f_name">Name</label>
                                <input type="text" className="form-control" id="f_name" value={firstName} onChange={e => setFirstName(e.currentTarget.value)} required />
                                <input type="text" className="form-control" value={lastName} onChange={e => setLastName(e.currentTarget.value)} required />
                            </div>
                            <div className="form-group">
                                <label  htmlFor="email_address">Email Address</label>
                                <input type="email" className="form-control" id="email_address"
                                     value={email} ref={userRef} onChange={e => setEmail(e.currentTarget.value)} required />
                            </div>
                            <div className="form-group">
                                <label  htmlFor="current_password">Phone Number</label>
                                <input type="number" className="form-control" id="current_password"
                                value={tel} onChange={e => setTel(e.currentTarget.value)} required />
                                </div>
                                <div className="form-group">
                                <label  htmlFor="current_password">Date Of birth</label>

                                <input type="date" className="form-control" id="new_password"
                                value={dateOfBirth} onChange={e => setDateOfBirth(e.currentTarget.value)} required />
                                
                            </div>
                            <button type="submit" className="theme-btn-one bg-black btn_sm">Update Information</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
        </>
    )
}

export default AccountDetailsEdit
