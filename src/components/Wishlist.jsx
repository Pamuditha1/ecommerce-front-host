import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import Products from "./Products.jsx";
// import { getWishlist } from "../services/wishlist.js";
// import jwtDecode from "jwt-decode";

const Wishlist = (props) => {
  const [loading, setloading] = useState(true);
  const [products, setProducts] = useState();

  async function fetchProducts() {
    // setloading(true);
    // let userId;
    // try {
    //   const jwt = localStorage.getItem("customer-token");
    //   const user = jwtDecode(jwt)._id;

    //   userId = user;
    // } catch (err) {
    //   console.log(err);
    // }

    // const wishlist = await getWishlist(userId);
    // const products = wishlist.map((wish) => wish.productId);

    // setProducts(products);

    const products = JSON.parse(localStorage.getItem("wishlist"));
    setProducts(products);
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
          title="Wishlist"
          products={products}
          cart={props.cart}
          addtoCart={props.addtoCart}
        />
      )}
    </div>
  );
};

export default Wishlist;
