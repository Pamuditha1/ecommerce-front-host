import React, { useState, useEffect } from "react";

import getPopularProducts from "../services/getPopularProducts";
import ViewProductImage from "./ViewProductImage.jsx";

import Modal from "react-modal";
import ProductModal from "./modals/ProductModal.jsx";
import { Badge } from "reactstrap";
import { faArrowsAlt, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
Modal.setAppElement("#root");

function MostPopularSales(props) {
  const [allProducts, setallProducts] = useState([]);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [modalProduct, setmodalProduct] = useState({});

  useEffect(async () => {
    const products = await getPopularProducts();
    setallProducts(products);
    console.log(products);
  }, []);

  const productNameStyle = {
    backgroundColor: "hsl(0, 0%, 100%, 0.7)",
    color: "black",
    paddingLeft: "5px",
  };
  const productPriceStyle = {
    color: "white",
    marginBottom: "0",
    // backgroundColor: "yellow",
    borderRadius: "10px",
    opacity: "1",
  };
  const discountedPriceStyle = {
    color: "#ff0000",
    marginTop: "0%",
    marginBottom: "0",
    backgroundColor: "white",
    borderRadius: "10px",
    opacity: "0.8",
  };
  const viewButtomStyle = {
    marginTop: "90%",
  };

  const viewModal = (p) => {
    setmodalProduct(p);
    setisModalOpen(true);
  };

  const cardStyle = {
    color: "black",
    boxShadow: "0px 10px 10px black",
    borderRadius: "20px",
    // backgroundColor: "#f4d219",
  };
  const titaleStyle = {
    color: "#f4d219",
    fontWeight: "bold",
  };

  return (
    <div>
      <h3 className="proName text-center mt-5 mb-5" style={titaleStyle}>
        Most Popular Items
      </h3>
      <div className="row">
        {allProducts &&
          allProducts.map((product) => (
            <div className="card m-2" style={cardStyle}>
              <ViewProductImage
                discount={product.discount}
                proNo={product.productNo}
                height="200"
                width="200"
              />
              <div className="card-body">
                <h6 className="card-title">
                  {product.productName}{" "}
                  <small class="text-muted ml-5">{product.category}</small>
                </h6>

                <div className="card-text">
                  <div className="row">
                    <div className="col-6">
                      <p
                        style={{
                          textDecoration:
                            product.discount &&
                            product.discount != 0 &&
                            "line-through",
                        }}
                      >
                        Rs. {product.price}
                      </p>
                    </div>
                    <div className="col-6">
                      {product.discount && product.discount != 0 && (
                        <p
                          className="card-text pl-1"
                          style={discountedPriceStyle}
                        >
                          <strong>Rs. {product.discountedPrice}</strong>
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    onClick={() => viewModal(product)}
                    className="btn btn-outline-dark btn-default text-center"
                  >
                    View
                  </button>
                </div>
              </div>
              {/* <div class="card-footer">
                <small class="text-muted">Last updated 3 mins ago</small>
              </div> */}
            </div>
            // <div className="card bg-dark text-white m-4" key={product._id}>

            //     <ViewProductImage proNo={product.productNo} height="200" width="200"/>
            //     <div className="card-img-overlay">
            //         <div className="row">
            //             <div className="col-7">
            //                 {product.popular && <FontAwesomeIcon icon={faStar} size="2x" style={{color: '#FCC201'}}/>}
            //             </div>
            //             <div className="col-5">
            //             {
            //                 (product.discount && product.discount!=0) ? <h4><Badge color="danger">
            //                 {product.discount}{!product.discount.includes("%") && '/='} off
            //                </Badge></h4> :

            //                <h5 style={{visibility: 'hidden'}}><Badge color="danger">{product.discount} off</Badge></h5>
            //             }
            //             </div>
            //         </div>
            //             <center>
            //                 <button onClick={() => viewModal(product)} className="btn btn-outline-primary"  style={viewButtomStyle}><FontAwesomeIcon icon={faArrowsAlt} size="1x"/></button>
            //             </center>
            //     </div>

            //     <div className="row">
            //         <div className="col-6">
            //             <h6 className="card-title" style={productNameStyle}>{product.productName}</h6>
            //             <small className="pl-2">{product.category}</small>
            //         </div>
            //         <div className="col-6">

            //         <p className="card-text" style={productPriceStyle}><strong style={{textDecoration: (product.discount && product.discount!=0) && 'line-through'}}>Rs. {product.price}</strong></p>
            //         {(product.discount && product.discount!=0) &&
            //                 <p className="card-text" style={discountedPriceStyle}>
            //                     <strong className="pl-2">Rs. {product.discountedPrice}</strong>
            //                 </p>
            //             }
            //         </div>
            //     </div>
            // </div>
          ))}
        <ProductModal
          isModalOpen={isModalOpen}
          setisModalOpen={setisModalOpen}
          product={modalProduct}
          cart={props.cart}
          addtoCart={props.addtoCart}
        />
      </div>
    </div>
  );
}

export default MostPopularSales;
