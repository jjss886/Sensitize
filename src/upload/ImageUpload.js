import React, { Component } from "react";
import storage from "../firebase";

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: "",
      progress: 0
    };
  }

  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  };

  handleUpload = () => {
    const { image } = this.state;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // PROGRESS FUNCTION
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      error => {
        console.log(error);
      },
      () => {
        // COMPLETE FUNCTION
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            this.setState({ url });
          });
      }
    );
  };

  render() {
    return (
      <div className="testImageUpload">
        <h2 className="imageHeaderText">Image Upload Section [TEST]</h2>

        <div className="imageProgressBarDiv">
          <progress
            value={this.state.progress}
            max="100"
            className="progress"
          />
        </div>

        <div className="imageSelectSection">
          <div className="imageSelectBtnDiv">
            <input
              className="imageFileBtn"
              type="file"
              onChange={this.handleChange}
            />
          </div>

          <div className="imageFilePathDiv">
            <input className="imageFilePathInput" type="text" />
          </div>
        </div>

        <button onClick={this.handleUpload} className="imageUploadBtn">
          Upload
        </button>

        <img
          className="imageUploadImg"
          src={
            this.state.url ||
            "https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118928_960_720.png"
          }
          alt="Uploaded Images"
        />
      </div>
    );
  }
}

export default ImageUpload;
