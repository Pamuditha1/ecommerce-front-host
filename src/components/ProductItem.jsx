/* eslint-disable eqeqeq */
import React from "react";
import ViewProductImage from "./ViewProductImage.jsx";

function ProductItem({ product, viewModal, popular }) {
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
    color: "#ff0000",
    marginTop: "0%",
    marginBottom: "0",
    backgroundColor: "white",
    borderRadius: "10px",
    opacity: "0.8",
  };

  return (
    <div className="card" style={cardStyle}>
      <ViewProductImage
        popular={popular}
        discount={product.discount}
        proNo={product.productNo}
        height="200"
        width="200"
      />
      <div className="card-body">
        <h6 className="card-title">
          {product.productName}{" "}
          <small class="text-muted ml-5">{product.category}</small>
        </h6>

        <div className="card-text">
          <div className="row">
            <div className="col-6">
              <p
                style={{
                  textDecoration:
                    product.discount && product.discount == 0
                      ? "none"
                      : "line-through",
                }}
              >
                Rs. {product.price}
              </p>
            </div>
            <div className="col-6">
              {product.discount && product.discount != 0 && (
                <p className="card-text pl-1" style={discountedPriceStyle}>
                  <strong>Rs. {product.discountedPrice}</strong>
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
