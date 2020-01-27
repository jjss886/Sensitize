import React, { Component } from "react";
import { connect } from "react-redux";
import html2canvas from "html2canvas";
import emailjs from "emailjs-com";
import SMTPEmail from "./SMTPEmail";

class EmailComponent extends Component {
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

  getScreenShot = evt => {
    evt.preventDefault();
    const ele = document.getElementsByClassName("chartScreenshot")[0],
      box = document.getElementById("box1"),
      test = document.getElementById("test");

    // await html2canvas(ele).then(canvas => {
    //   const base64image = canvas
    //     .toDataURL("image/png")
    //     .replace("image/png", "image/octet-stream");
    //   console.log("COME ON -", canvas, base64image);
    //   return base64image;
    // });
    console.log("first -", ele, box, test);

    html2canvas(ele, {
      onrendered: function(canvas) {
        console.log("second -", canvas, ele);
        box.html("");
        if (
          navigator.userAgent.indexOf("MSIE ") > 0 ||
          navigator.userAgent.match(/Trident.*rv\:11\./)
        ) {
          const blob = canvas.msToBlob();
          console.log("um -", blob);
          window.navigator.msSaveBlob(blob, "Test file.png");
        } else {
          test.attr("href", canvas.toDataURL("image/png"));
          test.attr("download", "screenshot.png");
          test[0].click();
          console.log("hehe -", test);
        }
      }
    });
  };

  handleSubmit = async evt => {
    evt.preventDefault();
    const { feedback, email } = this.state;
    if (!this.validateEmail(email)) {
      this.setState({ email: "" });
      return alert("Invalid email input");
    }
    const ele = document.getElementsByClassName("chartScreenshot")[0];

    await html2canvas(ele).then(canvas => {
      const base64image = canvas.toDataURL("image/png"),
        // .replace("image/png", "image/octet-stream"),
        content = {
          analysis_number: 100,
          message: feedback,
          image: `<img src="cid:${base64image}" />`,
          user_name: email.split("@")[0],
          user_email: email
        },
        serviceId = "sensitized_analysis",
        templateId = "sensitized_analysis",
        userId = "user_AZj3ffxVL9YBbjm9jaQTq";

      console.log("testing -", content);

      SMTPEmail.sendEmail(
        email,
        "Your Sensitize Analysis",
        feedback,
        base64image
      );

      // emailjs
      //   .send(serviceId, templateId, content, userId)
      //   .then(res => console.log("Email success -", res))
      //   .catch(err => console.error("WAH ERROR -", err));

      this.setState({ feedback: "", email: "" });
    });
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
          />

          <input
            type="button"
            value="Submit"
            className="emailSubmitBtn"
            onClick={this.handleSubmit}
          />

          <input
            type="button"
            value="Screenshot"
            className="emailSubmitBtn"
            onClick={this.getScreenShot}
          />
        </div>

        <hr className="emailLineBreak" />
      </div>
    );
  }
}

export default connect()(EmailComponent);
