import React from "react";

function SizeAqty({ productData }) {
  return (
    <>
      <div className="form-group col-6">
        <label htmlFor="category" className="col-5">
          Category
        </label>
        <input
          onChange={onchange}
          value={productData.category}
          className="form-control col-11 ml-3"
          type="text"
          id="category"
          name="category"
        />
      </div>
      <div className="form-group col-6">
        <label htmlFor="quantity" className="col-5">
          Quantity
        </label>
        <input
          onChange={onchange}
          value={productData.quantity}
          className="form-control col-11 ml-3"
          type="number"
          id="quantity"
          name="quantity"
        />
      </div>
    </>
  );
}

export default SizeAqty;
