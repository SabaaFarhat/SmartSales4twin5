import React, {useRef, useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'
import avater from '../../../assets/img/common/avater.png'
import { useHistory } from "react-router-dom"
import Swal from 'sweetalert2';
const axios = require('axios');

const LOGIN_URL = 'http://localhost:5000/auth/logout';

const TopHeader = () => {
    const history = useHistory()
    const [items, setItems] = useState([]);

    // useEffect(() => {
    //   const i = JSON.parse(localStorage.getItem('token'));
    //   console.log(i.success)
    //   if (i) {
    //     localStorage.setItem('items', JSON.stringify(i));
    //     setItems(i.success);
    //   }
    // }, [items]);
    useEffect(() => {
        
        if(JSON.parse(localStorage.getItem('token'))){
            const i = JSON.parse(localStorage.getItem('token'));
      if (i) {
        localStorage.setItem('items', JSON.stringify(i));
        setItems(i.success);
        console.log("ff")

      }
        }else{
            setItems(false);
            console.log("ZZ")

        }
        

      }, []);
    

    const logout = async() => {
        
            const response = await axios.get(LOGIN_URL,
                
{
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
                withCredentials: true


            }
               
            );

            
            console.log(JSON.stringify(response?.data))
            localStorage.removeItem('token');
            localStorage.removeItem('items');

        Swal.fire({
            icon: 'success',
            title: 'Logout Sucessfull',
            text: 'Thank You'
        })
        history.push("/login");
    }
    return (
        <>
            <section id="top_header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="top_header_left">
                                <p>Special collection already available.<Link to="/shop">Read more ...</Link></p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="top_header_right">
                                {
                                    !items ?
                                        <ul className="right_list_fix">
                                            <li><Link to="/compare"><i className="fa fa-refresh"></i> Compare</Link></li>
                                            <li><Link to="/login"><i className="fa fa-user"></i> Login</Link></li>
                                            <li><Link to="/register"><i className="fa fa-lock"></i> Register</Link></li>
                                        </ul>
                                        :
                                        <ul className="right_list_fix">
                                            <li><Link to="/order-tracking"><i className="fa fa-truck"></i> Track your Order</Link></li>
                                            <li className="after_login"><img src="" alt="avater" /> {'Jhon Doe'} <i className="fa fa-angle-down"></i>
                                                <ul className="custom_dropdown">
                                                    <li><Link to="/my-account"><i className="fa fa-tachometer"></i> Dashboard</Link></li>
                                                    <li><Link to="/my-account/customer-order"><i className="fa fa-cubes"></i> My Orders</Link></li>
                                                    <li><Link to="#!" onClick={() => { logout() }} ><i className="fa fa-sign-out"></i> Logout</Link></li>
                                                </ul>
                                            </li>
                                        </ul>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default TopHeader