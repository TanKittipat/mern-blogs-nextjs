const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const userRouter = require("./routers/user.router");
const postRouter = require("./routers/post.router");

const app = express();
const BASE_URL = process.env.BASE_URL;
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

app.use(cors({ origin: BASE_URL, credentials: true }));
app.use(express.json());
// make app can read json

// connect to mongoDB
try {
  mongoose.connect(DB_URL);
  console.log("Connected to mongoDB successfully.");
} catch (error) {
  console.log("Fail to connect: " + error);
}

app.get("/", (req, res) => {
  res.send("<h1>Welcome to blogs api.</h1>");
});

// use router
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/post", postRouter);

app.listen(PORT, () => {
  console.log("Server now running on http://localhost:" + PORT);
});
