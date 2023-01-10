const mongoose = require("mongoose")
const  Schema = mongoose.Schema;

const groupSchema = new Schema({
  teacherId: String,
  teacherName: String,
  name: String,
  count: Number,
  students :[]
});

const Group = mongoose.model("Group", groupSchema);
module.exports = Group;
