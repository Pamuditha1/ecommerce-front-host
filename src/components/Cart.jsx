import React, { useState, useEffect } from "react";
import CartTable from "./CartTable";
import { UserContext } from "./CustomerView";
import PurchaseModal from "./modals/PurchaseModal";
import ViewProductImage from "./ViewProductImage";

function Cart(props) {
  // const [cartProps, setcartProps] = useState([])
  // // console.log("cart props",props)
  // useEffect(async () => {
  console.log(props.location.pathname);
  // // setcartProps(props.cart)
  // // console.log('Setted cart props')
  // // const cart = localStorage.getItem('cart');
  // console.log("storage cart", cart)
  // // setcartProps(cart)
  // // console.log("cart props setted", cartProps)
  // }, []);
  // console.log('cart props', props.cart);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [subtotal, setsubtotal] = useState(0);

  const [cartToSave, setcartToSave] = useState([]);

  const setSaveCart = (list) => {
    setcartToSave(list);
  };

  return (
    <>
      <UserContext.Consumer>
        {(cart) => {
          console.log("Context Cart", cart);
          return (
            <div style={{ color: "white" }}>
              {
                <>
                  <CartTable
                    cart={cart}
                    removeFromCart={props.removeFromCart}
                    setisModalOpen={setisModalOpen}
                    subtotal={subtotal}
                    setsubtotal={setsubtotal}
                    resetCart={props.resetCart}
                    setSaveCart={setSaveCart}
                  />
                  <PurchaseModal
                    isModalOpen={isModalOpen}
                    setisModalOpen={setisModalOpen}
                    subtotal={subtotal}
                    cart={cart}
                    history={props.history}
                  />
                </>
              }
            </div>
          );
        }}
        {/* <PurchaseModal isModalOpen={isModalOpen} setisModalOpen={setisModalOpen}/>    */}
      </UserContext.Consumer>
      {/* <PurchaseModal isModalOpen={isModalOpen} setisModalOpen={setisModalOpen} subtotal={subtotal}/>  */}
    </>
  );
}

export default Cart;
