const express = require("express");
const router = express.Router();
const userController = require("../Controllers/user.controller");
const helper = require("../helper/functions");
const { auth } = require("../Models/auth");
const auth2 = require("../helper/aut2");

/////////////////////////////////////////////////////////////////////////////

router.post("/user/signupUser", auth2.authReq, userController.signupUser);
router.post("/user/login", auth2.authReq, userController.loginUser);
router.put("/user/updateUser", auth2.authReq, auth, userController.updateUser);
router.delete(
  "/user/deleteUser/:id",
  auth2.authReq,
  auth,
  userController.deleteUser
);
router.get("/user/allStudent", auth2.authReq, userController.getAllStudent);
router.get("/user/allTeacher", auth2.authReq, userController.getAllTeacher);
router.post(
  "/user/refreshToken",
  auth2.authReq,
  userController.createRefreshToken
);
router.post("/user/restPass", auth2.authReq, userController.restPass);
router.put(
  "/user/restPass/:id",
  auth2.authReq,
  auth,
  userController.restPassById
);
router.get("/user/active/:token",userController.activeUser);

/////////////////////////////////////////////////////////////////////////////

// router.get("/user/sendGrid",userController.sendGrid);

module.exports = router;

//
