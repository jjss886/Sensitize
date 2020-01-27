const SMTPEmail = {
  sendEmail(toEmail, subject, body, attachURL) {
    const Email = {
      send: function(a) {
        return new Promise(function(n, e) {
          a.nocache = Math.floor(1e6 * Math.random() + 1);
          a.Action = "Send";
          var t = JSON.stringify(a);
          Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function(e) {
            n(e);
          });
        });
      },
      ajaxPost: function(e, n, t) {
        var a = Email.createCORSRequest("POST", e);
        a.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        a.onload = function() {
          var e = a.responseText;
          null != t && t(e);
        };
        a.send(n);
      },
      ajax: function(e, n) {
        var t = Email.createCORSRequest("GET", e);
        t.onload = function() {
          var e = t.responseText;
          null != n && n(e);
        };
        t.send();
      },
      createCORSRequest: function(e, n) {
        var t = new XMLHttpRequest();
        return (
          "withCredentials" in t
            ? t.open(e, n, !0)
            : "undefined" != typeof XDomainRequest
            ? (t = new XMLHttpRequest().open(e, n))
            : (t = null),
          t
        );
      }
    };

    Email.send({
      // SecureToken: "a998cc6b-ddbb-4c8b-b2d1-951f8bca070d", // MAILTRAP.IO
      SecureToken: "30fc3d42-b111-46df-9e5d-faaab9e06260",
      To: toEmail,
      From: "jjss886@gmail.com",
      Subject: subject,
      Body: body,
      Attachments: [
        {
          name: "Sensitize_Chart.png",
          data: attachURL
        }
      ]
    }).then(() =>
      alert("Analysis sent! Please double check your spam folder.")
    );
  }
};

export default SMTPEmail;
