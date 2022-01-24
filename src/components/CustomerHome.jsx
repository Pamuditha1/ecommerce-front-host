import React from "react";
import Carousel from "./Carousel";
import DiscountedProducts from "./DiscountedProducts";
import MostPopularSales from "./MostPopularSales";
import Products from "./Products";

function CustomerHome({ cart, addtoCart, filterCategory }) {
  return (
    <div>
      <Carousel />
      <DiscountedProducts cart={cart} addtoCart={addtoCart} />
      <MostPopularSales cart={cart} addtoCart={addtoCart} />
      <Products
        cart={cart}
        addtoCart={addtoCart}
        filterCategory={filterCategory}
      />
    </div>
  );
}

export default CustomerHome;
