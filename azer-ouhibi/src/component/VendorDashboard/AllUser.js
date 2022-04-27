import React, {useRef, useState, useEffect, useContext} from 'react'

import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom"
import Swal from 'sweetalert2';
import { useDispatch,useSelector } from "react-redux";
import M from 'materialize-css'

const axios = require('axios');



const AllUser = () => {




  const [products, setProducts] = useState(
    useSelector((state) => state.products.products)
    
  );
  const [page, setPage] = useState(1);
  let allData = [...useSelector((state) => state.products.products)];


  const [allproducts, setAllproducts] = useState([]);
  const [followId, setFollowId] = useState('');
  const [unfollowId, setUnfollowId] = useState('');
  const  searchModal = useRef(null)
  const [search,setSearch] = useState('')
  const [list,setlist] = useState('')

  const [show, setShow] = useState(true);

  useEffect(()=>{
    M.Modal.init(searchModal.current)
},[])
const fetchUsers =  async(query)=>{
    setSearch(query)
    const response = await axios
        .get("http://localhost:5000/user/search/"+query,{
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            withCredentials: true
    
    
        }
    )
    setlist(response.data)
}
console.log(list)
  useEffect(() => {
    const getallproducts = async () => {
        const response = await axios
        .get("http://localhost:5000/user/getUsers")
          setAllproducts(response?.data.user);
        
    };
    // console.log(resp.data);

    getallproducts();
  }, []);
  var gg 
  allproducts.slice(0,1).map((data, index) =>{
     gg = data._id
  })
console.log(gg)

  const follow = async (v) => {
    const response = await 
    axios.put("http://localhost:5000/user/follow",JSON.stringify({ followId : v }),
    {
        method: 'PUT',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        withCredentials: true


    }
);
    console.log(response.data)
    setFollowId('');
    
      
}
const unfollow = async (s) => {
    const response = await 
    axios.put("http://localhost:5000/user/unfollow",JSON.stringify({ unfollowId : s }),
    {
        method: 'PUT',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        withCredentials: true


    }
);
    console.log(response.data)
    setUnfollowId('');
    
      
}
  const randProduct = (page) => {
    if (page) {
      let data = allData.sort((a, b) => 0.5 - Math.random());
      data = data.slice(0, 9);
      setProducts(data);
      setPage(page);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="vendor_order_boxed pt-4">
            <div className="mb-2">
              <h4>All Users</h4>
              <label>RECHERCHE<span className="text-danger">*</span></label>

              <input type="text" className="form-control" required minLength="8" onChange={(e)=>fetchUsers(e.target.value)}
                 value={search}/>
            </div>
            <div className="table-responsive">
              <table className="table pending_table">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">firstName</th>
                    <th scope="col">lastName</th>
                    <th scope="col">email</th>
                    <th scope="col">follow/Unfollow</th>

                  </tr>
                </thead>
                <tbody>
                  {allproducts.slice(0, 10).map((data, index) => (
                    <tr key={index}>
                      
                      <td>
                          {data.firstName}
                      </td>
                      <td>{data.lastName}</td>
                      <td>{data.email}</td>
                      
                        <td><button  onClick={()=>{follow(data._id)}} 
                         >Follow</button>  
                         <button  onClick={()=>{unfollow(data._id)}} 
                         >Unfollow</button></td>   
                        
                        </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col-lg-12">
              <ul className="pagination">
                <li
                  className="page-item"
                  onClick={(e) => {
                    randProduct(page > 1 ? page - 1 : 0);
                  }}
                >
                  <a className="page-link" href="#!" aria-label="Previous">
                    <span aria-hidden="true">«</span>
                  </a>
                </li>
                <li
                  className={"page-item " + (page === 1 ? "active" : null)}
                  onClick={(e) => {
                    randProduct(1);
                  }}
                >
                  <a className="page-link" href="#!">
                    1
                  </a>
                </li>
                <li
                  className={"page-item " + (page === 2 ? "active" : null)}
                  onClick={(e) => {
                    randProduct(2);
                  }}
                >
                  <a className="page-link" href="#!">
                    2
                  </a>
                </li>
                <li
                  className={"page-item " + (page === 3 ? "active" : null)}
                  onClick={(e) => {
                    randProduct(3);
                  }}
                >
                  <a className="page-link" href="#!">
                    3
                  </a>
                </li>
                <li
                  className="page-item"
                  onClick={(e) => {
                    randProduct(page < 3 ? page + 1 : 0);
                  }}
                >
                  <a className="page-link" href="#!" aria-label="Next">
                    <span aria-hidden="true">»</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllUser;
