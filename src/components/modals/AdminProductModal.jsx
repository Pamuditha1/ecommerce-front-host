import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Link } from "react-router-dom";

import SetDiscount from "../SetDiscount";
import ViewProductImage from "../ViewProductImage";

import addDiscount from "../../services/addDiscount";

const AdminProductModal = ({ isModalOpen, setisModalOpen, product }) => {
  let combinations = [];
  if (product.combinations) {
    combinations = product.combinations;
  }
  const [discount, setdiscount] = useState();
  const setDis = (d) => {
    setdiscount(d);
    product.discount = d;
  };
  useEffect(() => {
    setdiscount(product.discount);
  }, [product.discount]);

  const removeDiscount = async () => {
    setdiscount(0);
    product.discount = 0;
    let discountData = {
      id: product._id,
      discount: 0,
    };
    await addDiscount(discountData);
  };

  const toggle = () => setisModalOpen(!isModalOpen);

  return (
    <div>
      <Modal isOpen={isModalOpen} toggle={toggle}>
        <ModalHeader toggle={toggle} style={{ color: "black" }}>
          {product.productName}
        </ModalHeader>
        <ModalBody style={{ color: "black" }}>
          <div className="container">
            <div className="row">
              <div className="col-7" style={{ margin: "auto" }}>
                <p>
                  Product Code : <strong>{product.productNo}</strong>
                </p>
                <p>
                  Barcode : <strong>{product.barcode}</strong>
                </p>
                <p>
                  Product Name : <strong>{product.productName}</strong>
                </p>
                <ViewProductImage
                  image={product.image}
                  height="200"
                  width="200"
                />
              </div>
              <div className="col-5">
                <p>
                  Material : <strong>{product.material}</strong>
                </p>
                <p>
                  Color : <strong>{product.color}</strong>
                </p>
                <p>
                  Category : <strong>{product.category?.name}</strong>
                </p>
                <p>
                  Price : <strong>Rs. {product.price}</strong>
                </p>
                {product?.discount !== "0" && (
                  <p style={{ color: "red" }}>
                    Discounted : <strong>Rs. {product.discountedPrice}</strong>
                  </p>
                )}
                {product.discount !== "0" && (
                  <p>
                    Discount :{" "}
                    <strong>
                      {product.discount?.includes("%") ? "" : "Rs. "}
                      {product.discount}{" "}
                    </strong>
                  </p>
                )}
                <p className="mt-5">
                  Total Sales : <strong>{product.sales}</strong>
                </p>

                <p>
                  Total Stock : <strong>{product.totalQuantity}</strong>
                </p>
              </div>
            </div>
            <div className="row mt-3 pt-4 pb-4 border-top border-bottom border-secondary">
              <div className="col-8">
                <SetDiscount
                  discount={discount}
                  setDis={setDis}
                  id={product._id}
                />
              </div>
              <div className="col-4">
                <button className="btn btn-danger" onClick={removeDiscount}>
                  Remove
                </button>
              </div>
            </div>
            <div className="row">
              <p className="col-12 pt-3">
                Available Stock : <strong>{product.totalQuantity}</strong>
              </p>
              <div className="col-12 text-center">
                {combinations.map((c) => {
                  return (
                    <div className="row">
                      <p className="col-5">
                        Size : <strong>{c.size}</strong>
                      </p>
                      <p className="col-5">
                        {" "}
                        Quantity : <strong>{c.qty}</strong>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="row pt-3 border-top border-secondary">
              <p className="col-12">
                Sales : <strong>{product.sales}</strong>
              </p>
              <div className="col-12 text-center">
                {product?.salesCombinations?.map((c) => {
                  return (
                    <div className="row">
                      <p className="col-5">
                        Size : <strong>{c.size}</strong>
                      </p>
                      <p className="col-5">
                        {" "}
                        Quantity : <strong>{c.qty}</strong>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="container">
            <center>
              <Link to={`/admin/item/update/${product._id}`}>
                <Button color="warning" onClick={toggle}>
                  Update Item
                </Button>
              </Link>
            </center>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AdminProductModal;
