const commentRoutes = require("express").Router();
const Comment = require("../model/commentSchema");
commentRoutes.post("/:id", async (req, res) => {
  try {
    console.log(req.body);
    const newComment = await Comment.create({
      name: req.body.name,
      comment: req.body.comment,
      postid: req.params.id,
    });
    res.status(200).json({
      status: "Updated",
      comment: newComment,
    });
  } catch (error) {
    // res.status(400).json({
    //   status: "unable to updated",
    // });
    res.status(400).json({
      status: "Failed",
      message: error.message,
    });
  }
});
commentRoutes.get("/:id", async (req, res) => {
  try {
    const commentsForId = await Comment.find({ postid: req.params.id }).sort({
      _id: -1,
    });
    res.status(200).json({
      status: "Success",
      comment: commentsForId,
    });
  } catch (error) {
    res.send(400).json({
      status: "unable to Get",
    });
  }
});
commentRoutes.delete("/:id", async (req, res) => {
  try {
    const commentDeleted = await Comment.findByIdAndDelete({
      _id: req.params.id,
    });
    console.log(commentDeleted);
    res.status(200).json({
      status: "Updated",
      comment: commentDeleted,
    });
  } catch (error) {
    res.send(400).json({
      status: "unable to Deleted",
    });
  }
});
module.exports = commentRoutes;
