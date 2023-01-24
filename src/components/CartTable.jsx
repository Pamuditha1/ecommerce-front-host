import React, { useEffect, useState } from "react";
import { Table, Button } from "reactstrap";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ViewProductImage from "../components/ViewProductImage";

function CartTable({
  cart,
  removeFromCart,
  resetCart,
  setisModalOpen,
  subtotal,
  setsubtotal,
}) {
  const [items, setitems] = useState([]);

  function setCart() {
    let cartSto = localStorage.getItem("cart");
    let cartjson = JSON.parse(cartSto);
    setitems(cartjson);
  }

  useEffect(() => {
    setCart();
  }, [cart]);

  let checkDisable = false;

  let ttotal = 0;
  let cartStore = JSON.parse(localStorage.getItem("cart"));
  cartStore &&
    cartStore.forEach((e) => {
      ttotal = ttotal + e.user.total;
    });

  const tableStyle = {
    backgroundColor: "white",
    marginTop: "3%",
    marginBottom: "5%",
    boxShadow: "-15px 15px 15px black",
    borderRadius: "40px",
  };

  const changeQty = (value, id) => {
    let tem = items;
    let newItems = [];
    tem.forEach((i) => {
      if (i._id === id) {
        i.user.quantity = value;
        i.user.total =
          parseInt(i.discountedPrice ? i.discountedPrice : i.price) *
          parseInt(value);
        newItems.push(i);
      } else {
        newItems.push(i);
      }
    });
    localStorage.setItem("cart", JSON.stringify(newItems));
    setCart();
  };

  const onRemove = (p) => {
    removeFromCart(p);
    setCart();
  };

  const onCheckout = () => {
    setsubtotal(ttotal);

    setisModalOpen(true);
  };

  return (
    <div>
      {items ? (
        <Table hover borderless style={tableStyle}>
          <thead className="text-center mt-5 mb-5">
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items &&
              items.map((p) => {
                let aq = p.combinations.filter((c) => {
                  if (c.size === p.user.size) return true;
                  return false;
                })[0]?.qty;

                if (aq < p.user.quantity) checkDisable = true;

                return (
                  <tr>
                    <td>
                      <div className="row">
                        <div className="col-3 ml-3">
                          <ViewProductImage
                            proNo={p.productNo}
                            image={p.image}
                            height="100"
                            width="100"
                          />
                        </div>
                        <div className="col-7 mt-2">
                          <p>{p.productNo}</p>
                          <div className="row">
                            <div className="col-6">
                              <p>
                                <strong style={{ marginRight: "40%" }}>
                                  {p.productName}
                                </strong>
                              </p>
                            </div>
                            <div className="col-6 align-middle">
                              <p>
                                Size: <strong>{p.user.size}</strong>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-center align-middle">
                      <input
                        value={p.user.quantity}
                        onChange={(e) => changeQty(e.target.value, p._id)}
                        type="number"
                        className="mt-4"
                        style={{ maxWidth: "60px" }}
                      />
                      <p style={{ color: "red" }}>
                        {aq < p.user.quantity && "Out of Stock"}
                      </p>
                    </td>
                    {p.discount && p.discount !== "0" ? (
                      <td className="text-center align-middle">
                        <span
                          style={{
                            textDecoration: "line-through",
                          }}
                        >
                          Rs. {p.price}{" "}
                        </span>
                        <strong style={{ color: "black" }}>
                          {" "}
                          Rs. {p.discountedPrice}{" "}
                        </strong>
                      </td>
                    ) : (
                      <td className="text-center align-middle">
                        Rs. {p.price}
                      </td>
                    )}

                    <td className="text-center align-middle">
                      <strong>Rs. {p.user.total}</strong>
                    </td>
                    <td className="align-middle">
                      <Button
                        color="danger"
                        outline
                        onClick={() => onRemove(p)}
                      >
                        {" "}
                        <strong>X Remove</strong>{" "}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            <tr>
              <td>
                {items && items.length > 0 && (
                  <Button color="warning" onClick={resetCart} className="ml-5">
                    {" "}
                    <strong>Clear Cart</strong>{" "}
                  </Button>
                )}
              </td>
              <td></td>
              <td></td>
              <td>
                <h6>
                  <strong>Subtotal - Rs. {ttotal}</strong>
                </h6>
              </td>
              <td>
                {items && items.length > 0 && (
                  <Button
                    className="mb-3"
                    color="dark"
                    onClick={onCheckout}
                    disabled={checkDisable}
                  >
                    {" "}
                    <strong>Checkout</strong>{" "}
                  </Button>
                )}
              </td>
            </tr>
          </tbody>
        </Table>
      ) : (
        <>
          <div className="text-center mt-5">
            <FontAwesomeIcon
              icon={faCartArrowDown}
              size="10x"
              style={{ color: "white" }}
            />
          </div>

          <h3 className="text-center mt-5">Your Cart is Empty</h3>
        </>
      )}
    </div>
  );
}

export default CartTable;
