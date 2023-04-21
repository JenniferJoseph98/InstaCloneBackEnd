const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  name: { type: String, required: true },
  caption: { type: String },
  likes: [String],
  location: { type: String, unique: true },
  imageUrl: { type: String },
  date: { type: Date, required: true, default: Date.now() },
});
module.exports = mongoose.model("post", postSchema);
