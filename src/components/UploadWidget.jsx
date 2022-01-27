import React, { Component } from "react";

class ImageUpload extends Component {
  componentDidMount() {
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dl2axglxd",
        uploadPreset: "e-commerce",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          this.props.setImageURL(result.info.url);
        }
      }
    );
    document.getElementById("upload_widget").addEventListener(
      "click",
      function () {
        myWidget.open();
      },
      false
    );
  }

  render() {
    return (
      <div className="col-12 text-center">
        <button
          id="upload_widget"
          className="btn btn-outline-primary mb-3"
          disabled={this.props.imageURL}
        >
          {this.props.imageURL ? "Uploaded" : "Upload"}
        </button>
        <button
          onClick={this.props.removeImage}
          className="btn btn-outline-danger mb-3 ml-3"
        >
          Remove
        </button>
      </div>
    );
  }
}

export default ImageUpload;
