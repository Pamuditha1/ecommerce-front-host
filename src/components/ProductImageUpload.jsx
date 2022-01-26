import React from "react";

function ProductImageUpload(props) {
  const onChange = (e) => {
    props.setFile(e.target.files[0]);
    props.setFilename(e.target.files[0].name);
    props.setFilePreview(URL.createObjectURL(e.target.files[0]));
  };

  const resetFile = (e) => {
    e.preventDefault();
    props.setFilePreview(null);
    props.setFile(null);
    props.setFilename(null);
  };

  return (
    <div className="col-12 mb-2">
      <div className="row">
        <p className="text-center">Product Image</p>
      </div>

      <div className="row mt-3">
        <form onSubmit={props.onImageSubmit} className="col-8">
          <div className="custom-file">
            <input
              type="file"
              name="image"
              class="custom-file-input"
              id="image"
              onChange={onChange}
            />
            <label className="custom-file-label" htmlFor="image">
              {props.filename}
            </label>
          </div>
        </form>

        <div className="col-4">
          {props.filePreview && (
            <>
              <div>
                <button
                  type="reset"
                  class="btn btn-danger"
                  style={{ width: "100%" }}
                  onClick={resetFile}
                >
                  Remove
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-2"></div>
        <img
          className="col-8"
          style={{ width: "100%", height: "auto" }}
          alt="product"
          src={props.filePreview}
        />
        <div className="col-2"></div>
      </div>
    </div>
  );
}

export default ProductImageUpload;
