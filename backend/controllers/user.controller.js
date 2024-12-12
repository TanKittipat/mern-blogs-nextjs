const bcrypt = require("bcryptjs");
const UserModel = require("../models/User");
const salt = bcrypt.genSaltSync(10);

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

exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .send({ message: "Please provide all required fields!" });
  }

  try {
  } catch (error) {
    res.status(500).send({
      message: error.message || "Something error occurred while login user!",
    });
  }
};
