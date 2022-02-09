import React, { useState, useEffect } from "react";
import { getAllProducts } from "../../services/products";
import Modal from "react-modal";
import AdminProductModal from "../../components/modals/AdminProductModal.jsx";
import ProductItem from "../../components/ProductItem";

Modal.setAppElement("#root");

function ViewProducts() {
  const [allProducts, setallProducts] = useState([]);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [modalProduct, setmodalProduct] = useState({});

  const getProducts = async () => {
    const products = await getAllProducts();
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
    </div>
  );
}

export default ViewProducts;
