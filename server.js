const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();


//Start import routes
const groupRouts = require("./Routes/group.route");
const userRouts = require("./Routes/user.route");

//End import routes

// Start connect with mongoDB

async function main() {
  // await mongoose.connect("mongodb://localhost:27017/student-app");
  mongoose.set("strictQuery", false);

     await mongoose.connect(process.env.DB_URL,{
      useNewUrlParser: true,
      // useFindAndModify: true,
      useUnifiedTopology: true
    }
 );
  console.log("db is connected");
}
main().catch((err) => console.log(err));

console.log(process.env.DB_PASS);
// End connect with mongoDB
// Start use cors
app.use(cors({
  "origin": "*",
//   "methods": "GET,PUT,POST,DELETE",
//   "preflightContinue": false,
//   "optionsSuccessStatus": 204,
//  "allowedHeaders":"Authorization"
}));

// End use cors
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 

 
// app use routs

app.use("/api", groupRouts);
app.use("/api", userRouts);

app.get("/api/:id",(req,res,next)=>{
  console.log(req.param.id);
res.json("id :" + req.params.id)
})
app.listen(process.env.PORT|| 3000, () => console.log(`Example app listening on port ${port}!`));
