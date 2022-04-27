import React, {useRef, useState, useEffect, useContext} from 'react'
import BarChart from './BarChart'
import LineChart from './LineChart'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { useCookies } from "react-cookie";
const axios = require('axios');



const Dashboard = () => {
  
    const [allproducts, setAllproducts] = useState([]);
    const [allproducts2, setAllproducts2] = useState([]);
    const [allproducts3, setAllproducts3] = useState([]);

    useEffect(() => {
        const getallproducts = async () => {
            const response = await axios
            .get("http://localhost:5000/user/getfollowing",
            {method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            withCredentials: true
    
    
        })
              setAllproducts(response?.data.user.following);
              console.log(response?.data.user);

        };

        getallproducts();
      }, []);
     useEffect(() => {
        const getallproducts2 = async () => {
            const response = await axios
            .get("http://localhost:5000/user/getfollowers",
            {method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            withCredentials: true
    
    
        })
              setAllproducts2(response?.data.user.followers);
              console.log(response?.data.user);

        };

        getallproducts2();
      }, []);
      useEffect(() => {
        const getallproducts3 = async () => {
            const response = await axios
            .get("http://localhost:5000/user/getSubProduct",
            {method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            withCredentials: true
    
    
        })
              setAllproducts3(response?.data.product);
              console.log(response?.data);

        };

        getallproducts3();
      }, []);
      console.log(allproducts3);
    let products = useSelector((state) => state.products.products);
    return (
        <>
            <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                    <div className="vendor_top_box">
                        <h2>{allproducts.length}</h2>
                        <h4>Following</h4>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                    <div className="vendor_top_box">
                        <h2>{allproducts2.length}</h2>
                        <h4>Followers</h4>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                    <div className="vendor_top_box">
                        <h2>50</h2>
                        <h4>Order Pending</h4>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <div className="mychart_area">
                        <LineChart />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="mychart_area">
                        <BarChart />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="vendor_order_boxed pt-4">
                        <h4>My following Products</h4>
                        <table className="table pending_table">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">name</th>
                                    <th scope="col">user</th>
                                    <th scope="col">Price</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {allproducts3.slice(0, 5).map((data, index)=>(
                                    <tr key={index}>
                                    <td>{data.name}</td>
                                    <td>{data.user.firstName}</td>
                                     <td>${data.price}</td>
                                     
                                    </tr>
                                ))}
                               
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="vendor_order_boxed pt-4">
                        <h4>Recent Orders</h4>
                        <table className="table pending_table">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Order Id</th>
                                    <th scope="col">Product Details</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><Link to="/invoice-one" className="text-primary">#78153</Link></td>
                                    <td>Belted Trench Coat</td>
                                    <td><span className="badge badge-info">Shipped</span></td>
                                </tr>
                                <tr>
                                    <td><Link to="/invoice-one" className="text-primary">#78154</Link></td>
                                    <td>Neck Velvet Dress</td>
                                    <td><span className="badge badge-warning">Pending</span></td>
                                </tr>
                                <tr>
                                    <td><Link to="/invoice-one" className="text-primary">#78155</Link></td>
                                    <td>T-Shirt For Woman</td>
                                    <td><span className="badge badge-success">Confirmed</span></td>
                                </tr>
                                <tr>
                                    <td><Link to="/invoice-one" className="text-primary">#78156</Link></td>
                                    <td>Fit-Flare Dress</td>
                                    <td><span className="badge badge-danger">Canceled</span></td>
                                </tr>
                                <tr>
                                    <td><Link to="/invoice-one" className="text-primary">#78157</Link></td>
                                    <td>Long-Shirt For Men</td>
                                    <td><span className="badge badge-info">Shipped</span></td>
                                </tr>
                                <tr>
                                    <td><Link to="/invoice-one" className="text-primary">#78158</Link></td>
                                    <td>Sharee for women</td>
                                    <td><span className="badge badge-info">Shipped</span></td>
                                </tr>
                                <tr>
                                    <td><Link to="/invoice-one" className="text-primary">#78159</Link></td>
                                    <td>Handbag for Girls</td>
                                    <td><span className="badge badge-info">Shipped</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
