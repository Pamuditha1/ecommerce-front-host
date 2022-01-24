import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Badge,
} from "reactstrap";
import { Link } from "react-router-dom";
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ViewProductImage from "../ViewProductImage";

import getOneProductAdmin from "../../services/getOneProduct";

const ProductModal = ({
  isModalOpen,
  setisModalOpen,
  product,
  cart,
  addtoCart,
}) => {
  // const sizes = ["XS","S","M","L","XL","XXL"]
  // const [sizes, setsizes] = useState(["XS","S","M","L","XL","XXL"])
  // const [size, setsize] = useState('')
  let size = "";
  let q = "";
  const [selectedSize, setselectedSize] = useState("");
  const [quantity, setquantity] = useState(0);
  const [total, settotal] = useState(0);
  const [avaiS, setavaiS] = useState([]);
  const [avaiQuantity, setavaiQuantity] = useState("");

  let availableSizes = ["Choose Size"];
  let availabel = [];

  if (product.combinations) {
    availabel = product.combinations.filter((s) => {
      if (s.qty > 0) return true;
    });

    availabel.forEach((s) => {
      // let current = availableSizes;
      // current[...current, s.size]
      availableSizes.push(s.size);
    });
    console.log(availabel);
    console.log(availableSizes);
    // setsizes(availabel)
  }

  // useEffect(() => {
  //     // const pro = await getOneProductAdmin(product._id)

  //     if(product.combinations) {

  //         availabel = product.combinations.filter(s => {
  //             if(s.qty > 0) return true
  //         })
  //         console.lo
  //         availabel.forEach(s => {
  //             // let current = availableSizes;
  //             // current[...current, s.size]
  //             setavaiS([...avaiS, s.size])

  //         });
  //         console.log(avaiS)
  //         console.log(availableSizes)
  //     // setsizes(availabel)
  //     }
  // })

  // }, [])

  // useEffect(() => {
  //     if(product.combinations) {
  //         availabel = product.combinations.filter(s => {
  //             if(s.qty > 0) return true
  //         })

  //         availabel.forEach(s => {
  //             // let current = availableSizes;
  //             // current[...current, s.size]
  //             let newa = [...avaiS, s.size]
  //             setavaiS(newa)
  //         });
  //         console.log(availabel)
  //         console.log(availableSizes)
  //         // setsizes(availabel)
  //     }
  // }, [product])

  // useEffect(() => {

  //         if(product.combinations) {
  //             let availabel = product.combinations.filter(s => {
  //                 if(s.qty > 0) return true
  //             })
  //             console.log(availabel)
  //             // setsizes(availabel)
  //         }

  // }, [product])

  // const [sizes, setsizes] = useState([])

  // const sizesFiltered = product.combinations[0].filter((s) => {
  //     if(s.qty > 0) return true
  // })
  // // const s =sizesFiltered.forEach(e => {
  // //     return e.size
  // // });
  // setsizes(sizesFiltered)
  // console.log(sizes)

  const toggle = () => setisModalOpen(!isModalOpen);

  const onchangeSelect = (e) => {
    // setsize(e.target.value)
    console.log("Onchange fun running");
    size = e.target.value;
    setselectedSize(e.target.value);
    console.log("Available", availabel);
    let q = availabel.filter((s) => {
      if (s.size == size) return true;
    });
    setavaiQuantity(parseInt(q.qty));
    q = q.qty;
    console.log("q", q);
    console.log("Avai qty", avaiQuantity);
    console.log("size", size);
    console.log("selected size", selectedSize);
  };
  const onchange = (e) => {
    setquantity(e.target.value);
    let t = 0;
    if (product.discount && product.discount != 0) {
      t = parseInt(product.discountedPrice) * parseInt(e.target.value);
    } else {
      t = parseInt(product.price) * parseInt(e.target.value);
    }
    settotal(t);
  };

  const addCart = () => {
    console.log("add size", size);
    console.log("add selected size", selectedSize);
    let p = product;
    const user = {
      size: selectedSize,
      quantity: quantity,
      total: total,
      addedToCart: true,
    };
    p = {
      ...product,
      user,
    };
    addtoCart(p);
    settotal(0);
    setquantity(0);
    console.log("cart", cart);
  };

  return (
    <div>
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
                Price : <strong>Rs. {product.price}</strong>
              </p>
              {product.discount && product.discount != 0 && (
                <p style={{ color: "red" }}>
                  Discounted Price :{" "}
                  <strong>Rs. {product.discountedPrice}</strong>
                </p>
              )}
              <p>
                Available Sizes :{" "}
                <strong>
                  <select
                    onChange={onchangeSelect}
                    value={selectedSize}
                    id="size"
                    name="size"
                    className="form-control col-11"
                    required
                  >
                    {availableSizes.map((option) => {
                      return (
                        <option
                          key={option}
                          value={option}
                          style={{ textAlign: "center" }}
                        >
                          {/* {option.size} qty {option.qty} */}
                          {option}
                        </option>
                      );
                    })}
                  </select>
                </strong>
              </p>
              <p>
                Quantity :{" "}
                <strong>
                  <input
                    onChange={onchange}
                    value={quantity}
                    min="1"
                    max={avaiQuantity ? `${avaiQuantity}` : ""}
                    className="form-control col-11"
                    type="number"
                    id="quantity"
                    name="quantity"
                  />
                </strong>
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <p>
                Total Amount : <strong>{total ? total : 0}</strong>
              </p>
            </div>
            <div className="col-4">
              {/* {
                                (product.user.addedToCart || false) && <h5>Item Already Added to the Cart</h5> 
                                
                            } */}
              <Button
                color="warning"
                onClick={addCart}
                disabled={quantity == 0}
              >
                Add to Cart
              </Button>
            </div>
            <div className="col-2">
              <Link
                to="/user/cart"
                style={{ color: "black" }}
                className="nav-link"
              >
                <FontAwesomeIcon icon={faShoppingCart} size="2x" />
                <Badge color="warning">
                  {/* {props.count || props.cCount} */}
                  {JSON.parse(localStorage.getItem("cart"))
                    ? JSON.parse(localStorage.getItem("cart")).length
                    : 0}
                </Badge>{" "}
              </Link>
            </div>
          </div>
        </ModalBody>
        {/* <ModalFooter>                   

                    <Button color="danger" onClick={toggle}>Close</Button> 
                </ModalFooter> */}
      </Modal>
    </div>
  );
};

export default ProductModal;
