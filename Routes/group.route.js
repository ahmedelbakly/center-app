const express = require("express");
const router = express.Router();
const groupController = require("../Controllers/group.controller");
const { auth } = require("../Models/auth");
const authReq = require("../helper/aut2");

router.get(
  "/group/getAll",
  authReq.authReq,
  auth,
  groupController.getAllGroups
);
router.post(
  "/group/addNewGroup",
  authReq.authReq,
  auth,
  groupController.addNewGroup
);
router.put(
  "/group/updateGroup",
  authReq.authReq,
  auth,
  groupController.updateGroup
);
router.delete(
  "/group/deleteGroup/:id",
  authReq.authReq,
  auth,
  groupController.deleteGroup
);
router.post(
  "/group/addNewStudentInGroup",
  authReq.authReq,
  auth,
  groupController.addNewStudentInGroup
);
router.delete(
  "/group/deleteUserFromGroup/:groupId/:studentId",
  authReq.authReq,
  auth,
  groupController.deleteUserFromGroup
);

module.exports = router;
