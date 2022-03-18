import React, { useState, useEffect } from "react";
import Modal from "react-modal";

import { getProductsByCategory } from "../services/products";
import Products from "./Products.jsx";

Modal.setAppElement("#root");

function CategoryProducts(props) {
  const [allProducts, setallProducts] = useState([]);

  async function fetchProducts() {
    const products = await getProductsByCategory(props.match.params.category);

    setallProducts(products);
  }

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.category]);

  return (
    <div>
      <Products
        title={`Category - ${props.match.params.category}`}
        products={allProducts}
        cart={props.cart}
        addtoCart={props.addtoCart}
        filterCategory={props.filterCategory}
      />
    </div>
  );
}

export default CategoryProducts;
