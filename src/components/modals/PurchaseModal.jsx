import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

import PurchaseForm from "../PurchaseForm";

import { getCustomerById } from "../../services/customer";
import { placeOrder } from "../../services/orders";

import { generateEvent } from "./../../utils/events";
import { EVENT_TYPES } from "./../../utils/constants";
import { addEvent } from "../../services/event";

const PurchaseModal = ({
  isModalOpen,
  setisModalOpen,
  subtotal,
  cart,
  history,
}) => {
  const toggle = () => setisModalOpen(!isModalOpen);
  const [customer, setcustomer] = useState({});

  const [user, setuser] = useState("");
  const [userData, setuserData] = useState({});

  const [placeAccess, setplaceAccess] = useState(false);

  const getUser = async () => {
    try {
      const jwt = localStorage.getItem("customer-token");
      const uid = jwtDecode(jwt)._id;
      setuser(uid);

      setuserData(await getCustomerById(uid));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, [user]);

  const placeOder = async (e) => {
    e.preventDefault();

    let cartStore = JSON.parse(localStorage.getItem("cart"));
    let orderDetails = cartStore.map((i) => {
      return {
        id: i._id,
        size: i.user.size,
        qty: i.user.quantity,
        total: i.user.total,
      };
    });
    const order = {
      customer: customer,
      cart: orderDetails,
      subtotal: subtotal,
      cartComplete: cartStore,
    };

    await placeOrder(order);

    for (const product of order.cartComplete) {
      const event = await generateEvent(product, EVENT_TYPES.PURCHASE, 0);

      const res = await addEvent(event);
      console.log("purchase event", event);
      console.log("purchase event saved", res);
    }

    toggle();
    const resetCart = () => {
      localStorage.removeItem("cart");
    };
    resetCart();
    history.push("/");
  };
  return (
    <div>
      <Modal isOpen={isModalOpen} toggle={toggle}>
        <ModalHeader toggle={toggle} style={{ color: "black" }}>
          Checkout
        </ModalHeader>

        <ModalBody style={{ color: "black" }}>
          {user ? (
            <div className="row">
              <PurchaseForm
                setcustomer={setcustomer}
                customer={customer}
                userData={userData}
                setplaceAccess={setplaceAccess}
              />
            </div>
          ) : (
            <div className="row text-center">
              <div className="col-8">
                <h6 style={{ color: "red" }}>
                  Log In to proceed the oder placement
                </h6>
              </div>
              <div className="col-4">
                {/* <Link to="/user/login">
                  <button type="button" className="btn btn-dark">
                    Log In
                  </button>
                </Link> */}
                <Link
                  to={{
                    pathname: "/user/login",
                    state: { cart: true },
                  }}
                >
                  <button type="button" className="btn btn-dark">
                    Log In
                  </button>
                </Link>
              </div>
            </div>
          )}
        </ModalBody>

        <ModalFooter>
          <div className="row">
            <div className="col-6">
              <p style={{ color: "black" }} className="row">
                Total Amount : <strong>Rs. {subtotal}</strong>
              </p>
              <p style={{ color: "black" }} className="row">
                Payment Method : <strong>Cash on Delivery</strong>
              </p>
            </div>
            <center>
              <div className="col-12 mt-3">
                <Button
                  onClick={placeOder}
                  color="dark"
                  disabled={!user | !placeAccess}
                >
                  Place Order
                </Button>
              </div>
            </center>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default PurchaseModal;
