import React, { Component } from "react";
//import hasAccessTo from "../utils/hasAccess";
import { WidgetLoader, Widget } from "react-cloudinary-upload-widget";

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        cloudName: "dl2axglxd",
        uploadPreset: "e-commerce",
        cropping: true,
        croppingShowDimensions: true,
        croppingAspectRatio: 1,
        clientAllowedFormats: ["jpg", "jpeg", "png"],
        maxImageFileSize: 5000000,
        maxFiles: 1,
        multiple: false,
        resourceType: "image",
        minImageWidth: 400,
        minImageHeight: 400,
        croppingValidateDimensions: true,
        showUploadMoreButton: false,
      },
    };
  }

  // showWidget = () => {
  //   let myWidget = window.cloudinary.createUploadWidget(
  //     {
  //       cloudName: "dl2axglxd",
  //       uploadPreset: "e-commerce",
  //       cropping: true,
  //       croppingShowDimensions: true,
  //       croppingAspectRatio: 1,
  //       clientAllowedFormats: ["jpg", "jpeg", "png"],
  //       maxImageFileSize: 5000000,
  //       maxFiles: 1,
  //       multiple: false,
  //       resourceType: "image",
  //       minImageWidth: 400,
  //       minImageHeight: 400,
  //       croppingValidateDimensions: true,
  //       showUploadMoreButton: false,
  //     },
  //     (error, result) => {
  //       if (!error && result && result.event === "success") {
  //         this.props.setImageURL(result.info.url);
  //       }
  //     }
  //   );
  //   myWidget.open();
  // };

  onSuccess = (result) => {
    this.props.setImageURL(result.info.url);
  };

  render() {
    return (
      <div className="col-12 text-center mb-3">
        <WidgetLoader />
        <Widget
          resourceType="image"
          cloudName="dl2axglxd"
          uploadPreset="e-commerce"
          buttonText="Upload"
          style={{
            color: "#007bff",
            borderColor: "#007bff",
            backgroundColor: "transparent",
            borderRadius: 5,
            height: 38,
            width: 100,
            marginTop: 2,
          }}
          onSuccess={this.onSuccess}
          croppingAspectRatio={1}
          {...this.state.options}
        />
        <button
          onClick={this.props.removeImage}
          className="btn btn-outline-danger ml-3"
        >
          Remove
        </button>
      </div>
      // <div className="col-12 text-center">
      //   <button
      //     id="upload_widget"
      //     className="btn btn-outline-primary mb-3"
      //     onClick={this.showWidget}
      //     disabled={
      //       (!this.props.update && this.props.imageURL) ||
      //       !hasAccessTo(["Admin"])
      //     }
      //   >
      //     {!this.props.update && this.props.imageURL ? "Uploaded" : "Upload"}
      //   </button>
      //   <button
      //     disabled={!hasAccessTo(["Admin"])}
      //     onClick={this.props.removeImage}
      //     className="btn btn-outline-danger mb-3 ml-3"
      //   >
      //     Remove
      //   </button>
      // </div>
    );
  }
}

export default ImageUpload;
