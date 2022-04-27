import React, { useState, useEffect,useCallback } from "react";
import axios from "axios";

// import Img
import user1 from "../../../assets/img/user/user1.png";
import user2 from "../../../assets/img/user/user2.png";
import user3 from "../../../assets/img/user/user3.png";

const ProductInfo = (props) => {
  let [allcomments, setAllcomments] = useState([]);
  useEffect(() => {
    const getallcomments = async () => {
      axios
        .get(
          "http://localhost:5000/api/products/findcomm/" + props.OneProduct._id
        )
        .then((resp) => {
          setAllcomments(resp.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getallcomments();
  }, []);
  function ajouter_commentaire(e) {
    e.preventDefault();
    let request = {
      commentaire: document.getElementById("commentaire").value,
    };
    console.log(request);
    axios
      .post(
        "http://localhost:5000/api/products/addComment/" + props.OneProduct._id,
        request
      )
      .then((resp) => {
        alert("le commentaire est bien ajouter");
        console.log(request);
        const commentaire = resp.data;
        this.setState({ commentaire });

        // history.push({
        //   pathname: '/admin/consulter_cours',

        // });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const handleClick = useCallback(
    (id) => () => {
      console.log("ID: ", id)
      let request = {
        reponse: document.getElementById("reponse").value,
      };
      console.log(request);
      axios
        .post(
          "http://localhost:5000/api/products/addreponse/" + props.OneProduct._id+"/"+id,
          request
        )
        .then((resp) => {
          alert("le reponse est bien ajouter");
          console.log(request);
          const reponse = resp.data;
          this.setState({ reponse });
  
          // history.push({
          //   pathname: '/admin/consulter_cours',
  
          // });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [],
  )
  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="product_details_tabs">
            <ul className="nav nav-tabs">
              <li>
                <a data-toggle="tab" href="#description" className="active">
                  Description
                </a>
              </li>
              <li>
                <a data-toggle="tab" href="#additional">
                  Additional Information
                </a>
              </li>
              <li>
                <a data-toggle="tab" href="#review">
                  Review
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div id="description" className="tab-pane fade in show active">
                <div className="product_description">
                  <p>
                    Curabitur arcu erat, accumsan id imperdiet et, porttitor at
                    sem. Vestibulum ac diam sit amet quam vehicula elementum sed
                    sit amet dui. Sed porttitor lectus nibh. Vivamus magna
                    justo, lacinia eget consectetur sed, convallis at tellus.
                    Sed porttitor lectus nibh. Donec sollicitudin molestie
                    malesuada. Vivamus magna justo, lacinia eget consectetur
                    sed, convallis at tellus. Curabitur arcu erat, accumsan id
                    imperdiet et, porttitor at sem.
                  </p>
                  <ul>
                    <li>Vivamus magna justo, lacinia eget consectetur sed</li>
                    <li>Curabitur aliquet quam id dui posuere blandit</li>
                    <li>
                      Mauris blandit aliquet elit, eget tincidunt nibh pulvinar{" "}
                    </li>
                  </ul>
                  <p>
                    Donec sollicitudin molestie malesuada. Cras ultricies ligula
                    sed magna dictum porta. Mauris blandit aliquet elit, eget
                    tincidunt nibh pulvinar a. Nulla porttitor accumsan
                    tincidunt. Cras ultricies ligula sed magna dictum porta.
                    Curabitur arcu erat, accumsan id imperdiet et, Pellentesque
                    in ipsum id orci porta dapibus. Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. porttitor at sem. Quisque velit
                    nisi, pretium ut lacinia in, elementum id enim.
                  </p>
                </div>
              </div>
              <div id="additional" className="tab-pane fade">
                <div className="product_additional">
                  <ul>
                    <li>
                      Weight: <span>400 g</span>
                    </li>
                    <li>
                      Dimensions: <span>10 x 10 x 15 cm</span>
                    </li>
                    <li>
                      Materials: <span> 60% cotton, 40% polyester</span>
                    </li>
                    <li>
                      Other Info:{" "}
                      <span>
                        {" "}
                        American heirloom jean shorts pug seitan letterpress
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div id="review" className="tab-pane fade">
                <div className="col-lg-6">
                  <div className="fotm-group">
                    <label htmlFor="product_name">
                      Commentaire <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="commentaire"
                      className="form-control"
                      placeholder="commentaire"
                      required
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="btn_right_table">
                    <button
                      className="theme-btn-one bg-black btn_sm"
                      onClick={ajouter_commentaire}
                    >
                      Add comment
                    </button>
                  </div>
                </div>
                <div className="product_reviews">
                  <ul>
                    {allcomments.map((data, index) => (
                      <li className="media" key={index}>
                        <div className="media-img">
                          {/* <img src={data.img} alt="img" /> */}
                        </div>
                        <div className="media-body">
                          <div className="media-header">
                            <div className="media-name">
                              {/* <h4>{data.name}</h4> */}
                              <p>{data.created_at}</p>
                            </div>
                            <div className="post-share">
                              {/* <a href="#!" className="replay">{data.replay}</a>
                                                            <a href="#!" className="">{data.report}</a> */}
                            </div>
                          </div>
                          <div className="media-pragraph">
                            <div className="product_review_strat">
                              <span>
                                <a href="#!">
                                  <i className="fa fa-star"></i>
                                </a>
                              </span>
                              <span>
                                <a href="#!">
                                  <i className="fa fa-star"></i>
                                </a>
                              </span>
                              <span>
                                <a href="#!">
                                  <i className="fa fa-star"></i>
                                </a>
                              </span>
                              <span>
                                <a href="#!">
                                  <i className="fa fa-star"></i>
                                </a>
                              </span>
                              <span>
                                <a href="#!">
                                  <i className="fa fa-star"></i>
                                </a>
                              </span>
                            </div>
                            <p>{data.commentaire}</p>
                          </div>
                          <input
                      type="text"
                      id="reponse"
                      className="form-control"
                      placeholder="reponse"
                      required
                    />
                     <button
                      className="theme-btn-one bg-black btn_sm"
                      onClick={handleClick(data._id)}
                    >
                      Add reponse
                    </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductInfo;
