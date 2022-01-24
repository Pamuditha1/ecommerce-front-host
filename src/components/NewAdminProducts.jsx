import React, { useState, useEffect } from "react";
import getAllProductsAdmin from "../services/getAllProductsAdmin";
import ViewProductImage from "./ViewProductImage.jsx";
import Modal from "react-modal";
import ProductModal from "./modals/ProductModal.jsx";
import { Badge } from "reactstrap";
import { Link, Route, Switch } from "react-router-dom";
import { faArrowsAlt, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdminProductModal from "./modals/AdminProductModal.jsx";

Modal.setAppElement("#root");

function NewAdminProducts(props) {
  const [allProducts, setallProducts] = useState([]);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [modalProduct, setmodalProduct] = useState({});

  useEffect(async () => {
    // setIsLoading(true)
    const products = await getAllProductsAdmin();
    console.log("products", products);
    setallProducts(products);
    console.log("All products", allProducts);
    // setIsLoading(false)
  }, []);

  const productNameStyle = {
    backgroundColor: "hsl(0, 0%, 100%, 0.7)",
    color: "black",
  };
  const productPriceStyle = {
    color: "black",
    marginTop: "90%",
    marginBottom: "0",
    backgroundColor: "#00B2FF",
    borderRadius: "10px",
    opacity: "0.7",
  };
  const discountedPriceStyle = {
    color: "#ff0000",
    marginTop: "0%",
    marginBottom: "0",
    backgroundColor: "white",
    borderRadius: "10px",
    opacity: "0.8",
  };

  const viewModal = (p) => {
    setmodalProduct(p);
    setisModalOpen(true);
    console.log(p);
  };
  const toggle = () => setisModalOpen(!isModalOpen);

  return (
    <div>
      <h6
        style={{ backgroundColor: "blueviolet" }}
        className="pl-5 pt-1 pb-1 mb-5"
      >
        All Items
      </h6>
      <div className="row">
        {allProducts &&
          allProducts.map((product) => (
            <div className="card bg-dark text-white m-4" key={product._id}>
              <ViewProductImage
                proNo={product.productNo}
                height="200"
                width="200"
              />
              <div className="card-img-overlay">
                <div className="row">
                  <div className="col-7">
                    {/* {product.popular && <FontAwesomeIcon icon={faStar} size="2x" style={{color: 'yellow'}}/>} */}
                  </div>
                  <div className="col-5">
                    {product.discount &&
                      (product.discount && product.discount != 0 ? (
                        <h4>
                          <Badge color="danger">{product.discount} off</Badge>
                        </h4>
                      ) : (
                        <h5 style={{ visibility: "hidden" }}>
                          <Badge color="danger">{product.discount} off</Badge>
                        </h5>
                      ))}
                  </div>
                </div>
                <center>
                  <button
                    onClick={() => viewModal(product)}
                    className="btn btn-outline-primary"
                  >
                    View
                  </button>
                  {/* <Link to={`/admin/updateitem/${product._id}`}>                            
                                    <button className="btn btn-outline-warning" onClick={toggle} >Update Item</button>
                                </Link> */}
                </center>
              </div>

              <div className="row">
                <div className="col-12">
                  <h6 className="card-title" style={productNameStyle}>
                    {product.productName}
                  </h6>
                  <h6 className="card-title" style={productNameStyle}>
                    {product.productNo}
                  </h6>
                  {/* <small className="pl-2">{product.category}</small>            */}
                </div>
                {/*                             
                            <div className="col-12">
                                <p className="card-text"><strong style={{textDecoration: (product.discount && product.discount!=0) && 'line-through'}}>Rs. {product.price}</strong></p>
                                {(product.discount && product.discount!=0) && 
                                        <p className="card-text" style={discountedPriceStyle}>
                                            <strong className="pl-2">Rs. {product.discountedPrice}</strong>
                                        </p>
                                    }
                            </div> */}
              </div>
            </div>
          ))}
        <AdminProductModal
          isModalOpen={isModalOpen}
          setisModalOpen={setisModalOpen}
          product={modalProduct}
        />
        {/* <Modal
                    isOpen={isModalOpen}
                    onRequestClose={() => setisModalOpen(false)}
                    contentLabel="Minimal Modal Example"
                >   
                    <h1>Hello</h1>
                    <p>hbhbfhwfhbhb</p>
                </Modal> */}
      </div>
    </div>
  );
}

export default NewAdminProducts;
