import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";

import Carousel from "./components/Carousel";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import CategoryProducts from "./components/CategoryProducts";

import RegisterCustomer from "./pages/customers/RegisterCustomer";
import CustomerLogin from "./pages/customers/CustomerLogin";
import CustomerHome from "./pages/customers/Home";

export const UserContext = React.createContext();

function CustomerView(props) {
  const currentLocation = props.location.pathname;
  const [cart, setcart] = useState([]);
  const [cCount, setcCount] = useState(0);
  const [filtering, setfiltering] = useState(false);
  const [filterCategory, setfilterCategory] = useState("");

  const addtoCart = (p) => {
    let newCart = JSON.parse(localStorage.getItem("cart")) || [];
    newCart.push(p);

    setcart(newCart);

    localStorage.setItem("cart", JSON.stringify(newCart));

    setcCount(cCount + 1);
  };
  const removeFromCart = (p) => {
    let currentCart = JSON.parse(localStorage.getItem("cart"));

    let removed = currentCart.filter((c) => {
      if ((c._id === p._id) & (c.user.size === p.user.size)) {
        c.user.addedToCart = false;
        setcCount(cCount - 1);
        return false;
      }
      return true;
    });
    setcart(removed);

    localStorage.setItem("cart", JSON.stringify(removed));
  };
  const resetCart = () => {
    setcart([]);
    localStorage.removeItem("cart");
    props.history.push("/");
  };

  return (
    <div>
      <UserContext.Provider value={cart}>
        <Header />
        <NavBar count={cart.length} cCount={cCount} />
        {currentLocation === "/user/home" && <Carousel />}
        <Switch>
          <Route
            path="/user/cart"
            render={(props) => (
              <Cart
                cart={cart}
                cCount={cCount}
                addtoCart={addtoCart}
                removeFromCart={removeFromCart}
                resetCart={resetCart}
                {...props}
              />
            )}
          />
          <Route
            path="/home"
            render={(props) => (
              <CustomerHome
                cart={cart}
                addtoCart={addtoCart}
                {...props}
                filtering={filtering}
                setfiltering={setfiltering}
                filterCategory={filterCategory}
                setfilterCategory={setfilterCategory}
              />
            )}
          />
          <Route
            path="/user/category/:category"
            render={(props) => (
              <CategoryProducts
                cart={cart}
                addtoCart={addtoCart}
                filtering={filtering}
                setfiltering={setfiltering}
                filterCategory={filterCategory}
                setfilterCategory={setfilterCategory}
                {...props}
              />
            )}
          />
          <Route path="/user/register" component={RegisterCustomer} />
          <Route path="/user/login" component={CustomerLogin} />
          <Route
            path="/"
            render={(props) => (
              <CustomerHome
                cart={cart}
                addtoCart={addtoCart}
                {...props}
                filtering={filtering}
                setfiltering={setfiltering}
                filterCategory={filterCategory}
                setfilterCategory={setfilterCategory}
              />
            )}
          />
        </Switch>
      </UserContext.Provider>
    </div>
  );
}

export default CustomerView;
