import React, { Component } from "react";
import { connect } from "react-redux";
import emailjs from "emailjs-com";

class Email extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: "",
      email: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const serviceId = "sensitized_analysis",
      templateId = "sensitized_analysis",
      userId = "user_AZj3ffxVL9YBbjm9jaQTq",
      content = {
        analysis_number: 100,
        message: this.state.feedback,
        user_name: this.state.email.split("@")[0],
        user_email: this.state.email
      };

    emailjs
      .send(serviceId, templateId, content, userId)
      .then(res => {
        console.log("Email success -", res);
      })
      .catch(err => console.error("WAH ERROR -", err));
  };

  render() {
    return (
      <div className="emailFullDiv">
        <span className="emailHeaderText">Let's see if it works</span>

        <div className="emailInsideDiv">
          <div>
            <textarea
              name="feedback"
              onChange={this.handleChange}
              placeholder="Text Here"
              value={this.state.feedback}
              style={{ width: "100%", height: "40px" }}
            />
          </div>

          <input
            className="emailAddressInput"
            type="text"
            name="email"
            value={this.state.email}
            placeholder="Email"
            required
            onFocus={e => (e.target.placeholder = "")}
            onBlur={e => (e.target.placeholder = "Email")}
            onChange={this.handleChange}
          />

          <input
            type="button"
            value="Submit"
            className="emailSubmitBtn"
            onClick={this.handleSubmit}
          />
        </div>

        <hr className="emailLineBreak" />
      </div>
    );
  }
}

export default connect()(Email);
