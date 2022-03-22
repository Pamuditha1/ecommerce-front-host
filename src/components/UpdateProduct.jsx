import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import { getProductById, hideProduct } from "../services/products";
import { updateProduct } from "../services/products";
import { getSuppliers } from "../services/suppliers";
//import { deleteProductImage } from "../services/products";
import { getCategories } from "../services/category";

//import ImageUpload from "./UploadWidget.jsx";
import hasAccessTo from "../utils/hasAccess";

function UpdateProduct() {
  const { id } = useParams();
  const history = useHistory();
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
    barcode: "",
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
  const [categories, setcategories] = useState([]);
  const [suppliers, setsuppliers] = useState([]);

  const [productSaved, setproductSaved] = useState(false);
  const [savedSize, setsavedSize] = useState("");
  const [imageURL, setimageURL] = useState(null);
  // const [imageNull, setimageNull] = useState("");

  async function fetchProduct() {
    const product = await getProductById(id);
    setProductData({ ...product, supplier: product.supplierID._id });
    setimageURL(product.image);
  }

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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
  };

  useEffect(() => {
    getInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setproductSaved(false);
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

    updateProduct({
      ...productData,
      image: imageURL,
      profit: profit,
      profitP: parseFloat(profitPresen).toFixed(2),
    }).then(() => {
      setProductData({ ...productData, size: "", quantity: 0 });
    });

    setproductSaved(true);
  };

  // const setImage = (url) => {
  //   setimageURL(url);
  //   setimageNull("");
  // };

  // const removeImage = async () => {
  //   await deleteProductImage(productData._id);
  //   setimageURL(null);
  //   setProductData({ ...productData, image: null });
  // };

  const hideItem = async () => {
    await hideProduct(id);
    history.push("/admin/items");
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
          className="pl-5 pt-1 pb-1 mb-2"
        >
          Update Item
        </h6>

        <div className="row mb-3">
          <div className="col-10"></div>
          <div className="col-2">
            {" "}
            <button
              onClick={hideItem}
              type="button"
              className="btn btn-outline-danger"
            >
              Remove Item
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <div className="row">
              {/* <p style={{ color: "red" }}>{imageNull}</p> */}
              {/* <ImageUpload
                update
                imageURL={imageURL}
                setImageURL={setImage}
                removeImage={removeImage}
              /> */}
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
                  readOnly
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
                  readOnly={!hasAccessTo(["Admin"])}
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
                  readOnly={!hasAccessTo(["Admin"])}
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
                  disabled={!hasAccessTo(["Admin"])}
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
              <div className="form-group col-6">
                <label htmlFor="material" className="col-5">
                  Material
                </label>
                <select
                  disabled={!hasAccessTo(["Admin"])}
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
                  readOnly={!hasAccessTo(["Admin"])}
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
                  readOnly={!hasAccessTo(["Admin"])}
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
                  disabled={!hasAccessTo(["Admin"])}
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
                  readOnly={!hasAccessTo(["Admin"])}
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

        {savedSize && <p className="">* Product Size {savedSize} Updated</p>}
        {}
        <button
          onClick={submit}
          type="submit"
          className="btn btn-outline-primary float-right mb-5 mt-3 col-12"
        >
          {productSaved ? `Product Updated` : "Update Product"}
        </button>
      </form>
    </div>
  );
}

export default UpdateProduct;
