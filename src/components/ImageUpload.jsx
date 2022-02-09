import React, { useState } from "react";

const ImageUpload = ({ setImageURL }) => {
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "e-commerce");
    data.append("cloud_name", "dl2axglxd");

    fetch("https://api.cloudinary.com/v1_1/dl2axglxd/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUrl(data.url);
        setImageURL(data.url);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button onClick={uploadImage}>Upload</button>
      </div>
      <div>
        <img alt="product" src={url} width={300} height="auto" />
      </div>
    </div>
  );
};
export default ImageUpload;
