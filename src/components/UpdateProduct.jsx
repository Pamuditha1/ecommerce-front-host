import React, { useState, useEffect } from "react";
import getOneProductAdmin from "../services/getOneProduct";
import updateProduct from "../services/updateProduct";
import addProductImage from "../services/addProductImageService";
import ProductImageUpload from "./ProductImageUpload";
import getSuppliers from "../services/getSupplierForProduct";
import ViewProductImage from "./ViewProductImage";

function UpdateProduct(props) {
  console.log(props.match.params.id);

  const [productData, setProductData] = useState({});

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const [loading, setLoading] = useState(false);
  const [suppliers, setsuppliers] = useState([]);

  const [file, setFile] = useState("");
  const [filePreview, setFilePreview] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [nameOfImage, setNameOfImage] = useState("");

  const [productSaved, setproductSaved] = useState(false);
  const [imageSaved, setimagesaved] = useState(false);
  const [savedSize, setsavedSize] = useState("");

  useEffect(() => {
    // setIsLoading(true)
    async function fetchProduct() {
      const products = await getOneProductAdmin(props.match.params.id);
      // console.log("products", products)
      setProductData(products);
      setsuppliers(await getSuppliers());
      console.log(suppliers);
      console.log("Update Product", products);
    }
    fetchProduct();
  }, [props.match.params.id]);

  const onchange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
    // console.log(productData)
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
  const reload = () => {
    window.location.reload(false);
  };

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setsavedSize(productData.size);
    setNameOfImage(productData.productNo);
    console.log("Name of image", nameOfImage);
    console.log("Product Data to update", productData);
    updateProduct(productData);
    console.log(file, filename, filePreview, nameOfImage);
    // addProductImage(file, nameOfImage)
    setLoading(false);
    setproductSaved(true);
    // setTimeout(function(){ reload() }, 3000);
  };
  const submitImage = (e) => {
    e.preventDefault();
    addProductImage(file, nameOfImage);
    setimagesaved(true);
  };

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
            <ProductImageUpload
              // onImageSubmit={onImageSubmit}
              file={file}
              setFile={setFile}
              filePreview={filePreview}
              setFilePreview={setFilePreview}
              filename={filename}
              setFilename={setFilename}
              nameOfImage={nameOfImage}
            />
            {!file && (
              <ViewProductImage
                proNo={productData.productNo}
                height="300"
                width="300"
              />
            )}
          </div>

          <div className="col-6">
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
                  readOnly
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
                <input
                  onChange={onchange}
                  value={productData.material}
                  className="form-control col-11 ml-3"
                  type="text"
                  id="material"
                  name="material"
                />
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
                <label htmlFor="price" className="col-5">
                  Price
                </label>
                <input
                  onChange={onchange}
                  value={productData.price}
                  className="form-control col-11 ml-3"
                  type="number"
                  id="price"
                  name="price"
                />
              </div>
              {/* <div className="col-12">
                                <SizeAqty />
                            </div> */}
              <div className="form-group col-6">
                <label htmlFor="category" className="col-5">
                  Category
                </label>
                <input
                  onChange={onchange}
                  value={productData.category}
                  className="form-control col-11"
                  type="text"
                  id="category"
                  name="category"
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
                <label htmlFor="quantity" className="col-5">
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
        <button
          onClick={submit}
          type="submit"
          className="btn btn-primary float-right m-1 col-12"
        >
          {productSaved ? `Product Saved` : "Save Product"}
        </button>
        <div>
          {!imageSaved && productSaved && (
            <>
              <h6 style={{ backgroundColor: "red" }} className="p-2 rounded">
                {" "}
                Image hasn't been saved yet
              </h6>
              <button
                onClick={submitImage}
                className="btn btn-success float-right m-1 col-12"
                type="submit"
              >
                Save Image
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default UpdateProduct;
