const Post = require("../model/postSchema");
const postRoutes = require("express").Router();
const cloudinary = require("./cloudinary");
postRoutes.get("/:skip", async (req, res) => {
  const skip = req.params.skip ? Number(req.params.skip) : 0;
  const defaultLimit = 10;
  try {
    const newdata = await Post.find()
      .sort({ _id: "-1" })
      .skip(skip)
      .limit(defaultLimit);
    res.send(newdata);
  } catch (error) {
    return error;
  }
});
postRoutes.post("/add", async (req, res) => {
  try {
    const uploadedResponse = await cloudinary.v2.uploader.upload(
      req.body.imageUrl,
      { upload_preset: "realEstate" },
      function (error, result) {
        if (error) {
          console.log("Cannot upload");
          res.sendStatus(500);
        } else console.log("success");
        return { url: result.secure_url, public_id: result.public_id };
      }
    );
    if (uploadedResponse) {
      const newPost = await Post.create({
        name: req.body.name,
        caption: req.body.caption,
        location: req.body.location,
        imageUrl: uploadedResponse.url,
        likes: [],
      });
      res.send(newPost);
    } else {
      res.send("Unable to upload image");
    }
  } catch (error) {
    res.send(error);
  }
});
postRoutes.post("/similarAdd", async (req, res) => {
  const newPost = await Post.create(req.body);
  res.send(newPost);
});
postRoutes.get("/:id", async (req, res) => {
  let singlePost = await Post.findById({ _id: req.params.id });
  res.send(singlePost);
});
postRoutes.patch("/likes/:id", async (req, res) => {
  let id = req.params.id;
  let word = req.headers.name;
  console.log(id, word);
  Post.updateOne(
    { _id: id, likes: { $elemMatch: { $eq: word } } },
    {
      $pull: { likes: word },
    },
    { new: true },
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        if (result.modifiedCount === 0) {
          Post.updateOne(
            { _id: id },
            {
              $addToSet: { likes: word },
            },
            function (err, result) {
              if (err) {
                res.status(400).json({
                  status: "Failed",
                });
              } else {
                res.status(201).json({
                  status: "Like added",
                });
              }
            }
          );
        } else {
          res.status(201).json({
            status: "Like removed",
          });
        }
      }
    }
  );
});
module.exports = postRoutes;
