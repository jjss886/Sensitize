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
      name: "",
      lastName: ""
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

      Papa.parse(newFile, {
        header: true,
        download: true,
        dynamicTyping: true,
        complete: result => {
          this.setState({ data: result.data, lastName: newName, name: "" });
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

  showLatestFile = () => {
    const { lastName } = this.state;
    return lastName ? (
      <p className="lastFileUploadText">
        {lastName.length > 15
          ? `Latest: ${lastName.slice(0, 15)}...`
          : `Latest: ${lastName}`}
      </p>
    ) : null;
  };

  render() {
    console.log("render --", this.state);
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
          <label htmlFor="file" className="uploadFileLink linkText">
            Choose File
          </label>

          {this.showLatestFile()}

          <button
            onClick={this.handleUpload}
            className="dataUploadBtn linkText"
          >
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
