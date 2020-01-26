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

  validateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { feedback, email } = this.state;
    if (!this.validateEmail(email)) {
      this.setState({ email: "" });
      return alert("Invalid email input");
    }
    const serviceId = "sensitized_analysis",
      templateId = "sensitized_analysis",
      userId = "user_AZj3ffxVL9YBbjm9jaQTq",
      content = {
        analysis_number: 100,
        message: feedback,
        user_name: email.split("@")[0],
        user_email: email
      };

    emailjs
      .send(serviceId, templateId, content, userId)
      .then(res => {
        console.log("Email success -", res);
      })
      .catch(err => console.error("WAH ERROR -", err));

    this.setState({ feedback: "", email: "" });
  };

  render() {
    return (
      <div className="emailFullDiv">
        <span className="emailHeaderText">Let's see if it works</span>

        <div className="emailInsideDiv">
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

          <textarea
            className="emailFeedbackInput"
            name="feedback"
            onChange={this.handleChange}
            placeholder="Message (Optional)"
            onFocus={e => (e.target.placeholder = "")}
            onBlur={e => (e.target.placeholder = "Message (Optional)")}
            value={this.state.feedback}
            style={{ width: "100%", height: "40px" }}
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
