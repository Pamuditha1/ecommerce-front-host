import React, { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../services/api";

function ViewProductImage(props) {
  const [imagePath, setImagePath] = useState("");

  const getImage = async () => {
    axios
      .get(`${api}/user/product/image/${props.proNo}`, {
        responseType: "arraybuffer",
      })
      .then((response) => {
        if (typeof response.data == "object") {
        }
        const base64 = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        setImagePath("data:;base64," + base64);
      })
      .catch((err) => console.log("Image Error", err));
  };

  useEffect(() => {
    getImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.proNo]);

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
  let item = {
    position: "relative",
    paddingTop: "20px",
    display: "inlineBlock",
    margin: "auto",
  };
  return (
    <>
      {imagePath ? (
        <div style={item}>
          {props.discount === 0 || typeof props.discount == "undefined" ? (
            <></>
          ) : (
            <span style={discountBadge}>
              <strong>
                {props.discount}
                {!props.discount.includes("%") && "/="} off
              </strong>
            </span>
          )}
          <img
            alt="product"
            src={imagePath}
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
