// import GroupModel
const GroupModel = require("../Models/group.model");

//****************************************************** */
// create function to getAllGroups
exports.getAllGroups = async (req, res, next) => {
  try {
    const allGroups = await GroupModel.find({});
    if (allGroups) {
      res.status(200).json(allGroups);
    }
  } catch (error) {
    res.status(301).json(error);
  }
};

//***************************************************************** */
// create function to addNewGroup

exports.addNewGroup = async (req, res, next) => {
  try {
    const { teacherId, teacherName, name, count } = req.body;
    if (!(teacherId && teacherName && name && count)) {
      return res.json("all fields is required");
    } else {
      const newGroup = await new GroupModel({
        teacherId: teacherId,
        teacherName: teacherName,
        name: name,
        count: count,
        students: [],
      });
      await newGroup.save();
      return res.status(201).json(newGroup);
    }
  } catch (error) {
    res.status(301).json(error);
  }
};

//********************************************************************* */
// create function to updateGroup

exports.updateGroup = async (req, res, next) => {
  try {
    const { id, teacherId, teacherName, name, count } = req.body;
    if (!(id && teacherId && teacherName && name && count)) {
      return res.json("all fields is required");
    } else {
      await GroupModel.findByIdAndUpdate(id, {
        teacherId: teacherId,
        teacherName: teacherName,
        name: name,
        count: count,
      });
      res.json("update group");
    }
  } catch (error) {
    res.status(301).json(error);
  }
};

//************************************************************** */
// create function to deleteGroup

exports.deleteGroup = async (req, res, next) => {
  try {
    if (!req.params.id) {
      return res.json("id is required");
    } else {
      await GroupModel.findByIdAndDelete(req.params.id);
      res.json("deleteGroup");
    }
  } catch (error) {
    res.status(301).json(error);
  }
};

// *************************************************************************
// create function to addNewStudentInGroup

exports.addNewStudentInGroup = async (req, res, next) => {
  try {
    const { groupId, studentId, studentName } = req.body;
    if (!(groupId && studentId && studentName)) {
      return res.json("all fields is required");
    } else {
      const group = await GroupModel.findOne({ _id: groupId });
      const studentsInGroup = await group.students.map(
        (student) => student.studentId
      );
      const groupIncludeStudent = await studentsInGroup.includes(studentId);
      if (!groupIncludeStudent) {
        const newStudent = { studentId: studentId, studentName: studentName };
        await group.students.push(newStudent);
        await group.save();
        return res.status(201).json("add student to groups");
      } else {
        return res.json("student is registered");
      }
    }
  } catch (error) {
    res.status(301).json(error);
  }
};

// *******************************************************************************

exports.deleteUserFromGroup = async (req, res, next) => {
  try {
    const { groupId, studentId } = req.params;
    if (!(groupId && studentId)) {
      return res.json("you must add groupId && studentId");
    } else {
    
      await GroupModel.findByIdAndUpdate(
        { _id: groupId },
        { $pull: { students: { studentId: studentId } } },
        { new: true }
      );
      res.status(200).json("remove student");
    }
  } catch (error) {
    res.json(error);
  }
};
