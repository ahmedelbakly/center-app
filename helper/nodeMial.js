
const nodemailer = require("nodemailer");
require("dotenv").config();

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass:process.env.EMAIL_PASS2,
  },
});

exports.sendMailToUser = async (email,subject,text) => {
  try {
    var mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject:subject ,
      text: text,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
