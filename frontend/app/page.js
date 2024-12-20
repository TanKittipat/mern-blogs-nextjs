"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import PostServices from "./services/post.service";
import PostCard from "./components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await PostServices.getPosts();
        if (res.status === 200) {
          setPosts(res.data);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Fetch data",
            text: res.data.message || "Fetch data successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (error) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Fetch data",
          text: error?.response?.data?.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    };
    fetchPosts();
  }, []);
  return (
    <>
      <div className="flex flex-col items-center space-y-6 w-full mx-auto bg-gradient-to-r from-sky-500 to-emerald-400">
        {posts.length > 0 &&
          posts.map((post, index) => {
            return <PostCard key={index} {...post} />;
          })}
      </div>
    </>
  );
}
