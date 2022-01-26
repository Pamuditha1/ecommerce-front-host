import React, { useState, useEffect } from "react";
import getAllProductsAdmin from "../services/getAllProductsAdmin";
import ViewProductImage from "./ViewProductImage.jsx";
import AdminProductModal from "./modals/AdminProductModal.jsx";

function AdminProducts(props) {
  const [allProducts, setallProducts] = useState([]);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [modalProduct, setmodalProduct] = useState({});

  useEffect(() => {
    async function fetchAllProducts() {
      const products = await getAllProductsAdmin();
      setallProducts(products);
    }
    fetchAllProducts();
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

  const viewModal = (p) => {
    setmodalProduct(p);
    setisModalOpen(true);
  };

  return (
    <div>
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
                <h6 className="card-title" style={productNameStyle}>
                  {product.productName}
                </h6>
                <center>
                  <p className="card-text" style={productPriceStyle}>
                    <strong>Rs. {product.price}</strong>
                  </p>
                  <button
                    onClick={() => viewModal(product)}
                    className="btn btn-outline-primary"
                  >
                    View
                  </button>
                </center>
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

export default AdminProducts;
