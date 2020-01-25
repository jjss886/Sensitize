import * as Papa from "papaparse";
import React, { Component } from "react";
import fbDatabase from "../firebase";
import axios from "./index";

class TestUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: null,
      progress: 0
    };
  }

  handleChange = e => {
    if (e.target.files[0]) {
      const test = e.target.files[0];
      console.log("UMM -", test);

      Papa.parse(test, {
        header: true,
        download: true,
        dynamicTyping: true,
        complete: result => {
          console.log("ending -", result);
          this.setState({ test: result.data });
        }
      });
    }
  };

  handleUpload = () => {
    const { test } = this.state;
    console.log("GO GO GO ---", this.state, this.props);

    this.props.updateData(test);
    const uploadTask = fbDatabase.ref().child("data");

    uploadTask.set(test);
    uploadTask.on("value", snap => console.log("YOO --", snap.val()));

    // uploadTask.on(
    //   "value",
    //   snapshot => {
    //     // PROGRESS FUNCTION
    //     const progress = Math.round(
    //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //     );
    //     this.setState({ progress });
    //   },
    //   error => {
    //     console.log(error);
    //   },
    //   () => {
    //     // COMPLETE UPLOAD FUNCTION
    //     fbDatabase
    //       .ref("data")
    //       .child(test)
    //       .then(snap => {
    //         console.log("YOO --", snap.val());
    //         // this.setState({ url });
    //       });
    //   }
    // );
  };

  render() {
    return (
      <div className="testUploadFullDiv">
        <h2 className="testHeaderText">[TEST] Upload Section</h2>

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
      </div>
    );
  }
}

export default TestUpload;
