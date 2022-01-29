import React, { useState, useEffect } from "react";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  addCategory,
  getCategories,
  updateCategory,
} from "../services/category";

function Categories() {
  const [category, setcategory] = useState();
  const [categories, setcategories] = useState([]);
  const [hovered, sethovered] = useState("");
  const [edit, setedit] = useState(false);
  const [updateId, setupdateId] = useState("");

  const getCategoryData = async () => {
    const data = await getCategories();
    setcategories(data);
  };

  useEffect(() => {
    getCategoryData();
  }, []);

  const add = async () => {
    await addCategory({ name: category });
    setcategory("");
    getCategoryData();
  };

  const update = async () => {
    await updateCategory(updateId, { name: category });
    setcategory("");
    getCategoryData();
    setedit(false);
  };

  return (
    <>
      <h6
        style={{ backgroundColor: "blueviolet" }}
        className="pl-5 pt-1 pb-1 mb-5"
      >
        Categories
      </h6>
      <div className="row mt-5">
        <div className="col-9">
          <input
            onChange={(e) => setcategory(e.target.value)}
            value={category}
            className="form-control"
            type="text"
            id="productNo"
            name="productNo"
            placeholder="Add New Category"
          />
        </div>
        <div className="col-3">
          {edit ? (
            <>
              <button onClick={update} className="btn btn-warning">
                Update
              </button>
              <button
                onClick={() => {
                  setedit(false);
                  setcategory("");
                }}
                className="btn btn-danger ml-2"
              >
                Cancel
              </button>
            </>
          ) : (
            <button onClick={add} className="btn btn-primary">
              Add
            </button>
          )}
        </div>
      </div>
      <div className="col-12 text-center mt-5">
        {categories?.map((ctgry) => {
          return (
            <h4
              key={ctgry._id}
              className="mb-3"
              onMouseEnter={() => sethovered(ctgry._id)}
            >
              {ctgry.name}
              {hovered === ctgry._id && (
                <>
                  <button
                    className="ml-2"
                    onClick={() => {
                      setedit(true);
                      setcategory(ctgry.name);
                      setupdateId(ctgry._id);
                    }}
                  >
                    <FontAwesomeIcon icon={faEdit} size="xs" />
                  </button>
                </>
              )}
            </h4>
          );
        })}
      </div>
    </>
  );
}

export default Categories;
