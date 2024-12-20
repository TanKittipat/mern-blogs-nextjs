"use client";

import PostServices from "@/app/services/post.service";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";

export default async function Page({ params }) {
  const id = (await params).id;
  const [postDetail, setPostDetail] = useState(null);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await PostServices.getPostDetail(id);
        if (res.status === 200) {
          setPostDetail(res.data);
          console.log(res.data);

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Fetch data",
            text: res.data.message || "Fetch data successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        fetchPost();
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
  }, [id]);
  return <>{id}</>;
}
