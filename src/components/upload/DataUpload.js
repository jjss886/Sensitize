import React, { Component } from "react";
import { connect } from "react-redux";
import * as Papa from "papaparse";
import fbDatabase from "../../firebase";
import { setData } from "../../store";

class DataUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      name: ""
    };
  }

  handleNameChange = evt => {
    this.setState({ ...this.state, [evt.target.name]: evt.target.value });
  };

  handleChange = e => {
    const { name: stateName } = this.state;
    if (e.target.files[0]) {
      const data = e.target.files[0],
        curName = data.name,
        newName = stateName !== "" ? stateName : curName,
        newFile = new File([data], newName);

      console.log("UMM -", data, newFile);

      Papa.parse(newFile, {
        header: true,
        download: true,
        dynamicTyping: true,
        complete: result => {
          console.log("ending -", result);
          this.setState({ data: result.data, name: "" });
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
      <div className="dataFullDiv">
        <div className="dataUploadFullDiv">
          <input
            className="dataFileNameInput"
            type="text"
            name="name"
            value={this.state.name}
            placeholder="File Name"
            onFocus={e => (e.target.placeholder = "")}
            onBlur={e => (e.target.placeholder = "File Name")}
            onChange={this.handleNameChange}
          />

          <input
            className="dataFileBtn"
            type="file"
            id="file"
            onChange={this.handleChange}
          />
          <label htmlFor="file" className="uploadFileLink">
            Choose File
          </label>

          <button onClick={this.handleUpload} className="dataUploadBtn">
            Upload
          </button>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    data: state.data
  };
};

const mapDispatch = dispatch => {
  return {
    setData: data => dispatch(setData(data))
  };
};

export default connect(mapState, mapDispatch)(DataUpload);
