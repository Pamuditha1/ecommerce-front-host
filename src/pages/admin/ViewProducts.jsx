import React, { useState, useEffect } from "react";
import { getAllProducts } from "../../services/products";
import Modal from "react-modal";
import Loader from "react-loader-spinner";

import AdminProductModal from "../../components/modals/AdminProductModal.jsx";
import ProductItem from "../../components/ProductItem";

Modal.setAppElement("#root");

function ViewProducts() {
  const [allProducts, setallProducts] = useState([]);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [modalProduct, setmodalProduct] = useState({});
  const [loading, setloading] = useState(false);

  const getProducts = async () => {
    setloading(true);
    const products = await getAllProducts();
    setallProducts(products);
    setloading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const viewModal = (p) => {
    setmodalProduct(p);
    setisModalOpen(true);
  };

  return (
    <div>
      <h6
        style={{
          backgroundColor: "#3b485c",
          boxShadow: "0px 5px 5px black",
        }}
        className="pl-5 pt-1 pb-1 mb-5"
      >
        All Items
      </h6>
      {loading ? (
        <div className="container text-center" style={{ width: "793px" }}>
          <Loader type="ThreeDots" color="#00BFFF" height={300} width={300} />
        </div>
      ) : (
        <div className="row">
          {allProducts?.map((product) => (
            <ProductItem
              key={product._id}
              product={product}
              viewModal={viewModal}
            />
          ))}
          <AdminProductModal
            isModalOpen={isModalOpen}
            setisModalOpen={setisModalOpen}
            product={modalProduct}
          />
        </div>
      )}
    </div>
  );
}

export default ViewProducts;
