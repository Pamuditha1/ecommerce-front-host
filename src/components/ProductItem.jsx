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
    fontSize: 12,
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
