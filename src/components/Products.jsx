import React, { useState } from "react";
import Modal from "react-modal";

import ProductModal from "./modals/ProductModal.jsx";
import ProductItem from "./ProductItem.jsx";
Modal.setAppElement("#root");

function Products({ cart, addtoCart, title, products }) {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [modalProduct, setmodalProduct] = useState({});

  const viewModal = (p) => {
    setmodalProduct(p);
    setisModalOpen(true);
  };

  const titaleStyle = {
    color: "white",
    fontWeight: "bold",
  };

  const containerStyle = {
    margin: "auto",
  };

  return (
    <div className="container" style={containerStyle}>
      <h3 className="proName text-center mt-5 mb-5" style={titaleStyle}>
        {title}
      </h3>
      <div className="row">
        {products?.map((product) => (
          <ProductItem
            key={product._id}
            product={product}
            viewModal={viewModal}
          />
        ))}

        <ProductModal
          isModalOpen={isModalOpen}
          setisModalOpen={setisModalOpen}
          product={modalProduct}
          cart={cart}
          addtoCart={addtoCart}
        />
      </div>
    </div>
  );
}

export default Products;
