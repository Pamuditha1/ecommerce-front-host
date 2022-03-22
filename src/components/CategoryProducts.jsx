import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Loader from "react-loader-spinner";

import { getProductsByCategory } from "../services/products";
import Products from "./Products.jsx";

Modal.setAppElement("#root");

function CategoryProducts(props) {
  const [allProducts, setallProducts] = useState([]);
  const [loading, setloading] = useState(true);

  async function fetchProducts() {
    setloading(true);
    const products = await getProductsByCategory(props.match.params.category);

    setallProducts(products);
    setloading(false);
  }

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.category]);

  return (
    <div>
      {loading ? (
        <div className="container text-center" style={{ width: "793px" }}>
          <Loader type="ThreeDots" color="#00BFFF" height={300} width={300} />
        </div>
      ) : (
        <Products
          title={`Category - ${props.match.params.category}`}
          products={allProducts}
          cart={props.cart}
          addtoCart={props.addtoCart}
          filterCategory={props.filterCategory}
        />
      )}
    </div>
  );
}

export default CategoryProducts;
