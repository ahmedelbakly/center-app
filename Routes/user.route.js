const express = require("express");
const router = express.Router();
const userController = require("../Controllers/user.controller");
const helper = require("../helper/functions");
const { auth } = require("../Models/auth");

/////////////////////////////////////////////////////////////////////////////

router.post("/user/signupUser", userController.signupUser);
router.post("/user/login", userController.loginUser);
router.put("/user/updateUser", auth, userController.updateUser);
router.delete("/user/deleteUser/:id", auth, userController.deleteUser);
router.get("/user/allStudent", auth, userController.getAllStudent);
router.get("/user/allTeacher", auth, userController.getAllTeacher);
router.post("/user/refreshToken", userController.createRefreshToken);
router.post("/user/restPass", userController.restPass);
router.put("/user/restPass/:id", auth, userController.restPassById);

/////////////////////////////////////////////////////////////////////////////

module.exports = router;
