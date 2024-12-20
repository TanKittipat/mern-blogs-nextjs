const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const { upload } = require("../middlewares/file.middleware");
const authJwt = require("../middlewares/auth.middleware");

router.post("/", authJwt.verifyToken, upload, postController.createPost);
router.get("/", postController.getPosts);
router.get("/:id", postController.getPostDetail);

module.exports = router;
