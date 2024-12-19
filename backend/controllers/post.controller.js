const PostModel = require("../models/Post");
require("dotenv").config();

exports.createPost = async (req, res) => {
  //   file upload
  const { path } = req.file;
  const author = req.userId;
  const { title, summary, content } = req.body;
  if (!title || !summary || !content) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields!" });
  }

  const postDoc = await PostModel.create({
    title,
    summary,
    content,
    cover: path,
    author,
  });
  res.json({ message: "Create post successfully!", postDoc });
};
