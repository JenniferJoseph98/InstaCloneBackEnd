const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
require("dotenv").config();
mongoose.connect(process.env.DBURL, () => console.log("Database connected"));
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const { tokenValidator } = require("./bcrypt/token");
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(cors());
app.use("/users", userRoutes);
app.use("/post", tokenValidator, postRoutes);
// app.use("/post", postRoutes);
app.use("/comment", tokenValidator, commentRoutes);
app.get("/", (req, res) => {
  res.send("hi");
});
app.listen(8000, () => console.log("Server Connected"));
