import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Link } from "react-router-dom";
import PurchaseForm from "../PurchaseForm";
import jwtDecode from "jwt-decode";
import getCustomer from "../../services/getCustomerService";
import placeOrder from "../../services/placeOrderService";

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

  useEffect(async () => {
    try {
      const jwt = localStorage.getItem("token");
      const uid = jwtDecode(jwt)._id;
      setuser(uid);

      setuserData(await getCustomer(uid));
    } catch (err) {
      console.log(err);
    }
  }, [user]);

  const placeOder = async (e) => {
    e.preventDefault();
    // setLoading(true)
    // addProduct(customerData)

    let cartStore = JSON.parse(localStorage.getItem("cart"));
    let orderDetails = cartStore.map((i) => {
      // let orderDetails = cart.map(i => {
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
    console.log("Placing Order", order);
    toggle();
    const resetCart = () => {
      localStorage.removeItem("cart");
    };
    resetCart();
    history.push("/");
    // console.log(cart)
    // setLoading(false)
  };
  return (
    <div>
      {/* <Button color="danger" onClick={toggle}>Open</Button> */}
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
            <div>
              <h6 style={{ color: "red" }}>
                Log In to proceed the oder placement
              </h6>
              <Link to="/user/login">
                <button type="button" className="btn btn-dark">
                  Log In
                </button>
              </Link>
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
                  color="warning"
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
