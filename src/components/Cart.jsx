import React, { useState } from "react";
import CartTable from "./CartTable";
import { UserContext } from "./CustomerView";
import PurchaseModal from "./modals/PurchaseModal";

function Cart(props) {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [subtotal, setsubtotal] = useState(0);

  return (
    <>
      <UserContext.Consumer>
        {(cart) => {
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
      </UserContext.Consumer>
    </>
  );
}

export default Cart;
