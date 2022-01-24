import React, { useEffect, useState } from "react";
import { Table, Button } from "reactstrap";
import ViewProductImage from "../components/ViewProductImage";
import PurchaseModal from "./modals/PurchaseModal";

function CartTable({
  cart,
  removeFromCart,
  resetCart,
  cCount,
  setisModalOpen,
  subtotal,
  setsubtotal,
  setSaveCart,
}) {
  // const [subTotal, setsubTotal] = useState(0)
  // const [isPModalOpen, setisPModalOpen] = useState(false)
  const [items, setitems] = useState([]);

  function setCart() {
    let cartSto = localStorage.getItem("cart");
    console.log("Cart storage", cartSto);
    let cartjson = JSON.parse(cartSto);
    setitems(cartjson);
  }

  useEffect(() => {
    //localstorage
    setCart();

    // setitems(cart);
  }, [cart]);

  const qtyAva = "";
  let checkDisable = false;

  let ttotal = 0;
  let cartStore = JSON.parse(localStorage.getItem("cart"));
  cartStore &&
    cartStore.forEach((e) => {
      ttotal = ttotal + e.user.total;
    });

  // cart.forEach(e=> {
  //     () => setttotal( ttotal + e.user.total);
  // });

  const tableStyle = {
    backgroundColor: "white",
    marginTop: "3%",
    marginBottom: "5%",
    boxShadow: "-15px 15px 15px black",
    borderRadius: "40px",
  };

  console.log(items);

  const changeQty = (value, id) => {
    // setitems()
    console.log("Items", items);
    let tem = items;
    let newItems = [];
    let obj;

    // let without = tem.filter((i) => {
    //   if (i._id != id) {
    //     return true;
    //   }
    //   obj = i;
    // });
    tem.forEach((i) => {
      if (i._id == id) {
        i.user.quantity = value;
        // i.user.total = parseInt(i.price) * parseInt(value);

        i.user.total =
          parseInt(i.discountedPrice ? i.discountedPrice : i.price) *
          parseInt(value);
        newItems.push(i);
        console.log("NEW IREMS", newItems);
      } else {
        newItems.push(i);
      }
    });
    // obj.user.quantity = value;
    // without.push(obj);

    // setitems(without);
    // localStorage.setItem("cart", JSON.stringify(without));
    localStorage.setItem("cart", JSON.stringify(newItems));
    setCart();
  };

  const onRemove = (p) => {
    removeFromCart(p);
    setCart();
  };

  const onCheckout = () => {
    setsubtotal(ttotal);
    console.log(subtotal);

    setisModalOpen(true);
  };

  const cartStyle = {
    boxShadow: "0px 10px 10px black",
    fontWeight: "bold",
    borderRadius: "40px",
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
                // setsubTotal(subTotal + p.user.total)
                let aq = p.combinations.filter((c) => {
                  if (c.size == p.user.size) return true;
                })[0].qty;
                console.log("aq", aq);

                if (aq < p.user.quantity) checkDisable = true;

                return (
                  <tr>
                    <td>
                      <div className="row">
                        <div className="col-3 ml-3">
                          <ViewProductImage
                            proNo={p.productNo}
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
                            <div className="col-6">
                              <p>
                                Size: <strong>{p.user.size}</strong>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-center mt-3">
                      <input
                        value={p.user.quantity}
                        onChange={(e) => changeQty(e.target.value, p._id)}
                        type="number"
                        className="mt-5"
                        style={{ maxWidth: "60px" }}
                      />
                      <p style={{ color: "red" }}>
                        {aq < p.user.quantity &&
                          // `Only ${aq} \nin Stock`
                          "Out of Stock"}
                      </p>
                    </td>
                    {p.discount && p.discount != 0 ? (
                      <td className="text-center">
                        <span style={{ textDecoration: "line-through" }}>
                          Rs. {p.price}{" "}
                        </span>
                        <strong style={{ color: "red" }}>
                          {" "}
                          Rs. {p.discountedPrice}{" "}
                        </strong>
                      </td>
                    ) : (
                      <td className="text-center">Rs. {p.price}</td>
                    )}

                    <td className="text-center">
                      <strong>Rs. {p.user.total}</strong>
                    </td>
                    <td>
                      <Button color="danger" onClick={() => onRemove(p)}>
                        {" "}
                        <strong>X Remove</strong>{" "}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            <tr>
              <td>
                {/* {cart.length > 0 && ( */}
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
        <h3 className="text-center mt-5">Your Cart is Empty</h3>
      )}

      {/* <PurchaseModal isModalOpen={isPModalOpen} setisModalOpen={setisPModalOpen}/>  */}
    </div>
  );
}

export default CartTable;
