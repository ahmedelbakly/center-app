
const nodemailer = require("nodemailer");
require("dotenv").config();

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "omarelbakly399@gmail.com",
    pass:"iwmjgzxjkzhvmbci",
  },
});

exports.sendMailToUser = async (email,subject,text) => {
  try {
    var mailOptions = {
      from: "omarelbakly399@gmail.com",
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
