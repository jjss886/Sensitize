import React, { Component } from "react";
import { connect } from "react-redux";
import * as Papa from "papaparse";
import { getFullData, addDataSet } from "../../store";

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

      // PARSING CSV TO JSON
      Papa.parse(newFile, {
        header: true,
        download: true,
        dynamicTyping: true,
        complete: result => {
          const { data: fileData } = result;
          // ADDING NAME TO INDEX 0 OF DATA SET
          fileData.unshift({ fileName: newName });
          this.setState({
            tempData: fileData,
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
    if (!tempData) return alert("Choose File First!");

    // UPLOAD TO FIREBASE AND UPDATING STORE
    this.props.addDataSet(tempData);
    this.setState({ tempData: null, queue: false });
    this.props.getFullData();
  };

  showLatestFile = status => {
    if (!status) return null;
    const { lastName, queue } = this.state;
    return lastName ? (
      <div className="fileStatusTextDiv">
        {queue ? (
          <span className="queuedStatusText">In Queue:</span>
        ) : (
          <span className="uploadedStatusText">Uploaded:</span>
        )}
        <span className="lastFileUploadText">
          {lastName.length > 15 ? `${lastName.slice(0, 15)}...` : lastName}
        </span>
      </div>
    ) : null;
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
            placeholder="File Name (Optional)"
            onFocus={e => (e.target.placeholder = "")}
            onBlur={e => (e.target.placeholder = "File Name (Optional)")}
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
      </div>
    );
  }
}

const mapState = state => {
  return {
    fullData: state.fullData,
    liveKey: state.liveKey
  };
};

const mapDispatch = dispatch => {
  return {
    getFullData: data => dispatch(getFullData(data)),
    addDataSet: newFullData => dispatch(addDataSet(newFullData))
  };
};

export default connect(mapState, mapDispatch)(DataUpload);
