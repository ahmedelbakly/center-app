const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  type: String,
  active: Boolean,
  date: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
