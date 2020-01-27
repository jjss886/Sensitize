import React, { Component } from "react";
import { connect } from "react-redux";
import { json } from "d3";
import { addDataSet, getFullData } from "../../store";

// eslint-disable-next-line
const url = "https://udemy-react-d3.firebaseio.com/children.json";

class URLUpload extends Component {
  state = {
    name: "",
    url: ""
  };

  handelURLChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  uploadURL = evt => {
    evt.preventDefault();
    const { name, url } = this.state;
    if (name === "") return alert("Please provide a file name");
    json(url).then(resp => {
      resp.unshift({ fileName: name });
      this.props.addDataSet(resp);
      this.props.getFullData();
      this.setState({ url: "", name: "" });
    });
  };

  render() {
    return (
      <div className="urlFullDiv">
        <input
          className="urlNameInput"
          type="text"
          name="name"
          value={this.state.name}
          placeholder="File Name"
          onFocus={e => (e.target.placeholder = "")}
          onBlur={e => (e.target.placeholder = "File Name")}
          onChange={this.handelURLChange}
        />

        <input
          type="text"
          name="url"
          value={this.state.url}
          className="urlTextInput"
          placeholder="URL Here"
          onFocus={e => (e.target.placeholder = "")}
          onBlur={e => (e.target.placeholder = "URL Here")}
          onChange={this.handelURLChange}
        />

        <button type="button" onClick={this.uploadURL} className="urlUploadBtn">
          Upload
        </button>
      </div>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    addDataSet: newFullData => dispatch(addDataSet(newFullData)),
    getFullData: () => dispatch(getFullData())
  };
};

export default connect(null, mapDispatch)(URLUpload);
