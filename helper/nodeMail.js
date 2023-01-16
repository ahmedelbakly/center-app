
const nodemailer = require("nodemailer");
require("dotenv").config();

exports.sendMailToUser = async (req,res,email,subject,text) => {

  var transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
   
    auth: {
      user: process.env.EMAIL,
      pass:process.env.EMAIL_PASS2,
    },
    secure:true
  });

  await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
            reject(error);
        } else {
            console.log("Server is ready to take our messages");
            resolve(success);
        }
    });
});
  
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
  await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailData, (err, info) => {
        if (err) {
            console.error(err);
            reject(err);
        } else {
            console.log(info);
            resolve(info);
        }
    });
});
res.status(200).json({ status: "OK" });
};
