import React, { Component } from "react";
import { connect } from "react-redux";
import html2canvas from "html2canvas";
import SMTPEmail from "../../utils/SMTPEmail";

class EmailComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: "",
      email: ""
    };
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
    const ele = document.getElementsByClassName("chartScreenshot")[0];

    html2canvas(ele).then(canvas => {
      const base64image = canvas.toDataURL("image/png");

      SMTPEmail.sendEmail(
        email,
        "Your Sensitize Analysis",
        feedback,
        base64image
      );

      this.setState({ feedback: "", email: "" });
    });
  };

  render() {
    return (
      <div className="emailFullDiv">
        <span className="emailHeaderText">Mail Your Analysis!</span>

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
          />

          <input
            type="button"
            value="Submit"
            className="emailSubmitBtn"
            onClick={this.handleSubmit}
          />
        </div>

        <hr className="lineBreak" />
      </div>
    );
  }
}

export default connect()(EmailComponent);
