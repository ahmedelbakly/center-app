
const nodemailer = require("nodemailer");
require("dotenv").config();

var transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass:process.env.EMAIL_PASS2,
  },
});

exports.sendMailToUser = async (email,subject,text) => {
  try {
    var mailOptions = await {
      from: process.env.EMAIL,
      to: email,
      subject:subject ,
      text: text,
    };

    transporter.sendMail(mailOptions, function async (error, info) {
      if (error) {
        
      } else {
       console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
