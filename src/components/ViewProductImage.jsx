/* eslint-disable eqeqeq */
import React from "react";

function ViewProductImage(props) {
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
  let popular = {
    position: "absolute",
    left: "-20px",
    top: "10px",
    background: "yellow",
    textAlign: "center",
    borderRadius: "30px 30px 30px 30px",
    color: "white",
    padding: "5px 10px",
    fontSize: "15px",
  };
  let item = {
    position: "relative",
    paddingTop: "20px",
    display: "inlineBlock",
    margin: "auto",
  };
  return (
    <>
      {props.image ? (
        <div style={item}>
          {props.discount == 0 || typeof props.discount == "undefined" ? (
            <></>
          ) : (
            <span style={discountBadge}>
              <strong>
                {props.discount !== "0" && props.discount}
                {!props.discount.includes("%") && "/="} off
              </strong>
            </span>
          )}

          {props.popular ? (
            <span style={popular}>
              <strong>PP</strong>
            </span>
          ) : (
            <></>
          )}
          <img
            alt="product"
            src={props.image}
            style={{ borderRadius: "20px" }}
            height={props.height}
            width={props.width}
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
