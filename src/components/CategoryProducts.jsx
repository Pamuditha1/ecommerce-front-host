import React, { useState, useEffect } from "react";
import getAllProducts from "../services/getAllProductsService.js";
import ViewProductImage from "./ViewProductImage.jsx";
import Modal from "react-modal";
import ProductModal from "./modals/ProductModal.jsx";
Modal.setAppElement("#root");

function CategoryProducts(props) {
  const [allProducts, setallProducts] = useState([]);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [modalProduct, setmodalProduct] = useState({});

  async function fetchProducts() {
    const products = await getAllProducts();
    let fill = products.filter((p) => {
      if (p.category === props.match.params.category) return true;
      return false;
    });
    setallProducts(fill);
  }

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.category]);

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
  };

  const cardStyle = {
    color: "black",
    boxShadow: "0px 10px 10px black",
    borderRadius: "20px",
  };

  const titaleStyle = {
    color: "#f4d219",
    fontWeight: "bold",
  };

  return (
    <div>
      <h3 className="proName text-center mt-5 mb-5" style={titaleStyle}>
        Category - {props.match.params.category}
      </h3>
      <div className="row">
        {allProducts &&
          allProducts.map((product) => (
            <div className="card m-2 mb-5" style={cardStyle}>
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
                            product.discount !== 0 &&
                            "line-through",
                        }}
                      >
                        Rs. {product.price}
                      </p>
                    </div>
                    <div className="col-6">
                      {product.discount && product.discount !== 0 && (
                        <p className="card-text" style={discountedPriceStyle}>
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
            </div>
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

export default CategoryProducts;
