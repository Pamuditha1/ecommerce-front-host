import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, Badge } from "reactstrap";
import { Link } from "react-router-dom";
import {
  faShoppingCart,
  faHeart as heartFilled,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ViewProductImage from "../ViewProductImage";

import moment from "moment";
import { generateEvent } from "./../../utils/events";
import { EVENT_TYPES } from "./../../utils/constants";
import { addEvent } from "../../services/event";
import { addToWishlist } from "./../../services/wishlist";
import jwtDecode from "jwt-decode";

const ProductModal = ({ isModalOpen, setisModalOpen, product, addtoCart }) => {
  let size = "";
  const [selectedSize, setselectedSize] = useState("");
  const [quantity, setquantity] = useState(0);
  const [total, settotal] = useState(0);
  const [avaiQuantity, setavaiQuantity] = useState("");
  const [inWishlist, setInWishlist] = useState(false);

  const [mouseEnter, setMouseEnter] = useState();

  let availableSizes = ["Choose Size"];
  let availabel = [];

  if (product.combinations) {
    availabel = product.combinations.filter((s) => {
      if (s.qty > 0) return true;
      return false;
    });

    availabel.forEach((s) => {
      availableSizes.push(s.size);
    });
  }

  const toggle = () => setisModalOpen(!isModalOpen);

  useEffect(() => {
    const logged = localStorage.getItem("wishlist");
    const unlogged = localStorage.getItem("un-wishlist");

    const lgProducts = logged ? JSON.parse(logged) : [];
    const unProducts = unlogged ? JSON.parse(unlogged) : [];

    if (lgProducts && lgProducts.length > 0) {
      for (const pro of lgProducts) {
        if (pro._id === product._id) {
          setInWishlist(true);
          return;
        }
      }
    } else {
      for (const pro of unProducts) {
        if (pro._id === product._id) {
          setInWishlist(true);
          return;
        }
      }
    }
  }, [product._id]);

  const onchangeSelect = (e) => {
    size = e.target.value;
    setselectedSize(e.target.value);
    let q = availabel.filter((s) => {
      if (s.size === size) return true;
      return false;
    });
    setavaiQuantity(parseInt(q.qty));
    q = q.qty;
  };
  const onchange = (e) => {
    setquantity(e.target.value);
    let t = 0;
    if (product.discount && product.discount !== "0") {
      t = parseInt(product.discountedPrice) * parseInt(e.target.value);
    } else {
      t = parseInt(product.price) * parseInt(e.target.value);
    }
    settotal(t);
  };

  const addCart = async () => {
    let p = product;
    const user = {
      size: selectedSize,
      quantity: quantity,
      total: total,
      addedToCart: true,
    };
    p = {
      ...product,
      user,
    };
    addtoCart(p);
    settotal(0);
    setquantity(0);

    const event = await generateEvent(product, EVENT_TYPES.ADD_TO_CART, 0);
    const res = await addEvent(event);
    console.log("cart event", event);
    console.log("cart event saved", res);
  };

  const addWishlist = async () => {
    const jwt = localStorage.getItem("customer-token");
    if (jwt) {
      const uid = jwt && jwtDecode(jwt)._id;
      const newWishlist = await addToWishlist({
        timestamp: new Date(),
        userId: uid || null,
        productId: product._id,
      });

      const products = newWishlist.map((wish) => wish.productId);
      localStorage.setItem("wishlist", JSON.stringify(products));
    } else {
      const unWishlist = localStorage.getItem("un-wishlist");

      let unWishlistArr = [];
      if (unWishlist) unWishlistArr = JSON.parse(unWishlist);

      let included;
      if (unWishlistArr.length === 0) {
        unWishlistArr.push(product);
      } else {
        unWishlistArr.forEach((unWish, indx) => {
          if (unWish._id === product._id) {
            unWishlistArr.splice(indx, 1);
            included = true;
            return;
          }
        });

        if (!included) {
          unWishlistArr = [...unWishlistArr, product];
        }
      }

      localStorage.setItem("un-wishlist", JSON.stringify(unWishlistArr));
    }

    const event = await generateEvent(product, EVENT_TYPES.ADD_TO_WISHLIST, 0);
    const res = await addEvent(event);
    console.log("add to wishlist event", event);
    console.log("add to wishlist event saved", res);

    setInWishlist(false);
    toggle();
    window.location.reload();
  };

  const onMouseEnter = () => {
    setMouseEnter(new Date().getTime());
  };
  const onMouseLeave = async () => {
    let leave = moment(new Date().getTime());
    let enter = moment(mouseEnter);
    let diff = leave.diff(enter, "seconds");

    if (diff === 0) return;
    const event = await generateEvent(product, EVENT_TYPES.VIEW, diff);
    const res = await addEvent(event);
    console.log("view event", event);
    console.log("view event saved", res);
  };

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        toggle={toggle}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <ModalHeader toggle={toggle} style={{ color: "black" }}>
          {product.productName}
        </ModalHeader>
        <ModalBody style={{ color: "black", padding: "5%" }}>
          <div className="row">
            <div className="col-6" style={{ margin: "auto" }}>
              <p>
                Product Code : <strong>{product.productNo}</strong>
              </p>
              <p>
                Barcode : <strong>{product.barcode}</strong>
              </p>
              <p>
                Product Name : <strong>{product.productName}</strong>
              </p>
              <ViewProductImage
                proNo={product.productNo}
                image={product.image}
                height="200"
                width="200"
              />
            </div>
            <div className="col-6">
              <p>
                Material : <strong>{product.material}</strong>
              </p>
              <p>
                Color : <strong>{product.color}</strong>
              </p>
              <p>
                Category : <strong>{product.category?.name}</strong>
              </p>
              <p>
                Price : <strong>Rs. {product.price}</strong>
              </p>
              {product?.discount !== "0" && (
                <p style={{ color: "red" }}>
                  Discounted Price :{" "}
                  <strong>Rs. {product.discountedPrice}</strong>
                </p>
              )}
              <p>
                Available Sizes :{" "}
                <strong>
                  <select
                    onChange={onchangeSelect}
                    value={selectedSize}
                    id="size"
                    name="size"
                    className="form-control col-11"
                    required
                  >
                    {availableSizes.map((option) => {
                      return (
                        <option
                          key={option}
                          value={option}
                          style={{ textAlign: "center" }}
                        >
                          {option}
                        </option>
                      );
                    })}
                  </select>
                </strong>
              </p>
              <p>
                Quantity :{" "}
                <strong>
                  <input
                    onChange={onchange}
                    value={quantity}
                    min="1"
                    max={avaiQuantity ? `${avaiQuantity}` : ""}
                    className="form-control col-11"
                    type="number"
                    id="quantity"
                    name="quantity"
                  />
                </strong>
              </p>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-12">
              <h5 className="text-center">
                Total Amount : <strong>Rs. {total ? total : 0}</strong>
              </h5>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-4">
              <FontAwesomeIcon
                onClick={addWishlist}
                icon={heartFilled}
                size="2x"
                style={{ marginLeft: 20, color: inWishlist ? "red" : "grey" }}
              />
            </div>
            <div className="col-4">
              <Button color="dark" onClick={addCart} disabled={quantity === 0}>
                Add to Cart
              </Button>
            </div>{" "}
            <div className="col-4">
              <Link
                to="/user/cart"
                style={{ color: "black", float: "right" }}
                className="nav-link"
              >
                <FontAwesomeIcon icon={faShoppingCart} size="2x" />
                <Badge color="dark">
                  {JSON.parse(localStorage.getItem("cart"))
                    ? JSON.parse(localStorage.getItem("cart")).length
                    : 0}
                </Badge>{" "}
              </Link>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ProductModal;
