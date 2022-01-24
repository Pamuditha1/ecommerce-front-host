import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import SetDiscount from "../SetDiscount";
import ViewProductImage from "../ViewProductImage";
import addDiscount from "../../services/addDiscount";
import { Link, Route, Switch } from "react-router-dom";
import UpdateProduct from "../UpdateProduct";

const AdminProductModal = ({ isModalOpen, setisModalOpen, product }) => {
  console.log("function called");

  useEffect(() => {}, [product.productNo]);

  let combinations = [];
  if (product.combinations) {
    combinations = product.combinations;
  }
  const [discount, setdiscount] = useState("");
  const setDis = (d) => {
    setdiscount(d);
    product.discount = d;
    console.log(discount);
  };
  const removeDiscount = async () => {
    setdiscount(0);
    product.discount = 0;
    let discountData = {
      id: product._id,
      discount: 0,
    };
    console.log(discountData);
    await addDiscount(discountData);
  };
  const updateItm = () => {
    toggle();
  };

  const toggle = () => setisModalOpen(!isModalOpen);

  return (
    <div>
      {" "}
      {console.log(combinations)}
      {/* <Button color="danger" onClick={toggle}>Open</Button> */}
      <Modal isOpen={isModalOpen} toggle={toggle}>
        <ModalHeader toggle={toggle} style={{ color: "black" }}>
          {product.productName}
        </ModalHeader>
        <ModalBody style={{ color: "black" }}>
          <div className="row">
            <div className="col-6" style={{ margin: "auto" }}>
              <ViewProductImage
                proNo={product.productNo}
                height="200"
                width="200"
              />
            </div>
            <div className="col-6">
              <p>
                Product Code : <strong>{product.productNo}</strong>
              </p>
              <p>
                Product Name : <strong>{product.productName}</strong>
              </p>
              <p>
                Material : <strong>{product.material}</strong>
              </p>
              <p>
                Color : <strong>{product.color}</strong>
              </p>
              <p>
                Category : <strong>{product.category}</strong>
              </p>
              <p>
                Price : <strong>{product.price}</strong>
              </p>
              {product.discount && (
                <p>
                  Discount :{" "}
                  <strong>
                    {!product.discount.includes("%") && "Rs. "}{" "}
                    {product.discount}{" "}
                  </strong>
                </p>
              )}
              <p>
                Sales : <strong>{product.sales}</strong>
              </p>
              <button className="btn btn-danger" onClick={removeDiscount}>
                Remove Discount
              </button>
              <p>
                Total Stock : <strong>{product.totalQuantity}</strong>
              </p>
            </div>
            <div className="col-12">
              <SetDiscount
                discount={discount}
                setDis={setDis}
                id={product._id}
              />
            </div>
            <div className="col-12">
              <p className="col-12">Available Stock : </p>
              <div>
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
          </div>
        </ModalBody>
        <ModalFooter>
          <center>
            <Link to={`/admin/updateitem/${product._id}`}>
              <Button color="warning" onClick={toggle}>
                Update Item
              </Button>
            </Link>
          </center>
          {/* <Button color="danger" onClick={toggle}>Close</Button> */}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AdminProductModal;
