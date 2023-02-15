require("dotenv").config();
const sgMail = require("@sendgrid/mail");

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs javascript
exports.SendEmail = async (email,subject,link) => {

  await new Promise ((resolve,reject)=>{
    try {
      
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  
      const msg = {
        to: email, // Change to your recipient
        from: process.env.EMAIL, // Change to your verified sender
        subject: subject,
      
        html:`<h1>Center App</h1> <p><b>activation link</b>:${link}</p>`,
      };
      const sended = sgMail.send(msg);
       sended.then(() => {
          console.log("Email sent from sendGrid",sended);
          resolve("Email sent from sendGrid");
        })
        .catch((error) => {
          console.error(error,sended);
          reject(error)
        });




    } catch (error) {
      
    }
  })

}
