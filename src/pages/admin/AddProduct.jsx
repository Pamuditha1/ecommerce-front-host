import React, { useState, useEffect } from "react";

import ImageUpload from "../../components/UploadWidget.jsx";

import { addProduct } from "../../services/products";
import { getSuppliers } from "../../services/suppliers";
import { getNewProductNo } from "../../services/products";
import { getCategories } from "../../services/category";

function AddProduct() {
  const initialState = {
    productNo: "",
    productName: "",
    description: "",
    supplier: "",
    material: "",
    color: "",
    bprice: "",
    price: "",
    category: "",
    size: "",
    quantity: 0,
    rquantity: 0,
    profit: 0,
    profitP: "",
    barcode: "",
  };
  const [productData, setProductData] = useState(initialState);
  const sizes = ["Choose Size", "XS", "S", "M", "L", "XL", "XXL"];
  const materials = [
    "Choose Material",
    "Cotton",
    "Silk",
    "Linen",
    "Polyester",
    "Velvet",
  ];
  const [categories, setcategories] = useState([]);
  const [suppliers, setsuppliers] = useState([]);
  const [savedSize, setsavedSize] = useState("");
  const [imageURL, setimageURL] = useState(null);
  const [imageNull, setimageNull] = useState("");

  const getInitialData = async () => {
    let result = await getSuppliers();
    let suppl = [{ name: "Choose Supplier", _id: "Choose Supplier" }];
    result.forEach((r) => {
      suppl.push(r);
    });
    setsuppliers(suppl);

    const categories = await getCategories();
    let cat = [{ name: "Choose Category", _id: "Choose Category" }];
    categories.forEach((r) => {
      cat.push(r);
    });
    setcategories(cat);

    setProductData({
      ...productData,
      productNo: "P" + (await getNewProductNo()),
    });
  };

  useEffect(() => {
    getInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onchange(e) {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  }

  const onchangeSelect = (e) => {
    setProductData({
      ...productData,
      size: e.target.value,
    });
  };
  const onchangeSelectSupp = (e) => {
    setProductData({
      ...productData,
      supplier: e.target.value,
    });
  };
  const onchangeSelectMaterial = (e) => {
    setProductData({
      ...productData,
      material: e.target.value,
    });
  };
  const onchangeSelectCategory = (e) => {
    setProductData({
      ...productData,
      category: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    //if (!imageURL) return setimageNull("* Product Image Required");

    setsavedSize(productData.size);

    let profit = parseInt(productData.price) - parseInt(productData.bprice);
    let profitPresen =
      ((parseInt(productData.price) - parseInt(productData.bprice)) /
        parseInt(productData.bprice)) *
      100;

    addProduct({
      ...productData,
      image: imageURL,
      profit: profit,
      profitP: parseFloat(profitPresen).toFixed(2),
    }).then(() => {
      setProductData({ ...productData, quantity: 0, size: "" });
    });
  };

  const setImage = (url) => {
    setimageURL(url);
    setimageNull("");
  };

  const removeImage = () => {
    setimageURL(null);
  };

  const clear = () => {
    setProductData(initialState);
    setimageURL(null);
    setsavedSize("");
  };

  let profitPre =
    ((parseInt(productData.price) - parseInt(productData.bprice)) /
      parseInt(productData.bprice)) *
    100;

  return (
    <div>
      <form className="container" autoComplete="off">
        <h6
          style={{ backgroundColor: "blueviolet" }}
          className="pl-5 pt-1 pb-1 mb-5"
        >
          Add Item
        </h6>

        <div className="row">
          <div className="col-6">
            <div className="row">
              <p style={{ color: "red" }}>{imageNull}</p>
              <ImageUpload
                update
                imageURL={imageURL}
                setImageURL={setImage}
                removeImage={removeImage}
              />
              <div className="col-12 text-center mb-3">
                {imageURL && (
                  <img alt="product" src={imageURL} width={300} height="auto" />
                )}
                {!imageURL && <p>No Product Image</p>}
              </div>

              <div className="form-group col-6">
                <label htmlFor="productNo" className="col-7">
                  Product No
                </label>
                <input
                  readOnly
                  onChange={onchange}
                  value={productData.productNo}
                  className="form-control col-11 ml-3"
                  type="text"
                  id="productNo"
                  name="productNo"
                />
              </div>
              <div className="form-group col-6">
                <label htmlFor="barcode" className="col-12">
                  Barcode
                </label>
                <input
                  onChange={onchange}
                  value={productData.barcode}
                  className="form-control col-11 mr-3"
                  type="number"
                  id="barcode"
                  name="barcode"
                />
              </div>
              <div className="form-group col-12">
                <label htmlFor="productName" className="col-5">
                  Product Name
                </label>
                <input
                  onChange={onchange}
                  value={productData.productName}
                  className="form-control col-11 ml-3"
                  type="text"
                  id="productName"
                  name="productName"
                />
              </div>
              <div className="form-group col-12">
                <label htmlFor="description" className="col-5">
                  Description
                </label>
                <textarea
                  onChange={onchange}
                  value={productData.description}
                  className="form-control col-11 ml-3"
                  type="textarea"
                  rows="2"
                  id="description"
                  name="description"
                />
              </div>
            </div>
          </div>

          <div className="col-6">
            <div className="row">
              <div className="form-group col-12">
                <label htmlFor="supplier" className="col-5">
                  Supplier
                </label>
                <select
                  onChange={onchangeSelectSupp}
                  value={productData.supplier}
                  id="supplier"
                  name="supplier"
                  className="form-control col-11 ml-3"
                  required
                >
                  {suppliers.map((option, index) => {
                    return (
                      <option
                        key={index}
                        value={option._id}
                        style={{ textAlign: "center" }}
                      >
                        {option.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-group col-6">
                <label htmlFor="material" className="col-5">
                  Material
                </label>
                <select
                  onChange={onchangeSelectMaterial}
                  value={productData.material}
                  id="material"
                  name="material"
                  className="form-control col-11 ml-3"
                  required
                >
                  {materials.map((option) => {
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
              </div>
              <div className="form-group col-6">
                <label htmlFor="color" className="col-5">
                  Color
                </label>
                <input
                  onChange={onchange}
                  value={productData.color}
                  className="form-control col-11"
                  type="text"
                  id="color"
                  name="color"
                />
              </div>
              <div className="form-group col-6">
                <label htmlFor="bprice" className="col-12">
                  Buying Price
                </label>
                <input
                  onChange={onchange}
                  value={productData.bprice}
                  className="form-control col-11 ml-3"
                  type="number"
                  id="bprice"
                  name="bprice"
                />
              </div>
              <div className="form-group col-6">
                <label htmlFor="price" className="col-12">
                  Selling Price
                </label>
                <input
                  onChange={onchange}
                  value={productData.price}
                  className="form-control col-11"
                  type="number"
                  id="price"
                  name="price"
                />
              </div>
              {productData.price && productData.bprice && (
                <>
                  <div className="form-group col-4 text-center ml-5 p-3 shadow font-weight-bold">
                    Profit
                  </div>
                  <div className="form-group col-3 text-center p-3 text-warning shadow font-weight-bold">
                    Rs.{" "}
                    {parseInt(productData.price) - parseInt(productData.bprice)}
                  </div>
                  <div className="form-group col-3 text-center p-3 text-danger shadow font-weight-bold">
                    {parseFloat(profitPre).toFixed(2)}%
                  </div>
                </>
              )}
              <div className="form-group col-6 mt-3">
                <label htmlFor="category" className="col-5">
                  Category
                </label>
                <select
                  onChange={onchangeSelectCategory}
                  value={productData.category}
                  id="category"
                  name="category"
                  className="form-control col-11 ml-3"
                  required
                >
                  {categories.map((option) => {
                    return (
                      <option
                        key={option._id}
                        value={option._id}
                        style={{ textAlign: "center" }}
                      >
                        {option.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="form-group col-6 mt-3">
                <label htmlFor="rquantity" className="col-12">
                  Re-Order Quantity
                </label>
                <input
                  onChange={onchange}
                  value={productData.rquantity}
                  className="form-control col-11"
                  type="number"
                  id="rquantity"
                  name="rquantity"
                />
              </div>
              <div className="form-group col-6">
                <label htmlFor="size" className="col-5">
                  Size
                </label>
                <select
                  onChange={onchangeSelect}
                  value={productData.size}
                  id="size"
                  name="size"
                  className="form-control col-11 ml-3"
                  required
                >
                  {sizes.map((option) => {
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
              </div>
              <div className="form-group col-6">
                <label htmlFor="quantity" className="col-12">
                  Quantity
                </label>
                <input
                  onChange={onchange}
                  value={productData.quantity}
                  className="form-control col-11"
                  type="number"
                  id="quantity"
                  name="quantity"
                />
              </div>
            </div>
          </div>
        </div>

        {savedSize && <p className="">* Product Size {savedSize} Saved</p>}
        <div className="row mb-5 mt-3">
          <div className="col-6">
            {" "}
            <button
              onClick={clear}
              type="submit"
              className="btn btn-primary float-right m-1 col-12"
            >
              Reset
            </button>
          </div>
          <div className="col-6">
            <button
              onClick={submit}
              type="submit"
              className="btn btn-primary float-right m-1 col-12"
            >
              Save Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
