import React, { Component } from "react";
import { connect } from "react-redux";
import emailjs from "emailjs-com";

class Email extends Component {
  constructor(props) {
    super(props);
    this.state = { feedback: "", name: "Name", email: "email@example.com" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({ feedback: evt.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const serviceId = "sensitized_analysis",
      templateId = "sensitized_analysis",
      userId = "user_AZj3ffxVL9YBbjm9jaQTq",
      content = {
        // message_html: this.state.feedback,
        // from_name: this.state.name,
        // reply_to: this.state.email
        analysis_number: 100,
        message: this.state.feedback,
        user_name: this.state.name,
        user_email: this.state.email
      };

    emailjs
      .send(serviceId, templateId, content, userId)
      .then(res => {
        console.log("Success email -", res);
      })
      .catch(err => console.error("WAH ERROR -", err));
  }

  render() {
    return (
      <form className="test-mailing">
        <h1>Let's see if it works</h1>
        <div>
          <textarea
            id="test-mailing"
            name="test-mailing"
            onChange={this.handleChange}
            placeholder="Post some lorem ipsum here"
            required
            value={this.state.feedback}
            style={{ width: "100%", height: "150px" }}
          />
        </div>
        <input
          type="button"
          value="Submit"
          className="btn btn--submit"
          onClick={this.handleSubmit}
        />
      </form>
    );
  }
}

export default connect()(Email);
