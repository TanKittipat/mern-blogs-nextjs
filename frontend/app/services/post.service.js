import api from "./api";

const apiUrl = process.env.NEXT_PUBLIC_BASE_URL + "/post";

const createPost = async (post) => {
  const res = await api.post(apiUrl, post, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res;
};

const getPosts = async () => {
  return await api.get(apiUrl);
};

const getPostDetail = async (id) => {
  return await api.get(`${apiUrl}/${id}`);
};

const PostServices = {
  createPost,
  getPosts,
  getPostDetail,
};

export default PostServices;
