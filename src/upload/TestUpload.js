import * as Papa from "papaparse";
import React, { Component } from "react";
import fbDatabase from "../firebase";
import axios from "./index";

class TestUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: null,
      url: "",
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
    const moo = false;
    if (moo) {
      // ---------- GOTTA WORK ON THIS DAMN UPLOAD ---------- //
      const uploadTask = fbDatabase.ref(`test/${test.name}`).put(test);
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
          fbDatabase
            .ref("test")
            .child(test.name)
            .getDownloadURL()
            .then(url => {
              this.setState({ url });
            });
        }
      );
    } else {
      this.props.updateData(this.state.test);
      const jsonObj = JSON.stringify(this.state.test);
      console.log("launching ...", jsonObj, axios);
      axios
        .post("/data.json", jsonObj)
        .then(resp => console.log("FIREBASE -", resp))
        .catch(err => console.error("WAH ERROR -", err));
    }
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

        {/* <img
          className="testUploadImg"
          src={
            this.state.url ||
            "https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118928_960_720.png"
          }
          alt="Upload Completed!"
        /> */}
      </div>
    );
  }
}

export default TestUpload;
