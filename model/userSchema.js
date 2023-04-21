const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: String,
  email: { type: String, required: true, unique: true },
});
module.exports = mongoose.model("users", userSchema);
