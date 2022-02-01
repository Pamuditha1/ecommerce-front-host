/* eslint-disable eqeqeq */
import React from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ViewProductImage({ image, discount, popular, width, height }) {
  let discountBadge = {
    position: "absolute",
    right: "-20px",
    top: "10px",
    background: "red",
    textAlign: "center",
    borderRadius: "30px 30px 30px 30px",
    color: "white",
    padding: "5px 10px",
    fontSize: "15px",
  };
  let popularBadge = {
    position: "absolute",
    left: "-20px",
    top: "10px",
    // background: "white",
    // textAlign: "center",
    // borderRadius: "30px 30px 30px 30px",
    color: "#ffed03",
    // padding: "5px 10px",
    // fontSize: "15px",
    shadow: "0px 5px 5px black",
  };
  let item = {
    position: "relative",
    paddingTop: "20px",
    display: "inlineBlock",
    margin: "auto",
  };
  return (
    <>
      {image ? (
        <div style={item}>
          {discount === "0" || typeof discount == "undefined" ? (
            <></>
          ) : (
            <span style={discountBadge}>
              <strong>
                {discount !== "0" && discount}
                {!discount.includes("%") && "/="} off
              </strong>
            </span>
          )}

          {popular ? (
            <span style={popularBadge}>
              <FontAwesomeIcon icon={faStar} size="2x" />
            </span>
          ) : (
            <></>
          )}
          <img
            alt="product"
            src={image}
            style={{ borderRadius: "20px" }}
            height={height}
            width={width}
          />
        </div>
      ) : (
        <p className="align-middle text-center mt-5" style={{ color: "blue" }}>
          No Product Image
        </p>
      )}
    </>
  );
}

export default ViewProductImage;
