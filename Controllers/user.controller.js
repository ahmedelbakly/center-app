// import userModel
const userModel = require("../Models/user.model");
const JWT = require("jsonwebtoken");
const nodeMiller = require("../helper/nodeMial")
require("dotenv").config()

// import funHelper
const funHelper = require("../helper/functions");
// import bcrypt
const bcrypt = require("bcrypt");
const helper = require("../helper/functions");
require("dotenv").config();
console.log(process.env.JWT_SECRET_ACCESS);

// ****************************************************************************************

//create functions to signupUser
exports.signupUser = async (req, res, next) => {
  try {
    const { name, email, password, phone, type } = req.body;
    if (!(name && email && password && phone && type)) {
      return res.json("all fields is required");
    } else {
      console.log(req.body);
      const user = await userModel.findOne({ email: email });
      if (user) {
        console.log(typeof(+process.env.SALT));
        return res.json("user is registered");

      } else {
      
        const encryptedPassword = await bcrypt.hash(password,+process.env.SALT);

        const newUser = await new userModel({
          name: name,
          email: email,
          password: encryptedPassword,
          phone: phone,
          type: type,
        });
        console.log(newUser);
        await newUser.save();
        res.status(201).json(newUser);
      }
    }
  } catch (error) {
    res.status(301).json(error);
  }
};

// ****************************************************************************************
let refreshTokens = [];

exports.createRefreshToken = async (req, res, next) => {
  const refreshToken = req.body.token;
  if (!refreshToken) res.status(403).json("you not authorization");
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json("refreshToken is not valid");
  }

  // return console.log("token valid");
  JWT.verify(
    refreshToken,
    process.env.JWT_SECRET_REFRESH,
    async (error, user) => {
      error && console.log(error);
      user && console.log(user);
      refreshTokens = [];
      const newAccessToken = await funHelper.generateToken(
        user,
        process.env.JWT_SECRET_ACCESS,
        process.env.JWT_SECRET_ACCESS_EXPIRE
      );
      const newRefreshToken = await funHelper.generateToken(
        user,
        process.env.JWT_SECRET_REFRESH,
        process.env.JWT_SECRET_REFRESH_EXPIRE
      );

      refreshTokens.push(newRefreshToken);
      res.json({
        accessToken: `bearer ${newAccessToken}`,
        refreshToken: newRefreshToken,
        refreshTokens: refreshTokens,
      });
    }
  );
};
//create functions to loginUser

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.json("all fields is required");
    } else {
      const user = await userModel.findOne({ email: email });

      if (user) {
        if (await bcrypt.compare(password, user.password)) {
          const token = await funHelper.generateToken(
            user,
            process.env.JWT_SECRET_ACCESS,
            process.env.JWT_SECRET_ACCESS_EXPIRE
          );
          const refreshToken = await funHelper.generateToken(
            user,
            process.env.JWT_SECRET_REFRESH,
            process.env.JWT_SECRET_REFRESH_EXPIRE
          );
          refreshTokens.push(refreshToken);
          console.log(refreshTokens);
          res.json({
            userToken: `Bearer ${token}`,
            refreshToken: refreshToken,
            user: user,
            refreshTokens,
          });
        } else {
          res.json("password is incorrect");
        }
      } else {
        res.json("this email is not registered");
      }
    }
  } catch (error) {
    return res.json("all fields is required");
  }
};
// ****************************************************************************************
//create functions to updateUser
exports.updateUser = async (req, res, next) => {
  try {
    const { id, name, email, password, phone, type } = req.body;
    if (!(id && name && email && password && phone && type)) {
      return res.json("all fields is required");
    } else {
      const encryptedPassword = await bcrypt.hash(password, +process.env.SALT);
      await userModel.findByIdAndUpdate(id, {
        name: name,
        email: email,
        password: encryptedPassword,
        phone: phone,
        type: type,
      });
      res.json("update user");
    }
  } catch (error) {
    // res.status(301).json(error);
  }
};

// ****************************************************************************************
//create functions to deleteUser
exports.deleteUser = async (req, res, next) => {
  try {
    console.log(req.params.id);
    if (!req.params.id) {
      return res.json(" id is required");
    } else {
      const user = await userModel.findByIdAndDelete(req.params.id);
      user && res.json("delete user");
      !user && res.json("user not found");
    }
  } catch (error) {
    // res.status(301).json(error);
  }
};
// **********************************************************
//create functions to getAllStudent
exports.getAllStudent = async (req, res, next) => {
  console.log(req.param.type);
  try {
    const allStudent = await userModel.find({ type: "student" });
    res.status(201).json(allStudent);
  } catch (error) {
    res.status(301).json(error);
  }
};
// ***************************************************************
//create functions to getAllTeacher
exports.getAllTeacher = async (req, res, next) => {
  try {
    const allTeachers = await userModel.find({ type: "teacher" });
    res.status(201).json(allTeachers);
  } catch (error) {
    res.status(301).json(error);
  }
};

//rest password by email

exports.restPass = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(400).json("user is not register");
    }
    const token = await funHelper.generateToken(
      user,
      process.env.JWT_SECRET_ACCESS,
      process.env.JWT_SECRET_ACCESS_EXPIRE
    );

    const link = `http://localhost:3000/user/restPass/${user.id}/${token}`
   
    await nodeMiller.sendMailToUser(email,"rest password",`click on this link to rest your password

    link : ${link}
    
    this link is valid to 5 minutes`)

    res.json({
      token,
      link,
    id :  user.id
    });
}

catch (error) {
    console.log(error);
  }
};


exports.restPassById = async (req,res,next) => { 

const {password} = req.body;
const {id}= req.params;
const USER  = await userModel.findOne({_id : id});
if(!USER){
res.json("user not found")

} 
const hashPassword = await bcrypt.hash(password,+process.env.SALT)
 USER.password = hashPassword;
 await USER.save().then(()=>{
  res.json(USER)
 })






 }

// exports.createRefreshToken = async (req, res, next) => {
//   const refreshToken = req.body.token;
//   if (!refreshToken) res.status(403).json("you not authorization");
//   if (!refreshTokens.includes(refreshToken)) {
//     console.log(refreshToken);
//     console.log(refreshTokens);
//     return res.status(403).json("refreshToken is not valid");
//   }

//   return console.log("token valid");
//   JWT.verify(refreshToken, "myRefreshToken", (error, user) => {
//     error && console.log(error);
//     refreshTokens = [];
//     const newAccessToken = funHelper.generateToken(user, "mySecretToken", "5s");
//     const newRefreshToken = funHelper.generateToken(user, "myRefreshToken", "1h");
//     refreshTokens.push(newRefreshToken);
//     res.json({
//       accessToken: newAccessToken,
//       refreshToken: newRefreshToken,
//       refreshTokens: refreshTokens,
//     });
//   });
// };
