import * as Papa from "papaparse";
import React, { Component } from "react";
import fbDatabase from "../../firebase";

class DataUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  handleChange = e => {
    if (e.target.files[0]) {
      const data = e.target.files[0];
      console.log("UMM -", data);

      Papa.parse(data, {
        header: true,
        download: true,
        dynamicTyping: true,
        complete: result => {
          console.log("ending -", result);
          this.setState({ data: result.data });
        }
      });
    }
  };

  handleUpload = () => {
    const { data } = this.state;
    console.log("GO GO GO ---", this.state, this.props);

    this.props.updateData(data);
    const uploadTask = fbDatabase.ref().child("data");
    uploadTask.push(data);

    uploadTask.on("value", snap => {
      console.log("YOO --", snap, snap.val());
      this.setState({ data: snap.val() }, () =>
        console.log("Moo -", this.state.data)
      );
    });
  };

  render() {
    return (
      <div className="dataUploadFullDiv">
        <h2 className="dataHeaderText">[data] Upload Section</h2>

        <div className="dataProgressBarDiv">
          <progress
            value={this.state.progress}
            max="100"
            className="progress"
          />
        </div>

        <div className="dataSelectSection">
          <div className="dataSelectBtnDiv">
            <input
              className="dataFileBtn"
              type="file"
              onChange={this.handleChange}
            />
          </div>

          <div className="dataFilePathDiv">
            <input className="dataFilePathInput" type="text" />
          </div>
        </div>

        <button onClick={this.handleUpload} className="dataUploadBtn">
          Upload
        </button>
      </div>
    );
  }
}

export default DataUpload;
