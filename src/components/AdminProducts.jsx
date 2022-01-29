import React, { useState, useEffect } from "react";
import getAllProductsAdmin from "../services/getAllProductsAdmin";
import Modal from "react-modal";
import AdminProductModal from "./modals/AdminProductModal.jsx";
import ProductItem from "./ProductItem";

Modal.setAppElement("#root");

function AdminProducts() {
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
    </div>
  );
}

export default AdminProducts;
