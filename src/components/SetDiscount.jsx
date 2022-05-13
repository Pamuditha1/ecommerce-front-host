import React from "react";

import { addDiscount } from "../services/products";

function SetDiscount({ discount, setDis, id }) {
  const submitDiscount = async () => {
    let discountData = {
      id: id,
      discount: discount,
    };
    await addDiscount(discountData);
    window.location.reload();
  };

  return (
    <div className="row">
      <label htmlFor="productNo" className="col-4">
        Discount :{" "}
      </label>
      <input
        value={discount}
        onChange={(e) => setDis(e.target.value)}
        className="form-control col-5 ml-3"
        type="text"
        id="productNo"
        name="productNo"
      />
      <div className="col-2">
        <button onClick={submitDiscount} className="btn btn-outline-success">
          Set
        </button>
      </div>
    </div>
  );
}

export default SetDiscount;
