import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductImageUpload from "./ProductImageUpload";
import { toast } from "react-toastify";

import addProduct from "../services/addProductService.js";
import addProductImage from "../services/addProductImageService";
import getSuppliers from "../services/getSupplierForProduct";
import getProductNo from "../services/getProductNo";

function AddProduct() {
  const [productData, setProductData] = useState({
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
    barcode: ""
  });
  const [sizeQty, setsizeQty] = useState({
    size: "",
    qty: 0,
  });
  const sizes = ["Choose Size", "XS", "S", "M", "L", "XL", "XXL"];
  const materials = [
    "Choose Material",
    "Cotton",
    "Silk",
    "Linen",
    "Polyester",
    "Velvet",
  ];
  const categories = [
    "Choose Category",
    "T-Shirt",
    "Shirt",
    "Trouser",
    "Shorts",
  ];
  const [suppliers, setsuppliers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState("");
  const [filePreview, setFilePreview] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [nameOfImage, setNameOfImage] = useState("");

  const [productSaved, setproductSaved] = useState(false);
  const [imageSaved, setimagesaved] = useState(false);
  const [savedSize, setsavedSize] = useState("");

  useEffect(async () => {
    let suppl = ["Choose Supplier"];
    let result = await getSuppliers();
    result.forEach((r) => {
      suppl.push(r);
    });
    setsuppliers(suppl);
    // setsuppliers([...suppliers, await getSuppliers()]);
    console.log(suppliers);
    setProductData({ ...productData, productNo: "P" + (await getProductNo()) });
  }, []);

  const onchange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });

  };

  const onchangeSelect = (e) => {
    setProductData({
      ...productData,
      size: e.target.value,
    });
    // console.log(productData)
  };
  const onchangeSelectSupp = (e) => {
    setProductData({
      ...productData,
      supplier: e.target.value,
    });
    // console.log(productData)
  };
  const onchangeSelectMaterial = (e) => {
    setProductData({
      ...productData,
      material: e.target.value,
    });
    // console.log(productData)
  };
  const onchangeSelectCategory = (e) => {
    setProductData({
      ...productData,
      category: e.target.value,
    });
    // console.log(productData)
  };
  const reload = () => {
    window.location.reload(false);
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setsavedSize(productData.size);
    setNameOfImage(productData.productNo);

    let profit = parseInt(productData.price) - parseInt(productData.bprice)
    let profitPresen = ((parseInt(productData.price) - parseInt(productData.bprice)) /
    parseInt(productData.bprice)) *
  100;


    addProduct({
      ...productData,
        profit: profit,
      profitP: parseFloat(profitPresen).toFixed(2),
    })
    .then(() => {
      // addProductImage(file, productData.productNo)
    })

    console.log(file, filename, filePreview, nameOfImage);
    setLoading(false);
    setproductSaved(true);

  };
  const submitImage = async () => {
    // e.preventDefault();
    await addProductImage(file, nameOfImage);
    setimagesaved(true);
  };
  const addSize = () => {};

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
          <div className="col-5">
            {/* <ProductImageUpload
              // onImageSubmit={onImageSubmit}
              file={file}
              setFile={setFile}
              filePreview={filePreview}
              setFilePreview={setFilePreview}
              filename={filename}
              setFilename={setFilename}
              nameOfImage={nameOfImage}
            /> */}
          </div>

          <div className="col-7">
            <div className="row">
              <div className="form-group col-12">
                <label htmlFor="productNo" className="col-5">
                  Product No
                </label>
                <input
                  onChange={onchange}
                  value={productData.productNo}
                  className="form-control col-11 ml-3"
                  type="text"
                  id="productNo"
                  name="productNo"
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
                  rows="4"
                  id="description"
                  name="description"
                />
              </div>
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
                  {suppliers.map((option) => {
                    return (
                      <option
                        key={option.name}
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
                {/* <input onChange={onchange} value={productData.material} className="form-control col-11 ml-3" type="text" id="material" name="material"/> */}
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
              {/* <div className="col-12">
                                <SizeAqty />
                            </div> */}
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

              <div className="form-group col-6 mt-3">
                <label htmlFor="size" className="col-5">
                  Size
                </label>
                <select
                  onChange={onchangeSelect}
                  value={productData.size}
                  id="size"
                  name="size"
                  className="form-control col-11"
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
              <div className="form-group col-6">
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
              <div className="form-group col-6 ml-3">
                <label htmlFor="barcode" className="col-12">
                  Barcode
                </label>
                <input
                  onChange={onchange}
                  value={productData.barcode}
                  className="form-control col-11"
                  type="number"
                  id="barcode"
                  name="barcode"
                />
              </div>
            </div>
          </div>
        </div>

        {savedSize && <p className="">* Product Size {savedSize} Saved</p>}
        <button
          onClick={submit}
          type="submit"
          className="btn btn-primary float-right m-1 col-12"
        >
          {productSaved ? `Product Saved` : "Save Product"}
        </button>

      </form>
    </div>
  );
}

export default AddProduct;
