const express = require("express");
const router = express.Router();
const groupController = require("../Controllers/group.controller");
const {auth} =  require("../Models/auth");






router.get("/group/getAll",auth ,groupController.getAllGroups);
router.post("/group/addNewGroup", auth,groupController.addNewGroup);
router.put("/group/updateGroup",auth, groupController.updateGroup);
router.delete("/group/deleteGroup/:id", auth, groupController.deleteGroup);
router.post("/group/addNewStudentInGroup",auth, groupController.addNewStudentInGroup);
router.delete("/group/deleteUserFromGroup/:groupId/:studentId", auth, groupController.deleteUserFromGroup);


module.exports = router;
