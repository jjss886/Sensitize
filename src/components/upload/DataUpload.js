import React, { Component } from "react";
import { connect } from "react-redux";
import * as Papa from "papaparse";
import fbDatabase from "../../firebase";
import { setData, getFullData } from "../../store";

class DataUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempData: null,
      name: "",
      lastName: "",
      queue: true
    };
  }

  componentDidMount() {
    this.props.getFullData();
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
          this.setState({
            tempData: result.data,
            lastName: newName,
            name: "",
            queue: true
          });
        }
      });
    }
  };

  handleUpload = () => {
    const { tempData } = this.state;

    this.props.updateData(tempData);
    this.props.setData(tempData);

    const uploadTask = fbDatabase.ref().child("data");
    uploadTask.push(tempData);
    uploadTask.on("value", snap => {
      this.setState({ tempData: null, queue: false });
      this.props.getFullData();
    });
  };

  showLatestFile = status => {
    if (!status) return null;

    const { lastName, queue } = this.state;
    return lastName ? (
      <div className="fileStatusTextDiv">
        {queue ? (
          <span className="queuedStatusText">In Queue:</span>
        ) : (
          <span className="uploadedStatusText">Uploaded / Viewing:</span>
        )}
        <span className="lastFileUploadText">
          {lastName.length > 15 ? `${lastName.slice(0, 15)}...` : lastName}
        </span>
      </div>
    ) : null;
  };

  showUpdatedFiles = fullData => {
    if (!fullData) return null;
    const keys = Object.keys(fullData).slice(-10);
    return (
      <ul className="postUploadUL">
        {keys.map(key => (
          <li
            className="postUploadList linkText"
            key={key}
            onClick={() => this.props.setData(fullData[key])}
          >
            {key.slice(0, 15)}
          </li>
        ))}
      </ul>
    );
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
          <label htmlFor="file" className="uploadFileLink linkText">
            Choose File
          </label>

          {this.showLatestFile(this.state.queue)}

          <button
            onClick={this.handleUpload}
            className="dataUploadBtn linkText"
          >
            Upload
          </button>

          {this.showLatestFile(!this.state.queue)}
        </div>

        {this.props.fullData ? (
          <div className="postUploadFileDiv">
            <span className="postUploadHeader">Uploaded Files</span>
            {this.showUpdatedFiles(this.props.fullData)}
          </div>
        ) : null}
      </div>
    );
  }
}

const mapState = state => {
  return {
    fullData: state.fullData
  };
};

const mapDispatch = dispatch => {
  return {
    setData: data => dispatch(setData(data)),
    getFullData: data => dispatch(getFullData(data))
  };
};

export default connect(mapState, mapDispatch)(DataUpload);
