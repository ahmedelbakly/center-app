
require("dotenv").config();
const nodemailer = require("nodemailer");
const nodemailerSendGridTransport = require("nodemailer-sendgrid-transport")

// exports.sendMailToUser = async (email,subject,text) => {

  
//   await new Promise((resolve, reject) => {
//     var transporter = nodemailer.createTransport({
//       port: 465,
//       host: "smtp.gmail.com",
     
//       auth: {
//         user: process.env.EMAIL,
//         pass:process.env.EMAIL_PASS2,
//       },
//       secure:true
//     });
  
//     // verify connection configuration
//     transporter.verify(function (error, success) {
//         if (error) {
//             console.log(error);
//             reject(error);
//         } else {
//             console.log("Server is ready to take our messages");
//             resolve(success);
//         }
//     });
// });
  
//   try {
//     var mailOptions = await {
//       from: process.env.EMAIL,
//       to: email,
//       subject:subject ,
//       text: text,
//     };

//     await new Promise((resolve, reject) => {
//       // send mail
//       transporter.sendMail(mailOptions, (err, info) => {
//           if (err) {
//               console.error(err);
//               reject(err);
//           } else {
//               console.log(info);
//               resolve(info);
//           }
//       });
//   });
//   } catch (error) {
//     console.log(error);
//   }
 

// };


exports.sendMailToUser = async (email,subject,text) => {

  const transporter = nodemailer.createTransport(nodemailerSendGridTransport({
    auth:{
      api_key :process.env.SENDGRID_API_KEY
    }
  }))
  const mailOptions = await {
          from: process.env.EMAIL,
          to: email,
          subject:subject ,
          html : `<h1>active your account</h1>
           <p>link: ${text}</p>`}
  transporter.sendMail(mailOptions,(error, info)=>{
    if(error){
      console.log(error);

    }else {
      console.log(`mail is sent to ${email}`);
    }
  })
 

};
