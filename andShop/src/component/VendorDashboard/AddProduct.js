import React, { useState } from "react";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import img1 from "../../assets/img/product-image/product1.png";
import axios from "axios";

const AddProduct = () => {
  const history = useHistory();
  let productpicture="null";

  // let [productName, productPrice] = useState();
  function fileselect(event) {

    const fileList = event.target.files;

    let reader = new FileReader();
    reader.readAsDataURL(fileList[0]);
    reader.onload = (event) => {
        
       
            
        productpicture = event.target.result;
        

    }



}

  function ajouter_un_cours(e) {
    e.preventDefault();
    let request = {
      name: document.getElementById("product_name").value,
      imageName:productpicture,
      description: document.getElementById("product_description").value,
      price: document.getElementById("product_price").value,
      brand: document.getElementById("product_brand").value,
      Etat: document.getElementById("product_etat").value,
      countInStock: document.getElementById("available_stock").value,
    };
    console.log(request);
    axios
      .post("http://localhost:5000/api/products/", request)
      .then((resp) => {
        alert("le PRODUCTS est bien ajouter");
        console.log(request);
        const produit = resp.data;
        this.setState({ produit });
        console.log("nom de produit:"+this.state.produit.name);

        // history.push({
        //   pathname: '/admin/consulter_cours',

        // });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <section id="add_product_area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="add_product_wrapper">
                <h4>Add Product</h4>
                <form
                  className="add_product_form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    Swal.fire(
                      "Success",
                      "Product Successfully Added",
                      "success"
                    );
                    history.push("/shop");
                  }}
                >
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="image-input">
                        <img src={img1} className="image-preview" alt="img" />
                        <input type="file"  onChange={fileselect} accept="image/*" id="imageInput" />
                        <label htmlFor="imageInput" className="image-button">
                          <i className="fa fa-image"></i>Choose image
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="fotm-group">
                        <label htmlFor="product_name">
                          Product Name<span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="product_name"
                          className="form-control"
                          placeholder="Product Title here"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="fotm-group">
                        <label htmlFor="product_description">
                          Product Description<span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="product_description"
                          className="form-control"
                          placeholder="Product Description here"
                          required
                        />
                      </div>
                    </div>


                    <div className="col-lg-6">
                      <div className="fotm-group">
                        <label htmlFor="product_price">
                          Product Price<span className="text-danger">*</span>
                        </label>
                        <input
                          type="number"
                          id="product_price"
                          className="form-control"
                          placeholder="Product Price"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="fotm-group">
                        <label htmlFor="product_brand">
                          Product Brand<span className="text-danger">*</span>
                        </label>
                        <select name="product" id="product_brand" required>
                          <option value="zara">zara</option>
                          <option value="bershka">bershka</option>
                          <option value="nike">nike</option>
                          <option value="adidas">adidas</option>
                          <option value="other">other</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="fotm-group">
                        <label htmlFor="product_etat">
                          Etat<span className="text-danger">*</span>
                        </label>
                        <select name="etat" id="product_etat" required>
                          <option value="Neuf avec etiquette">Neuf avec etiquette</option>
                          <option value="Neuf sans etiquette">Neuf sans etiquette</option>
                          <option value="Très bon état">Très bon état</option>
                          <option value="Bon état">Bon état</option>
                          <option value="Satisfaisant">Satisfaisant</option>
                        </select>
                      </div>
                    </div>
                    {/* <div className="col-lg-6">
                      <div className="fotm-group">
                        <label htmlFor="product_available">
                          Product Available From
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="date"
                          id="product_available"
                          className="form-control"
                          required
                        />
                      </div>
                    </div> */}
                  
                    <div className="col-lg-6">
                      <div className="fotm-group">
                        <label htmlFor="available_stock">
                          Available Stock (Quantity)
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="number"
                          id="available_stock"
                          className="form-control"
                          placeholder="45"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="fotm-group">
                        <label htmlFor="whole_sale">
                          Whole Sale Support
                          <span className="text-danger">*</span>
                        </label>
                        <select name="product" id="whole_sale" required>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="fotm-group">
                        <label htmlFor="flash_sale">
                          Flash Sale Support
                          <span className="text-danger">*</span>
                        </label>
                        <select name="product" id="flash_sale" required>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                    </div>
                  
                    <div className="col-lg-12">
                      <div className="btn_right_table">
                        <button
                          className="theme-btn-one bg-black btn_sm"
                          onClick={ajouter_un_cours}
                        >
                          Add Product
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddProduct;