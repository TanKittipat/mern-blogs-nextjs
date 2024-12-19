"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import PostServices from "../services/post.service";

export default function Page() {
  const router = useRouter();
  const [postDetail, setPostDetail] = useState({
    title: "",
    summary: "",
    content: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "file") {
      setPostDetail({ ...postDetail, [name]: e.target.files[0] });
    } else {
      setPostDetail({ ...postDetail, [name]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.set("title", postDetail.title);
      data.set("summary", postDetail.summary);
      data.set("content", postDetail.content);
      data.set("file", postDetail.file);
      const res = await PostServices.createPost(data);
      if (res.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Create Post",
          text: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        setPostDetail({
          title: "",
          summary: "",
          content: "",
          file: null,
        });
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Create Post",
        text: error?.response?.data?.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-400">
      <div className="card bg-base-100 w-full max-w-2xl shrink-0 shadow-2xl">
        <div className="card-body">
          <h3 className="card-title">Create a new Post</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              placeholder="title"
              className="input input-bordered"
              required
              name="title"
              value={postDetail.title}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Summary</span>
            </label>
            <input
              type="text"
              placeholder="summary"
              className="input input-bordered"
              required
              name="summary"
              value={postDetail.summary}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Content</span>
            </label>
            <textarea
              className="textarea textarea-bordered"
              placeholder="content"
              required
              name="content"
              value={postDetail.content}
              onChange={handleChange}
            ></textarea>{" "}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Cover</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered file-input-sm"
              required
              name="file"
              onChange={handleChange}
            />
          </div>
          <div className="flex mt-3 gap-2">
            <button
              className="btn btn-ghost w-1/2"
              onClick={() => {
                setPostDetail({
                  title: "",
                  summary: "",
                  content: "",
                  file: null,
                });
                router.push("/");
              }}
            >
              Cancel
            </button>
            <button
              className="btn bg-black text-white hover:bg-gray-800 w-1/2"
              onClick={handleSubmit}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
