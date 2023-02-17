require("dotenv").config();
// import userModel
const bcrypt = require("bcryptjs");
const userModel = require("../Models/user.model");
const JWT = require("jsonwebtoken");
const nodeMiller = require("../helper/nodeMail");
// import funHelper
const funHelper = require("../helper/functions");
// import bcrypt
const sendGrid = require("../helper/SendGrid")
// ****************************************************************************************

//create functions to signupUser
exports.signupUser = async (req, res, next) => {
  return new promise ((resolve,reject)=>{


  try {
    const { name, email, password, phone, type, subject } = req.body;

    if (!(name && email && password && phone && type && subject)) {
      return res.json("all fields is required");
    } else {
      const user = await userModel.findOne({ email: email });
      if (user) {
        return res.json("user is registered");
      } else {
        const encryptedPassword = await bcrypt.hash(
          password,
          +process.env.SALT
        );

        const newUser = await new userModel({
          name: name,
          email: email,
          password: encryptedPassword,
          phone: phone,
          type: type,
          active: false,
          subject: subject,
        });
        await newUser.save();
        const activeToken = await funHelper.generateToken(
          newUser,
          process.env.JWT_SECRET_VERIFICATION,
          process.env.JWT_SECRET_VERIFICATION_EXPIRE
        );
        // const link = ` http://localhost:5000/api/user/active/${activeToken}`
        const link = ` https://center-app.vercel.app//api/user/active/${activeToken}`;
         const sending = await nodeMiller.sendMailToUser(email, "activation Email", link);
          sending.then(()=>  res.status(201).json(newUser)) 
      }
    }
  } catch (error) {
    res.status(301).json(error);
  }
}) };

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
        if (!user.active) {
          return res.json(
            "your account not active, please check your email to active your account"
          );
        }

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

          return res.json({
            userToken: `Bearer ${token}`,
            refreshToken: refreshToken,
            user: user,
            refreshTokens,
          });
        } else {
          return res.json("password is incorrect");
        }
      } else {
        return res.json("this email is not registered");
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
      return res.json("update user");
    }
  } catch (error) {
    return res.status(301).json(error);
  }
};

// ****************************************************************************************
//create functions to deleteUser
exports.deleteUser = async (req, res, next) => {
  try {
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
  try {
    const allStudent = await userModel.find({ type: "student" });
    return res.status(201).json(allStudent);
  } catch (error) {
    res.status(301).json(error);
  }
};
// ***************************************************************
//create functions to getAllTeacher
exports.getAllTeacher = async (req, res, next) => {
  try {
    const allTeachers = await userModel.find({ type: "teacher" });
    return res.status(201).json(allTeachers);
  } catch (error) {
    return res.status(301).json(error);
  }
};

//rest password by email

exports.restPass = async (req, res, next) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(404).json("you must insert your email");
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json("user is not register");
    } else {
      const token = await funHelper.generateToken(
        user,
        process.env.JWT_SECRET_ACCESS,
        process.env.JWT_SECRET_ACCESS_EXPIRE
      );

      const link = `http://localhost:3000/user/restPass/${user.id}/${token}`;

      await nodeMiller.sendMailToUser(
        email,
        "rest password",
        `click on this link to rest your password

    link : ${link}
    
    this link is valid to 5 minutes`
      );

      return await res.json({
        token,
        link,
        id: user.id,
      });
    }
  } catch (error) {
    return await res.status(301).send(error);
  }
};

exports.restPassById = async (req, res, next) => {
  try {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json("all fields is required");
    }
    const { id } = req.params;
    const USER = await userModel.findOne({ _id: id });
    if (!USER) {
      return res.json("user not found");
    } else {
      const hashPassword = await bcrypt.hash(password, +process.env.SALT);
      USER.password = hashPassword;
      await USER.save().then(() => {
        return res.json(USER);
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.activeUser = async (req, res, next) => {
  const { token } = req.params;

  try {
    const _id = await JWT.verify(token, process.env.JWT_SECRET_VERIFICATION).id;
    if (!token) {
      return req.json("token not found or not valid");
    } else {
      const signUser = await userModel.findByIdAndUpdate(_id, { active: true });

      return await res.json(signUser);
    }
  } catch (error) {}
};


exports.sendGrid = async(req,res,next)=>{
 await sendGrid.SendEmail("ahmedelbakly258@gmail.com")
res.json("mail is sent")
}