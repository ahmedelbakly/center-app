require("dotenv").config();
const sgMail = require("@sendgrid/mail");

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs javascript
exports.SendEmail = async (email) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log(process.env.EMAIL);
  const msg = {
    to: email, // Change to your recipient
    from: process.env.EMAIL, // Change to your verified sender
    subject: "Activation Mail",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>send email from node.js , even with Node.js</strong>",
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent from sendGrid");
    })
    .catch((error) => {
      console.error(error);
    });
};
