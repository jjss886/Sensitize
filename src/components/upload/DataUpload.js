import React, { Component } from "react";
import { connect } from "react-redux";
import * as Papa from "papaparse";
import fbDatabase from "../../firebase";
import { setLiveData, getFullData, setLiveKey } from "../../store";

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

    this.props.setLiveData(tempData);

    // UPLOAD TO FIREBASE AND UPDATING STORE
    const uploadTask = fbDatabase.ref().child("data");
    uploadTask.push(tempData);
    uploadTask.on("value", snap => {
      this.setState({ tempData: null, queue: false });
      this.props.setLiveKey(snap.key);
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
          <span className="uploadedStatusText">Uploaded:</span>
        )}
        <span className="lastFileUploadText">
          {lastName.length > 15 ? `${lastName.slice(0, 15)}...` : lastName}
        </span>
      </div>
    ) : null;
  };

  showUpdatedFiles = fullData => {
    if (!fullData) return null;
    const keys = Object.keys(fullData)
        .slice(-10)
        .reverse(),
      len = 20,
      headerText =
        keys.length === 0
          ? `Currently No Uploads`
          : keys.length === 1
          ? `Last Upload`
          : `Last ${keys.length} Uploads`;

    return (
      <div className="postUploadFileDiv">
        <span className="postUploadHeader">{headerText}</span>
        <ol className="postUploadUL">
          {keys.map(key => (
            <li
              className="postUploadList linkText"
              key={key}
              onClick={() => {
                this.props.setLiveData(fullData[key]);
                this.props.setLiveKey(key);
              }}
            >
              {fullData[key][0].fileName.length > len
                ? `${fullData[key][0].fileName.slice(0, len)}...`
                : fullData[key][0].fileName}
            </li>
          ))}
        </ol>
      </div>
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

        {this.props.fullData
          ? this.showUpdatedFiles(this.props.fullData)
          : null}
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
    setLiveData: data => dispatch(setLiveData(data)),
    getFullData: data => dispatch(getFullData(data)),
    setLiveKey: key => dispatch(setLiveKey(key))
  };
};

export default connect(mapState, mapDispatch)(DataUpload);
