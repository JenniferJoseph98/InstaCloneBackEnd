const userRoutes = require("express").Router();
const { hashGenerate, hashValidator } = require("../bcrypt/hashing");
const { tokenGenerator } = require("../bcrypt/token");
const User = require("../model/userSchema");
userRoutes.post("/login", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    console.log(existingUser);
    if (existingUser !== null || existingUser) {
      const passCheck = await hashValidator(
        req.body.password,
        existingUser.password
      );
      console.log(passCheck);
      if (passCheck) {
        let token =  tokenGenerator(req.body.email);
        res.status(200).json({
          status: "Success",
          name: existingUser.name,
          token: token,
          email: existingUser.email,
        });
      } else {
        res.status(400).json({
          status: "Success",
          details: "Check credentials",
        });
      }
    } else {
      res.status(400).send("Email not exist,Kindly Register");
    }
  } catch (error) {
    res.send(error);
  }
});
userRoutes.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await hashGenerate(req.body.password);
    const newUser = await User.create({
      name: req.body.name.toLowerCase(),
      password: hashedPassword,
      email: req.body.email.toLowerCase(),
    });
    res.send(newUser);
  } catch (error) {
    res.send("Internal error");
  }
});
userRoutes.get("/name/:name", async (req, res) => {
  console.log(req.params.name);
  try {
    const userName = await User.findOne({ name: req.params.name });
    console.log(userName, userName !== null);
    if (userName || userName !== null) {
      res.status(400).send("Name not available");
    } else {
      res.status(200).send("Name available");
    }
  } catch (error) {
    res.status(400).send("Name not available");
  }
});
userRoutes.get("/email/:email", async (req, res) => {
  console.log(req.params);
  try {
    const userEmail = await User.findOne({ email: req.params.email });
    console.log(userEmail, userEmail !== null);
    if (userEmail || userEmail !== null) {
      res.status(400).send("Email not available");
    } else {
      res.status(200).send("Email available");
    }
  } catch (error) {
    res.status(400).send("Email not available");
  }
});
module.exports = userRoutes;
