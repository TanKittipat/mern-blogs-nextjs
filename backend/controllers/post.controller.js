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

exports.getPosts = async (req, res) => {
  const posts = await PostModel.find()
    .populate("author", ["username"])
    .sort({ createAt: -1 })
    .limit(20);
  res.json(posts);
};

exports.getPostDetail = async (req, res) => {
  const { id } = req.params;
  const post = await PostModel.findById({ _id: id }).populate("author", [
    "username",
  ]);
  res.json(post);
};
