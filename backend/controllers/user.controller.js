const bcrypt = require("bcryptjs");
const UserModel = require("../models/User");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;

//Register
exports.register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .send({ message: "Please provide all required fields!" });
  }

  try {
    const hashedPwd = bcrypt.hashSync(password, salt);
    const user = await UserModel.create({ username, password: hashedPwd });
    res.status(200).send({ message: "User registered successfully!", user });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Something error occurred while register new user!",
    });
  }
};

//Login
exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .send({ message: "Please provide all required fields!" });
  }

  try {
    await UserModel.findOne({ username: username }).then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found!" });
      }

      const pwdIsValid = bcrypt.compareSync(password, user.password);
      if (!pwdIsValid) {
        return res.status(401).send({
          message: "Invalid password!",
          accessToken: null,
        });
      }

      //สร้าง Token
      jwt.sign(
        { username: user.username, id: user._id },
        secret,
        {
          expiresIn: 86400,
        },
        (err, token) => {
          if (err) {
            return res
              .status(500)
              .send({ message: "Internal server error: Can't login!" });
          }
          res.status(200).send({
            message: "Logged in successfully!",
            id: user._id,
            username: user.username,
            accessToken: token,
          });
        }
      );
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Something error occurred while logging in user!",
    });
  }
};
