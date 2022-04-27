import React, { useState, useEffect } from 'react';
import ProductInfo from './ProductInfo';
import RelatedProduct from './RelatedProduct';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RatingStar } from 'rating-star';
import Swal from 'sweetalert2';
import axios from 'axios';

const ProductDetailsOne = ({ match }) => {
  let dispatch = useDispatch();
  let [OneProduct, setOneProduct] = useState();

  let { id } = useParams();
  console.log("hedhi eli f productDetails.js", { id });


  useEffect(() => {
    const getoneproducts = async () => {
      axios
        .get('http://localhost:5000/api/products/find/' + id)
        .then((resp) => {
          setOneProduct(resp.data);
          console.log('*******************');

          console.log(resp.data);
          console.log('*******************');
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getoneproducts();
  }, []);
  console.log("hedhi eli f productDetails.js 2",OneProduct);

  // dispatch({ type: "products/getProductById", payload: { id } });
  // let product = useSelector((state) => state.products.single);

  // Add to cart
  const addToCart = async (id) => {
       
    dispatch({ type: 'products/addToCart', payload: { id } });
    
  };

  // Add to Favorite
  const addToFav = async (id) => {
    // dispatch({ type: "products/addToFav", payload: { id } })
  };

  // Add to Compare
  const addToComp = async (id) => {
    //  dispatch({ type: "products/addToComp", payload: { id } })
  };

  const colorSwatch = (i) => {
    //    let data = OneProduct.color.find(item => item.color === i)
    // setImg(data.img)
  };

  const [count, setCount] = useState(1);

  // const [img, setImg] = useState(product.img)

  const incNum = () => {
    setCount(count + 1);
  };
  const decNum = () => {
    if (count > 1) {
      setCount(count - 1);
    } else {
      Swal.fire('Sorry!', 'Minimun Quantity Reached', 'warning');
      setCount(1);
    }
  };



  return (
    <>
      {OneProduct ? (
        <section id="product_single_one" className="ptb-100">
          <div className="container">
            <div className="row area_boxed">
              <div className="col-lg-4">
                <div className="product_single_one_img">
                    <p> hhhhhhhhhhhhhhhhhhh </p>
                  <img src={OneProduct.image} alt="img" />
                </div>
              </div>
              <div className="col-lg-8">
                <div className="product_details_right_one">
                  <div className="modal_product_content_one">
                    <h3>{OneProduct.name}</h3>
                    <div className="reviews_rating">
                      {/* <RatingStar maxScore={5} rating={product.rating.rate} id="rating-star-common" />
                                        <span>({product.rating.count} Customer Reviews)</span> */}
                    </div>
                    <h4>
                      {OneProduct.price}.00DT{' '}
                      <del>{parseInt(OneProduct.price) + 17}.00Dt</del>{' '}
                    </h4>
                    <p>{OneProduct.description}</p>
                    <div className="customs_selects">
                      <select name="product" className="customs_sel_box">
                        <option value="volvo">Size</option>
                        <option value="xl">XL</option>
                        <option value="small">S</option>
                        <option value="medium">M</option>
                        <option value="learz">L</option>
                      </select>
                    </div>
                    <div className="variable-single-item">
                      <span>Color</span>
                      <div className="product-variable-color">
                        <label htmlFor="modal-product-color-red1">
                          <input
                            name="modal-product-color"
                            id="modal-product-color-red1"
                            className="color-select"
                            type="radio"
                            onChange={() => {
                              colorSwatch('red');
                            }}
                            defaultChecked
                          />
                          <span className="product-color-red"></span>
                        </label>
                        <label htmlFor="modal-product-color-green3">
                          <input
                            name="modal-product-color"
                            id="modal-product-color-green3"
                            className="color-select"
                            type="radio"
                            onChange={() => {
                              colorSwatch('green');
                            }}
                          />
                          <span className="product-color-green"></span>
                        </label>
                        <label htmlFor="modal-product-color-blue5">
                          <input
                            name="modal-product-color"
                            id="modal-product-color-blue5"
                            className="color-select"
                            type="radio"
                            onChange={() => {
                              colorSwatch('blue');
                            }}
                          />
                          <span className="product-color-blue"></span>
                        </label>
                      </div>
                    </div>
                    <form id="product_count_form_two">
                      <div className="product_count_one">
                        <div className="plus-minus-input">
                          <div className="input-group-button">
                            <button
                              type="button"
                              className="button"
                              onClick={decNum}
                            >
                              <i className="fa fa-minus"></i>
                            </button>
                          </div>
                          <input
                            className="form-control"
                            type="number"
                            value={count}
                            readOnly
                          />
                          <div className="input-group-button">
                            <button
                              type="button"
                              className="button"
                              onClick={incNum}
                            >
                              <i className="fa fa-plus"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                    <div className="links_Product_areas">
                      <ul>
                        <li>
                          <a
                            href="#!"
                            className="action wishlist"
                            title="Wishlist"
                            onClick={() => addToFav(OneProduct.name)}
                          >
                            <i className="fa fa-heart"></i>Add To Wishlist
                          </a>
                        </li>
                        <li>
                          <a
                            href="#!"
                            className="action compare"
                            onClick={() => addToComp(OneProduct.name)}
                            title="Compare"
                          >
                            <i className="fa fa-exchange"></i>Add To Compare
                          </a>
                        </li>
                      </ul>
                      <a
                        href="#!"
                        className="theme-btn-one btn-black-overlay btn_sm"
                        onClick={() => addToCart(OneProduct.name)}
                      >
                        Add To Cart
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ProductInfo OneProduct={OneProduct} />
          </div>
        </section>
      ) : (
        <div className="container ptb-100">
          <div className="row">
            <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-12 col-12">
              <div className="empaty_cart_area">
                {/* <img src={img} alt="img" /> */}
                <h2>PRODUCT NOT FOUND</h2>
                <h3>Sorry Mate... No Item Found according to Your query!</h3>
                <Link to="/shop" className="btn btn-black-overlay btn_sm">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <RelatedProduct />
    </>
  );
};

export default ProductDetailsOne;
