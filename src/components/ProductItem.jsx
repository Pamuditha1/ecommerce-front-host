/* eslint-disable eqeqeq */
import React, { useState } from "react";
import ViewProductImage from "./ViewProductImage.jsx";
import { generateEvent } from "../utils/events.js";
import { EVENT_TYPES } from "./../utils/constants";
import moment from "moment";
import { addEvent } from "../services/event.js";

function ProductItem({ product, viewModal }) {
  const [mouseEnter, setMouseEnter] = useState();

  const cardStyle = {
    color: "black",
    boxShadow: "0px 10px 10px black",
    borderRadius: "20px",
    margin: "auto",
    marginTop: 20,
    backgroundColor: "white",
    width: "23%",
  };
  const discountedPriceStyle = {
    fontSize: 12,
    color: "#ff0000",
    marginTop: "0%",
    marginBottom: "0",
    backgroundColor: "white",
    borderRadius: "10px",
    opacity: "0.8",
  };

  const onMouseEnter = () => {
    setMouseEnter(new Date().getTime());
  };
  const onMouseLeave = async () => {
    let leave = moment(new Date().getTime());
    let enter = moment(mouseEnter);
    let diff = leave.diff(enter, "seconds");

    if (diff === 0) return;
    const event = await generateEvent(product, EVENT_TYPES.HOVER, diff);
    const res = await addEvent(event);
    console.log("hover event", event);
    console.log("hover event saved", res);
  };

  return (
    <div
      className="card"
      style={cardStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <ViewProductImage
        discount={product.discount}
        popular={product.popular}
        image={product.image}
        height="200"
        width="200"
      />
      <div className="card-body">
        <h6 className="card-title">
          {product.productName}{" "}
          <small className="text-muted ml-5">{product.category.name}</small>
        </h6>

        <div className="card-text">
          <div className="row">
            <div className="col-5">
              <p
                style={{
                  textDecoration:
                    product.discount && product.discount == 0
                      ? "none"
                      : "line-through",
                  fontSize: 12,
                }}
              >
                Rs. {parseFloat(product.price).toFixed(2)}
              </p>
            </div>
            <div className="col-7">
              {product.discount && product.discount != 0 && (
                <p className="card-text pl-1" style={discountedPriceStyle}>
                  <strong>
                    Rs. {parseFloat(product.discountedPrice).toFixed(2)}
                  </strong>
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => viewModal(product)}
            className="btn btn-outline-dark btn-default text-center"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
