import React, { useState } from 'react'
import { AiOutlineHeart } from 'react-icons/ai';
import { AiOutlineExpand } from 'react-icons/ai';
import { FaExchangeAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import MyVerticallyCenteredModal from '../../Common/Modal';

const ProductCard = (props) => {
    let dispatch = useDispatch();
    // Add to cart
    const addToCart = async (id) => {
        dispatch({ type: "products/addToCart", payload: { id } })
    }
    // Add to Favorite
    const addToFav = async (id) => {
        dispatch({ type: "products/addToFav", payload: { id } })
    }
    // Add to Compare
    const addToComp = async (id) => {
        dispatch({ type: "products/addToComp", payload: { id } })
    }
    const [modalShow, setModalShow] = useState(false);
    return (
        <>
            {/* <div className="product_wrappers_one">
             
                <div className="content">
                    <h5 className="title">
                        <Link to={`/product-details-one/${props.data._id}`}>{props.data.name}</Link>
                    </h5>
                    <span className="price">
                        <span className="new">{props.data.price}.00DT</span>
                    </span>
                </div>
            </div> */}
             <div className="product_wrappers_one">
                <div className="thumb">
                    <Link to={`/product-details-one/${props.data._id}`} className="image">
                        <img src={props.data.image} alt="Product" />
                        <img className="hover-image" src={props.data.image}
                            alt="Product" />
                    </Link>
                    <span className="badges">
                        {/* <span className={(['hot','new','sale'][Math.round(Math.random()*2)])}>{props.data.labels}</span> */}
                    </span>
                    
                    <button type="button" className="add-to-cart offcanvas-toggle" onClick={() => addToCart(props.data._id)}>Add to cart</button>
                </div>
                <div className="content">
                    <h5 className="title">
                        <Link to={`/product-details-one/${props.data._id}`}>{props.data.name}</Link>
                    </h5>
                    <span className="price">
                        <span className="new">{props.data.price}.00DT</span>
                    </span>
                </div>
            </div>

        </>
    )
}

export default ProductCard