import React, { useState, useEffect } from "react";
import getAllProductsAdmin from "../services/getAllProductsAdmin";
import ViewProductImage from "./ViewProductImage.jsx";
import Modal from "react-modal";
import { Badge } from "reactstrap";
import AdminProductModal from "./modals/AdminProductModal.jsx";

Modal.setAppElement("#root");

function NewAdminProducts() {
  const [allProducts, setallProducts] = useState([]);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [modalProduct, setmodalProduct] = useState({});

  const getProducts = async () => {
    const products = await getAllProductsAdmin();
    setallProducts(products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const productNameStyle = {
    backgroundColor: "hsl(0, 0%, 100%, 0.7)",
    color: "black",
  };

  const viewModal = (p) => {
    setmodalProduct(p);
    setisModalOpen(true);
  };

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
                  <div className="col-7"></div>
                  <div className="col-5">
                    {product.discount &&
                      (product.discount && product.discount !== 0 ? (
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
                </div>
              </div>
            </div>
          ))}
        <AdminProductModal
          isModalOpen={isModalOpen}
          setisModalOpen={setisModalOpen}
          product={modalProduct}
        />
      </div>
    </div>
  );
}

export default NewAdminProducts;
