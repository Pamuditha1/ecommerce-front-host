import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";

import Carousel from "../../components/Carousel";
import Products from "../../components/Products";

import { getAllProducts } from "../../services/products";
import { getDiscountedProducts } from "../../services/products";
import { getPopularProducts } from "../../services/products";

function CustomerHome({ cart, addtoCart, filterCategory }) {
  const [allProducts, setallProducts] = useState([]);
  const [discountedProducts, setdiscountedProducts] = useState([]);
  const [popular, setpopular] = useState([]);
  const [loading, setloading] = useState(true);

  const getProducts = async () => {
    const popu = await getPopularProducts();
    setpopular(popu);
    const discounted = await getDiscountedProducts();
    setdiscountedProducts(discounted);
    const products = await getAllProducts();
    setallProducts(products);
  };

  useEffect(() => {
    setloading(true);
    getProducts();
    setloading(false);
  }, []);

  return (
    <div>
      <Carousel />
      <>
        {loading ? (
          <div className="container text-center" style={{ width: "793px" }}>
            <Loader type="ThreeDots" color="#00BFFF" height={300} width={300} />
          </div>
        ) : (
          <>
            <Products
              title="Most Popular Items"
              products={popular}
              cart={cart}
              addtoCart={addtoCart}
              filterCategory={filterCategory}
            />

            <Products
              title="Discounted Items"
              products={discountedProducts}
              cart={cart}
              addtoCart={addtoCart}
              filterCategory={filterCategory}
            />
            <Products
              title="All Items"
              products={allProducts}
              cart={cart}
              addtoCart={addtoCart}
              filterCategory={filterCategory}
            />
          </>
        )}
      </>
    </div>
  );
}

export default CustomerHome;
