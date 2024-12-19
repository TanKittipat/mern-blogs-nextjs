import api from "./api";

const apiUrl = process.env.NEXT_PUBLIC_BASE_URL + "/post";

const createPost = async (post) => {
  const res = api.post(apiUrl, post, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res;
};

const PostServices = {
  createPost,
};

export default PostServices;
