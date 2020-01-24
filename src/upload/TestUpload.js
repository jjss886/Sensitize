import React, { Component } from "react";
import storage from "../firebase";

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: null,
      url: "",
      progress: 0
    };
  }

  handleChange = e => {
    console.log("changing -", e.target.files);
    if (e.target.files[0]) {
      const test = e.target.files[0];
      this.setState(() => ({ test }));
    }
  };

  handleUpload = () => {
    const { test } = this.state;
    const uploadTask = storage.ref(`test/${test.name}`).put(test);
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
        // COMPLETE UPLOAD FUNCTION
        storage
          .ref("test")
          .child(test.name)
          .getDownloadURL()
          .then(url => {
            this.setState({ url });
          });
      }
    );
  };

  render() {
    return (
      <div className="testUploadFullDiv">
        <h2 className="testHeaderText">test Upload Section [TEST]</h2>

        <div className="testProgressBarDiv">
          <progress
            value={this.state.progress}
            max="100"
            className="progress"
          />
        </div>

        <div className="testSelectSection">
          <div className="testSelectBtnDiv">
            <input
              className="testFileBtn"
              type="file"
              onChange={this.handleChange}
            />
          </div>

          <div className="testFilePathDiv">
            <input className="testFilePathInput" type="text" />
          </div>
        </div>

        <button onClick={this.handleUpload} className="testUploadBtn">
          Upload
        </button>

        <img
          className="testUploadImg"
          src={
            this.state.url ||
            "https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118928_960_720.png"
          }
          alt="Upload Completed!"
        />
      </div>
    );
  }
}

export default ImageUpload;
