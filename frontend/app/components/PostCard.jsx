import React from "react";
const baseUrl = process.env.NEXT_PUBLIC_IMG_URL;
const PostCard = ({ title, summary, _id, cover, author, createdAt }) => {
  return (
    <div className="card card-side bg-base-100 shadow-xl w-3/5 my-4">
      {" "}
      <figure className="md:w-1/2 flex items-center justify-center">
        {" "}
        <a href={"/post/" + _id}>
          {" "}
          <img
            src={`${baseUrl}/${cover}`}
            className="w-96 h-64 object-cover"
            alt={title}
          />{" "}
        </a>{" "}
      </figure>{" "}
      <div className="card-body">
        {" "}
        <a href={"/post/" + _id}>
          {" "}
          <h2 className="card-title">{title}</h2>{" "}
        </a>{" "}
        <p>
          {" "}
          {author.username} - {createdAt}{" "}
        </p>{" "}
        <p>{summary}</p>{" "}
      </div>{" "}
    </div>
  );
};
export default PostCard;
