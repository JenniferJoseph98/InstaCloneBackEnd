const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  comment: { type: String, required: true },
  postid: { type: mongoose.Types.ObjectId, ref: "post" },
  date: { type: Date, required: true, default: Date.now() },
});
module.exports = mongoose.model("comment", commentSchema);
